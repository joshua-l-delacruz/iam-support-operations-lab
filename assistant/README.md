# Northstar IAM Support Assistant

A secure, advisory-only teaching project that turns this repository's sanitized IAM runbooks and case studies into a grounded support assistant.

## What the first version teaches

1. **Deterministic triage** classifies urgent scenarios before a model is called.
2. **Retrieval** selects only approved repository documents.
3. **Prompt boundaries** prevent claims of completed IAM actions and require citations.
4. **The Responses API** generates guidance when a local API key is configured.
5. **Structured Outputs** require every live model answer to follow a strict, machine-checkable JSON contract.
6. **Evals** test priority, classification, retrieval allowlists, input limits, source boundaries, and safety language.

The assistant cannot connect to Active Directory, Entra ID, SailPoint, ServiceNow, or production systems. It never grants, removes, or approves access.

## Run locally

Requirements: Node.js 20 or newer.

```powershell
cd assistant
npm test
$env:OPENAI_API_KEY = "your-project-key"
$env:OPENAI_MODEL = "gpt-5.4-mini"
npm start
```

Open `http://127.0.0.1:8787`. Keep `.env` and API keys out of Git. The deterministic demo works without a key; grounded model guidance is enabled only when `OPENAI_API_KEY` exists. Create a project API key in your own OpenAI Platform account, set it only in your local terminal, and never paste it into source code, screenshots, chat, or GitHub.

## Request flow

```text
Sanitized question
      ↓
Input length and rate limits
      ↓
Deterministic category + priority
      ↓
Approved-document retrieval
      ↓
Responses API (optional, store=false)
      ↓
Strict JSON Schema validation
      ↓
Advisory answer + allowlisted repository citations
```

## Structured answer contract

Live model responses must include assessment, known facts, assumptions, qualification questions, evidence to collect, safe next steps, escalation guidance, and source citations. Unknown fields are rejected, missing fields fail closed, and any citation outside the retrieved allowlist is rejected before the answer reaches the browser.

## Evaluation dataset

`evals/cases.json` contains representative sanitized scenarios for every deterministic category. `npm test` runs those cases along with schema, retrieval, validation, and prompt-boundary checks. Add a new case whenever a real failure mode is discovered; this turns bugs into permanent regression tests.

## Security choices

- No production connectors or mutation tools
- No request or response persistence
- `store: false` for model responses
- Hashed session identifier instead of an email or username
- Explicit 4,000-character input limit
- Ten requests per minute per local client
- Strict browser security headers
- Approved-document allowlist
- Generic upstream errors to avoid leaking implementation details
- Human approval required for every access-affecting action

## Next lessons

- Compare retrieval quality and model quality separately.
- Add mocked API contract tests for success, refusal, timeout, and malformed-output paths.
- Add authentication before any hosted deployment.
- Add read-only sandbox connectors only after threat modeling and approval design.

