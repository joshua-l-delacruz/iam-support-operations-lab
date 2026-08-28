# IAM Support Operating Model

## Ticket classification

| Type | Examples | Normal handling |
|---|---|---|
| Incident | Lockout, MFA failure, missing provisioned access | Restore service and identify root cause |
| Request | New access, role change, temporary elevation | Verify approval and fulfill policy |
| Security incident | Active leaver, suspected compromise, privileged misuse | Contain, preserve evidence, escalate immediately |
| Governance task | Access review, orphan investigation, exception review | Record decision and remediation evidence |

## Priority model

| Priority | Criteria | Example |
|---|---|---|
| P1 | Active security exposure or widespread critical outage | Terminated privileged user remains active |
| P2 | High business impact, sensitive access, or multiple users | Finance application provisioning failure |
| P3 | Single-user business impact with no immediate security exposure | Approved entitlement not visible |
| P4 | Routine request, information, or planned change | Standard access request |

## Analyst workflow

1. Confirm the requestor and affected identity.
2. Capture the exact error, resource, timestamp, and impact.
3. Confirm approval and analyst authority.
4. Check identity, account, and employment state.
5. Check authentication, policy, authorization, and provisioning.
6. Resolve or contain within approved authority.
7. Escalate with evidence rather than a generic handoff.
8. Validate the outcome with the user or system owner.
9. Record root cause, resolution, and preventive action.

## Escalation package

An escalation should include:

- Ticket and request IDs
- User and target application
- Exact error and timestamp
- Business and security impact
- Scope: one user, group, application, or organization
- All checks already completed
- Relevant sanitized logs or correlation IDs
- Current account, entitlement, and provisioning state
- Requested action from the receiving team

## Closure criteria

A ticket is ready for closure when:

- Access or account state is verified on the target system
- The user or business owner confirms the expected result where applicable
- Temporary workarounds are documented
- Security containment is confirmed
- Work notes are complete and reproducible
- A linked problem or corrective action exists for recurring failures

