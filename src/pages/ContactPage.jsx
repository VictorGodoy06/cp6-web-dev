import { ArrowUpRight, Github, Linkedin, Mail } from 'lucide-react'
import { ContactForm } from '../features/contact/ContactForm'
import { GITHUB_USERNAME } from '../lib/config'
export default function ContactPage() {
  return (
    <main id="main" className="container page-space">
      <div className="page-intro">
        <p className="section-label">
          <span>03</span> / CONTATO
        </p>
        <h1>
          Uma conversa pode
          <br />
          <span className="highlight-title">começar tudo.</span>
        </h1>
        <p>
          Para oportunidades, projetos ou apenas trocar ideias. Minha caixa de entrada está aberta.
        </p>
      </div>
      <div className="contact-layout">
        <div className="contact-aside">
          <h2>
            Conecte-se
            <br />
            comigo<span className="text-accent">.</span>
          </h2>
          <p>
            Envie uma mensagem pelo formulário. Ela chega por e-mail e fica registrada no meu painel
            privado.
          </p>
          <a
            href={`https://github.com/${GITHUB_USERNAME}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={20} /> GitHub <ArrowUpRight size={16} />
          </a>
          <a
            href="https://www.linkedin.com/in/victor-godoy-08822a2b6/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={20} /> LinkedIn <ArrowUpRight size={16} />
          </a>
          <div className="contact-aside-foot">
            <Mail size={19} /> Em geral, respondo assim que possível.
          </div>
        </div>
        <ContactForm />
      </div>
    </main>
  )
}
