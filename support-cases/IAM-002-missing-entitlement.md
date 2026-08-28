# IAM-002 - Access Request Completed but Entitlement Missing

## Ticket

| Field | Value |
|---|---|
| Priority | P2 |
| User | Maya Santos / NSR-1007 |
| Request | REQ-20481 |
| Target | Store Operations Portal |
| Entitlement | Store-Reporting |
| Impact | User cannot complete daily reporting |

## Initial facts

- Manager and application-owner approvals are complete.
- The governance request displays Completed.
- The user can authenticate to the portal.
- The reporting function remains unavailable.

## Investigation

1. Verify the request identity, account, target, and entitlement.
2. Confirm all approval stages and policy checks.
3. Compare the governance identity with the target account.
4. Review the provisioning transaction and connector response.
5. Confirm whether a later aggregation detected the entitlement.
6. Check the target system directly through the authorized support view.
7. Determine whether a new session or token is required.

## Evidence

```text
Request: REQ-20481
Provisioning transaction: PTX-88317
Governance state: Completed
Connector result: Timeout after request acceptance
Target entitlement state: Not assigned
Last aggregation: Before provisioning attempt
```

## Root cause

The connector accepted the provisioning request but timed out before the target committed the entitlement. The high-level request status did not reflect the target-system failure.

## Resolution

- Escalated with the request, transaction ID, timestamp, and target-state evidence.
- Re-ran provisioning through the approved retry procedure.
- Triggered reconciliation.
- Confirmed the entitlement on the target system.
- Asked the user to start a new session and verified the reporting function.

## Preventive action

Add monitoring for accepted requests without target confirmation and create a reconciliation exception when the governance state and target state differ.

