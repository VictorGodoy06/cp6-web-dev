import { QueryClient } from '@tanstack/react-query'
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 30 * 60 * 1000,
      retry: (failures, error) => failures < 1 && !(error instanceof GithubError),
      refetchOnWindowFocus: false,
    },
  },
})
export class GithubError extends Error {
  status
  constructor(message, status) {
    super(message)
    this.status = status
    this.name = 'GithubError'
  }
}
