import { NextResponse } from "next/server";
import { sendSMS } from "@/lib/twilio";

export async function POST(req: Request) {
  try {
    const { to, body } = await req.json();

    if (!to || !body) {
      return NextResponse.json(
        { error: "Missing 'to' or 'body' fields" },
        { status: 400 }
      );
    }

    const sid = await sendSMS(to, body);

    return NextResponse.json({ success: true, sid });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "SMS failed" },
      { status: 500 }
    );
  }
}
