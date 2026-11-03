# Roteiro da entrevista técnica — duração alvo 7min30s

**Não leia literalmente**: estude cada parte, adapte ao funcionamento que você realmente ativou e mostre o VS Code/GitHub/Vercel. Grave com rosto e tela simultaneamente, do início ao fim. Não diga que houve integração ou testes que ainda não executou.

## 00:00–00:40 · Apresentação e produto (40s)

**Mostrar:** seu rosto e home do site publicado, alternar tema claro/escuro.

**Falar:** “Meu nome é Victor Godoy, estudo Engenharia de Software na FIAP e desenvolvi esse portfólio para apresentar meu trabalho e, principalmente, minhas decisões de engenharia. A aplicação reúne meus projetos reais do GitHub, um canal de contato com envio de e-mail e um dashboard privado para gerenciar mensagens e escolher destaques.”

## 00:40–02:15 · Stack e camadas (1min35s)

**Mostrar:** `docs/FLUXOS.md`, árvore `src`, app rodando, `/projetos` e página de detalhes.

**Falar:** “O front-end é React com JavaScript e Vite. React Router cuida das rotas, inclusive projetos individuais. Reescritas em `vercel.json` permitem atualizar links profundos. Separei `pages` para rotas, `components` para elementos visuais reaproveitáveis, `features` por domínio e `lib` para configuração. A chamada à API fica em `features/projects/github.js`, fora dos cards, e o TanStack Query compartilha o cache. Cada resposta mostra skeleton, erro com tentativa de novo e estado vazio. Se der limite de requisições no GitHub, o usuário vê mensagem amigável.”

## 02:15–03:50 · Back-end, segurança e percurso dos dados (1min35s)

**Mostrar:** formulário validando campos; diagrama de contato; SQL `site_admins`/RLS; `/login` e `/dashboard` se configurados.

**Falar:** “Escolhi React Hook Form com Zod para validar cada campo. Durante o envio o botão fica desativado. No servidor, uma Edge Function revalida dados, usa antispam e rate limit, salva no Postgres e dispara e-mail pelo Resend. Secrets não entram no bundle. O login é Supabase Auth, mas autenticar não basta: só os usuários cadastrados em `site_admins` são administradores. O próprio Postgres aplica RLS; ocultar a rota no React não seria proteção suficiente. No painel eu marco mensagens como respondidas e destaco até três projetos carregados do GitHub.”

## 03:50–05:05 · Por que essa stack? (1min15s)

**Mostrar:** tabela em `docs/STACK-DECISOES.md`.

**Falar:** “Comparei React Router a outras opções, mas escolhi simplicidade para minhas rotas. Escolhi TanStack Query em vez de `useEffect` manual porque o cache resolve um requisito de performance. Supabase em vez de criar um backend Node porque Auth, Postgres e RLS já se integram; em troca tenho configuração e dependência de plataforma. CSS puro no lugar de Tailwind para criar uma identidade visual própria e controlar o pacote, aceitando mais manutenção manual. Evitei Three.js: ganhei um bundle mais leve, mas abri mão de 3D avançado. Testei o caminho crítico com Vitest e Testing Library.”

## 05:05–06:35 · Harness de IA (1min30s)

**Mostrar:** `AGENTS.md`, `.github/copilot-instructions.md`, `.github/skills/*/SKILL.md`, `.github/agents/portfolio-reviewer.agent.md`, `.vscode/mcp.json` e o agente selecionado no VS Code caso realmente ativado.

**Falar:** “Usei ChatGPT (modelo exato a confirmar na interface) para apoiar o planejamento e a implementação, com revisão humana. A configuração do projeto também foi preparada para GitHub Copilot no VS Code [se você de fato ativou, mostre a ferramenta e o modelo exibido]. Não basta pedir ‘crie um site’: `AGENTS.md` e as instruções Copilot exigem arquitetura, padrões, segurança e commits. Minhas skills cuidam de testes e revisão de segurança; o agente ‘Portfolio Reviewer’ funciona como revisor técnico. Versionei a configuração de MCP do GitHub para acesso contextual ao repositório [só diga que está conectado se demonstrar uma chamada real]. O código passa por ESLint, Prettier, testes e CI antes do merge. A IA segue regras, mas a responsabilidade final pelos testes e decisões é minha.”

**Demonstração que rende nota:** pedir ao agente: “Revise a alteração do formulário seguindo `security-review` e diga quais testes precisam mudar.” Mostrar resultado, não só arquivos parados.

## 06:35–07:30 · Da branch ao deploy + evidências (55s)

**Mostrar:** um PR/commits reais, CI verde, Vercel deployments e nota Lighthouse mobile se ela foi realmente obtida.

**Falar:** “Meu fluxo é GitHub Flow: branch `feature/`, commit convencional, pull request, testes no GitHub Actions e merge na `main`. O push dispara o deploy automático da Vercel. Separei o dashboard com `React.lazy` para evitar colocar código privado e pesado no bundle inicial. As imagens decorativas são WebP compactos com dimensões declaradas e carregamento lazy. Também verifiquei o Lighthouse mobile, que marcou [INSIRA A NOTA REAL] neste endereço [MOSTRE URL].”

**Encerrar:** “Este CP me ensinou a justificar escolhas e provar que o projeto funciona, não só a produzir código.”

## Checklist da gravação

- [ ] Webcam e tela visíveis o tempo todo.
- [ ] Duração total até 8min, preferencialmente 7min30s.
- [ ] Mostrar URL pública (Vercel) e navegação real.
- [ ] Mostrar dados do GitHub vindo da API.
- [ ] Demonstrar formulário e dashboard **de fato configurados**.
- [ ] Mostrar um teste, CI, PR e Lighthouse de verdade.
- [ ] Mostrar Copilot/ChatGPT e modelo efetivamente usado, arquivos de harness e MCP real.
- [ ] Publicar no YouTube como **não listado** e testar o link sem login.
