export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function GET() {
  try {
    const supabase = supabaseServer();
    const {
      data: { session },
    } = await supabase.auth.getSession();

    return NextResponse.json({ session });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message || "Session fetch failed" },
      { status: 500 }
    );
  }
}
