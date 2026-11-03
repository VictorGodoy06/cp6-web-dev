import { describe, expect, it } from 'vitest'
import { contactSchema } from './schema'

const valid = {
  name: 'Victor Godoy',
  email: 'victor@example.com',
  subject: 'Oportunidade de estágio',
  message: 'Olá, quero conversar sobre uma oportunidade de estágio em desenvolvimento.',
}

describe('validação do formulário de contato', () => {
  it('aceita os campos válidos', () => {
    expect(contactSchema.safeParse(valid).success).toBe(true)
  })
  it('recusa e-mail inválido com mensagem específica', () => {
    const result = contactSchema.safeParse({ ...valid, email: 'email-invalido' })
    expect(result.success).toBe(false)
    if (!result.success)
      expect(result.error.flatten().fieldErrors.email?.[0]).toContain('e-mail válido')
  })
  it('exige no mínimo 20 caracteres na mensagem', () => {
    const result = contactSchema.safeParse({ ...valid, message: 'Muito curta' })
    expect(result.success).toBe(false)
    if (!result.success)
      expect(result.error.flatten().fieldErrors.message?.[0]).toContain('20 caracteres')
  })
  it('recusa nome vazio, assunto curto e mensagem acima de 3000 caracteres', () => {
    const result = contactSchema.safeParse({
      ...valid,
      name: '',
      subject: 'ok',
      message: 'a'.repeat(3001),
    })
    expect(result.success).toBe(false)
    if (!result.success) {
      const errors = result.error.flatten().fieldErrors
      expect(errors.name).toBeDefined()
      expect(errors.subject).toBeDefined()
      expect(errors.message).toBeDefined()
    }
  })
  it('detecta preenchimento do campo anti-spam', () => {
    expect(contactSchema.safeParse({ ...valid, website: 'https://spam.com' }).success).toBe(false)
  })
})
