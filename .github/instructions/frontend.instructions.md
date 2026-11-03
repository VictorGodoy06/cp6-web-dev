---
applyTo: 'src/**/*.{ts,tsx,css}'
---

# Regras específicas do front-end

- Usar componentes pequenos e sem dependência direta de rede quando visuais.
- JavaScript moderno (ES Modules), `aria-label` para elementos interativos sem texto e labels em inputs.
- Tratar carregamento, erro, vazio e sucesso em operações assíncronas.
- Não repetir chamadas ao GitHub entre páginas: reusar `projectQuery`.
- Ao mudar UI, revisar larguras 375px, 768px e 1440px; evitar `layout shift` fornecendo `width`/`height` em imagens.
- Não gravar token GitHub ou Supabase service_role no navegador.
