export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { createTask, updateTask } from "@/lib/db";
import { callGroq } from "@/lib/groq";
import { runPlan } from "@/lib/automation/runPlan";

async function generatePlan(text: string, scheduleContext?: string) {
  const scheduleSection = scheduleContext
    ? `\n\nSCHEDULE CONTEXT (check for conflicts before executing):\n${scheduleContext}`
    : "";

  const system = `
You are an operations AI agent.
Given a user request, output a JSON with a "steps" array.
Each step must have:
- id: unique string
- type: "phone_call" | "form_submission" | "email" | "schedule_check" | "ai_research"
- label: human-readable description
- For phone_call: phone_number (string), script (string)
- For form_submission: url (string), fields (object)
- For email: to (string), subject (string), body (string)
- For schedule_check: description of what to check/resolve
- needs_human_input: true if info is missing

IMPORTANT: If schedule context is provided, add a "schedule_check" step FIRST to detect conflicts.
If a conflict is found (e.g. pickup at 2pm but user is free at 2:15), note it and suggest resolution.

Return ONLY valid JSON. No markdown.
${scheduleSection}
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
    const { text, scheduleContext } = await req.json();
    if (!text) return NextResponse.json({ error: "Missing text" }, { status: 400 });

    const task = await createTask(text);
    const plan = await generatePlan(text, scheduleContext);
    await updateTask(task.id, { plan, schedule_context: scheduleContext || null });

    const results = await runPlan(plan);
    const finalTask = await updateTask(task.id, { status: "completed", results });

    return NextResponse.json({ ...finalTask, plan, results });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
