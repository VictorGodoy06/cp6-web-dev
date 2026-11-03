import { GITHUB_USERNAME } from '../../lib/config'
import { GithubError } from '../../lib/queryClient'

export interface GithubRepo {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  language: string | null
  homepage: string | null
  topics: string[]
  updated_at: string
  stargazers_count: number
  forks_count: number
  fork: boolean
  archived: boolean
  default_branch: string
}

async function githubGet<T>(path: string): Promise<T> {
  const response = await fetch(`https://api.github.com${path}`, {
    headers: {
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    },
  })
  if (!response.ok) {
    if (response.status === 403 || response.status === 429) {
      throw new GithubError(
        'Limite temporário da API do GitHub. Tente novamente em alguns minutos.',
        response.status,
      )
    }
    if (response.status === 404) {
      throw new GithubError('Não encontramos este repositório no GitHub.', 404)
    }
    throw new GithubError(
      'Não foi possível carregar os dados do GitHub. Tente novamente.',
      response.status,
    )
  }
  return (await response.json()) as T
}

export async function getRepositories(): Promise<GithubRepo[]> {
  const repos = await githubGet<GithubRepo[]>(
    `/users/${encodeURIComponent(GITHUB_USERNAME)}/repos?per_page=100&sort=updated&direction=desc&type=owner`,
  )
  return repos.filter((repo) => !repo.fork && !repo.archived)
}

export const projectQuery = {
  queryKey: ['github', GITHUB_USERNAME, 'repos'],
  queryFn: getRepositories,
}
