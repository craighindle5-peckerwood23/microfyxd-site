// lib/ai/router.ts
import { openai } from "./openai";
import { groq } from "./groq";
import { claude } from "./claude";

export type AIProvider = "groq" | "openai" | "claude";

export type AIRole = "system" | "user" | "assistant";

export interface AIMessage {
  role: AIRole;
  content: string;
}

export interface AIRunOptions {
  messages: AIMessage[];
  maxTokens?: number;
}

function estimateLength(messages: AIMessage[]): number {
  return messages.reduce((sum, m) => sum + m.content.length, 0);
}

function detectTask(messages: AIMessage[]): "fast" | "deep" | "long" {
  const text = messages.map(m => m.content).join(" ").toLowerCase();
  const length = estimateLength(messages);

  if (length > 8000 || text.includes("analyze this document")) {
    return "long";
  }

  if (
    text.includes("classify") ||
    text.includes("route this") ||
    text.includes("tag this") ||
    text.includes("short answer")
  ) {
    return "fast";
  }

  return "deep";
}

export async function runAI(options: AIRunOptions): Promise<string> {
  const { messages, maxTokens = 800 } = options;
  const task = detectTask(messages);

  if (task === "fast") {
    const res = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages,
      max_tokens: maxTokens,
    });
    return res.choices[0]?.message?.content ?? "";
  }

  if (task === "long") {
    const res = await claude.messages.create({
      model: "claude-3-5-sonnet-20240620",
      max_tokens: maxTokens,
      messages: messages.map(m => ({
        role: m.role === "assistant" ? "assistant" : m.role,
        content: m.content,
      })),
    });
    const content = res.content[0];
    if (content && content.type === "text") {
      return content.text;
    }
    return "";
  }

  const res = await openai.chat.completions.create({
    model: "gpt-4o",
    messages,
    max_tokens: maxTokens,
  });
  return res.choices[0]?.message?.content ?? "";
}
