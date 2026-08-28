# Access Review Remediation Report

## Campaign summary

| Metric | Result |
|---|---:|
| Identities reviewed | 18 |
| Entitlement assignments reviewed | 31 |
| Approved | 26 |
| Revoked | 3 |
| Time-limited | 1 |
| Under investigation | 1 |

## Findings

### Finding 1 - Mover retained sensitive Finance access

- Identity: Liam Garcia / NSR-1003
- Entitlement: Finance-Payment-Approver
- Decision: Revoke
- Evidence: Department changed to Store Operations; application owner confirmed no continuing need
- Target confirmation: Removed and reconciled

### Finding 2 - Inactive contractor account

- Identity: Ava Torres / EXT-021
- Entitlement: Finance-Reporting
- Decision: Revoke
- Evidence: Contract end date passed; sponsor confirmed engagement ended
- Target confirmation: Account disabled

### Finding 3 - Unowned local application account

- Account: fin-local-archive
- Decision: Investigate
- Risk: Ownership and business purpose unclear
- Action: Application owner assigned; interactive sign-in blocked pending determination

## Corrective actions

1. Add individually assigned sensitive entitlements to the Mover review.
2. Require expiration for contractor access.
3. Create a monthly orphan-account report for the Finance application.
4. Confirm all revocations through target reconciliation.

## Audit conclusion

All completed decisions have reviewer, justification, timestamp, transaction, and target-state evidence. One orphan-account investigation remains open with a named owner and due date.

