import { supabase } from '../../lib/supabase'

export interface FeaturedRow {
  repo_name: string
  position: number
}

export async function getFeatured(): Promise<FeaturedRow[]> {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('featured_repositories')
    .select('repo_name, position')
    .order('position', { ascending: true })
  if (error) throw new Error('Não foi possível carregar os destaques.')
  return (data || []) as FeaturedRow[]
}

export const featuredQuery = {
  queryKey: ['featured-repositories'],
  queryFn: getFeatured,
  staleTime: 2 * 60 * 1000,
}
