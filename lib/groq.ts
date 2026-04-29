import Groq from "groq-sdk";

type Message = { role: "system" | "user" | "assistant"; content: string };

let _groq: Groq | null = null;

function getGroq(): Groq {
  if (!_groq) {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) throw new Error("GROQ_API_KEY env var is not set");
    _groq = new Groq({ apiKey });
  }
  return _groq;
}

export async function callGroq(messages: Message[]): Promise<string> {
  const completion = await getGroq().chat.completions.create({
    model: "llama-3.1-70b-versatile",
    messages,
    temperature: 0.3,
  });
  return completion.choices[0]?.message?.content ?? "";
}

export async function groqChat(prompt: string): Promise<string> {
  return callGroq([{ role: "user", content: prompt }]);
}
