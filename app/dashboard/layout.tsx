import { redirect } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { data } = await supabase.auth.getSession()

  if (!data.session) redirect('/auth/login')

  return <>{children}</>
}
