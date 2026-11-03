import { useState } from 'react'
import { ArrowLeft, KeyRound, LoaderCircle, LockKeyhole, LogIn } from 'lucide-react'
import { Link, Navigate, useLocation } from 'react-router-dom'
import { Button } from '../../components/Button'
import { supabase } from '../../lib/supabase'
import { useAuth } from './AuthProvider'
export default function LoginPage() {
  const { user, isAdmin, loading } = useAuth()
  const location = useLocation()
  const next = location.state?.from || '/dashboard'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [feedback, setFeedback] = useState('')
  const onSubmit = async (event) => {
    event.preventDefault()
    if (!supabase) return
    setBusy(true)
    setFeedback('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if (error) setFeedback('Falha no login. Confira as credenciais e tente novamente.')
    setBusy(false)
  }
  if (!loading && isAdmin) return <Navigate to={next} replace />
  return (
    <main id="main" className="container login-page">
      <div className="login-card">
        <Link to="/" className="back-link">
          <ArrowLeft size={16} /> Voltar ao portfólio
        </Link>
        <div className="login-icon">
          <LockKeyhole size={26} />
        </div>
        <p className="section-label">ACESSO RESTRITO</p>
        <h1>
          Área do dono<span className="text-accent">.</span>
        </h1>
        <p className="login-description">
          Acesso às mensagens recebidas e aos projetos em destaque.
        </p>
        {!supabase && (
          <div className="form-result form-error" role="alert">
            Supabase ainda não configurado. Veja docs/DEPLOY.md.
          </div>
        )}
        {user && !isAdmin && !loading && (
          <div className="form-result form-error" role="alert">
            Sua conta foi autenticada, mas não está na tabela site_admins. Acesso negado. Faça
            logout ou solicite autorização.
          </div>
        )}
        <form onSubmit={(event) => void onSubmit(event)}>
          <div className="field">
            <label htmlFor="login-email">E-mail</label>
            <input
              id="login-email"
              type="email"
              autoComplete="username"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seu@email.com"
            />
          </div>
          <div className="field">
            <label htmlFor="login-pass">Senha</label>
            <input
              id="login-pass"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Sua senha"
            />
          </div>
          {feedback && (
            <div className="form-result form-error" role="alert">
              {feedback}
            </div>
          )}
          <Button type="submit" className="full-width" disabled={busy || !supabase || loading}>
            {busy ? (
              <>
                <LoaderCircle size={18} className="spin" /> Entrando...
              </>
            ) : (
              <>
                <LogIn size={17} /> Entrar com segurança <KeyRound size={17} />
              </>
            )}
          </Button>
        </form>
        {user && !isAdmin && (
          <button
            className="text-button"
            type="button"
            onClick={() => void supabase?.auth.signOut()}
          >
            Sair desta conta
          </button>
        )}
        <span className="login-notice">
          Este login não possui cadastro público. O administrador é criado no Supabase.
        </span>
      </div>
    </main>
  )
}
