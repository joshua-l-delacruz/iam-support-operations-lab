import { createHash } from "node:crypto";
import { SYSTEM_INSTRUCTIONS, buildInput } from "./prompt.js";

function outputText(response) {
  return (response.output ?? [])
    .filter(item => item.type === "message")
    .flatMap(item => item.content ?? [])
    .filter(item => item.type === "output_text")
    .map(item => item.text)
    .join("\n");
}

export async function requestGuidance({ question, triage, sources, sessionId }) {
  if (!process.env.OPENAI_API_KEY) return null;
  const response = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: { "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL || "gpt-5.4-mini",
      store: false,
      instructions: SYSTEM_INSTRUCTIONS,
      input: buildInput(question, triage, sources),
      max_output_tokens: 900,
      safety_identifier: createHash("sha256").update(sessionId).digest("hex").slice(0, 32)
    }),
    signal: AbortSignal.timeout(30000)
  });
  if (!response.ok) throw new Error(`AI service returned ${response.status}.`);
  return outputText(await response.json());
}

