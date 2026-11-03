---
name: frontend-tests
description: Escreva e revise testes automatizados Vitest/Testing Library para formulários, rotas privadas e interfaces assíncronas React.
---

# Desenvolvimento orientado a testes

1. Identifique comportamento observável; teste DOM e acessibilidade, não detalhes internos.
2. Valide e-mails incorretos, mensagens menores que 20 caracteres, envio bem-sucedido, loading e botão disabled.
3. Garanta que visitante e usuário sem autorização sejam redirecionados e admin autorizado acesse a rota.
4. Execute `npm test`, `npm run lint`, `npm run typecheck` e `npm run build` quando possível; registre resultados reais.
5. Explique regressões e faça commit com `test:` se só adicionou testes.
