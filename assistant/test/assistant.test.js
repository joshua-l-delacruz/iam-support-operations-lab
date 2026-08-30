import test from "node:test";
import assert from "node:assert/strict";
import { triageIssue, validateQuestion } from "../src/triage.js";
import { retrieveKnowledge, APPROVED_DOCUMENTS } from "../src/knowledge.js";
import { SYSTEM_INSTRUCTIONS } from "../src/prompt.js";
import { readFile } from "node:fs/promises";
import { GUIDANCE_SCHEMA, parseGuidance } from "../src/openai.js";

test("prioritizes failed leaver deprovisioning as P1", () => {
  const result = triageIssue("A terminated worker still has active access after failed deprovisioning.");
  assert.equal(result.priority, "P1");
  assert.equal(result.category, "deprovisioning");
  assert.equal(result.requiresHumanApproval, true);
});

test("classifies a missing entitlement case", () => {
  assert.equal(triageIssue("The approved SailPoint entitlement is missing access in the target app.").category, "missing-entitlement");
});

test("rejects underspecified and oversized questions", () => {
  assert.throws(() => validateQuestion("help"), RangeError);
  assert.throws(() => validateQuestion("x".repeat(4001)), RangeError);
});

test("retrieves only approved repository documents", async () => {
  const results = await retrieveKnowledge("Conditional Access Entra sign-in denied");
  assert.ok(results.some(result => result.source.includes("conditional-access")));
  assert.ok(results.every(result => APPROVED_DOCUMENTS.includes(result.source)));
});

test("system instructions enforce advisory and citation boundaries", () => {
  assert.match(SYSTEM_INSTRUCTIONS, /advisory only/i);
  assert.match(SYSTEM_INSTRUCTIONS, /Never request passwords/i);
  assert.match(SYSTEM_INSTRUCTIONS, /Cite only the supplied repository sources/i);
});

test("structured guidance requires all safety-relevant fields", () => {
  assert.equal(GUIDANCE_SCHEMA.additionalProperties, false);
  assert.deepEqual(new Set(GUIDANCE_SCHEMA.required), new Set(Object.keys(GUIDANCE_SCHEMA.properties)));
  const source = "lifecycle/leaver.md";
  const guidance = Object.fromEntries(GUIDANCE_SCHEMA.required.map(key => [key, ["knownFacts", "assumptions", "qualificationQuestions", "evidenceToCollect", "safeNextSteps", "sourceCitations"].includes(key) ? [] : "Review required."]));
  guidance.sourceCitations = [source];
  assert.equal(parseGuidance(JSON.stringify(guidance), [source]).assessment, "Review required.");
  guidance.sourceCitations = ["unapproved.md"];
  assert.throws(() => parseGuidance(JSON.stringify(guidance), [source]), /unapproved source/i);
});

test("evaluation dataset preserves expected deterministic controls", async () => {
  const cases = JSON.parse(await readFile(new URL("../evals/cases.json", import.meta.url), "utf8"));
  for (const item of cases) {
    const result = triageIssue(item.input);
    assert.equal(result.category, item.expectedCategory, item.id);
    assert.equal(result.priority, item.expectedPriority, item.id);
    assert.equal(result.requiresHumanApproval, true, item.id);
    assert.equal(result.advisoryOnly, true, item.id);
  }
});

