# IAM-004 - Terminated Worker Retained a Connected Account

## Ticket

| Field | Value |
|---|---|
| Priority | P1 Security |
| Identity | Noah Lim / NSR-0991 |
| Event | Immediate termination |
| Exposure | Vendor Portal account remained enabled |

## Detection

The leaver workflow disabled the directory identity, but the connected Vendor Portal returned a connector error. Reconciliation showed the account still enabled.

## Immediate actions

1. Validate termination and account ownership.
2. Notify IAM security and the application owner.
3. Disable the target account through the authorized emergency procedure.
4. Revoke active sessions where supported.
5. Preserve evidence and timestamps.
6. Check for sign-ins after the termination time.

## Evidence

```text
Termination effective: 2026-08-28 16:00 UTC
Directory disable: Successful, 16:01 UTC
Vendor Portal deprovisioning: Failed, connector unavailable
Target account disabled manually: 16:09 UTC
Post-termination sign-ins: None observed
```

## Root cause

The Vendor Portal connector was unavailable during the leaver workflow, and the original process lacked immediate failed-task alerting.

## Corrective action

- Alert on every failed leaver task.
- Require target confirmation for critical applications.
- Define an application-owner emergency disable path.
- Review recent leaver transactions for similar failures.

