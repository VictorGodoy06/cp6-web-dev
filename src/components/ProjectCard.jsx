import { ArrowUpRight, CalendarDays, Github, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
const formatDate = (date) =>
  new Intl.DateTimeFormat('pt-BR', { month: 'short', year: 'numeric' }).format(new Date(date))
export function ProjectCard({ repo, index, featured = false }) {
  return (
    <article className="project-card">
      <Link
        className="project-art"
        to={`/projetos/${encodeURIComponent(repo.name)}`}
        aria-label={`Ver detalhes de ${repo.name}`}
      >
        <img
          src={`/images/cover-${index % 3}.webp`}
          alt="Arte abstrata decorativa do projeto"
          width="720"
          height="440"
          loading="lazy"
          decoding="async"
        />
        <span className="project-art-overlay">{String(index + 1).padStart(2, '0')}</span>
        <span className="project-art-arrow">
          <ArrowUpRight size={20} />
        </span>
      </Link>
      <div className="project-content">
        <div className="project-eyebrow">
          <span className="eyebrow-language">
            <span className="language-dot" />
            {repo.language || 'Multilinguagem'}
          </span>
          {featured && <span className="featured-tag">Destaque</span>}
        </div>
        <Link to={`/projetos/${encodeURIComponent(repo.name)}`} className="project-title-link">
          <h3>{repo.name.replace(/[-_]/g, ' ')}</h3>
        </Link>
        <p className="project-description">
          {repo.description ||
            'Projeto público de desenvolvimento de software. Confira os detalhes e o código no GitHub.'}
        </p>
        <div className="project-meta">
          <span>
            <CalendarDays size={14} /> {formatDate(repo.updated_at)}
          </span>
          <span>
            <Star size={14} /> {repo.stargazers_count}
          </span>
          <a
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Repositório GitHub de ${repo.name}`}
          >
            <Github size={17} />
          </a>
        </div>
      </div>
    </article>
  )
}
