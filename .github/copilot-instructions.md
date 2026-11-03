# Instruções do GitHub Copilot

Siga integralmente [AGENTS.md](../AGENTS.md) e [STACK-DECISOES](../docs/STACK-DECISOES.md).

Não coloque `fetch` dentro de cartões ou elementos de apresentação. Prefira funções em `features/*/` e TanStack Query. Ao alterar formulários, faça testes Vitest. Ao alterar auth ou dashboard, verifique RLS no Supabase e teste redirecionamento.

Use componentes funcionais React, TypeScript estrito, sem `any`, sem HTML injetado. Inclua feedback de loading, erro e estado vazio nas requisições. Respeite tema persistido com CSS variables, acessibilidade e layout responsivo. Segredos vivem exclusivamente nas Edge Functions e seus secrets.

Nunca comite na `main` diretamente: trabalhe em `feature/*` e use Conventional Commits. Antes do PR execute `npm run lint && npm run typecheck && npm test && npm run build`. Se não conseguir rodar alguma verificação, declare isso explicitamente.
