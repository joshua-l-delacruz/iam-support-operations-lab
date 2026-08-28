# Joiner Runbook

## Scenario

Maya Santos joins Northstar Retail Group as a Store Operations Analyst on 2026-09-07.

## Authoritative attributes

| Attribute | Value |
|---|---|
| Employee ID | NSR-1007 |
| Department | Store Operations |
| Manager | Daniel Reyes |
| Worker type | Employee |
| Start date | 2026-09-07 |
| Location | Manila |

## Expected birthright access

- Active Directory account
- Microsoft 365 baseline group
- MFA registration requirement
- Store Operations portal
- Service desk self-service portal

## Procedure

1. Confirm the HR record is complete and within the onboarding window.
2. Confirm employee ID uniqueness and manager validity.
3. Create or correlate the identity.
4. Generate the directory account using the naming standard.
5. Apply baseline groups through the approved role model.
6. Submit application access that requires manager approval.
7. Confirm provisioning results on each target.
8. Provide first-sign-in and MFA enrollment guidance through an approved channel.
9. Record account and entitlement evidence.
10. Confirm day-one readiness with the manager.

## Validation

- Account is enabled at the approved time.
- Required attributes are synchronized.
- Baseline groups match the entitlement matrix.
- No Finance or privileged roles are assigned.
- MFA registration is required.
- Target accounts are present and accessible.

## Failure tests

- Missing manager
- Duplicate employee ID
- Future start date outside the activation window
- Application connector unavailable
- Department does not map to a valid role

