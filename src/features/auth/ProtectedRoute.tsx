import type { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthProvider'
import { LoadingPanel } from '../../components/Feedback'

export function authRouteState({
  loading,
  isAdmin,
}: {
  loading: boolean
  isAdmin: boolean
}): 'loading' | 'allow' | 'redirect' {
  if (loading) return 'loading'
  return isAdmin ? 'allow' : 'redirect'
}

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const auth = useAuth()
  const location = useLocation()
  const state = authRouteState(auth)
  if (state === 'loading')
    return (
      <main className="container page-space">
        <LoadingPanel title="Verificando acesso..." />
      </main>
    )
  if (state === 'redirect')
    return <Navigate to="/login" replace state={{ from: location.pathname }} />
  return <>{children}</>
}
