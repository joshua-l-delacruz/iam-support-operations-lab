import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { randomUUID } from "node:crypto";
import { triageIssue, validateQuestion } from "./triage.js";
import { retrieveKnowledge } from "./knowledge.js";
import { requestGuidance } from "./openai.js";

const publicFiles = new Map([
  ["/", [fileURLToPath(new URL("../public/index.html", import.meta.url)), "text/html; charset=utf-8"]],
  ["/style.css", [fileURLToPath(new URL("../public/style.css", import.meta.url)), "text/css; charset=utf-8"]],
  ["/app.js", [fileURLToPath(new URL("../public/app.js", import.meta.url)), "text/javascript; charset=utf-8"]]
]);
const requests = new Map();
const securityHeaders = {
  "Content-Security-Policy": "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; connect-src 'self'; object-src 'none'; base-uri 'none'; frame-ancestors 'none'; form-action 'self'",
  "Referrer-Policy": "no-referrer",
  "X-Content-Type-Options": "nosniff",
  "Permissions-Policy": "camera=(), microphone=(), geolocation=()",
  "Cache-Control": "no-store"
};

function send(response, status, body, type = "application/json; charset=utf-8") {
  response.writeHead(status, { ...securityHeaders, "Content-Type": type });
  response.end(type.startsWith("application/json") ? JSON.stringify(body) : body);
}

function allowed(ip) {
  const now = Date.now();
  const recent = (requests.get(ip) ?? []).filter(time => now - time < 60000);
  recent.push(now); requests.set(ip, recent);
  return recent.length <= 10;
}

const server = createServer(async (request, response) => {
  try {
    if (request.method === "GET" && publicFiles.has(request.url)) {
      const [file, type] = publicFiles.get(request.url);
      return send(response, 200, await readFile(file, "utf8"), type);
    }
    if (request.method !== "POST" || request.url !== "/api/assist") return send(response, 404, { error: "Not found." });
    const ip = request.socket.remoteAddress ?? "unknown";
    if (!allowed(ip)) return send(response, 429, { error: "Too many requests. Try again in one minute." });
    let raw = "";
    for await (const chunk of request) { raw += chunk; if (raw.length > 5000) throw new RangeError("Request is too large."); }
    const question = validateQuestion(JSON.parse(raw).question);
    const triage = triageIssue(question);
    const sources = await retrieveKnowledge(question);
    const sessionHeader = request.headers["x-session-id"];
    const sessionId = typeof sessionHeader === "string" && /^[a-zA-Z0-9-]{1,64}$/.test(sessionHeader)
      ? sessionHeader
      : randomUUID();
    const guidance = await requestGuidance({ question, triage, sources, sessionId });
    return send(response, 200, { triage, sources: sources.map(({ source }) => source), guidance, demoMode: !guidance });
  } catch (error) {
    const status = error instanceof RangeError || error instanceof SyntaxError || error instanceof TypeError ? 400 : 502;
    return send(response, status, { error: status === 400 ? error.message : "The advisory service is temporarily unavailable." });
  }
});

server.listen(Number(process.env.PORT || 8787), "127.0.0.1", () => console.log("IAM Support Assistant: http://127.0.0.1:8787"));
