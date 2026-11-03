import { AlertTriangle, FolderOpen, RefreshCw } from 'lucide-react'
export function LoadingPanel({ title = 'Carregando projetos...' }) {
  return (
    <div className="feedback-block" role="status" aria-live="polite">
      <div className="spinner" aria-hidden="true" />
      <p>{title}</p>
    </div>
  )
}
export function ErrorPanel({ message, onRetry }) {
  return (
    <div className="feedback-block feedback-error" role="alert">
      <AlertTriangle size={29} /> <strong>Não conseguimos carregar essa informação.</strong>
      <p>{message}</p>
      {onRetry && (
        <button className="btn btn-small btn-outline" type="button" onClick={onRetry}>
          <RefreshCw size={15} /> Tentar novamente
        </button>
      )}
    </div>
  )
}
export function EmptyPanel({ message = 'Nenhum projeto público encontrado por enquanto.' }) {
  return (
    <div className="feedback-block">
      <FolderOpen size={32} />
      <strong>Nada por aqui ainda</strong>
      <p>{message}</p>
    </div>
  )
}
export function ProjectSkeletons({ count = 3 }) {
  return (
    <div className="project-grid" role="status" aria-label="Carregando projetos">
      {Array.from({ length: count }, (_, index) => (
        <div className="project-card skeleton-card" key={index}>
          <div className="skeleton skeleton-art" />
          <div className="project-content">
            <div className="skeleton skeleton-heading" />
            <div className="skeleton skeleton-line" />
            <div className="skeleton skeleton-line small" />
          </div>
        </div>
      ))}
    </div>
  )
}
