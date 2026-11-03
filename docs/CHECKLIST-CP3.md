# Checklist de avaliação CP3 — meta nota 10

O status inicial do ZIP é **implementado em código, pendente de integração/validação externa**. Marque apenas depois de testar.

| Rubrica obrigatória              | Onde verificar                                                             | Prova para professor                                     |
| -------------------------------- | -------------------------------------------------------------------------- | -------------------------------------------------------- |
| Rota individual e 404            | `src/app/App.jsx`, `pages/ProjectDetailPage.jsx`, `pages/NotFoundPage.jsx` | Abrir link direto e atualizar                            |
| 404 de API / erro amigável       | `github.js`, `Feedback.jsx`                                                | Simular falha de rede e ver erro                         |
| Loading / erro / vazio           | `ProjectList.jsx`, `Feedback.jsx`, dashboard                               | Network throttling ou DevTools offline                   |
| Spinner e envio bloqueado        | `ContactForm.jsx`                                                          | Clicar no botão e verificar disabled                     |
| GitHub API sem cadastro manual   | `github.js`                                                                | Network GET `api.github.com/users/.../repos`             |
| E-mail + mensagem gravada        | Edge `send-contact` / SQL                                                  | Caixa de e-mail e linha no dashboard **após configurar** |
| Validações por campo             | `schema.js`                                                                | Campos vazios, e-mail inválido, texto curto              |
| Proteção real do dashboard       | `ProtectedRoute`, RLS                                                      | Anônimo e usuário não-admin são negados                  |
| Respondida e destaques           | `DashboardPage.jsx`                                                        | Marcar estado e ver alteração na home                    |
| Tema persistente                 | `useTheme.jsx`                                                             | Trocar tema e recarregar                                 |
| Responsivo/reutilização          | `styles.css`, `ProjectCard`, `Button`                                      | Mostrar 375px e 1440px                                   |
| Performance ≥ 80 mobile          | `docs/DEPLOY.md`                                                           | Screenshot REAL do Lighthouse da URL Vercel              |
| WebP lazy + dimensões            | `public/images`, `ProjectCard.jsx`                                         | Network imagens e elementos `<img>`                      |
| Dashboard lazy                   | `App.jsx`                                                                  | Chunks não carregam na home                              |
| Sem GitHub fetch repetido        | `queryClient.js`                                                           | Navegar e ver Network + 5min staleTime                   |
| Testes dos fluxos críticos       | `*.test.jsx`, `*.test.js`                                                  | Terminal `npm test` verde                                |
| Deploy automático                | Vercel importado do GitHub                                                 | Commit na main → deploy novo                             |
| Conventional Commits + branches  | `AGENTS.md`, `.github/workflows/ci.yml`                                    | Mostrar PRs e histórico verdadeiros                      |
| Arquitetura / nomenclatura       | `src`, `AGENTS.md`, `README.md`                                            | Explicar diagrama e pastas                               |
| Lint/formatação antes do commit  | ESLint, Prettier, `.husky`, lint-staged                                    | Commit gatilhando hook                                   |
| Repositório público e env seguro | `.env.example`, `.gitignore`                                               | Conferir arquivos públicos no GitHub                     |
| Harness IA                       | `AGENTS.md`, `.github`, `.vscode/mcp.json`                                 | Mostrar agente/skill/MCP com uso real                    |
| Vídeo até 8min e não listado     | `docs/ROTEIRO-VIDEO.md`                                                    | Link não listado do YouTube                              |

## Critérios de pronto

- [ ] `npm install` concluído em seu computador.
- [ ] `npm run lint` sem erros/avisos.
- [ ] `npm test` com testes passando.
- [ ] `npm run build` sem erros.
- [ ] Vercel publicada e deep links funcionando depois de F5.
- [ ] Supabase SQL aplicado, usuário admin cadastrado, Edge Function publicada.
- [ ] Resend com e-mail **realmente recebido** e dashboard com dados reais.
- [ ] Lighthouse **mobile ≥ 80**, screenshot registrado.
- [ ] GitHub público com commits/branches/PRs reais ao longo do prazo.
- [ ] Harness usado de fato no VS Code e documentação consistente.
- [ ] Vídeo com rosto + tela, até 8 minutos, publicado não listado.
- [ ] Três links validados e postados no Teams até **03/11/2026**.

## Plano sugerido até a entrega

| Data     | Objetivo                                                                      |
| -------- | ----------------------------------------------------------------------------- |
| 26–27/10 | Instalar, testar, entender páginas e fazer primeiro push                      |
| 28/10    | Configurar Supabase, Auth, RLS e administrador; criar branch de ajustes reais |
| 29/10    | Configurar Resend, função, validar formulário ponta a ponta                   |
| 30/10    | Deploy Vercel, corrigir deep links, verificar destaques e mobile              |
| 31/10    | Executar testes, ajustar lint, Lighthouse, revisar segurança com agente       |
| 01/11    | Capturar diagrama, CI, PR, testes e gravar vídeo                              |
| 02/11    | Revisar vídeo, publicar não listado, validar três links                       |
| 03/11    | Entregar no Teams **antes do prazo**                                          |
