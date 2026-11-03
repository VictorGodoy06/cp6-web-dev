import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { authRouteState, ProtectedRoute } from './ProtectedRoute'
import * as Auth from './AuthProvider'

vi.mock('./AuthProvider', () => ({ useAuth: vi.fn() }))
function harness() {
  return (
    <MemoryRouter initialEntries={['/dashboard']}>
      <Routes>
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <h1>Conteúdo privado</h1>
            </ProtectedRoute>
          }
        />
        <Route path="/login" element={<h1>Faça login</h1>} />
      </Routes>
    </MemoryRouter>
  )
}

describe('bloqueio do dashboard', () => {
  it('redireciona visitantes sem login', () => {
    vi.mocked(Auth.useAuth).mockReturnValue({ user: null, isAdmin: false, loading: false })
    render(harness())
    expect(screen.getByText('Faça login')).toBeInTheDocument()
    expect(screen.queryByText('Conteúdo privado')).not.toBeInTheDocument()
  })
  it('bloqueia usuários autenticados sem permissão admin', () => {
    vi.mocked(Auth.useAuth).mockReturnValue({
      user: { id: 'usuario' } as ReturnType<typeof Auth.useAuth>['user'],
      isAdmin: false,
      loading: false,
    })
    render(harness())
    expect(screen.getByText('Faça login')).toBeInTheDocument()
  })
  it('libera o acesso somente ao administrador', () => {
    vi.mocked(Auth.useAuth).mockReturnValue({
      user: { id: 'admin' } as ReturnType<typeof Auth.useAuth>['user'],
      isAdmin: true,
      loading: false,
    })
    render(harness())
    expect(screen.getByText('Conteúdo privado')).toBeInTheDocument()
  })
  it('não libera painel enquanto a autenticação está carregando', () => {
    expect(authRouteState({ loading: true, isAdmin: true })).toBe('loading')
  })
})
