import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
export default function NotFoundPage() {
  return (
    <main id="main" className="container notfound">
      <p className="section-label">ERRO 404 / PÁGINA NÃO ENCONTRADA</p>
      <span className="error-code">
        4<span>0</span>4
      </span>
      <h1>Essa rota saiu do mapa.</h1>
      <p>Não encontramos a página solicitada. Mas sempre há um bom caminho de volta.</p>
      <Link to="/" className="btn btn-primary">
        <ArrowLeft size={18} /> Voltar ao início
      </Link>
    </main>
  )
}
