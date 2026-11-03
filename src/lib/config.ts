export const GITHUB_USERNAME = import.meta.env.VITE_GITHUB_USERNAME || 'VictorGodoy06'

const url = import.meta.env.VITE_SUPABASE_URL || ''
const key = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabaseConfigured =
  /^https:\/\/[a-z0-9-]+\.supabase\.co$/i.test(url) && key.length > 25 && !key.includes('COLE_')
export const supabaseUrl = url
export const supabasePublicKey = key
