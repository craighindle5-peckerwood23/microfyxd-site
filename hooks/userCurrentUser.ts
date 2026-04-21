'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

export function useCurrentUser() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    async function loadUser() {
      const { data } = await supabase.auth.getSession()
      setUser(data?.session?.user ?? null)
    }

    loadUser()

    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      loadUser()
    })

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  return user
}
