import { supabase } from '../../lib/supabase'
export async function sendContact(input) {
  if (!supabase)
    throw new Error('Formulário indisponível: configure o Supabase para ativar o envio.')
  const { data, error } = await supabase.functions.invoke('send-contact', { body: input })
  // No SDK, respostas 4xx/5xx são representadas por FunctionsHttpError.
  if (error) {
    const context = 'context' in error ? error.context : null
    let message = 'Não foi possível enviar a mensagem. Tente novamente.'
    if (context && 'json' in context && typeof context.json === 'function') {
      try {
        const body = await context.json()
        if (body.error) message = body.error
      } catch {
        /* corpo de erro não é necessariamente JSON */
      }
    }
    throw new Error(message)
  }
  if (!data?.success) throw new Error('O servidor não confirmou o envio. Tente novamente.')
}
