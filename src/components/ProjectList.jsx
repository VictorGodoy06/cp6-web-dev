import { useQuery } from '@tanstack/react-query'
import { EmptyPanel, ErrorPanel, ProjectSkeletons } from './Feedback'
import { ProjectCard } from './ProjectCard'
import { useProjects } from '../features/projects/useProjects'
import { featuredQuery } from '../features/projects/featured'
export function ProjectList({ onlyFeatured = false, limit }) {
  const { data: repos, isPending, error, refetch } = useProjects()
  const {
    data: featured = [],
    isPending: featuredPending,
    error: featuredError,
    refetch: refetchFeatured,
  } = useQuery(featuredQuery)
  if (isPending || featuredPending) return <ProjectSkeletons count={onlyFeatured ? 3 : 6} />
  if (error || featuredError)
    return (
      <ErrorPanel
        message={(error || featuredError)?.message || 'Falha ao carregar dados.'}
        onRetry={() => {
          void refetch()
          void refetchFeatured()
        }}
      />
    )
  if (!repos?.length) return <EmptyPanel />
  const featuredNames = new Set(featured.map((row) => row.repo_name))
  const byFeatured = [...repos].sort((a, b) => {
    const aIndex = featured.findIndex((f) => f.repo_name === a.name)
    const bIndex = featured.findIndex((f) => f.repo_name === b.name)
    if (aIndex === -1 && bIndex === -1) return 0
    if (aIndex === -1) return 1
    if (bIndex === -1) return -1
    return aIndex - bIndex
  })
  // Home exibe os escolhidos no dashboard; sem escolhas, os mais recentes.
  const selected =
    onlyFeatured && featured.length
      ? byFeatured.filter((repo) => featuredNames.has(repo.name))
      : byFeatured
  const visible = typeof limit === 'number' ? selected.slice(0, limit) : selected
  if (!visible.length)
    return <EmptyPanel message="Os destaques configurados não estão mais públicos no GitHub." />
  return (
    <div className="project-grid">
      {visible.map((repo, index) => (
        <ProjectCard
          key={repo.id}
          repo={repo}
          index={index}
          featured={featuredNames.has(repo.name)}
        />
      ))}
    </div>
  )
}
