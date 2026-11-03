# Decisões de stack (Architecture Decision Records / ADR simplificado)

Cada decisão foi tomada considerando prazo, explicabilidade em entrevista, segurança e performance.

| Escolha                                          | Alternativas avaliadas                | Por que escolhi                                                                          | Trade-off assumido                                                             |
| ------------------------------------------------ | ------------------------------------- | ---------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| React + Vite + JavaScript                        | Next.js, React + TypeScript           | JavaScript conforme solicitado, ES Modules e sintaxe próxima ao conteúdo estudado        | Sem checagem estática de tipos; compensação com ESLint, Zod e testes. Sem SSR. |
| React Router                                     | TanStack Router, Next.js Pages        | Rotas explícitas, comunidade ampla, aprendizagem direta                                  | Menos inferência de tipos que TanStack Router                                  |
| TanStack Query                                   | `useEffect + useState`, SWR           | Cache compartilhado, retry e staleTime de 5 min; reduz requisições GitHub                | Adiciona dependência                                                           |
| `fetch` nativo                                   | Axios                                 | Sem biblioteca extra para requests simples                                               | Interceptadores precisam ser implementados se exigidos                         |
| React Hook Form + Zod                            | Validação manual, Formik, Yup         | Mensagens por campo, esquema central, renderização enxuta                                | Duas dependências                                                              |
| Supabase Auth + Postgres + RLS                   | Firebase, backend Node próprio        | Banco SQL, regras reais de autorização, Auth e Edge Functions integrados                 | Plataforma externa e configuração inicial maior                                |
| Supabase Edge Function + Resend                  | EmailJS, Formspree                    | Guarda API key no servidor; salva em dashboard e dispara email                           | Exige chave, domínio remetente e deploy separado da Vercel                     |
| Context + localStorage para tema                 | Zustand, Redux                        | Estado pequeno sem custo de biblioteca                                                   | Não serve para estados complexos                                               |
| CSS puro + CSS variables                         | Tailwind, MUI, shadcn                 | Visual autoral, peso reduzido e compreensão total do código                              | Mais CSS mantido manualmente                                                   |
| Vitest + Testing Library                         | Jest, Playwright                      | Testes rápidos e alinhados ao Vite, adequados aos fluxos críticos                        | Não substitui testes E2E reais no navegador                                    |
| Vercel                                           | Netlify, GitHub Pages                 | Deploy automático de `main`, fácil URL pública, rewrites SPA                             | Dependência de provedor                                                        |
| GitHub Flow + Conventional Commits               | Git Flow, Gitmoji                     | Branch por feature, PR curto, histórico legível                                          | Disciplina para não empurrar tudo num único commit                             |
| Sem Three.js nesta primeira versão               | React Three Fiber, Spline             | Evita aumentar bundle inicial, mantém foco em nota Lighthouse mobile                     | Menos efeito 3D; substituído por CSS/artes leves                               |
| ChatGPT GPT-6 + Copilot VS Code (quando ativado) | IA sem instruções, outros assistentes | Planejamento e implementação com supervisão humana; regras versionadas para consistência | Respostas precisam ser revisadas e executadas; MCP requer autenticação real    |

## O que eu faria com mais tempo

- Testes E2E Playwright com backend em ambiente separado, inclusive fluxo de contato e login reais.
- Paginação na API de repositórios acima de 100 projetos.
- Observabilidade do envio de e-mail e painel de reenvio seguro para mensagens `failed`.
- Turnstile/CAPTCHA para reduzir bots sofisticados se o contato receber tráfego intenso.
- Métricas Lighthouse mobile repetidas e capturas em dispositivos físicos.

## Referências oficiais

- GitHub REST API: https://docs.github.com/en/rest/repos/repos
- Vercel SPA: https://vercel.com/docs/frameworks/frontend/vite
- RLS: https://supabase.com/docs/guides/database/postgres/row-level-security
- Edge Functions: https://supabase.com/docs/guides/functions
- E-mail Resend: https://supabase.com/docs/guides/functions/examples/send-emails
- VS Code agents: https://code.visualstudio.com/docs/agent-customization/custom-agents
- VS Code skills: https://code.visualstudio.com/docs/agent-customization/agent-skills
- MCP: https://code.visualstudio.com/docs/agents/reference/mcp-configuration
