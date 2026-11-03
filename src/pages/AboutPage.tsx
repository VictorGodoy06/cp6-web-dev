import { ArrowUpRight, GraduationCap, HeartHandshake, Lightbulb } from 'lucide-react'
import { Link } from 'react-router-dom'
export default function AboutPage() {
  return (
    <main id="main" className="container page-space">
      <div className="page-intro">
        <p className="section-label">
          <span>02</span> / QUEM SOU EU
        </p>
        <h1>
          Prazer, <span className="highlight-title">Victor.</span>
        </h1>
        <p>
          Engenharia, design e a curiosidade de quem acredita que tecnologia deve resolver problemas
          de verdade.
        </p>
      </div>
      <div className="about-layout">
        <div className="about-portrait">
          <span>
            VG<span>.</span>
          </span>
          <div className="portrait-caption">ALWAYS A WORK IN PROGRESS — SÃO PAULO, BR</div>
        </div>
        <div className="about-text">
          <p className="section-label">MINHA HISTÓRIA</p>
          <h2>A construção é parte da jornada.</h2>
          <p>
            Sou estudante de Engenharia de Software na FIAP e estou construindo minha carreira em
            desenvolvimento. Gosto tanto de criar interfaces quanto de entender a lógica, os dados e
            a arquitetura por trás delas.
          </p>
          <p>
            Tenho experiência em projetos acadêmicos que combinam HTML, CSS, JavaScript, Python,
            APIs e colaboração com Git e GitHub. Minha meta é crescer em uma equipe que valorize
            boas práticas e aprendizado contínuo.
          </p>
          <div className="about-highlights">
            <div>
              <GraduationCap />
              <span>
                <strong>FIAP</strong>
                <small>Engenharia de Software</small>
              </span>
            </div>
            <div>
              <Lightbulb />
              <span>
                <strong>Mão na massa</strong>
                <small>Projetos reais e aprendizado</small>
              </span>
            </div>
            <div>
              <HeartHandshake />
              <span>
                <strong>Colaboração</strong>
                <small>Comunicação e trabalho em equipe</small>
              </span>
            </div>
          </div>
          <Link to="/contato" className="btn btn-primary">
            Entre em contato <ArrowUpRight size={18} />
          </Link>
        </div>
      </div>
    </main>
  )
}
