---
name: security-review
description: Verifique mudanças de autenticação, Supabase RLS, formulário de contato e proteção de secrets antes de PRs.
---

# Revisão de segurança

1. Leia `supabase/migrations/202610260001_init.sql` e `supabase/functions/send-contact/index.ts`.
2. Confira que `contact_messages` não tem SELECT público; `site_admins` não pode ser escrito por visitantes; somente admins alteram destaques.
3. Confira que o formulário aplica limites também no servidor, rate limit, campo honeypot e restrição CORS, sem expor segredo Resend ou service_role.
4. Confira que `/dashboard` exige `isAdmin` e que a autorização real é aplicada pelo Postgres.
5. Identifique riscos, proponha correções e recomende novos testes. Nunca exponha valores de .env.
