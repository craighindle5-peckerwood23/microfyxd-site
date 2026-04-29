export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { groqChat } from "@/lib/groq";

export async function POST(req: Request) {
  const { prompt } = await req.json();
  if (!prompt) return NextResponse.json({ error: "Missing prompt" }, { status: 400 });

  const answer = await groqChat(prompt);
  return NextResponse.json({ answer });
}
