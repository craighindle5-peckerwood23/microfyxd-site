// app/api/ai/route.ts
import { NextRequest, NextResponse } from "next/server";
import { callGroq } from "../../../lib/groq";

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

    const content = await callGroq(
      [
        { role: "system", content: system },
        { role: "user", content: input },
      ],
      mode,
    );

    return NextResponse.json({ content });
  } catch (e: any) {
    console.error(e);
    return NextResponse.json({ error: "AI error" }, { status: 500 });
  }
}
