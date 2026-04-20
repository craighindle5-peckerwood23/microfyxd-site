import twilio from "twilio";

type PhoneStep = {
  id: string;
  type: "phone_call";
  phone_number: string;
  script: string;
};

export async function runPhoneCall(step: PhoneStep) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_FROM_NUMBER;

  if (!accountSid || !authToken || !fromNumber) {
    return {
      stepId: step.id,
      type: "phone_call",
      status: "failed",
      reason: "Twilio credentials not configured in environment",
    };
  }

  if (!step.phone_number) {
    return {
      stepId: step.id,
      type: "phone_call",
      status: "waiting_for_user",
      reason: "missing_phone_number",
    };
  }

  try {
    const client = twilio(accountSid, authToken);
    const call = await client.calls.create({
      to: step.phone_number,
      from: fromNumber,
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
