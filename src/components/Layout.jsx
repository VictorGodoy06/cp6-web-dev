import { useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { ArrowUpRight, Github, Linkedin, Menu, Moon, Sun, X } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import { GITHUB_USERNAME } from '../lib/config'
export function Layout() {
  const { theme, toggleTheme } = useTheme()
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const nav = [
    { href: '/', label: 'Início', end: true },
    { href: '/projetos', label: 'Projetos' },
    { href: '/sobre', label: 'Sobre' },
    { href: '/contato', label: 'Contato' },
  ]
  return (
    <>
      <a className="skip-link" href="#main">
        Ir ao conteúdo
      </a>
      <header className="site-header">
        <div className="container nav-wrap">
          <Link to="/" className="brand" aria-label="Victor Godoy — início">
            <span className="brand-mark">
              V<span>.</span>
            </span>
            <span>
              victor<span className="brand-dot">.</span>dev
            </span>
          </Link>
          <nav
            className={`main-nav ${menuOpen ? 'nav-open' : ''}`}
            aria-label="Navegação principal"
          >
            {nav.map(({ href, label, end }) => (
              <NavLink
                to={href}
                end={end}
                key={href}
                onClick={() => setMenuOpen(false)}
                className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <div className="nav-actions">
            <button
              className="icon-button theme-toggle"
              onClick={toggleTheme}
              type="button"
              aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}
              title="Alternar tema"
            >
              {theme === 'dark' ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <a
              className="nav-github"
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub <ArrowUpRight size={15} />
            </a>
            <button
              className="icon-button mobile-menu"
              onClick={() => setMenuOpen(!menuOpen)}
              type="button"
              aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
              aria-expanded={menuOpen}
            >
              {menuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </header>
      <div key={location.pathname} className="page-enter">
        <Outlet />
      </div>
      <footer className="footer">
        <div className="container footer-inner">
          <div>
            <Link to="/" className="footer-brand">
              victor<span>.</span>dev
            </Link>
            <p>Feito com curiosidade, cuidado e café.</p>
          </div>
          <div className="footer-links">
            <a
              href={`https://github.com/${GITHUB_USERNAME}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/victor-godoy-08822a2b6/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
            <Link to="/login" className="footer-admin">
              Área do dono
            </Link>
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Victor Godoy</span>
          <span>São Paulo, Brasil · Desenvolvido em React</span>
        </div>
      </footer>
    </>
  )
}
