# Guia de configuração real — do ZIP ao site no ar

> O pacote não contém chaves nem acesso às suas contas. Não declare o formulário, dashboard e e-mail funcionais na apresentação antes de executar os passos 3 a 7 e fazer testes reais.

## 1. Abrir no VS Code e rodar

Instale Node.js 22 ou superior. Extraia o ZIP, abra a pasta pelo VS Code, então execute no terminal:

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

URL local usual: `http://localhost:5173`. O GitHub já está apontando para `VictorGodoy06`, e a lista de projetos pode funcionar sem Supabase. As partes dependentes de banco/e-mail NÃO estarão disponíveis até configurar.

Execute `npm run format`, `npm run lint`, `npm test` e `npm run build`. Inclua `package-lock.json` gerado em seu primeiro commit e altere o passo CI de `npm install` para `npm ci` quando houver lockfile. Não comite `.env`.

## 2. Criar repositório GitHub público

No GitHub, clique **New repository** → nome sugerido `portfolio-victor-cp3` → Public. NÃO crie README remoto (este já vem com README). No terminal:

```bash
git init
git add .
git commit -m "chore: inicia portfolio com arquitetura e harness"
git branch -M main
git remote add origin https://github.com/VictorGodoy06/portfolio-victor-cp3.git
git push -u origin main
```

Adote branches curtas **nas próximas modificações**, por exemplo:

```bash
git switch -c feature/polimento-responsivo
# Faça mudanças reais em CSS/componentes e teste
git add .
git commit -m "feat: aprimora responsividade do portfolio"
git push -u origin feature/polimento-responsivo
```

Depois abra Pull Request no GitHub, espere o CI e use **Merge**. Repita com `feature/contato`, `feature/dashboard` ou branches de melhorias reais. **Não falsifique datas nem commits**: o professor pede histórico distribuído e PRs reais.

## 3. Supabase — projeto e banco

1. Crie um projeto gratuito em https://supabase.com/dashboard.
2. Em **Project Settings > API** (o nome da seção pode variar) obtenha URL e `anon`/publishable key. Cole em `.env` local nas variáveis `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY`.
3. Abra **SQL Editor** e execute o arquivo `supabase/migrations/202610260001_init.sql`. Alternativa pela CLI: `supabase login`, `supabase link --project-ref SEU_PROJECT_REF`, `supabase db push`.
4. Vá em **Authentication > Users**. Crie **você** como usuário com e-mail e senha; confirme o usuário caso seja necessário. Evite signup público em seu site.
5. Copie o **UUID** desse usuário. Execute no SQL Editor:

```sql
insert into public.site_admins (user_id)
values ('COLE_AQUI_O_UUID_DO_USUARIO')
on conflict do nothing;
```

6. Confira no SQL Editor que RLS está ativado nas tabelas. No site `/login`, entre com esse usuário; confirme que `/dashboard` funciona. Um usuário autenticado fora de `site_admins` deve ser barrado.

## 4. Resend — serviço de e-mail

1. Crie conta em https://resend.com/ e configure/verifique um **domínio remetente** em Domains. Use um e-mail do domínio para `CONTACT_FROM` (por exemplo `Portfolio <contato@seudominio.com>`).
2. Crie uma API Key. Use seu e-mail pessoal em `CONTACT_EMAIL`, que receberá o contato.
3. Se ainda não tiver domínio, o domínio de testes do Resend tem restrições de destinatário. Para uma entrega real e pública, use um domínio verificado.
4. NÃO coloque `RESEND_API_KEY`, `CONTACT_FROM`, `CONTACT_EMAIL`, `CONTACT_RATE_SALT` ou `SUPABASE_SERVICE_ROLE_KEY` em `.env` do React nem em arquivos enviados ao GitHub.

## 5. Secrets e publicação da função Supabase

No Dashboard do Supabase, em **Edge Functions > Secrets**, configure:

```text
RESEND_API_KEY = (chave privada do Resend)
CONTACT_EMAIL = (seu e-mail que receberá mensagens)
CONTACT_FROM = Portfolio <contato@seudominio.com>
CONTACT_RATE_SALT = (frase longa e aleatória)
CONTACT_ALLOWED_ORIGINS = http://localhost:5173,https://SEU-SITE.vercel.app
```

`SUPABASE_URL` e a chave de servidor são injetadas no runtime das funções. O código aceita a chave legada `SUPABASE_SERVICE_ROLE_KEY` e, em projetos com novas chaves, `SUPABASE_SECRET_KEYS` (entrada `default`). Ambas são **secretas e exclusivamente server-side**, capazes de ignorar RLS; nunca use no React.

Para publicar a função, instale a Supabase CLI (por exemplo `npx supabase`), entre na conta e execute na raiz:

```bash
npx supabase login
npx supabase link --project-ref SEU_PROJECT_REF
npx supabase functions deploy send-contact --no-verify-jwt
```

A rota `send-contact` é pública de propósito, portanto o JWT é desativado **nesta função apenas**; validação, limitação de requisições, antispam e RLS protegem o sistema. Faça um envio de teste pela página `/contato`: confira **e-mail recebido** e **linha gravada** em `contact_messages`. Confira no Dashboard o botão **Marcar respondida** e seleção de destaque.

> Atenção: `CONTACT_ALLOWED_ORIGINS` deve conter exatamente o domínio da Vercel publicado. Se mudar domínio, atualize o secret. Se tiver preview deployments em URLs diferentes, adicione apenas as origens que pretende testar.

## 6. Vercel — deploy automático

1. Crie conta em https://vercel.com e conecte seu GitHub.
2. **Add New → Project → Import** o repositório público criado.
3. Framework Vite; Build Command `npm run build`; Output Directory `dist`.
4. Em **Environment Variables** configure SOMENTE os valores públicos `VITE_GITHUB_USERNAME`, `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`. Nunca cadastre as chaves Resend/service_role como `VITE_`.
5. Clique **Deploy**. Copie a URL pública no formato `https://seu-site.vercel.app`.
6. Adicione essa URL em `CONTACT_ALLOWED_ORIGINS` no Supabase e faça **Redeploy** na Vercel se mudou alguma variável do front-end.
7. O arquivo `vercel.json` reescreve URLs SPA para `/index.html`. Abra diretamente `https://.../projetos/NOME-REAL-DO-REPO`, recarregue (F5) e confirme que funciona. Teste também `/nao-existe` (404 amigável).
8. Push na `main` aciona novo deploy automático; confira **Deployments** na Vercel.

## 7. Evidências de segurança e funcionamento

- Aba anônima → `/dashboard` deve redirecionar a `/login`.
- Logado **sem** admin → acesso negado, inclusive consulta direta às tabelas.
- Logado admin → mensagens e destaques funcionam.
- Formulário inválido → feedback por campo; formulário válido → spinner/disabled, e-mail recebido e registro no banco; ao responder, atualiza o status.
- DevTools Network → navegue home > projetos > detalhe > home: lista do GitHub não deve ser requisitada repetidamente dentro do `staleTime`.
- Modo escuro/tema claro → atualize página, preferência permanece.
- Teste em 375px e 1440px; check nenhuma barra horizontal e sem deslocamentos ao carregar.

## 8. Lighthouse mobile ≥ 80

1. Abra o link PUBLICADO em uma aba anônima do Chrome Desktop e pressione F12.
2. Na aba **Lighthouse**, selecione **Mobile** e **Performance**; rode 3 vezes (variações são normais).
3. Só declare requisito cumprido se a nota real de performance da URL publicada for **≥ 80**; salve capturas das auditorias.
4. Se ficar abaixo de 80, investigue imagens, cache, fontes, JS, rede e LCP no relatório; não invente nota.
5. Confirme lazy loading de `/dashboard` inspecionando chunks no `dist/assets` e aba Network.

## 9. YouTube e Teams

Grave com **rosto e tela visíveis durante todo o vídeo** (por exemplo OBS Studio: captura de tela + webcam). No YouTube Studio publique como **Não listado**, não Privado. Confirme vídeo com no máximo 8 minutos. Na atividade do Teams entregue exatamente:

1. Link do repositório público no GitHub.
2. Link público funcionando na Vercel.
3. Link do vídeo não listado no YouTube.

Use `docs/ROTEIRO-VIDEO.md` e `docs/CHECKLIST-CP3.md` como apoio.
