export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import { callGroq } from "@/lib/groq";

export async function POST(req: NextRequest) {
  try {
    const { mode, input } = await req.json();

    if (!input || !mode) {
      return NextResponse.json({ error: "Missing mode or input" }, { status: 400 });
    }

    const system =
      mode === "tasks"
        ? "You are MicroFix, an operator-grade micro-task generator. Given a messy request, output a tight, actionable list of steps and micro-tasks."
        : "You are an operator-grade AI assistant. Be concise, precise, and execution-focused.";

    const content = await callGroq([
      { role: "system", content: system },
      { role: "user", content: input },
    ]);

    return NextResponse.json({ content });
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
