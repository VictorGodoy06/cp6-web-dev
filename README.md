# Victor Godoy — cp6-web-dev

Nome do repositório solicitado: **cp6-web-dev**. A rubrica fornecida pelo professor se intitula **CP3 — Portfolio — Stack e Harness Engineering**.

**Site publicado:** https://cp6-web-dev-sable.vercel.app/

**Revisão de 03/11:** consulte [AUDITORIA](docs/AUDITORIA-2026-11-03.md) para resultados comprovados e pendências.

![React](https://img.shields.io/badge/React-19-20252b?logo=react) ![JavaScript](https://img.shields.io/badge/JavaScript-ES2022-f7df1e?logo=javascript) ![Vite](https://img.shields.io/badge/Vite-6-646cff?logo=vite) ![Supabase](https://img.shields.io/badge/Supabase-Auth%20%2B%20Postgres-3ecf8e?logo=supabase)

Portfólio profissional construído para o Checkpoint 3 de Web Development da FIAP. Projetos são carregados automaticamente do [GitHub VictorGodoy06](https://github.com/VictorGodoy06). Inclui rotas individuais, 404, skeleton/erro/vazio, tema persistente, formulário validado, registro de contatos no Supabase, notificação por e-mail com Resend e dashboard do proprietário com login e políticas RLS.

**Importante:** o código do front-end, banco e Edge Function está incluído. **Para o envio de e-mail, dashboard e autenticação realmente funcionarem é obrigatório configurar o Supabase e o Resend** seguindo [`docs/DEPLOY.md`](docs/DEPLOY.md). O repositório não guarda credenciais. O deploy e a nota Lighthouse não vêm prontos no ZIP e precisam ser realizados/verificados por você.

## Começar rapidamente

Requisitos: Node.js 22+ e npm.

```bash
npm install
cp .env.example .env  # Windows PowerShell: Copy-Item .env.example .env
npm run dev
```

Abra `http://localhost:5173`. O conteúdo do GitHub é público e dispensa token. Edite `.env` com URL e chave pública do Supabase para ativar recursos dependentes do backend.

```bash
npm run lint
npm test
npm run build
npm run format
```

| Página             | URL               | Função                                            |
| ------------------ | ----------------- | ------------------------------------------------- |
| Home               | `/`               | Apresentação + projetos em destaque + tecnologias |
| Projetos           | `/projetos`       | Repositórios carregados via GitHub API            |
| Detalhe            | `/projetos/:name` | Informações do projeto com URL compartilhável     |
| Sobre              | `/sobre`          | Formação e atuação                                |
| Contato            | `/contato`        | Validações, envio, feedback                       |
| Login              | `/login`          | Entrar como dono do site                          |
| Dashboard          | `/dashboard`      | Mensagens, responded e escolha de destaques       |
| Página inexistente | `/*`              | 404 amigável                                      |

## Estrutura de diretórios

```text
src/
├── app/App.jsx                     # Rotas + lazy loading
├── components/                     # Botão, card, feedback e layout
├── features/
│   ├── auth/                       # AuthProvider, ProtectedRoute e login
│   ├── contact/                    # Schema Zod, envio e formulário
│   ├── dashboard/                  # Mensagens e destaques
│   └── projects/                   # GitHub API, query e destaques
├── hooks/useTheme.jsx              # Tema persistente
├── lib/                             # Config, cliente Supabase, cache
└── pages/                           # Home, Sobre, Projetos, Detalhes, 404
supabase/
├── migrations/                     # SQL + políticas RLS
└── functions/send-contact/         # Persistência + envio seguro Resend
.github/
├── agents/                          # Agente de review
├── skills/                          # Skills de segurança e testes
├── copilot-instructions.md         # Regras globais para Copilot
├── instructions/                   # Regras frontend
└── workflows/ci.yml                # CI de testes, lint e build
AGENTS.md                            # Regras para humanos e IA
.mcp.json                            # Configuração remota do GitHub MCP (requer autenticação)
```

## Como os dados fluem

A aplicação consulta `GET https://api.github.com/users/VictorGodoy06/repos?per_page=100&sort=updated&direction=desc&type=owner` com `fetch` e salva em cache por 5 minutos no TanStack Query. O card e a página de detalhes compartilham essa mesma query. Limite da API e falhas exibem feedback explícito. Repositórios forks e arquivados são filtrados, sem dados de projetos cadastrados manualmente.

O contato passa pela validação Zod no browser e também por validação independente na Edge Function. O servidor aplica limite de até 5 tentativas por IP/hash por janela de hora, grava uma linha no Postgres e envia e-mail via Resend; se a entrega de e-mail falhar, a mensagem permanece registrada como `failed` para o administrador saber do problema. O dashboard utiliza Supabase Auth e autorizações reais no banco por RLS, não apenas uma rota protegida visualmente.

Veja os diagramas completos em [`docs/FLUXOS.md`](docs/FLUXOS.md).

## Estratégia de desenvolvimento e versionamento

- **GitHub Flow:** branches `feature/nome`, `fix/nome`, `docs/nome`, revisão por Pull Request e merge na `main` depois da CI.
- **Conventional Commits:** `feat:`, `fix:`, `docs:`, `test:`, `refactor:`, `chore:`. Exemplo: `feat: adiciona selecao de projetos em destaque`.
- **Checks:** ESLint e Prettier com Husky/lint-staged antes de commits, Vitest e build no CI GitHub Actions.
- **Convenções:** PascalCase para componentes, camelCase para funções/serviços, hooks `use*`, testes próximos à funcionalidade.
- **Segredos:** `.env` está no `.gitignore`; só `.env.example` vai ao repositório. `VITE_*` é público por definição. Chaves privadas ficam nos secrets das Edge Functions.

## Harness de IA

O projeto contém um harness versionado que padroniza o trabalho com IA e reforça revisão humana:

- `AGENTS.md` é a fonte central de arquitetura, branch, commit, testes e segurança.
- `.github/copilot-instructions.md` e `.github/instructions/frontend.instructions.md` são instruções para o Copilot no VS Code.
- `.github/skills/security-review/SKILL.md` e `frontend-tests/SKILL.md` são tarefas reusáveis para revisão e testes.
- `.github/agents/portfolio-reviewer.agent.md` define o revisor técnico.
- `.vscode/mcp.json` declara o servidor remoto GitHub MCP com OAuth. **Declaração não equivale a conexão; entre no GitHub pelo VS Code, habilite e teste uma ferramenta antes de afirmar uso.**

O planejamento e a base da implementação foram apoiados pelo ChatGPT (modelo exato a confirmar na interface); a implementação, testes, conexão do MCP e deploy precisam de validação humana. A seleção de modelo do Copilot é feita no VS Code e deve ser mostrada no vídeo conforme a opção realmente usada.

Documentos para a entrevista: [`docs/STACK-DECISOES.md`](docs/STACK-DECISOES.md), [`docs/ROTEIRO-VIDEO.md`](docs/ROTEIRO-VIDEO.md), [`docs/CHECKLIST-CP3.md`](docs/CHECKLIST-CP3.md).

## Performance

- `React.lazy` nas páginas, com destaque para Dashboard e Login fora do bundle da home.
- Imagens de capa decorativas WebP com 720×440px, dimensões explícitas, `loading="lazy"` e `decoding="async"`.
- Cache com `staleTime` de 5 minutos e `refetchOnWindowFocus: false`.
- Componentes com reserva de altura para reduzir layout shift.
- CSS responsivo e tema por CSS custom properties.
- Sem cena 3D pesada para proteger desempenho mobile.

**Lighthouse mobile ≥80 só pode ser comprovado com teste na URL da Vercel** após o deploy, e o resultado deve ser guardado como evidência.

## Decisões e documentação

| Documento                                | Objetivo                                           |
| ---------------------------------------- | -------------------------------------------------- |
| [DEPLOY](docs/DEPLOY.md)                 | Passos completos Supabase, Resend, GitHub e Vercel |
| [STACK-DECISOES](docs/STACK-DECISOES.md) | Alternativas, critérios e trade-offs               |
| [FLUXOS](docs/FLUXOS.md)                 | Arquitetura e diagramas de dados                   |
| [ROTEIRO-VIDEO](docs/ROTEIRO-VIDEO.md)   | Roteiro de entrevista técnica até 8 minutos        |
| [CHECKLIST-CP3](docs/CHECKLIST-CP3.md)   | Evidências obrigatórias para entrega               |

## Entrega oficial

**Prazo 03/11/2026**: enviar na tarefa do Teams o repositório público, a URL pública do deploy na Vercel e o vídeo no YouTube **não listado**, com rosto e tela visíveis durante toda a gravação. Nunca inclua secrets ou dados pessoais dos visitantes em vídeos/prints públicos.

Prompts de demonstração do harness: [`docs/PROMPTS-IA.md`](docs/PROMPTS-IA.md).
