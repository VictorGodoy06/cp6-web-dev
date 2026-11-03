import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowRight, CheckCircle2, LoaderCircle, Send, TriangleAlert } from 'lucide-react'
import { Button } from '../../components/Button'
import { contactSchema, type ContactInput } from './schema'
import { sendContact } from './sendContact'

export function ContactForm() {
  const [result, setResult] = useState<{ kind: 'success' | 'error'; text: string } | null>(null)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: { name: '', email: '', subject: '', message: '', website: '' },
    mode: 'onBlur',
  })
  const onSubmit = async (values: ContactInput) => {
    if (isSubmitting) return
    setResult(null)
    try {
      await sendContact(values)
      reset()
      setResult({ kind: 'success', text: 'Mensagem enviada com sucesso! Obrigado pelo contato.' })
    } catch (error) {
      setResult({ kind: 'error', text: error instanceof Error ? error.message : 'Falha no envio.' })
    }
  }
  return (
    <form
      className="contact-form"
      onSubmit={(event) => void handleSubmit(onSubmit)(event)}
      noValidate
    >
      <div className="field-row">
        <div className="field">
          <label htmlFor="name">
            Seu nome <span>*</span>
          </label>
          <input
            id="name"
            autoComplete="name"
            placeholder="Como posso te chamar?"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            {...register('name')}
          />
          {errors.name && (
            <span className="field-error" id="name-error">
              {errors.name.message}
            </span>
          )}
        </div>
        <div className="field">
          <label htmlFor="email">
            Seu e-mail <span>*</span>
          </label>
          <input
            id="email"
            autoComplete="email"
            type="email"
            placeholder="voce@exemplo.com"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            {...register('email')}
          />
          {errors.email && (
            <span className="field-error" id="email-error">
              {errors.email.message}
            </span>
          )}
        </div>
      </div>
      <div className="field">
        <label htmlFor="subject">
          Assunto <span>*</span>
        </label>
        <input
          id="subject"
          placeholder="Sobre o que vamos conversar?"
          aria-invalid={!!errors.subject}
          aria-describedby={errors.subject ? 'subject-error' : undefined}
          {...register('subject')}
        />
        {errors.subject && (
          <span className="field-error" id="subject-error">
            {errors.subject.message}
          </span>
        )}
      </div>
      <div className="field">
        <label htmlFor="message">
          Sua mensagem <span>*</span>
        </label>
        <textarea
          id="message"
          rows={6}
          placeholder="Me conte um pouco sobre sua ideia, oportunidade ou projeto..."
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? 'message-error' : undefined}
          {...register('message')}
        />
        {errors.message && (
          <span className="field-error" id="message-error">
            {errors.message.message}
          </span>
        )}
      </div>
      <div className="honeypot" aria-hidden="true">
        <label htmlFor="website">Não preencha este campo</label>
        <input id="website" tabIndex={-1} autoComplete="off" {...register('website')} />
      </div>
      {result && (
        <div role="status" className={`form-result form-${result.kind}`}>
          {result.kind === 'success' ? <CheckCircle2 size={19} /> : <TriangleAlert size={19} />}{' '}
          {result.text}
        </div>
      )}
      <div className="form-bottom">
        <span>Seus dados serão usados apenas para responder seu contato.</span>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <LoaderCircle className="spin" size={18} /> Enviando...
            </>
          ) : (
            <>
              <Send size={17} /> Enviar mensagem <ArrowRight size={17} />
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
