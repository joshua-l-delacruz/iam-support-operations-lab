# IAM-005 - Mover Retained Conflicting Access

## Ticket

| Field | Value |
|---|---|
| Priority | P2 Governance |
| Identity | Liam Garcia / NSR-1003 |
| Change | Finance Operations to Store Operations |
| Finding | Vendor payment approval remained assigned |

## Risk

The user received the new Store Operations role while retaining a sensitive Finance entitlement. This created privilege accumulation and a potential segregation-of-duties conflict.

## Investigation

1. Confirm the authoritative department change and effective date.
2. Compare current access against both role profiles.
3. Identify birthright, requested, privileged, and exception access.
4. Review approval and expiration history.
5. Confirm the entitlement on the target system.

## Root cause

The Mover process added the new role but did not trigger removal of an individually approved Finance entitlement.

## Resolution

- Application owner confirmed the entitlement was no longer required.
- Access was revoked through the approved process.
- Reconciliation verified removal.
- The access decision and target evidence were attached to the ticket.

## Preventive action

Require owner review of individually assigned sensitive entitlements during every department transfer, not only removal of the previous birthright role.

