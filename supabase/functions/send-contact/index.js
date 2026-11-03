// Supabase Edge Function (Deno). A chave RESEND e a service_role nunca vão para o navegador.
import { createClient } from 'npm:@supabase/supabase-js@2'
const jsonHeaders = { 'Content-Type': 'application/json; charset=utf-8' }
function cors(origin) {
  const allowed = (Deno.env.get('CONTACT_ALLOWED_ORIGINS') || 'http://localhost:5173')
    .split(',')
    .map((item) => item.trim())
  return origin && allowed.includes(origin)
    ? {
        'Access-Control-Allow-Origin': origin,
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
        Vary: 'Origin',
      }
    : { Vary: 'Origin' }
}
function respond(status, body, extra) {
  return new Response(JSON.stringify(body), { status, headers: { ...jsonHeaders, ...extra } })
}
function validEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
}
function getString(body, key) {
  return typeof body[key] === 'string' ? body[key].trim() : ''
}
function getServerSecretKey() {
  const legacy = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')
  if (legacy) return legacy
  try {
    const keys = JSON.parse(Deno.env.get('SUPABASE_SECRET_KEYS') || '{}')
    return keys.default
  } catch {
    return undefined
  }
}
async function hash(text) {
  const bytes = new TextEncoder().encode(text)
  return Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256', bytes)))
    .map((item) => item.toString(16).padStart(2, '0'))
    .join('')
}
Deno.serve(async (request) => {
  const origin = request.headers.get('origin')
  const headers = cors(origin)
  if (request.method === 'OPTIONS') {
    if (origin && !('Access-Control-Allow-Origin' in headers))
      return respond(403, { error: 'Origem não autorizada.' }, headers)
    return new Response(null, { status: 204, headers })
  }
  if (request.method !== 'POST') return respond(405, { error: 'Método não permitido.' }, headers)
  if (origin && !('Access-Control-Allow-Origin' in headers))
    return respond(403, { error: 'Origem não autorizada.' }, headers)
  const url = Deno.env.get('SUPABASE_URL')
  const key = getServerSecretKey()
  const resendKey = Deno.env.get('RESEND_API_KEY')
  const to = Deno.env.get('CONTACT_EMAIL')
  const from = Deno.env.get('CONTACT_FROM')
  const salt = Deno.env.get('CONTACT_RATE_SALT')
  if (!url || !key || !resendKey || !to || !from || !salt) {
    console.error('Faltam secrets no servidor (sem exibir valores).')
    return respond(503, { error: 'Serviço de contato temporariamente indisponível.' }, headers)
  }
  try {
    const raw = await request.text()
    if (raw.length > 12_000)
      return respond(413, { error: 'Mensagem excede o tamanho permitido.' }, headers)
    let body
    try {
      body = JSON.parse(raw)
    } catch {
      return respond(400, { error: 'Corpo JSON inválido.' }, headers)
    }
    if (!body || typeof body !== 'object' || Array.isArray(body))
      return respond(400, { error: 'Corpo inválido.' }, headers)
    const name = getString(body, 'name'),
      email = getString(body, 'email')
    const subject = getString(body, 'subject'),
      message = getString(body, 'message')
    if (getString(body, 'website')) return respond(200, { success: true }, headers) // honeypot
    if (
      name.length < 2 ||
      name.length > 80 ||
      !validEmail(email) ||
      email.length > 160 ||
      subject.length < 3 ||
      subject.length > 120 ||
      message.length < 20 ||
      message.length > 3000
    ) {
      return respond(
        422,
        { error: 'Revise os dados: nome, e-mail, assunto e mensagem precisam ser válidos.' },
        headers,
      )
    }
    const ip =
      request.headers.get('cf-connecting-ip') ||
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
      'unknown'
    const ipHash = await hash(`${salt}|${ip}`)
    const db = createClient(url, key, { auth: { persistSession: false, autoRefreshToken: false } })
    const rate = await db.rpc('check_contact_rate', { p_hash: ipHash })
    if (rate.error) {
      console.error('Rate limit SQL falhou:', rate.error.code)
      return respond(503, { error: 'Serviço indisponível. Tente novamente mais tarde.' }, headers)
    }
    if (!rate.data)
      return respond(
        429,
        { error: 'Muitas mensagens enviadas. Tente novamente em uma hora.' },
        headers,
      )
    const { data: saved, error: insertError } = await db
      .from('contact_messages')
      .insert({ name, email, subject, message })
      .select('id')
      .single()
    if (insertError || !saved) {
      console.error('Falha de persistência:', insertError?.code)
      return respond(500, { error: 'Não foi possível registrar a mensagem.' }, headers)
    }
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: `Portfólio: ${subject}`,
        text: `Novo contato do portfólio\n\nNome: ${name}\nE-mail: ${email}\nAssunto: ${subject}\n\n${message}`,
      }),
    })
    const newStatus = emailResponse.ok ? 'sent' : 'failed'
    const { error: statusError } = await db
      .from('contact_messages')
      .update({ email_status: newStatus })
      .eq('id', saved.id)
    if (statusError) console.error('Falha ao atualizar status:', statusError.code)
    if (!emailResponse.ok) {
      console.error('Resend falhou: status', emailResponse.status)
      return respond(
        502,
        {
          error:
            'Sua mensagem foi salva, mas a notificação por e-mail falhou. Não reenvie: entraremos em contato.',
        },
        headers,
      )
    }
    return respond(200, { success: true }, headers)
  } catch (error) {
    console.error(
      'Erro inesperado em send-contact:',
      error instanceof Error ? error.name : 'unknown',
    )
    return respond(500, { error: 'Falha inesperada. Tente novamente mais tarde.' }, headers)
  }
})
