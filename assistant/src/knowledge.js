import { readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const REPOSITORY_ROOT = path.resolve(fileURLToPath(new URL("../..", import.meta.url)));
const APPROVED_DOCUMENTS = [
  "lifecycle/joiner.md", "lifecycle/mover.md", "lifecycle/leaver.md",
  "support-cases/IAM-001-account-lockout.md", "support-cases/IAM-002-missing-entitlement.md",
  "support-cases/IAM-003-conditional-access.md", "support-cases/IAM-004-failed-deprovisioning.md",
  "support-cases/IAM-005-mover-access-conflict.md", "docs/operating-model.md",
  "docs/architecture.md", "governance/access-review-plan.md", "sailpoint-simulation/provisioning-failure.md"
];

const words = text => new Set(text.toLowerCase().match(/[a-z0-9-]{3,}/g) ?? []);

export async function retrieveKnowledge(query, limit = 3) {
  const queryWords = words(query);
  const documents = await Promise.all(APPROVED_DOCUMENTS.map(async source => ({
    source,
    content: await readFile(path.join(REPOSITORY_ROOT, source), "utf8")
  })));
  return documents
    .map(document => ({ ...document, score: [...queryWords].filter(word => words(document.content).has(word)).length }))
    .sort((a, b) => b.score - a.score || a.source.localeCompare(b.source))
    .slice(0, limit)
    .map(({ source, content }) => ({ source, excerpt: content.slice(0, 5000) }));
}

export { APPROVED_DOCUMENTS };

