import { runPhoneCall } from "./phone";
import { runFormSubmission } from "./form";

export async function runPlan(plan: any) {
  const steps = plan?.steps || [];
  const results: any[] = [];

  for (const step of steps) {
    let result;

    if (step.type === "phone_call") {
      result = await runPhoneCall(step);
    } else if (step.type === "form_submission") {
      result = await runFormSubmission(step);
    } else {
      result = {
        stepId: step.id,
        type: step.type,
        status: "skipped",
        reason: "unknown_step_type",
      };
    }

    results.push(result);
  }

  return results;
}
