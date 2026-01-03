export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  content?: string;
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
    description: "Site para procura de escolas de aviação no Brasil",
    tags: ["Next.js", "NestJS", "Node", "TypeScript", "PostgreSQL"],
    content:
      "Foi desenvolvido um site para facilitar a busca por escolas de aviação no Brasil, permitindo que os usuários encontrem instituições de ensino de forma rápida e eficiente.",
    links: {
      site: "https://aerosearch.com.br/",
    },
    openLinksInNewTab: true,
  },
];
