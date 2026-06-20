# CLAUDE.md — agendabee-landing-page

## Visão geral do produto

**agendabee** (sempre minúsculo, sem exceção) é um SaaS para lojistas Nuvemshop (BR) / Tiendanube (AR, CL, CO, MX) que automatiza agendamento e reversão de preços e promoções. O lojista configura uma vez, as "bees" executam automaticamente no horário programado. Mensagem-chave: **"Configure uma vez. As bees fazem o resto."**

Contexto de negócio completo (modelo de negócio, público, posicionamento, diferenciais) vive no repositório `agendabee` (app principal). Não duplicar aqui — consultar lá quando precisar de profundidade.

## Papel deste repositório

Landing page de **conversão**, hospedada em `agendabee.com.br` via GitHub Pages (domínio customizado em `CNAME`). Separada de:
- `app.agendabee.com.br` → repo `agendabee` (Angular + Firebase + Cloud Functions, produto real).
- Blog → repo `agendabee-blog` (Hugo + Blowfish).

Stack: **vanilla HTML5 + CSS3 + JavaScript**, sem build tool, sem `package.json`, sem dependências npm. Deploy é direto — qualquer commit em `master` reflete no site publicado.

## Estrutura de arquivos

```
index.html          → página pt-BR (raiz, idioma padrão / hreflang x-default)
en/index.html        → página inglês
es/index.html        → página espanhol
assets/css/style.css → CSS único, custom properties no topo
assets/js/script.js  → redirect de idioma, scroll header, FAQ accordion, menu mobile
assets/img/          → logo, ícone, favicon, badge parceiro Nuvemshop
ai-context/           → docs vivos legados (GEMINI.md, landing_page_plan.md, "Landing Page - agendabee.md")
sitemap.xml, 404.html, CNAME → config estática de SEO/deploy
```

**Importante:** `index.html`, `en/index.html` e `es/index.html` são **3 páginas completas duplicadas**, não fragmentos de um sistema de i18n. Não existe fonte única de verdade automatizada — qualquer mudança estrutural, de tracking, de schema.org ou de oferta/preço feita em uma página **precisa ser replicada manualmente nas outras duas**.

## Identidade de marca

- Nome da marca: `agendabee` — sempre minúsculo (código, copy, commits, docs).
- Paleta oficial (já implementada em `assets/css/style.css:3-7`):
  - `#FFAA00` (amarelo primário) · `#CC8800` (dourado escuro) · `#FFB41F` (amarelo médio) · `#FFC247` (amarelo claro) · preto · branco.
- **Pendência conhecida de tipografia:** o CSS atual usa `Montserrat` via Google Fonts (`--font-family` em `style.css:22`). A diretriz oficial da marca (manual de marca, memória do repo `agendabee-agents`) define **Museo Sans** como fonte oficial (headlines 700/900, corpo 300/500), e o kit de carrosséis usa Barlow Condensed + Plus Jakarta Sans + Space Mono. Não há fontes locais neste repo (`assets/fonts/` não existe). Isso é um candidato a alinhamento futuro — não migrar sem decisão explícita.
- Regra de plataforma por idioma: em conteúdo **PT**, usar sempre "Nuvemshop"; em conteúdo **ES**, usar sempre "Tiendanube". Nunca misturar dentro do mesmo idioma. Vale para `index.html`, `en/index.html` e `es/index.html`.
- Estilo de copy: princípios de **David Ogilvy** — titular concentra ~80% do esforço, especificidade > generalidade ("reduz de 6h para 40min" em vez de "economiza tempo"), benefício prometido na primeira linha, fatos com número e fonte, sem hipérbole ("revolucionário", "incrível"). Detalhamento completo dos 8 princípios está na memória do repo `agendabee-agents`.

## SEO e dados estruturados

- `hreflang` completo nas 3 páginas: `pt-BR`, `en`, `es`, `x-default` (apontando para a raiz pt-BR).
- Schema.org JSON-LD (`SoftwareApplication`/`Product`) injetado via script no `<head>`, com `offers`, `aggregateRating`, `hasPart` multilíngue. Alterar preço/oferta visível sem atualizar esse JSON-LD deixa o structured data inconsistente com a página — sempre revisar os dois juntos, nas 3 línguas.
- `sitemap.xml`: 3 URLs (`/` priority 1.0, `/en/` e `/es/` priority 0.9), `changefreq: weekly`. Atualizar `lastmod` ao mudar conteúdo relevante de SEO.

## Tracking

- Google Analytics GA4: `G-2HP4YDJCJS`.
- Meta Pixel: `780474098046322` (+ `facebook-domain-verification` meta tag).
- Ambos embutidos nas 3 páginas, hoje só disparando `PageView` — sem eventos customizados (clique em CTA, scroll, etc.). Esses IDs são públicos no HTML do site, não são segredo.
- Qualquer novo evento ou troca de ID precisa ser replicado nas 3 páginas.

## Convenções de edição

- Sem build/bundler: editar HTML/CSS/JS direto, sem etapa de compilação ou transpile.
- Cores e tamanhos de fonte via custom properties no topo de `assets/css/style.css` — preferir editar as variáveis a hardcodar valores espalhados.
- Qualquer mudança de copy, tracking, schema.org ou estrutura de seção feita numa página deve ser replicada nas outras 2 línguas antes de considerar a tarefa concluída.

## Fluxo de Git

(detalhado em `README.md`, resumo aqui)
- Nunca commitar direto em `master`. Criar branch a partir de `master`: `git checkout -b feat/nome-da-funcionalidade`.
- Commits semânticos (Conventional Commits): `<tipo>(<escopo>): <descrição> (#ID_DA_ISSUE)`.
- Sempre abrir PR para revisão — nunca push direto em `master`/`develop`.

## Referências cruzadas

Contexto adicional vive nos repositórios irmãos do ecossistema agendabee (não duplicar aqui):
- `agendabee` (app principal, Angular + Firebase) — fonte de verdade do produto, modelo de negócio, KPIs.
- `agendabee-agents` — manual de marca completo, regras de copy/Ogilvy, calendário sazonal, automações de social media.
- `agendabee-blog` — stack Hugo/Blowfish, geração de conteúdo de blog.
