export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  content?: string;
  links?: {
    github?: string;
    demo?: string;
  };
};

export const projects: Project[] = [
  {
    slug: "csv-pipeline",
    title: "Pipeline de Importação CSV",
    description:
      "Sistema robusto para importação e processamento de arquivos CSV em larga escala usando streaming, filas e mensageria.",
    tags: ["NestJS", "RabbitMQ", "Streams", "TypeScript", "PostgreSQL"],
    content:
      "Desenvolvemos um pipeline de importação CSV que processa arquivos de até 1GB com sistema de retries e DLQ.",
    links: {
      github: "https://github.com/",
    },
  },
  {
    slug: "escolas-api",
    title: "API de Escolas (ANAC)",
    description:
      "API robusta com cache, filtros avançados e integração com mapas no frontend para visualização de dados educacionais.",
    tags: ["Next.js", "NestJS", "PostgreSQL", "Leaflet", "REST API"],
    content:
      "Criamos uma API escalável com cache em Redis e frontend moderno para visualização de dados geográficos.",
    links: {
      demo: "#",
    },
  },
  {
    slug: "sistema-observabilidade",
    title: "Sistema de Observabilidade",
    description:
      "Implementação completa de observabilidade com logs, métricas e traces em ambiente containerizado.",
    tags: ["Docker", "ELK Stack", "Prometheus", "Grafana", "CI/CD"],
    content:
      "Sistema de observabilidade completo com coleta de logs, métricas e rastreamento distribuído.",
    links: {
      github: "https://github.com/",
    },
  },
];
