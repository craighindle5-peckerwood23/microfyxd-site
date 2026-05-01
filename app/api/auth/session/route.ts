export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export async function GET() {
    try {
          const supabase = await supabaseServer();
          const { data: { session } } = await supabase.auth.getSession();
          return NextResponse.json({ session });
    } catch (err: unknown) {
          const message = err instanceof Error ? err.message : "Session fetch failed";
          return NextResponse.json({ error: message }, { status: 500 });
    }
}
