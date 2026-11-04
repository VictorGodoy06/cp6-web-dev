import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Code2,
  Cpu,
  Layers3,
  MoveUpRight,
  TerminalSquare,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { ProjectList } from '../components/ProjectList'
export default function HomePage() {
  return (
    <main id="main">
      <section className="hero container">
        <div className="hero-copy">
          <div className="availability">
            <span className="pulse-dot" /> ABERTO A OPORTUNIDADES DE ESTÁGIO{' '}
            <span className="availability-tail">· 2026</span>
          </div>
          <p className="hero-kicker">
            OLÁ, EU SOU O VICTOR <span className="kicker-line" />
          </p>
          <h1>
            Ideias viram
            <br />
            <span className="hero-accent">interfaces.</span>
            <br />
            Interfaces viram
            <br />
            experiências<span className="text-accent">.</span>
          </h1>
          <p className="hero-lead">
            Estudante de Engenharia de Software na FIAP, apaixonado por transformar problemas reais
            em experiências digitais bem construídas.
          </p>
          <div className="hero-buttons">
            <Link to="/projetos" className="btn btn-primary">
              Explorar projetos <ArrowUpRight size={18} />
            </Link>
            <Link to="/contato" className="btn btn-outline">
              Vamos conversar <ArrowRight size={18} />
            </Link>
          </div>
          <div className="hero-footnote">
            <span className="footnote-bar" /> FRONT-END · PYTHON · REACT · UX
          </div>
        </div>
        <div className="hero-visual" aria-label="Ilustração de um editor com código React">
          <div className="visual-glow" aria-hidden="true" />
          <div className="window-card">
            <div className="window-header">
              <span className="window-dots">
                <i />
                <i />
                <i />
              </span>
              <span>portfolio.jsx</span>
              <TerminalSquare size={16} />
            </div>
            <div className="window-body" aria-hidden="true">
              <div className="code-line">
                <span className="line-num">01</span>
                <span className="code-violet">const</span> developer = {'{'}
              </div>
              <div className="code-line">
                <span className="line-num">02</span> name:{' '}
                <span className="code-orange">'Victor Godoy'</span>,
              </div>
              <div className="code-line">
                <span className="line-num">03</span> focus:{' '}
                <span className="code-orange">'Building things'</span>,
              </div>
              <div className="code-line">
                <span className="line-num">04</span> mindset:{' '}
                <span className="code-orange">'Keep learning'</span>,
              </div>
              <div className="code-line">
                <span className="line-num">05</span> curiosity:{' '}
                <span className="code-teal">Infinity</span>,
              </div>
              <div className="code-line">
                <span className="line-num">06</span>
                {'}'}
              </div>
              <div className="code-line code-gap">
                <span className="line-num">07</span>
              </div>
              <div className="code-line">
                <span className="line-num">08</span>
                <span className="code-violet">export default</span> developer
              </div>
            </div>
            <div className="window-status">
              <span>
                <span className="status-dot" /> JavaScript
              </span>
              <span>UTF-8 &nbsp; ✓</span>
            </div>
          </div>
          <div className="visual-float visual-float-one">
            <span className="visual-float-icon">
              <Code2 size={18} />
            </span>
            <span>
              <strong>Clean code</strong>
              <small>Do design ao deploy</small>
            </span>
          </div>
          <div className="visual-float visual-float-two">
            <span className="visual-float-icon">
              <Layers3 size={17} />
            </span>
            <span>
              <strong>Always learning</strong>
              <small>Um commit por vez</small>
            </span>
          </div>
          <span className="hero-deco deco-1">+</span>
          <span className="hero-deco deco-2">+</span>
        </div>
        <a href="#projetos" className="scroll-cue">
          <ArrowDown size={15} /> SCROLL PARA EXPLORAR
        </a>
      </section>
      <div className="ticker">
        <div className="container ticker-inner">
          <span>DESENVOLVIMENTO COM PROPÓSITO</span>
          <span className="ticker-star">✳</span>
          <span>DO PRIMEIRO WIREFRAME AO ÚLTIMO COMMIT</span>
          <span className="ticker-star">✳</span>
          <span>SEMPRE EM EVOLUÇÃO</span>
        </div>
      </div>
      <section className="container section" id="projetos">
        <div className="section-heading">
          <div>
            <p className="section-label">
              <span>01</span> / TRABALHOS SELECIONADOS
            </p>
            <h2>
              Alguns projetos.
              <br />
              <span className="subtle-title">Muita evolução.</span>
            </h2>
          </div>
          <Link className="text-link" to="/projetos">
            Ver todos os projetos <MoveUpRight size={18} />
          </Link>
        </div>
        <ProjectList onlyFeatured limit={3} />
      </section>
      <section className="container about-strip">
        <div className="about-strip-symbol">
          <Cpu size={37} strokeWidth={1.25} />
        </div>
        <div>
          <span className="section-label">02 / SOBRE MINHA JORNADA</span>
          <h2>
            Aprender. Construir. <span>Melhorar.</span>
          </h2>
          <p>
            Da lógica à interface, gosto de entender o problema antes de escrever a primeira linha
            de código. Minha formação une fundamentos de engenharia e experiências de projetos
            reais.
          </p>
        </div>
        <Link to="/sobre" className="circle-link" aria-label="Saiba mais sobre mim">
          <ArrowUpRight size={25} />
        </Link>
      </section>
      <section className="container section skills-section">
        <div className="section-heading">
          <div>
            <p className="section-label">
              <span>03</span> / MINHA CAIXA DE FERRAMENTAS
            </p>
            <h2>
              Tecnologias que
              <br />
              <span className="subtle-title">movem minhas ideias.</span>
            </h2>
          </div>
        </div>
        <div className="skills-grid">
          {[
            'React',
            'Vite',
            'JavaScript',
            'HTML & CSS',
            'Python',
            'Git & GitHub',
            'APIs REST',
            'Figma',
          ].map((skill, i) => (
            <div className="skill-card" key={skill}>
              <span>{String(i + 1).padStart(2, '0')}</span>
              <strong>{skill}</strong>
              <ArrowUpRight size={18} />
            </div>
          ))}
        </div>
      </section>
      <section className="container end-cta">
        <div className="cta-top">
          <span className="section-label">TEM ALGUMA IDEIA EM MENTE?</span>
          <span className="sparkle">✳</span>
        </div>
        <h2>
          Vamos criar algo
          <br />
          <em>incrível juntos.</em>
        </h2>
        <Link to="/contato" className="btn btn-cta">
          Iniciar uma conversa <ArrowUpRight size={19} />
        </Link>
      </section>
    </main>
  )
}
