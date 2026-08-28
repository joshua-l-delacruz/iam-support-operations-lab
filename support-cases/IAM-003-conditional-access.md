# IAM-003 - Conditional Access Denial

## Ticket

| Field | Value |
|---|---|
| Priority | P2 |
| User | Ethan Cruz / NSR-1012 |
| Application | Finance Reporting |
| Error | Access blocked by organizational policy |
| Impact | Month-end reporting delayed |

## Investigation

1. Capture the exact error, time, application, device, and location.
2. Confirm account state and application assignment.
3. Locate the permitted sign-in event using the timestamp and correlation ID.
4. Review authentication result, MFA details, device state, and applied policies.
5. Confirm whether the policy behaved as designed.
6. Avoid excluding the user merely to restore access.

## Evidence

```text
Sign-in result: Failure
Authentication: MFA satisfied
Device state: Unmanaged
Applied policy: FIN-Require-Compliant-Device
Policy result: Failure - device compliance requirement not met
```

## Root cause

The user attempted to access a sensitive Finance application from an unmanaged personal device. Conditional Access correctly enforced the compliant-device requirement.

## Resolution

The user moved to a managed corporate device and completed the sign-in successfully. No policy bypass or exception was created.

## Preventive action

Improve the application access message so it clearly directs users to a compliant device and the device-enrollment support process.

