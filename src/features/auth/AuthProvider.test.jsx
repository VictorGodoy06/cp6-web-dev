import { act, render, screen, waitFor } from '@testing-library/react'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import { AuthProvider, useAuth } from './AuthProvider'
const mocks = vi.hoisted(() => ({
  getUser: vi.fn(),
  maybeSingle: vi.fn(),
  onAuthStateChange: vi.fn(),
}))
vi.mock('../../lib/supabase', () => ({
  supabase: {
    auth: { getUser: mocks.getUser, onAuthStateChange: mocks.onAuthStateChange },
    from: () => ({ select: () => ({ eq: () => ({ maybeSingle: mocks.maybeSingle }) }) }),
  },
}))
function State() {
  const { isAdmin, loading } = useAuth()
  return <p>{loading ? 'aguardando' : isAdmin ? 'permitido' : 'negado'}</p>
}
describe('autorização assíncrona', () => {
  beforeEach(() => {
    mocks.getUser.mockResolvedValue({ data: { user: { id: 'admin' } } })
    mocks.onAuthStateChange.mockReturnValue({
      data: { listener: undefined, subscription: { unsubscribe: vi.fn() } },
    })
  })
  it('não restaura acesso quando consulta antiga termina após logout', async () => {
    let resolve
    mocks.maybeSingle.mockReturnValue(
      new Promise((done) => {
        resolve = done
      }),
    )
    render(
      <AuthProvider>
        <State />
      </AuthProvider>,
    )
    await waitFor(() => expect(mocks.maybeSingle).toHaveBeenCalled())
    act(() => {
      mocks.onAuthStateChange.mock.calls[0][0]('SIGNED_OUT', null)
    })
    expect(screen.getByText('negado')).toBeInTheDocument()
    await act(async () => {
      resolve({ data: { user_id: 'admin' }, error: null })
    })
    expect(screen.getByText('negado')).toBeInTheDocument()
  })
  it('nega acesso quando consulta de permissão falha', async () => {
    mocks.maybeSingle.mockRejectedValue(new Error('offline'))
    render(
      <AuthProvider>
        <State />
      </AuthProvider>,
    )
    expect(await screen.findByText('negado')).toBeInTheDocument()
  })
})
