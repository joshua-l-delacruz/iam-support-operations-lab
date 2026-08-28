# IAM-001 - Repeated Active Directory Account Lockout

## Ticket

| Field | Value |
|---|---|
| Priority | P3 |
| User | Maya Santos / NSR-1007 |
| Service | Active Directory authentication |
| Impact | User cannot access workstation and Microsoft 365 |
| Reported error | Account has been locked |

## Validation and evidence

- Requestor identity verified using the approved support process.
- Account is enabled but locked.
- No termination or suspension flag exists.
- Lockout recurred shortly after the first approved unlock.
- Authentication records show repeated failures from the user's enrolled mobile device.

## Investigation

1. Capture the lockout time and affected resources.
2. Confirm whether the issue affects other users.
3. Review permitted authentication evidence for the lockout source.
4. Ask about recent password changes and saved credentials.
5. Check phones, mapped drives, services, scheduled tasks, and persistent sessions.

## Root cause

The previous password remained stored in the mobile email profile, producing repeated authentication failures.

## Resolution

1. Remove the outdated account profile from the device.
2. Unlock the account through the approved procedure.
3. Reconfigure the profile using the current credentials and MFA.
4. Monitor for recurrence and confirm access with the user.

## Preventive action

Update the password-change knowledge article to include mobile applications and saved credentials. Do not treat repeated lockout as an unlock-only request.

