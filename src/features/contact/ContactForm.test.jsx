import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ContactForm } from './ContactForm'
import * as service from './sendContact'
vi.mock('./sendContact', () => ({ sendContact: vi.fn() }))
async function fill(user) {
  await user.type(screen.getByLabelText(/Seu nome/), 'Victor Godoy')
  await user.type(screen.getByLabelText(/Seu e-mail/), 'victor@example.com')
  await user.type(screen.getByLabelText(/Assunto/), 'Oportunidade de estágio')
  await user.type(
    screen.getByLabelText(/Sua mensagem/),
    'Gostaria de conversar sobre uma oportunidade de estágio em desenvolvimento web.',
  )
}
describe('formulário de contato', () => {
  it('impede envio com formulário incompleto', async () => {
    render(<ContactForm />)
    await userEvent.setup().click(screen.getByRole('button', { name: /Enviar mensagem/ }))
    expect(await screen.findByText(/nome com pelo menos 2 caracteres/)).toBeInTheDocument()
    expect(service.sendContact).not.toHaveBeenCalled()
  })
  it('desabilita o botão durante o envio e mostra sucesso', async () => {
    let finish
    vi.mocked(service.sendContact).mockImplementation(
      () =>
        new Promise((resolve) => {
          finish = resolve
        }),
    )
    const user = userEvent.setup()
    render(<ContactForm />)
    await fill(user)
    await user.click(screen.getByRole('button', { name: /Enviar mensagem/ }))
    expect(screen.getByRole('button', { name: /Enviando/ })).toBeDisabled()
    finish()
    expect(await screen.findByText(/Mensagem enviada com sucesso/)).toBeInTheDocument()
  })
  it('mostra erro de envio e permite tentar novamente', async () => {
    vi.mocked(service.sendContact).mockRejectedValue(new Error('Serviço indisponível'))
    const user = userEvent.setup()
    render(<ContactForm />)
    await fill(user)
    await user.click(screen.getByRole('button', { name: /Enviar mensagem/ }))
    expect(await screen.findByText('Serviço indisponível')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /Enviar mensagem/ })).toBeEnabled()
  })
})
