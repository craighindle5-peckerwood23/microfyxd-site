// lib/ai/router.ts

import { groq } from "./groq";

export async function runAI(model: string, prompt: string) {
  switch (model) {
    case "groq":
      return await groq(prompt);

    default:
      throw new Error(`Unknown model: ${model}`);
  }
}
}
