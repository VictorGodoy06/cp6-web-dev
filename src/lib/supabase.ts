import { createClient } from '@supabase/supabase-js'
import { supabaseConfigured, supabasePublicKey, supabaseUrl } from './config'

// A ausência de .env não derruba o portfólio público; funções privadas sinalizam configuração.
export const supabase = supabaseConfigured
  ? createClient(supabaseUrl, supabasePublicKey, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    })
  : null
