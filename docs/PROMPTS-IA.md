# Demonstrações para provar Harness Engineering

Objetivo: mostrar a IA aplicando instruções reais, em vez de só falar que há arquivos de regras. Use **GitHub Copilot no VS Code** se estiver instalado e autenticado, ou mostre a análise equivalente na ferramenta realmente usada. Não declare um MCP como conectado sem demonstrar uma ferramenta do servidor funcionando.

## Demonstração 1: agente customizado

Abra a paleta de agentes no VS Code, selecione **Portfolio Reviewer** (arquivo `.github/agents/portfolio-reviewer.agent.md`) e envie:

> Revise a segurança do formulário `src/features/contact/ContactForm.jsx` e da função `supabase/functions/send-contact/index.js` conforme `AGENTS.md` e a skill `security-review`. Faça uma lista priorizada de riscos, testes faltantes e recomendações sem editar arquivos.

Verifique se o agente identifica que secrets são server-side, RLS é regra no banco e o formulário revalida no servidor.

## Demonstração 2: skill reutilizável

Acione a skill `frontend-tests` (ou inclua o nome e arquivo no prompt) e envie:

> Crie uma proposta de teste que verifique que o dashboard não aparece para um usuário autenticado sem o registro na tabela `site_admins`. Mostre qual arquivo de teste seria alterado e qual comando de validação executar.

Confirme que a recomendação se alinha ao arquivo `src/features/auth/ProtectedRoute.test.jsx`.

## Demonstração 3: MCP do GitHub

1. Abra `.mcp.json` no VS Code e veja `github` apontando para `https://api.githubcopilot.com/mcp/`.
2. Faça login via OAuth no GitHub quando o VS Code solicitar e habilite o servidor, respeitando as permissões.
3. No Copilot com MCP conectado: “Mostre as issues abertas no repositório VictorGodoy06/portfolio-victor-cp3 e resuma o que falta para a entrega.”
4. Observe se a ferramenta MCP foi realmente chamada e mostrou dados do repositório. Se houver falha, explique e não diga que foi usado.

## Demonstração 4: enforcement de padrão

Peça à IA: “Quero adicionar uma nova funcionalidade de favoritos. Antes de codar, defina nome de branch, arquivos que seriam alterados, testes e alternativa de stack. Siga `AGENTS.md`.” Compare resposta com a arquitetura definida; rejeite uma sugestão de `fetch` dentro de `ProjectCard`.

> Se precisar de mais tempo para o vídeo, mostre apenas um uso real de agente e um de MCP, com tela e rosto, sem passar de 8 minutos.
