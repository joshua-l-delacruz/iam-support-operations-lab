const form = document.querySelector("#form");
const result = document.querySelector("#result");
const session = crypto.randomUUID();

form.addEventListener("submit", async event => {
  event.preventDefault();
  result.className = "result show";
  result.textContent = "Reviewing the sanitized case…";
  try {
    const response = await fetch("/api/assist", {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Session-Id": session },
      body: JSON.stringify({ question: document.querySelector("#question").value })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error);
    const questions = data.triage.questions.map((question, index) => `${index + 1}. ${question}`).join("\n");
    const sources = data.sources.map(source => `• ${source}`).join("\n");
    result.textContent = `Priority: ${data.triage.priority}\nCategory: ${data.triage.category}\n\nQualification questions\n${questions}\n\n${data.guidance || "Demo mode: deterministic triage is active. Add OPENAI_API_KEY locally to enable grounded AI guidance."}\n\nMatched sources\n${sources}`;
  } catch (error) {
    result.textContent = error.message;
  }
});

