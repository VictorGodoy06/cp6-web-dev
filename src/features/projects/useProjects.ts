import { useQuery } from '@tanstack/react-query'
import { projectQuery } from './github'

export function useProjects() {
  return useQuery(projectQuery)
}
