# SailPoint Simulation - Provisioning Failure

## Scenario

An approved Store-Reporting request shows Completed, but the user does not have the entitlement on the target application.

## Diagnostic sequence

```text
Approval complete?
  ↓
Correct identity, account, application, and entitlement?
  ↓
Provisioning transaction created?
  ↓
Connector response successful?
  ↓
Target account changed?
  ↓
Aggregation and identity refresh current?
  ↓
New user session required?
```

## Evidence table

| Evidence | Finding |
|---|---|
| Request | Approved and completed |
| Identity | Correct employee and target account |
| Provisioning transaction | Connector timeout |
| Target application | Entitlement absent |
| Aggregation | Older than the provisioning request |
| Policy | No violation |

## Escalation note

> Approved request REQ-20481 for NSR-1007 is complete in the governance view, but Store-Reporting is absent on target account msantos. Provisioning transaction PTX-88317 timed out after request acceptance at 09:42 UTC. Last aggregation completed at 09:10 UTC. No policy violation is present. Please review the connector transaction and approve the controlled retry. Business impact: daily store report cannot be submitted.

## Resolution validation

- Retry is recorded and authorized.
- Target entitlement is present.
- Reconciliation reflects the same state.
- User starts a new session and confirms the function.
- Ticket contains the transaction and validation evidence.

