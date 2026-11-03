import { useQuery } from '@tanstack/react-query'
import { ArrowLeft, ArrowUpRight, Calendar, Code2, Github, GitFork, Star } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { EmptyPanel, ErrorPanel, LoadingPanel } from '../components/Feedback'
import { projectQuery } from '../features/projects/github'
export default function ProjectDetailPage() {
  const { name = '' } = useParams()
  const { data: repos, isPending, error, refetch } = useQuery(projectQuery)
  if (isPending)
    return (
      <main id="main" className="container page-space">
        <LoadingPanel title="Carregando detalhes do GitHub..." />
      </main>
    )
  if (error)
    return (
      <main id="main" className="container page-space">
        <ErrorPanel message={error.message} onRetry={() => void refetch()} />
      </main>
    )
  const repo = repos?.find((candidate) => candidate.name === name)
  if (!repo)
    return (
      <main id="main" className="container page-space">
        <EmptyPanel message="Este repositório não existe ou não está disponível publicamente." />
        <Link className="text-link" to="/projetos">
          ← Voltar aos projetos
        </Link>
      </main>
    )
  return (
    <main id="main" className="container page-space detail-page">
      <Link to="/projetos" className="back-link">
        <ArrowLeft size={17} /> Todos os projetos
      </Link>
      <div className="detail-hero">
        <p className="section-label">PROJETO / {repo.language || 'CÓDIGO'}</p>
        <h1>{repo.name.replace(/[-_]/g, ' ')}</h1>
        <p>
          {repo.description ||
            'Projeto público desenvolvido durante minha jornada em engenharia de software.'}
        </p>
        <div className="detail-buttons">
          <a
            className="btn btn-primary"
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={18} /> Ver código no GitHub <ArrowUpRight size={16} />
          </a>
          {repo.homepage && /^https?:\/\//.test(repo.homepage) && (
            <a
              href={repo.homepage}
              className="btn btn-outline"
              target="_blank"
              rel="noopener noreferrer"
            >
              Acessar demonstração <ArrowUpRight size={16} />
            </a>
          )}
        </div>
      </div>
      <div className="detail-banner">
        <div className="detail-banner-orbit" />
        <span>
          MAKE IT <em>BETTER.</em>
        </span>
      </div>
      <div className="detail-stats">
        <div>
          <Code2 size={18} />
          <span>Tecnologia principal</span>
          <strong>{repo.language || 'Não informada'}</strong>
        </div>
        <div>
          <Calendar size={18} />
          <span>Última atualização</span>
          <strong>{new Date(repo.updated_at).toLocaleDateString('pt-BR')}</strong>
        </div>
        <div>
          <Star size={18} />
          <span>Estrelas</span>
          <strong>{repo.stargazers_count}</strong>
        </div>
        <div>
          <GitFork size={18} />
          <span>Forks</span>
          <strong>{repo.forks_count}</strong>
        </div>
      </div>
      {repo.topics.length > 0 && (
        <div className="detail-topics">
          <h2>Assuntos</h2>
          {repo.topics.map((topic) => (
            <span key={topic} className="pill">
              {topic}
            </span>
          ))}
        </div>
      )}
    </main>
  )
}
