import Groq from "groq-sdk";

type Message = { role: "system" | "user" | "assistant"; content: string };

export const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export async function groqChat(prompt: string): Promise<string> {
  const completion = await groq.chat.completions.create({
    model: "llama-3.1-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
  });
  return completion.choices[0]?.message?.content ?? "";
}

// Used by API routes — accepts messages array + optional mode (ignored, for compat)
export async function callGroq(messages: Message[], _mode?: string): Promise<string> {
  const completion = await groq.chat.completions.create({
    model: "llama-3.1-70b-versatile",
    messages,
    temperature: 0.3,
  });
  return completion.choices[0]?.message?.content ?? "";
}
