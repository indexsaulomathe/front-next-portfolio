# Portfolio — Saulo Matheus

Portfólio pessoal de **Saulo Matheus de Rezende**, Backend Software Engineer com foco em NestJS, Node.js, TypeScript e arquitetura de microsserviços.

Site: https://indexsaulomathe.github.io/front-next-portfolio

## Sobre

Aplicação em Next.js (App Router) que apresenta perfil profissional, experiência, skills e projetos, com suporte a tema claro/escuro e i18n (pt/en).

## Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS
- React Three Fiber / Three.js (elementos visuais 3D)

## Estrutura

```
src/
  app/                # rotas (App Router)
  components/
    atoms/             # componentes base (Button, Badge, Typography...)
    molecules/          # composições simples (ProjectCard, SectionHeader)
    organisms/           # seções da página (Hero, Experience, Skills, Contact...)
    templates/            # composição das páginas
  i18n/                # contexto de idioma e tema
  shared/
    data/               # dados de projetos
    seo/                # metadados do site
```

## Como executar

```bash
yarn install
yarn dev
```

Abra [http://localhost:3000](http://localhost:3000).

## Build

```bash
yarn build
yarn start
```

## Lint

```bash
yarn lint
```

## Deploy

Publicado via GitHub Actions (`.github/workflows/deploy.yml`) para GitHub Pages.

## Contato

- LinkedIn: [linkedin.com/in/indexsaulomathe](https://www.linkedin.com/in/indexsaulomathe/)
- GitHub: [github.com/indexsaulomathe](https://github.com/indexsaulomathe)
