import { NextResponse } from "next/server";
import { createTask, updateTask } from "@/lib/db";
import { callGroq } from "@/lib/groq";
import { runPlan } from "@/lib/automation/runPlan";

async function generatePlan(text: string) {
  const system = `
You are an operations agent.
Given a user request, output a JSON with a "steps" array.
Each step must have:
- id
- type: "phone_call" or "form_submission"
- required fields for that type (phone_number, script for phone_call; url, fields for form_submission).
If phone number or URL is missing, still create the step and mark "needs_human_input": true.
Return ONLY valid JSON.
`;
  try {
    const raw = await callGroq([
      { role: "system", content: system },
      { role: "user", content: text },
    ]);
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    return JSON.parse(jsonMatch ? jsonMatch[0] : raw);
  } catch {
    return { steps: [] };
  }
}

export async function POST(req: Request) {
  try {
    const { text } = await req.json();
    if (!text) return NextResponse.json({ error: "Missing text" }, { status: 400 });

    const task = await createTask(text);
    const plan = await generatePlan(text);
    await updateTask(task.id, { plan });

    const results = await runPlan(plan);
    const finalTask = await updateTask(task.id, { status: "completed", results });

    return NextResponse.json({ ...finalTask, plan, results });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
