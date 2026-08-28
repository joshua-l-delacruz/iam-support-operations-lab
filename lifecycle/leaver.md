# Leaver Runbook

## Scenario

Noah Lim separates from Northstar Retail Group effective immediately.

## Priority

Immediate termination is a security-sensitive lifecycle event. Containment takes precedence over normal request order.

## Procedure

1. Validate the termination notice and effective time from the authoritative source.
2. Identify all correlated accounts, privileged roles, tokens, and active sessions.
3. Disable the primary directory and cloud identities within assigned authority.
4. Revoke active sessions and authentication methods where the procedure permits.
5. Remove privileged eligibility and emergency access.
6. Disable or deprovision connected applications.
7. Remove non-protected group memberships.
8. Preserve legal-hold or data-retention requirements; do not delete data without authorization.
9. Confirm account state on every target.
10. Record timestamps, actions, failures, escalation, and final validation.

## Escalate immediately when

- A privileged or connected account remains active
- The user signed in after the termination time
- A connector or directory is unavailable
- An account cannot be correlated to the identity
- Evidence suggests malicious activity

## Closure criteria

- All known accounts are disabled or formally excepted
- Sessions and privileged access are revoked
- Connected applications are verified
- Data retention is assigned to the correct owner
- Any failed deprovisioning has an active security escalation

