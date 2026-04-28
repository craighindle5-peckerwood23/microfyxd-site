import twilio from "twilio";

const client = twilio(
  process.env.TWILIO_ACCOUNT_SID!,
  process.env.TWILIO_AUTH_TOKEN!
);

export async function sendSMS(to: string, body: string) {
  const from =
    process.env.TWILIO_MESSAGING_SERVICE_SID ||
    process.env.TWILIO_FROM_NUMBER;

  if (!from) {
    throw new Error("Missing Twilio FROM number — set TWILIO_MESSAGING_SERVICE_SID or TWILIO_FROM_NUMBER in env");
  }

  return client.messages.create({
    to,
    from,
    body,
  });
}
