export const dynamic = "force-dynamic";
import { NextRequest, NextResponse } from "next/server";
import { callGroq } from "@/lib/groq";

type ChatMessage = { role: "system" | "user" | "assistant"; content: string };

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Support both call shapes:
    // 1. Assistant page: { message, history }
    // 2. Legacy:         { mode, input }
    const userText: string = body.message ?? body.input ?? "";
    const history: ChatMessage[] = body.history ?? [];

    if (!userText) {
      return NextResponse.json({ error: "Missing message" }, { status: 400 });
    }

    const systemPrompt = `You are Microfyxd — an AI operations engine.
You help users delegate tasks: phone calls, form submissions, emails, appointments, schedule conflicts.
Be direct, practical, and confident. When a user describes a task, break it into clear executable steps.
If they describe a schedule conflict (e.g. "pickup at 2pm but off at 2:15"), acknowledge it and suggest a resolution.
Keep responses concise — 2 to 4 sentences max unless asked for detail.
Always end with an actionable suggestion or next step.`;

    const messages: ChatMessage[] = [
      { role: "system", content: systemPrompt },
      ...history.slice(-8),
      { role: "user", content: userText },
    ];

    const reply = await callGroq(messages);
    return NextResponse.json({ reply });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
