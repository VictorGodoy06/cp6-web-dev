import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { User } from '@supabase/supabase-js'
import { supabase } from '../../lib/supabase'

type AuthState = { user: User | null; isAdmin: boolean; loading: boolean }
const AuthContext = createContext<AuthState>({ user: null, isAdmin: false, loading: true })

export function AuthProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<AuthState>({ user: null, isAdmin: false, loading: true })
  useEffect(() => {
    let active = true
    let revision = 0
    const client = supabase
    if (!client)
      return () => {
        /* sem backend */
      }

    async function refresh(user: User | null, requestRevision: number) {
      if (!active || requestRevision !== revision) return
      if (!user) {
        setState({ user: null, isAdmin: false, loading: false })
        return
      }
      setState({ user, isAdmin: false, loading: true })
      try {
        const { data, error } = await client!
          .from('site_admins')
          .select('user_id')
          .eq('user_id', user.id)
          .maybeSingle()
        if (active && requestRevision === revision) {
          setState({ user, isAdmin: !error && !!data, loading: false })
        }
      } catch {
        if (active && requestRevision === revision) {
          setState({ user, isAdmin: false, loading: false })
        }
      }
    }
    const initialRevision = revision
    client.auth
      .getUser()
      .then(({ data }) => void refresh(data.user, initialRevision))
      .catch(() => {
        if (active && initialRevision === revision)
          setState({ user: null, isAdmin: false, loading: false })
      })
    const { data: listener } = client.auth.onAuthStateChange((_event, session) => {
      const requestRevision = ++revision
      // Revoga a autorização antes de qualquer consulta assíncrona.
      setState({ user: session?.user ?? null, isAdmin: false, loading: !!session?.user })
      window.setTimeout(() => void refresh(session?.user ?? null, requestRevision), 0)
    })
    return () => {
      active = false
      listener.subscription.unsubscribe()
    }
  }, [])
  if (!supabase && state.loading)
    return (
      <AuthContext.Provider value={{ user: null, isAdmin: false, loading: false }}>
        {children}
      </AuthContext.Provider>
    )
  return <AuthContext.Provider value={state}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
