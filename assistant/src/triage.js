const RULES = [
  { category: "deprovisioning", priority: "P1", terms: ["terminated", "termination", "leaver", "still active", "retained access", "failed deprovision"] },
  { category: "suspected-compromise", priority: "P1", terms: ["compromised", "impossible travel", "stolen", "phishing", "unauthorized login"] },
  { category: "conditional-access", priority: "P2", terms: ["conditional access", "mfa", "blocked device", "sign-in denied", "entra"] },
  { category: "missing-entitlement", priority: "P2", terms: ["missing access", "missing entitlement", "provisioning", "access request", "sailpoint"] },
  { category: "mover-access", priority: "P2", terms: ["mover", "transferred", "old access", "segregation of duties", "sod"] },
  { category: "account-lockout", priority: "P3", terms: ["locked", "lockout", "bad password", "password reset"] }
];

const QUESTIONS = {
  "deprovisioning": ["What is the authoritative termination time?", "Which accounts or entitlements remain active?", "Has emergency containment been initiated under an approved incident process?"],
  "suspected-compromise": ["What sign-in event triggered the concern?", "Has the identity been verified through an approved channel?", "Which security team or incident record owns containment?"],
  "conditional-access": ["What is the exact error and sign-in timestamp?", "Which application and device were used?", "What Conditional Access result appears in the sign-in evidence?"],
  "missing-entitlement": ["What request and approval identifiers exist?", "Which entitlement and target application are affected?", "What do the provisioning transaction and target-system evidence show?"],
  "mover-access": ["What are the old and new departments or roles?", "Which access should be removed or retained?", "Does the entitlement matrix identify a conflict?"],
  "account-lockout": ["When did the lockouts begin?", "Which device or service last used the account?", "Is there evidence of stale cached credentials?"],
  "general": ["What is the exact error, timestamp, and affected resource?", "What is the business impact?", "Which approval or authorization evidence is available?"]
};

export function triageIssue(text) {
  const normalized = text.toLowerCase();
  const match = RULES.find(rule => rule.terms.some(term => normalized.includes(term)));
  const category = match?.category ?? "general";
  return {
    category,
    priority: match?.priority ?? "P3",
    questions: QUESTIONS[category],
    requiresHumanApproval: true,
    advisoryOnly: true
  };
}

export function validateQuestion(value) {
  if (typeof value !== "string") throw new TypeError("Question must be text.");
  const question = value.trim();
  if (question.length < 8) throw new RangeError("Please provide more detail.");
  if (question.length > 4000) throw new RangeError("Question exceeds the 4,000 character limit.");
  return question;
}

