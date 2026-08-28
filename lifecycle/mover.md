# Mover Runbook

## Scenario

Liam Garcia transfers from Finance Operations to Store Operations.

## Risk

Adding new access without removing old access produces privilege accumulation and may create segregation-of-duties conflicts.

## Procedure

1. Validate the authoritative department and effective date.
2. Compare current access with the old and new role profiles.
3. Identify birthright access that must be removed.
4. Identify individually approved access requiring owner review.
5. Check for segregation-of-duties conflicts.
6. Obtain approvals for new access.
7. Remove obsolete Finance access at the approved time.
8. Provision Store Operations access.
9. Trigger reconciliation or aggregation where applicable.
10. Verify the target systems and document before-and-after access.

## Before-and-after example

| Entitlement | Before | Expected after |
|---|---:|---:|
| M365-Baseline | Yes | Yes |
| Finance-Reporting | Yes | No |
| Vendor-Payment-Approval | Yes | No |
| Store-Ops-Portal | No | Yes |
| Store-Reporting | No | Yes |

## Closure evidence

- Updated authoritative attributes
- Manager and application-owner approvals
- Removed Finance group memberships
- Added Store Operations memberships
- Completed target-system validation
- No open SoD conflict

