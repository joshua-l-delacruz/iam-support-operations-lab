# Northstar IAM Support Assistant

A secure, advisory-only teaching project that turns this repository's sanitized IAM runbooks and case studies into a grounded support assistant.

## What the first version teaches

1. **Deterministic triage** classifies urgent scenarios before a model is called.
2. **Retrieval** selects only approved repository documents.
3. **Prompt boundaries** prevent claims of completed IAM actions and require citations.
4. **The Responses API** generates guidance when a local API key is configured.
5. **Evals** test priority, classification, retrieval allowlists, input limits, and safety language.

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

Open `http://127.0.0.1:8787`. Keep `.env` and API keys out of Git. The deterministic demo works without a key; grounded model guidance is enabled only when `OPENAI_API_KEY` exists.

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
Advisory answer + repository citations
```

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

- Add a structured JSON answer contract.
- Build a larger evaluation dataset from the five sanitized cases.
- Compare retrieval quality and model quality separately.
- Add authentication before any hosted deployment.
- Add read-only sandbox connectors only after threat modeling and approval design.

