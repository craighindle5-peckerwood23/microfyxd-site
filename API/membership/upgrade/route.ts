import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabaseAdmin';

export async function POST(req: Request) {
  try {
    const { email, targetPlan } = await req.json();

    if (!email || !targetPlan) {
      return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    const { data: userData } = await supabaseAdmin
      .from('users')
      .select('membership_plan')
      .eq('email', email)
      .single();

    if (!userData) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    const current = userData.membership_plan;

    const allowed = ['free', 'pro', 'elite'];
    if (!allowed.includes(targetPlan)) {
      return NextResponse.json({ error: 'Invalid plan' }, { status: 400 });
    }

    if (allowed.indexOf(targetPlan) <= allowed.indexOf(current)) {
      return NextResponse.json({ error: 'Cannot downgrade' }, { status: 400 });
    }

    await supabaseAdmin
      .from('users')
      .update({ membership_plan: targetPlan })
      .eq('email', email);

    return NextResponse.json({ success: true });
  } catch (err) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
