export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, cashTag, confirmationNote, amount, planName } = body;

    if (!name || !email || !cashTag) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from("payment_confirmations")
      .insert({
        name,
        email,
        cash_tag: cashTag,
        confirmation_note: confirmationNote || null,
        amount: amount || null,
        plan_name: planName || null,
        status: "pending",
      });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "Failed to save confirmation" }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("CashApp confirm error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
