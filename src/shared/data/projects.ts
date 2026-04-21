export type Project = {
  slug: string;
  title: string;
  titleEn?: string;
  description: string;
  descriptionEn?: string;
  tags: string[];
  content?: string;
  contentEn?: string;
  links?: {
    github?: string;
    demo?: string;
    site?: string;
  };
  openLinksInNewTab?: boolean;
};

export const projects: Project[] = [
  {
    slug: "aero-search",
    title: "Aero Search BR",
    titleEn: "Aero Search BR",
    description:
      "Plataforma de busca por escolas e centros de instrução aeronáutica no Brasil, com filtros por região e tipo de curso.",
    descriptionEn:
      "Search platform for aviation schools and aeronautical training centers in Brazil, with filters by region and course type.",
    tags: ["Next.js", "NestJS", "Node.js", "TypeScript", "PostgreSQL"],
    content:
      "Plataforma desenvolvida para facilitar a busca por escolas de aviação no Brasil. Permite que pilotos e interessados encontrem instituições de ensino aeronáutico por região, tipo de curso e certificação, com dados atualizados e filtros eficientes.",
    contentEn:
      "Platform built to simplify finding aviation schools in Brazil. Allows pilots and enthusiasts to discover aeronautical training institutions by region, course type, and certification, with up-to-date data and efficient filters.",
    links: {
      site: "https://aerosearch.com.br/",
    },
    openLinksInNewTab: true,
  },
];
