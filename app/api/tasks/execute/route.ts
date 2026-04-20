import { NextResponse } from "next/server";
import { db } from "@/lib/db";
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
    const raw = await callGroq([{ role: "system", content: system }, { role: "user", content: text }], "tasks");
    
    // Attempt to extract JSON if LLM includes markdown
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    const jsonStr = jsonMatch ? jsonMatch[0] : raw;
    
    return JSON.parse(jsonStr);
  } catch (error) {
    console.error("Planning error:", error);
    return { steps: [] };
  }
}

export async function POST(req: Request) {
  try {
    const { text } = await req.json();

    if (!text) {
      return NextResponse.json({ error: "Missing text" }, { status: 400 });
    }

    // 1. Create task
    const task = await db.task.create({
      data: { 
        text, 
        status: "pending" 
      },
    });

    // 2. Generate plan
    const plan = await generatePlan(text);
    await db.task.update({ 
      where: { id: task.id }, 
      data: { plan: JSON.stringify(plan) } 
    });

    // 3. Run plan
    const results = await runPlan(plan);

    // 4. Update final status
    const finalTask = await db.task.update({
      where: { id: task.id },
      data: {
        status: "completed",
        results: JSON.stringify(results),
      },
    });

    // Parse JSON strings back for the response
    return NextResponse.json({
      ...finalTask,
      plan: JSON.parse(finalTask.plan || "{}"),
      results: JSON.parse(finalTask.results || "[]"),
    });
  } catch (error: any) {
    console.error("Execution error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
