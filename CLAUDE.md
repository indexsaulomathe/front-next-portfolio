# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server at localhost:3000
npm run build    # Static export to /out (used for GitHub Pages)
npm run lint     # Run ESLint
npm run start    # Start production server (after build)
```

No test suite is configured in this project.

## Architecture

This is a Next.js 16 + React 19 portfolio site for Saulo Matheus, built with **Atomic Design** and deployed as a **static export** to GitHub Pages (`/out` directory). The repo name is `front-next-portfolio`, and in production `next.config.ts` sets `basePath` to `/front-next-portfolio` automatically.

### Component hierarchy (Atomic Design)

```
src/components/
  atoms/          # Primitive UI: Badge, Button, Container, Typography (Text, Title)
  molecules/      # Composed atoms: ProjectCard, SectionHeader
  organisms/      # Feature sections: Hero, Navbar, Skills, ContactCard, ProjectsGrid,
                  #   ThreeCanvas/ThreeScene (3D knot), MatrixFaceCanvas/MatrixHeadGLB
                  #   IdleScreenOverlay/IdleScreenProvider
  templates/      # Page layouts: HomeTemplate, ProjectsTemplate, ProjectDetailsTemplate
```

### Pages and routing

- `/` → `HomeTemplate` (Navbar → Hero → ProjectsGrid → Skills → ContactCard → Footer)
- `/projects` → `ProjectsTemplate`
- `/projects/[slug]` → `ProjectDetailsTemplate`, statically generated from `src/shared/data/projects.ts`

### 3D rendering (Three.js / R3F)

Two independent Three.js canvases:
- **ThreeCanvas** (`organisms/ThreeCanvas`) — wraps `ThreeScene`, renders an animated torus-knot with OrbitControls and stars. Used on the home page.
- **MatrixFaceCanvas** (`organisms/MatrixFaceCanvas`) — wraps `MatrixHeadGLB`, renders a point-cloud head from `public/models/head.glb` that follows mouse movement. Used exclusively in the idle screen overlay.

All Three.js components are `"use client"` and wrapped in `<Suspense fallback={null}>`. Components that use `useGLTF` or browser APIs must be dynamically imported with `ssr: false`.

### Idle screen overlay

`IdleScreenProvider` (rendered in `layout.tsx`) dynamically imports `IdleScreenOverlay` with `ssr: false`. After 60 seconds of inactivity (mouse, keyboard, scroll, touch), `useIdleScreen` hook sets `isIdle = true` and the overlay appears with matrix rain + the 3D head canvas. Clicking anywhere dismisses it.

### Data layer

All project data lives in `src/shared/data/projects.ts` as a typed `Project[]` array. Adding a new project requires only adding an entry there — `generateStaticParams` in the slug page will include it automatically.

### Key conventions

- Path alias `@/*` maps to `src/*`
- Tailwind CSS v4 (PostCSS plugin), no `tailwind.config` file — configuration is inline
- `"use client"` is required on any component using hooks, Three.js, or browser APIs
- The `Button` atom accepts `as="link"` prop to render as a Next.js `<Link>` instead of `<button>`
- SEO metadata per page is in `layout.tsx` (global) and `generateMetadata` exports in page files; `src/shared/seo/site-metadata.ts` exists but is not yet wired up
