import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { callGroq } from "@/lib/groq";

const SYSTEM_PROMPT = `
You are an operations agent. 
Given a user task, output a JSON plan with steps.
Each step must have:
- id: string
- type: "phone_call" or "form_submission" or "ai_research"
- phone_number: string (for phone_call)
- script: string (for phone_call)
- url: string (for form_submission)
- fields: object (for form_submission)
Return ONLY valid JSON.
`;

export async function POST(req: Request) {
  try {
    const { taskId } = await req.json();

    if (!taskId) {
      return NextResponse.json({ error: "Missing taskId" }, { status: 400 });
    }

    const task = await db.task.findUnique({ where: { id: taskId } });
    if (!task) {
      return NextResponse.json({ error: "Task not found" }, { status: 404 });
    }

    const aiResponse = await callGroq([
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: task.text }
    ], "tasks");

    // Extract JSON from AI response
    const jsonMatch = aiResponse.match(/\{[\s\S]*\}/);
    const jsonStr = jsonMatch ? jsonMatch[0] : aiResponse;
    const plan = JSON.parse(jsonStr);

    await db.task.update({
      where: { id: taskId },
      data: { 
        plan: JSON.stringify(plan),
        status: "pending" 
      },
    });

    return NextResponse.json({ ok: true, plan });
  } catch (error: any) {
    console.error("Interpretation error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
