# Regras compartilhadas de engenharia — CP3

Estas regras orientam IA e humanos. Antes de editar código, leia `README.md`, `docs/STACK-DECISOES.md` e este arquivo.

## Arquitetura

- Aplicação React + TypeScript + Vite. `src/pages` contém páginas; `src/components` apresenta elementos reutilizáveis; `src/features` agrupa regras por domínio; `src/lib` centraliza SDKs e utilitários; `src/hooks` contém hooks genéricos.
- APIs e persistência devem ficar fora dos componentes puramente visuais.
- Todo dado assíncrono tem estados loading, error e empty. Github usa TanStack Query com cache e sem fetch redundante.
- Dashboard exige autenticação E presença em `site_admins`; controle real de acesso está em RLS do Supabase. Nunca confiar apenas na proteção do React.
- Chaves `service_role`, `RESEND_API_KEY`, passwords e segredos nunca entram em `VITE_*`, no bundle ou em commits.

## Padrões

- Componentes, tipos e interfaces: `PascalCase`; funções e variáveis: `camelCase`; hooks: prefixo `use`.
- Arquivos de componentes: `PascalCase.tsx`; arquivos de serviços: nome descritivo `camelCase.ts`; testes: `*.test.ts(x)` ao lado da funcionalidade.
- Usar ESLint, Prettier, TypeScript estrito, teste automatizado e acessibilidade (labels, foco, `aria-*`).
- Novos formulários precisam validação de campos, estado de envio, erros claros e testes.
- Novas páginas privadas: `ProtectedRoute` + RLS, teste de negação; novas rotas públicas: tratamento de 404 e erro.

## Fluxo de trabalho obrigatório

1. Criar branch `feature/assunto`, `fix/assunto` ou `docs/assunto` a partir de `main`.
2. Fazer mudanças pequenas, com teste para comportamento crítico.
3. Executar `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`.
4. Registrar commit Conventional Commits: `feat:`, `fix:`, `test:`, `docs:`, `refactor:`, `chore:`.
5. Abrir Pull Request, revisar alterações e integrar à `main` após CI passar.
6. CI na `main` e Vercel publicam automaticamente após push.

## Como a IA deve responder

Explicar primeiro quais arquivos serão alterados, consequências de segurança e testes necessários. Não criar dados falsos de projetos. Não afirmar que testes, deploy ou MCP foram executados sem evidência. Comparar pelo menos uma alternativa e registrar trade-off quando adicionar dependência importante.
