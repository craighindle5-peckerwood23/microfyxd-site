// app/api/ai/route.ts
import { NextRequest } from "next/server";
import { runAI, AIMessage } from "@/lib/ai/router";

export const runtime = "edge";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { messages, maxTokens } = body as {
      messages: AIMessage[];
      maxTokens?: number;
    };

    if (!messages || !Array.isArray(messages)) {
      return new Response(
        JSON.stringify({ error: "messages array is required" }),
        { status: 400 }
      );
    }

    const output = await runAI({ messages, maxTokens });

    return new Response(JSON.stringify({ output }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err: any) {
    console.error("AI route error:", err);
    return new Response(
      JSON.stringify({ error: "AI request failed", detail: err?.message }),
      { status: 500 }
    );
  }
}
