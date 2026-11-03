import {
  ArrowLeft,
  CheckCheck,
  Circle,
  Inbox,
  LogOut,
  RefreshCw,
  ShieldCheck,
  Star,
  StarOff,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { ErrorPanel, LoadingPanel } from '../../components/Feedback'
import { useDashboard } from './useDashboard'
export default function DashboardPage() {
  const { notice, messages, repos, highlights, updateResponded, updateFeatured, signOut, count } =
    useDashboard()
  return (
    <main id="main" className="container dashboard-page page-space">
      <div className="dashboard-top">
        <div>
          <Link to="/" className="back-link">
            <ArrowLeft size={16} /> Ver portfólio
          </Link>
          <p className="section-label">PAINEL PRIVADO</p>
          <h1>
            Dashboard<span className="text-accent">.</span>
          </h1>
          <p>Mensagens e curadoria dos projetos da home.</p>
        </div>
        <button className="btn btn-outline" onClick={() => void signOut()} type="button">
          <LogOut size={17} /> Sair
        </button>
      </div>
      <div className="dashboard-overview">
        <div className="dash-metric">
          <Inbox />
          <span>Mensagens pendentes</span>
          <strong>{count}</strong>
        </div>
        <div className="dash-metric">
          <Star />
          <span>Projetos em destaque</span>
          <strong>
            {highlights.data?.length || 0}
            <small> / 3</small>
          </strong>
        </div>
        <div className="dash-metric">
          <ShieldCheck />
          <span>Segurança</span>
          <strong className="dash-secure">Administrador</strong>
        </div>
      </div>
      {notice && (
        <p className="form-result" role="status">
          {notice}
        </p>
      )}
      <section className="dashboard-section">
        <div className="dashboard-section-header">
          <div>
            <h2>Mensagens recebidas</h2>
            <p>Marque quando responder ao contato.</p>
          </div>
          <button
            className="btn btn-small btn-outline"
            onClick={() => void messages.refetch()}
            type="button"
          >
            <RefreshCw size={14} /> Atualizar
          </button>
        </div>
        {messages.isPending ? (
          <LoadingPanel title="Carregando mensagens..." />
        ) : messages.error ? (
          <ErrorPanel message={messages.error.message} onRetry={() => void messages.refetch()} />
        ) : !messages.data?.length ? (
          <div className="dashboard-empty">Nenhuma mensagem recebida até agora.</div>
        ) : (
          <div className="message-list">
            {messages.data.map((message) => (
              <article
                className={`message-card ${message.responded ? 'responded' : ''}`}
                key={message.id}
              >
                <div className="message-head">
                  <div>
                    <span className="message-date">
                      {new Date(message.created_at).toLocaleString('pt-BR')}
                    </span>
                    <h3>{message.subject}</h3>
                    <span className="message-sender">
                      {message.name} · <a href={`mailto:${message.email}`}>{message.email}</a>
                    </span>
                  </div>
                  <button
                    disabled={updateResponded.isPending}
                    type="button"
                    className={`btn btn-small ${message.responded ? 'btn-outline' : 'btn-primary'}`}
                    onClick={() => updateResponded.mutate(message)}
                  >
                    {message.responded ? (
                      <>
                        <CheckCheck size={16} /> Respondida
                      </>
                    ) : (
                      <>
                        <Circle size={16} /> Marcar respondida
                      </>
                    )}
                  </button>
                </div>
                <p>{message.message}</p>
                {message.email_status !== 'sent' && (
                  <small className="warning-text">
                    Aviso: e-mail não confirmado ({message.email_status}). Mensagem salva no banco.
                  </small>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
      <section className="dashboard-section">
        <div className="dashboard-section-header">
          <div>
            <h2>Escolher projetos em destaque</h2>
            <p>Selecione até 3 projetos para aparecer na página inicial.</p>
          </div>
        </div>
        {repos.isPending || highlights.isPending ? (
          <LoadingPanel title="Carregando projetos..." />
        ) : repos.error || highlights.error ? (
          <ErrorPanel
            message={(repos.error || highlights.error)?.message || 'Erro de API'}
            onRetry={() => {
              void repos.refetch()
              void highlights.refetch()
            }}
          />
        ) : !repos.data?.length ? (
          <div className="dashboard-empty">Nenhum projeto disponível.</div>
        ) : (
          <div className="featured-rows">
            {repos.data.map((repo) => {
              const selected = highlights.data?.some((f) => f.repo_name === repo.name) || false
              return (
                <div className="featured-row" key={repo.id}>
                  <div>
                    <strong>{repo.name}</strong>
                    <span>{repo.language || 'Outras linguagens'}</span>
                  </div>
                  <button
                    type="button"
                    className={`btn btn-small ${selected ? 'btn-primary' : 'btn-outline'}`}
                    disabled={updateFeatured.isPending}
                    onClick={() => updateFeatured.mutate({ repo: repo.name, selected })}
                  >
                    {selected ? (
                      <>
                        <Star size={15} /> Em destaque
                      </>
                    ) : (
                      <>
                        <StarOff size={15} /> Destacar
                      </>
                    )}
                  </button>
                </div>
              )
            })}
          </div>
        )}
      </section>
    </main>
  )
}
