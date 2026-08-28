# Architecture and Trust Boundaries

## Purpose

This design represents a fictional hybrid identity environment for Northstar Retail Group. It is intentionally small enough for a home lab while preserving the control boundaries that matter in enterprise IAM support.

## Logical components

| Component | Responsibility | Support evidence |
|---|---|---|
| HR source | Authoritative employment attributes | Employee ID, status, department, manager, dates |
| SailPoint-style IGA layer | Identity correlation, requests, approvals, provisioning, certifications | Transaction status and audit evidence |
| Active Directory | On-premises identity, groups, authentication, workstation access | Account state, lockouts, group membership |
| Entra Cloud Sync | Controlled synchronization from AD to Entra ID | Sync state and attribute investigation |
| Microsoft Entra ID | Cloud identity, MFA, application access, Conditional Access | Sign-in and audit evidence |
| Connected applications | Business resources and application entitlements | Target-account and entitlement state |
| ServiceNow-style queue | Incident and request record | SLA, work notes, evidence, approval, closure |

## Trust boundaries

```mermaid
flowchart TB
    subgraph Authoritative[Authoritative data boundary]
      HR[HR identity record]
    end
    subgraph Governance[Governance boundary]
      IGA[Identity governance]
      APPROVAL[Approval and policy]
    end
    subgraph OnPrem[On-premises directory boundary]
      AD[Active Directory]
      GPO[Group Policy]
    end
    subgraph Cloud[Cloud identity boundary]
      ENTRA[Microsoft Entra ID]
      CA[Conditional Access and MFA]
    end
    subgraph Apps[Application boundary]
      APP1[Finance application]
      APP2[Store operations application]
    end
    HR --> IGA
    APPROVAL --> IGA
    IGA --> AD
    AD --> ENTRA
    ENTRA --> APP1
    ENTRA --> APP2
    CA --> APP1
    CA --> APP2
```

## Security principles

1. HR employment status is authoritative for workforce lifecycle decisions.
2. Approval must be verified before granting business access.
3. Administrative access is separated from ordinary user access.
4. IAM support resolves only within assigned authority.
5. Sensitive operations require an audit trail.
6. Termination and suspected compromise receive immediate priority.
7. Access is granted through roles or managed entitlements where possible.
8. Exceptions require an owner, justification, expiration, and review.

## Evidence model

Useful evidence includes:

- Request and approval identifiers
- Identity and target account identifiers
- Group, role, and entitlement state
- Timestamp and correlation ID
- Authentication and policy result
- Provisioning transaction status
- Target-system confirmation
- Analyst actions and escalation notes

Passwords, tokens, secrets, full personal data, and production identifiers must never be placed in the portfolio.

