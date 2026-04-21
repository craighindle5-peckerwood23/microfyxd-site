// app/api/ai/route.ts
import { NextResponse } from "next/server";
import { callGroq } from "@/lib/ai/groq";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const prompt: string = body?.prompt ?? "";

    if (!prompt) {
      return NextResponse.json(
        { error: "Missing 'prompt' in request body" },
        { status: 400 }
      );
    }

    const reply = await callGroq(prompt);

    return NextResponse.json({ reply });
  } catch (err) {
    console.error("AI route error:", err);
    return NextResponse.json(
      { error: "AI request failed" },
      { status: 500 }
    );
  }
}
