import twilio, { Twilio } from "twilio";

let _client: Twilio | null = null;

function getTwilio(): Twilio {
  if (!_client) {
    const sid = process.env.TWILIO_ACCOUNT_SID;
    const token = process.env.TWILIO_AUTH_TOKEN;
    if (!sid || !token) throw new Error("Twilio env vars not set");
    _client = twilio(sid, token);
  }
  return _client;
}

export async function sendSMS(to: string, body: string) {
  const from =
    process.env.TWILIO_MESSAGING_SERVICE_SID ||
    process.env.TWILIO_FROM_NUMBER;

  if (!from) {
    throw new Error(
      "Missing Twilio FROM number — set TWILIO_MESSAGING_SERVICE_SID or TWILIO_FROM_NUMBER in env"
    );
  }

  return getTwilio().messages.create({ to, from, body });
}
