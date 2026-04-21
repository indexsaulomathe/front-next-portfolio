export type Locale = "pt" | "en";

export const translations = {
  pt: {
    nav: {
      projects: "Projetos",
      experience: "Experiência",
      skills: "Skills",
      contact: "Contato",
      contactBtn: "Contato",
    },
    hero: {
      titleHighlight: "Backend Engineer",
      title: "construindo sistemas escaláveis e confiáveis",
      description:
        "Especialista em backend com NestJS e Node.js, desenvolvendo arquiteturas de microsserviços, integrações assíncronas com RabbitMQ e sistemas de pagamento de alta disponibilidade.",
      btnProjects: "Ver projetos",
      btnExperience: "Experiência",
      btnContact: "Contato",
      stackLabel: "Stack:",
      status: {
        label: "status",
        badge: "DISPONÍVEL",
        currentRole: "Cargo atual",
        currentRoleValue: "Software Engineer @ Brasil Card",
        location: "Localização",
        locationValue: "Mato Grosso do Sul, BR · Remoto",
        focus: "Foco",
        focusValue: "Backend · Microsserviços · Event-driven",
        openTo: "Disponível para",
        openToValue: "Oportunidades & Projetos",
        footer: "+4 anos desenvolvendo produtos digitais e sistemas de pagamento.",
      },
    },
    projects: {
      title: "Projetos",
      subtitle: "Seleção dos trabalhos com foco em impacto, decisões técnicas e resultados.",
      caseLabel: "CASE",
      viewCase: "Ver case study →",
      viewAll: "Ver todos os projetos",
    },
    experience: {
      title: "Experiência",
      subtitle: "Trajetória profissional construindo sistemas reais em produção.",
      indirect: "Contrato Indireto · Remoto",
      current: "Presente",
    },
    skills: {
      title: "Skills",
      subtitle: "Stack e práticas que uso no dia a dia para entregar sistemas confiáveis.",
    },
    contact: {
      title: "Contato",
      subtitle: "Bora conversar sobre oportunidades e projetos.",
      sendEmail: "Enviar email",
      viewProjects: "Ver projetos",
    },
    footer: "Todos os direitos reservados.",
  },
  en: {
    nav: {
      projects: "Projects",
      experience: "Experience",
      skills: "Skills",
      contact: "Contact",
      contactBtn: "Contact",
    },
    hero: {
      titleHighlight: "Backend Engineer",
      title: "building scalable and reliable systems",
      description:
        "Backend specialist with NestJS and Node.js, building microservices architectures, async integrations with RabbitMQ, and high-availability payment systems.",
      btnProjects: "View projects",
      btnExperience: "Experience",
      btnContact: "Contact",
      stackLabel: "Stack:",
      status: {
        label: "status",
        badge: "AVAILABLE",
        currentRole: "Current role",
        currentRoleValue: "Software Engineer @ Brasil Card",
        location: "Location",
        locationValue: "Mato Grosso do Sul, BR · Remote",
        focus: "Focus",
        focusValue: "Backend · Microservices · Event-driven",
        openTo: "Open to",
        openToValue: "Opportunities & Projects",
        footer: "+4 years building digital products and payment systems.",
      },
    },
    projects: {
      title: "Projects",
      subtitle: "Selected work focused on impact, technical decisions, and results.",
      caseLabel: "CASE",
      viewCase: "View case study →",
      viewAll: "View all projects",
    },
    experience: {
      title: "Experience",
      subtitle: "Professional journey building real systems in production.",
      indirect: "Indirect Contract · Remote",
      current: "Present",
    },
    skills: {
      title: "Skills",
      subtitle: "Stack and practices I use daily to deliver reliable systems.",
    },
    contact: {
      title: "Contact",
      subtitle: "Let's talk about opportunities and projects.",
      sendEmail: "Send email",
      viewProjects: "View projects",
    },
    footer: "All rights reserved.",
  },
} as const;

export type Translations = (typeof translations)[Locale];
