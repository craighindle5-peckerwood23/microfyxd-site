export async function runFormSubmission(step: {
  url: string;
  fields: Record<string, string>;
}) {
  const formData = new URLSearchParams();

  for (const [key, value] of Object.entries(step.fields)) {
    formData.append(key, value);
  }

  const res = await fetch(step.url, {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      // Add auth headers if needed
    },
    body: formData.toString(),
  });

  const ok = res.ok;
  const text = await res.text().catch(() => "");

  return {
    type: "form_submission",
    status: ok ? "submitted" : "failed",
    httpStatus: res.status,
    responseSnippet: text.slice(0, 500),
  };
}
