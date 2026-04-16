import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req: Request) {
  try {
    const { email, plan } = await req.json();

    if (!email || !plan) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const { error } = await supabaseAdmin
      .from('users')
      .update({ membership_plan: plan })
      .eq('email', email);

    if (error) {
      return NextResponse.json({ error: 'Update failed' }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
