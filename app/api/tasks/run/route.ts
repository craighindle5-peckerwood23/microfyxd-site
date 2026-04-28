import { NextResponse } from "next/server";
import { getTask, updateTask } from "@/lib/db";
import { runPhoneCall } from "@/lib/automation/phone";
import { runFormSubmission } from "@/lib/automation/form";

export async function POST(req: Request) {
  try {
    const { taskId } = await req.json();
    if (!taskId) return NextResponse.json({ error: "Missing taskId" }, { status: 400 });

    const task = await getTask(taskId);
    if (!task) return NextResponse.json({ error: "Task not found" }, { status: 404 });

    if (!task.plan) return NextResponse.json({ error: "Task has no plan" }, { status: 400 });

    const plan = typeof task.plan === "string" ? JSON.parse(task.plan) : task.plan;
    const results: unknown[] = [];

    for (const step of plan.steps ?? []) {
      try {
        if (step.type === "phone_call") {
          const result = await runPhoneCall(step);
          results.push({ stepId: step.id, status: "ok", result });
        } else if (step.type === "form_submission") {
          const result = await runFormSubmission(step);
          results.push({ stepId: step.id, status: "ok", result });
        } else {
          results.push({ stepId: step.id, status: "skipped", reason: "unknown type" });
        }
      } catch (err: unknown) {
        results.push({ stepId: step.id, status: "error", error: err instanceof Error ? err.message : String(err) });
      }
    }

    const updated = await updateTask(taskId, { status: "completed", results });
    return NextResponse.json({ ok: true, task: updated, results });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : String(error);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
