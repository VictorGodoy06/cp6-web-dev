import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from 'react-router-dom'
import { featuredQuery, type FeaturedRow } from '../projects/featured'
import { useProjects } from '../projects/useProjects'
import { supabase } from '../../lib/supabase'

type MessageRow = {
  id: string
  name: string
  email: string
  subject: string
  message: string
  created_at: string
  responded: boolean
  email_status: string
}

async function loadMessages(): Promise<MessageRow[]> {
  if (!supabase) throw new Error('Supabase não configurado')
  const { data, error } = await supabase
    .from('contact_messages')
    .select('id,name,email,subject,message,created_at,responded,email_status')
    .order('created_at', { ascending: false })
  if (error) throw new Error(`Falha ao carregar mensagens: ${error.message}`)
  return (data || []) as MessageRow[]
}

export function useDashboard() {
  const client = useQueryClient()
  const navigate = useNavigate()
  const [notice, setNotice] = useState('')
  const messages = useQuery({
    queryKey: ['admin-messages'],
    queryFn: loadMessages,
    staleTime: 30_000,
  })
  const repos = useProjects()
  const highlights = useQuery(featuredQuery)
  const updateResponded = useMutation({
    mutationFn: async (message: MessageRow) => {
      const { error } = await supabase!
        .from('contact_messages')
        .update({ responded: !message.responded })
        .eq('id', message.id)
      if (error) throw new Error(error.message)
    },
    onSuccess: () => {
      setNotice('Status da mensagem atualizado.')
      void client.invalidateQueries({ queryKey: ['admin-messages'] })
    },
    onError: (error) => setNotice('Não foi possível atualizar a mensagem: ' + error.message),
  })
  const updateFeatured = useMutation({
    mutationFn: async ({ repo, selected }: { repo: string; selected: boolean }) => {
      if (selected) {
        const { error } = await supabase!
          .from('featured_repositories')
          .delete()
          .eq('repo_name', repo)
        if (error) throw new Error(error.message)
      } else {
        const current = highlights.data || []
        if (current.length >= 3) throw new Error('Escolha no máximo 3 destaques. Remova um antes.')
        const occupied = new Set(current.map((f: FeaturedRow) => f.position))
        const nextPosition = [1, 2, 3].find((position) => !occupied.has(position)) || 1
        const { error } = await supabase!
          .from('featured_repositories')
          .insert({ repo_name: repo, position: nextPosition })
        if (error) throw new Error(error.message)
      }
    },
    onSuccess: () => {
      setNotice('Destaques atualizados!')
      void client.invalidateQueries({ queryKey: ['featured-repositories'] })
    },
    onError: (error) => setNotice(error.message),
  })
  const signOut = async () => {
    await supabase?.auth.signOut()
    void client.clear()
    navigate('/login', { replace: true })
  }
  const count = messages.data?.filter((message) => !message.responded).length || 0
  return { notice, messages, repos, highlights, updateResponded, updateFeatured, signOut, count }
}
