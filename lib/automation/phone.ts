import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID || "AC_PLACEHOLDER",
  process.env.TWILIO_AUTH_TOKEN || "TOKEN_PLACEHOLDER"
);

type PhoneStep = {
  id: string;
  type: "phone_call";
  phone_number: string;
  script: string;
};

export async function runPhoneCall(step: PhoneStep) {
  if (!step.phone_number) {
    return {
      stepId: step.id,
      type: "phone_call",
      status: "waiting_for_user",
      reason: "missing_phone_number",
    };
  }

  try {
    const call = await client.calls.create({
      to: step.phone_number,
      from: process.env.TWILIO_FROM_NUMBER || "+1234567890",
      twiml: `<Response><Say voice="alice">${step.script}</Say></Response>`,
    });

    return {
      stepId: step.id,
      type: "phone_call",
      status: "initiated",
      callSid: call.sid,
    };
  } catch (error: any) {
    return {
      stepId: step.id,
      type: "phone_call",
      status: "failed",
      reason: error.message,
    };
  }
}
