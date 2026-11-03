# Auditoria técnica — 03/11/2026

Repositório solicitado: cp6-web-dev. Rubrica: CP3 — Portfolio — Stack e Harness Engineering.

## Evidências locais

- Instalação npm concluída e package-lock.json gerado.
- ESLint, JavaScript, Prettier e build de produção passaram.
- 14 testes automatizados passaram em 4 arquivos: validação do schema, formulário, proteção de rota e autorização assíncrona.
- Corrigida limpeza do DOM entre testes: duas falhas do pacote original foram reproduzidas antes da correção.
- Adicionados testes de erro do serviço de contato e de resposta antiga de permissão após logout.
- Navegador desktop: home renderizou e carregou repositórios reais de VictorGodoy06; tema persistiu após recarregar; /dashboard redirecionou para /login sem sessão.
- Dashboard separado em apresentação e hook; feedback de erro ao marcar mensagem; reutilização de posições dos destaques.
- Configuração MCP para VS Code incluída em .vscode/mcp.json conforme documentação oficial: https://code.visualstudio.com/docs/agents/reference/mcp-configuration
- Código formatado e CI atualizado para npm ci e verificação de formatação.

## Matriz dos 12 requisitos

| Requisito         | Situação nesta revisão                                                        | Validação restante                                           |
| ----------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------------ |
| 1. Rotas          | Rotas, detalhes e 404 implementados; rewrite Vercel incluído                  | Atualizar deep link na URL pública                           |
| 2. Estados        | Loading, erro, vazio e bloqueio de envio implementados                        | Exercitar respostas reais do backend                         |
| 3. GitHub         | API real confirmada no navegador; cache compartilhado                         | Conferir Network no deploy                                   |
| 4. Contato        | Formulário testado; Edge Function e SQL incluídos                             | Configurar Supabase/Resend e comprovar recebimento           |
| 5. Dashboard      | Proteção testada; regras RLS incluídas no SQL                                 | Aplicar SQL, cadastrar admin, testar login e edição reais    |
| 6. Preferências   | Tema persistido confirmado no navegador                                       | Conferir também no deploy                                    |
| 7. Interface      | Desktop inspecionado; media queries e componentes comuns presentes            | Validar viewport mobile e teclado                            |
| 8. Performance    | Build concluído e rotas separadas em chunks                                   | Lighthouse mobile ≥80; bundle inicial gerou aviso de >500 kB |
| 9. Testes         | 14 testes passaram                                                            | CI remota e teste de integração real                         |
| 10. Deploy        | vercel.json e workflow presentes                                              | URL pública e push automático                                |
| 11. Versionamento | Branch de implementação e padrão definidos                                    | PR/CI/merge; histórico cronológico apenas real               |
| 12. Arquitetura   | Pastas por responsabilidade; lógica do painel em hook; checks locais passaram | Manter padrões no desenvolvimento posterior                  |

## Harness e vídeo

AGENTS.md, instruções, skills e agente estão versionados. Configuração não prova uso: demonstrar no vídeo apenas ferramentas e modelo realmente utilizados. O modelo exato deve ser conferido na interface, não presumido.

O roteiro de até 8 minutos está em ROTEIRO-VIDEO.md. O aluno deve gravar rosto e tela durante todo o vídeo e publicar como não listado. Não há vídeo produzido nesta revisão.

## Limites

Esta auditoria não certifica nota 10 nem considera a entrega concluída enquanto banco, e-mail, deploy, Lighthouse, mobile e vídeo não forem comprovados. Não foi inventado histórico anterior à criação do repositório.
