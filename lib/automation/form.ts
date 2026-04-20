type FormStep = {
  id: string;
  type: "form_submission";
  url: string;
  fields: Record<string, string>;
};

export async function runFormSubmission(step: FormStep) {
  if (!step.url) {
    return {
      stepId: step.id,
      type: "form_submission",
      status: "waiting_for_user",
      reason: "missing_url",
    };
  }

  try {
    const formData = new URLSearchParams();
    for (const [k, v] of Object.entries(step.fields || {})) {
      formData.append(k, v);
    }

    const res = await fetch(step.url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    const text = await res.text().catch(() => "");

    return {
      stepId: step.id,
      type: "form_submission",
      status: res.ok ? "submitted" : "failed",
      httpStatus: res.status,
      responseSnippet: text.slice(0, 500),
    };
  } catch (error: any) {
    return {
      stepId: step.id,
      type: "form_submission",
      status: "failed",
      reason: error.message,
    };
  }
}
