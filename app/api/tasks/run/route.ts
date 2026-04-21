import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { runPhoneCall } from "@/lib/automation/twilio_call";
import { runFormSubmission } from "@/lib/automation/form_submitter";

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

    if (!task.plan) {
      return NextResponse.json({ error: "No plan found for this task" }, { status: 400 });
    }

    const plan = JSON.parse(task.plan);
    const steps = plan.steps || [];

    await db.task.update({
      where: { id: taskId },
      data: { status: "processing" },
    });

    const results: any[] = [];

    for (const step of steps) {
      let result;

      if (step.type === "phone_call") {
        result = await runPhoneCall(step);
      } else if (step.type === "form_submission") {
        result = await runFormSubmission(step);
      } else {
        result = { status: "skipped", reason: "unknown_step_type" };
      }

      results.push({ ...result, stepId: step.id });
    }

    const finalTask = await db.task.update({
      where: { id: taskId },
      data: {
        status: "completed",
        results: JSON.stringify(results),
      },
    });

    return NextResponse.json({ 
      ok: true, 
      results: JSON.parse(finalTask.results || "[]"),
      status: finalTask.status
    });
  } catch (error: any) {
    console.error("Execution error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
