// lib/ai/groq.ts

if (!process.env.GROQ_API_KEY) {
  throw new Error("Missing GROQ_API_KEY");
}

const GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama3-70b-8192";

export async function callGroq(prompt: string): Promise<string> {
  const res = await fetch(GROQ_API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.3,
    }),
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("Groq error:", text);
    throw new Error("Groq API request failed");
  }

  const data = await res.json();
  const content =
    data.choices?.[0]?.message?.content ?? "No response from Groq model.";
  return content;
}
