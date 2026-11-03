import { ProjectList } from '../components/ProjectList'
export default function ProjectsPage() {
  return (
    <main id="main" className="container page-space">
      <div className="page-intro">
        <p className="section-label">
          <span>01</span> / PROJETOS
        </p>
        <h1>
          Código que <span className="highlight-title">conta histórias.</span>
        </h1>
        <p>
          Uma seleção dinâmica dos meus repositórios públicos. Os dados são trazidos diretamente da
          API do GitHub, não de uma lista cadastrada à mão.
        </p>
      </div>
      <ProjectList />
    </main>
  )
}
