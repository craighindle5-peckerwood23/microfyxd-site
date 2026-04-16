// lib/groq.ts

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";

export async function callGroq(messages: { role: string; content: string }[], mode: "chat" | "tasks") {
  const model =
    mode === "tasks"
      ? "llama-3.1-70b-versatile"
      : "llama-3.1-8b-instant";

  const res = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model,
      messages,
      temperature: mode === "tasks" ? 0.3 : 0.7,
    }),
  });

  if (!res.ok) {
    throw new Error(`Groq error: ${res.status}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content ?? "";
}
