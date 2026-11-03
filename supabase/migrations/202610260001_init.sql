-- CP3 · Schema mínimo com RLS. Execute no SQL Editor do Supabase.
create table if not exists public.site_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 80),
  email text not null check (char_length(email) between 3 and 160),
  subject text not null check (char_length(subject) between 3 and 120),
  message text not null check (char_length(message) between 20 and 3000),
  responded boolean not null default false,
  email_status text not null default 'queued' check (email_status in ('queued','sent','failed')),
  created_at timestamptz not null default now()
);
create index if not exists contact_messages_created_at_idx on public.contact_messages (created_at desc);

create table if not exists public.featured_repositories (
  repo_name text primary key check (char_length(repo_name) between 1 and 100),
  position smallint not null check (position between 1 and 100),
  created_at timestamptz not null default now()
);

create table if not exists public.contact_rate_limits (
  ip_hash text not null,
  window_start timestamptz not null,
  hits integer not null default 1,
  primary key (ip_hash, window_start)
);

alter table public.site_admins enable row level security;
alter table public.contact_messages enable row level security;
alter table public.featured_repositories enable row level security;
alter table public.contact_rate_limits enable row level security;

-- A tabela de administradores nunca pode ser escrita pelo navegador.
revoke all on public.site_admins from anon, authenticated;
grant select on public.site_admins to authenticated;
create policy "Admin pode conferir seu próprio cadastro" on public.site_admins
  for select to authenticated using (user_id = (select auth.uid()));

-- Mensagens nunca são lidas/escritas por anônimos; Edge Function usa service_role.
revoke all on public.contact_messages from anon, authenticated;
grant select, update on public.contact_messages to authenticated;
create policy "Apenas administradores leem mensagens" on public.contact_messages
  for select to authenticated
  using (exists (select 1 from public.site_admins sa where sa.user_id = (select auth.uid())));
create policy "Apenas administradores atualizam mensagens" on public.contact_messages
  for update to authenticated
  using (exists (select 1 from public.site_admins sa where sa.user_id = (select auth.uid())))
  with check (exists (select 1 from public.site_admins sa where sa.user_id = (select auth.uid())));

-- Destaques são públicos para leitura; apenas administradores alteram.
revoke all on public.featured_repositories from anon, authenticated;
grant select on public.featured_repositories to anon, authenticated;
grant insert, delete, update on public.featured_repositories to authenticated;
create policy "Qualquer visitante lê destaques" on public.featured_repositories
  for select to anon, authenticated using (true);
create policy "Somente administrador cadastra destaque" on public.featured_repositories
  for insert to authenticated
  with check (exists (select 1 from public.site_admins sa where sa.user_id = (select auth.uid())));
create policy "Somente administrador remove destaque" on public.featured_repositories
  for delete to authenticated
  using (exists (select 1 from public.site_admins sa where sa.user_id = (select auth.uid())));
create policy "Somente administrador atualiza destaque" on public.featured_repositories
  for update to authenticated
  using (exists (select 1 from public.site_admins sa where sa.user_id = (select auth.uid())))
  with check (exists (select 1 from public.site_admins sa where sa.user_id = (select auth.uid())));

-- Rate limiting transacional no Postgres, exclusivo da função server-side.
revoke all on public.contact_rate_limits from anon, authenticated;
create or replace function public.check_contact_rate(p_hash text)
returns boolean language plpgsql security definer set search_path = '' as $$
declare attempt_count integer;
begin
  if p_hash is null or length(p_hash) < 20 then return false; end if;
  insert into public.contact_rate_limits (ip_hash, window_start, hits)
  values (p_hash, date_trunc('hour', now()), 1)
  on conflict (ip_hash, window_start)
  do update set hits = public.contact_rate_limits.hits + 1
  returning hits into attempt_count;
  return attempt_count <= 5;
end;
$$;
revoke all on function public.check_contact_rate(text) from public, anon, authenticated;
grant execute on function public.check_contact_rate(text) to service_role;

-- Após criar um usuário com email e senha em Authentication > Users:
-- insert into public.site_admins (user_id) values ('COLE-O-UUID-DO-USUARIO');
-- NÃO habilitar signup público apenas para o dashboard.
