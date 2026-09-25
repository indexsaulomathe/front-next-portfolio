# AGENTS.md — front-next-portfolio

Portfólio pessoal (Next.js 16 App Router, React 19, TypeScript, Tailwind 4, React Three Fiber).
Export estático publicado no GitHub Pages. i18n pt/en e tema claro/escuro.

## Mapa

- `src/app/` — rotas (home, `projects/`, `projects/[slug]`, `contact/`), `sitemap.ts`, `robots.ts`.
- `src/components/{atoms,molecules,organisms,templates}` — Atomic Design; respeite a camada.
- `src/i18n/translations.ts` — todo texto visível passa por aqui (pt **e** en).
- `src/shared/data/` — dados de projetos e contatos; `src/shared/seo/` — metadados.
- Componentes 3D (`ThreeCanvas`, `MatrixRain`, `PlaneGame`…) são client-only e pesados:
  cuidado com performance e SSR.

## Checagens

```bash
yarn install --frozen-lockfile
yarn lint && yarn typecheck && yarn build
```

## Particularidades

- Gerenciador: **yarn 1** (não use npm/pnpm). Node 24 (igual ao CI).
- Branches: trabalho em `dev`; `main` faz deploy automático no Pages (`deploy.yml`).
- `NEXT_PUBLIC_WEB3FORMS_KEY` vem de secret; nunca hardcode.
- Dados de experiência devem bater com LinkedIn/currículo — não invente datas ou cargos.

## Fluxo de trabalho do agente

1. **Investigar** — leia o código envolvido e consulte o ai-memory antes de mudar algo.
   Em mudança não trivial, use a skill `verification-planning`.
2. **Teste primeiro** — bug: escreva o teste que reproduz e falha. Feature: defina o teste de aceite.
3. **Código** — mudança pequena e focada; siga o estilo existente; sem refactor fora do escopo.
4. **Checagens locais** — rode os comandos da seção "Checagens" e só siga com tudo verde.
5. **Commit** — pequeno, mensagem no padrão `feat:` / `fix:` / `chore:` / `docs:` / `test:`.
   Não faça push nem abra PR sem o dono pedir.
6. **CI → review → merge → release** — skills `pr-audit`, `iss-audit`, `github-resolution`, `release`.
7. **Kaizen** — ao final, registre decisões no ai-memory e, se algo se repetiu, sugira ajuste
   neste arquivo ou numa skill (`reflect`).

## Regras gerais

- Nunca commitar segredos: `.env`, chaves, tokens, certificados.
- Não apague arquivos nem reescreva histórico git sem pedido explícito.
- Se o pedido for ambíguo e mudar o resultado, pergunte antes.
