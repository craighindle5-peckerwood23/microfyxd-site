import { NextResponse } from "next/server";
import { supabaseServer } from "@/lib/supabase-server";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
    try {
          const { email, password } = await req.json();
          if (!email || !password) {
                  return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
          }

      const supabase = await supabaseServer();
          const { data, error } = await supabase.auth.signInWithPassword({ email, password });

      if (error) {
              return NextResponse.json({ error: error.message }, { status: 401 });
      }

      return NextResponse.json({ user: data.user, session: data.session });
    } catch (err: unknown) {
          const msg = err instanceof Error ? err.message : String(err);
          return NextResponse.json({ error: msg }, { status: 500 });
    }
}
