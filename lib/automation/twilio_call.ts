import twilio from "twilio";

export async function runPhoneCall(step: {
  phone_number: string;
  script: string;
}) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_FROM_NUMBER;

  if (!accountSid || !authToken || !fromNumber) {
    return {
      type: "phone_call",
      status: "failed",
      reason: "Twilio credentials not configured",
    };
  }

  // For MVP: place call + play TTS or connect to human
  try {
    const client = twilio(accountSid, authToken);
    const call = await client.calls.create({
      to: step.phone_number,
      from: fromNumber,
      twiml: `
        <Response>
          <Say voice="alice">${step.script}</Say>
        </Response>
      `,
    });

    return {
      type: "phone_call",
      status: "initiated",
      callSid: call.sid,
    };
  } catch (error: any) {
    return {
      type: "phone_call",
      status: "failed",
      reason: error.message,
    };
  }
}
