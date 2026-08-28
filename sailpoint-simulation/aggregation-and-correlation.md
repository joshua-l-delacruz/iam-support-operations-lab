# SailPoint Simulation - Aggregation and Correlation

## Objective

Demonstrate how an IAM support analyst reasons about identities, accounts, entitlements, aggregation, and account correlation.

## Fictional source

**Application:** Store Operations Portal  
**Account key:** `employeeNumber`  
**Correlation attribute:** `employeeId`  
**Entitlements:** Store-Ops-Portal, Store-Reporting, Store-Admin

## Aggregation flow

1. Connector reads accounts and entitlements from the target.
2. Schema validation confirms required attributes.
3. Accounts are correlated to identities using the approved rule.
4. Unmatched accounts enter an orphan investigation queue.
5. Entitlements become visible for requests and certifications.
6. Identity refresh evaluates roles and policies.

## Support checks

- Did the aggregation task complete?
- Were any accounts or attributes rejected?
- Is the account key unique?
- Does the correlation attribute match the authoritative identity?
- Is the entitlement present in the catalog?
- Is the identity refresh current?
- Does the target state match the governance state?

## Orphan example

```text
Target account: store-temp-17
employeeNumber: blank
Owner: unknown
Interactive sign-in: enabled
Entitlement: Store-Reporting
```

The analyst should not guess an owner. The correct response is to restrict risk as authorized, assign an investigation owner, examine approved evidence, and correlate, disable, or remove the account through the formal process.

## Scope statement

This is an operational simulation. It demonstrates aggregation and correlation concepts, not production SailPoint connector configuration.

