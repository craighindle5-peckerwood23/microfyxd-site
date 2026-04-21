// lib/ai/claude.ts
import Anthropic from "@anthropic-ai/sdk";

if (!process.env.ANTHROPIC_API_KEY) {
  throw new Error("Missing ANTHROPIC_API_KEY");
}

export const claude = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});
