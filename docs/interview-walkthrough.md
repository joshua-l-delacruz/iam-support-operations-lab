# Five-Minute Interview Walkthrough

## Opening - 30 seconds

“I created this IAM Support Operations Lab to demonstrate how I approach identity incidents and access requests. It uses a fictional retail organization and sanitized data. The focus is not just account administration; it is verification, least privilege, troubleshooting, evidence-based escalation, and audit-ready documentation.”

## Architecture - 45 seconds

Explain the flow from the HR authoritative source to the governance layer, Active Directory, Entra ID, and connected applications. Point out that each boundary produces evidence that an IAM analyst can inspect.

## Lifecycle - 60 seconds

Show one Joiner, one Mover, and one Leaver. Emphasize:

- Day-one productivity for Joiners
- Removal of obsolete access for Movers
- Immediate containment and complete deprovisioning for Leavers

## Incident case - 90 seconds

Use IAM-002, where the access request is completed but the user still lacks access.

Explain the investigation:

1. Confirm approval and request scope.
2. Check identity correlation and target account.
3. Review the provisioning transaction.
4. Compare governance state with the target application.
5. Identify the connector timeout.
6. Retry through the approved process and verify the entitlement.
7. Document evidence and preventive monitoring.

## Governance - 45 seconds

Show the entitlement matrix and access review. Explain how an incompatible entitlement was revoked and how the decision was recorded.

## Closing - 30 seconds

“The lab reflects the way I want to work in IAM support: protect the control, restore access safely, document what happened, and provide the next team with useful evidence. I clearly separate my production support experience from the SailPoint and Entra concepts demonstrated in this lab.”

## Likely follow-up questions

- Which parts have you performed in production?
- What would you escalate rather than resolve yourself?
- What evidence is most useful for a provisioning failure?
- How would you handle an executive asking to bypass approval?
- How would you detect access that a Mover should no longer retain?

