import { createHash } from "node:crypto";
import { SYSTEM_INSTRUCTIONS, buildInput } from "./prompt.js";

export const GUIDANCE_SCHEMA = {
  type: "object",
  additionalProperties: false,
  properties: {
    assessment: { type: "string" },
    knownFacts: { type: "array", items: { type: "string" } },
    assumptions: { type: "array", items: { type: "string" } },
    qualificationQuestions: { type: "array", items: { type: "string" } },
    evidenceToCollect: { type: "array", items: { type: "string" } },
    safeNextSteps: { type: "array", items: { type: "string" } },
    escalation: { type: "string" },
    sourceCitations: { type: "array", items: { type: "string" } }
  },
  required: ["assessment", "knownFacts", "assumptions", "qualificationQuestions", "evidenceToCollect", "safeNextSteps", "escalation", "sourceCitations"]
};

function outputText(response) {
  return (response.output ?? [])
    .filter(item => item.type === "message")
    .flatMap(item => item.content ?? [])
    .filter(item => item.type === "output_text")
    .map(item => item.text)
    .join("\n");
}

export function parseGuidance(text, approvedSources) {
  const guidance = JSON.parse(text);
  const keys = Object.keys(GUIDANCE_SCHEMA.properties);
  if (!guidance || typeof guidance !== "object" || Array.isArray(guidance)) throw new TypeError("Invalid structured guidance.");
  if (Object.keys(guidance).some(key => !keys.includes(key)) || keys.some(key => !(key in guidance))) throw new TypeError("Incomplete structured guidance.");
  for (const key of ["knownFacts", "assumptions", "qualificationQuestions", "evidenceToCollect", "safeNextSteps", "sourceCitations"]) {
    if (!Array.isArray(guidance[key]) || guidance[key].some(item => typeof item !== "string")) throw new TypeError("Invalid structured guidance.");
  }
  for (const key of ["assessment", "escalation"]) if (typeof guidance[key] !== "string") throw new TypeError("Invalid structured guidance.");
  if (guidance.sourceCitations.some(source => !approvedSources.includes(source))) throw new TypeError("Guidance cited an unapproved source.");
  return guidance;
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
      text: {
        format: {
          type: "json_schema",
          name: "iam_support_guidance",
          strict: true,
          schema: GUIDANCE_SCHEMA
        }
      },
      safety_identifier: createHash("sha256").update(sessionId).digest("hex").slice(0, 32)
    }),
    signal: AbortSignal.timeout(30000)
  });
  if (!response.ok) throw new Error(`AI service returned ${response.status}.`);
  return parseGuidance(outputText(await response.json()), sources.map(({ source }) => source));
}

