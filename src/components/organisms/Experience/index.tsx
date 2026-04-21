"use client";

import SectionHeader from "@/components/molecules/SectionHeader";
import Badge from "@/components/atoms/Badge";
import { useLanguage } from "@/i18n/LanguageContext";

const experiences = {
  pt: [
    {
      company: "Brasil Card Instituição de Pagamentos",
      role: "Software Engineer",
      period: "Out 2024 – Presente",
      description:
        "Desenvolvimento de sistemas backend escaláveis em arquitetura de microsserviços com NestJS e TypeScript. Responsável por integrações assíncronas com RabbitMQ, garantindo comunicação desacoplada e confiável entre serviços. Aplicação de Clean Code, Repository Pattern e arquitetura modular em ambiente Docker de alta disponibilidade.",
      skills: ["NestJS", "TypeScript", "Node.js", "RabbitMQ", "Docker"],
    },
    {
      company: "Kosmo Studio",
      role: "Software Engineer",
      period: "Jan 2022 – Nov 2024",
      description:
        "Desenvolvedor full stack em projetos digitais, construindo interfaces modernas e responsivas integradas a APIs REST bem estruturadas. Envolvimento em todo o ciclo de desenvolvimento — prototipação, implementação e deploy em produção. Implementação de boas práticas com Git, componentes reutilizáveis e fluxos CI.",
      skills: ["Vue.js", "Nuxt.js", "React.js", "NestJS", "TypeScript", "Tailwind CSS"],
    },
  ],
  en: [
    {
      company: "Brasil Card Instituição de Pagamentos",
      role: "Software Engineer",
      period: "Oct 2024 – Present",
      description:
        "Development of scalable backend systems in a microservices architecture using NestJS and TypeScript. Responsible for async integrations with RabbitMQ, ensuring decoupled and reliable communication between services. Applied Clean Code, Repository Pattern, and modular architecture in a high-availability Docker environment.",
      skills: ["NestJS", "TypeScript", "Node.js", "RabbitMQ", "Docker"],
    },
    {
      company: "Kosmo Studio",
      role: "Software Engineer",
      period: "Jan 2022 – Nov 2024",
      description:
        "Full stack developer on digital projects, building modern and responsive interfaces integrated with well-structured REST APIs. Involved throughout the full development lifecycle — prototyping, implementation, and production deployment. Applied best practices with Git, reusable components, and CI workflows.",
      skills: ["Vue.js", "Nuxt.js", "React.js", "NestJS", "TypeScript", "Tailwind CSS"],
    },
  ],
};

export default function Experience() {
  const { t, locale } = useLanguage();
  const list = experiences[locale];

  return (
    <section id="experience" className="py-12 sm:py-16">
      <SectionHeader title={t.experience.title} subtitle={t.experience.subtitle} />

      <div className="space-y-4">
        {list.map((exp) => (
          <div
            key={exp.company}
            className="border border-theme rounded-xl p-6 bg-theme-surface backdrop-blur hover:bg-theme-surface-hover transition-colors"
          >
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
              <div>
                <h3 className="text-base font-semibold text-theme">{exp.role}</h3>
                <p className="text-green-400 text-sm font-medium mt-0.5">{exp.company}</p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-theme-muted text-sm">{exp.period}</p>
                <p className="text-theme-faint text-xs mt-0.5">{t.experience.indirect}</p>
              </div>
            </div>

            <p className="mt-4 text-sm text-theme-muted leading-relaxed">{exp.description}</p>

            <div className="mt-4 flex flex-wrap gap-2">
              {exp.skills.map((skill) => (
                <Badge key={skill} variant="default">
                  {skill}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
