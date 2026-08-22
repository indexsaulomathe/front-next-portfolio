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
      current: true,
      description:
        "Desenvolvimento de sistemas backend escaláveis em arquitetura de microsserviços com NestJS e TypeScript. Responsável por integrações assíncronas com RabbitMQ, garantindo comunicação desacoplada e confiável entre serviços. Aplicação de Clean Code, Repository Pattern e arquitetura modular em ambiente Docker de alta disponibilidade.",
      skills: ["NestJS", "TypeScript", "Node.js", "RabbitMQ", "Docker"],
    },
    {
      company: "Compass UOL",
      role: "Software Developer (Programmer I)",
      period: "Jul 2024 – Jun 2026",
      current: false,
      description:
        "Programa de bolsa técnica da Compass UOL, com formação prática em AWS (EC2, Lambda, SageMaker), Docker, MySQL, Terraform e Scrum. Atuação principal em projeto do setor bancário: modernização e migração de rotinas legadas SAS para Python, executadas em AWS Glue, com validação de dados via Amazon Athena e Amazon S3 garantindo equivalência funcional entre rotinas originais e migradas. Também desenvolvi um protótipo de forecasting com AWS Supply Planning, preparando datasets e configurando modelos de ML para previsão de estoque e pedidos.",
      skills: ["Python", "SAS", "AWS Glue", "Amazon Athena", "Amazon S3", "Terraform", "Machine Learning"],
    },
    {
      company: "Kosmo Studio",
      role: "Software Engineer",
      period: "Jan 2022 – Nov 2024",
      current: false,
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
      current: true,
      description:
        "Development of scalable backend systems in a microservices architecture using NestJS and TypeScript. Responsible for async integrations with RabbitMQ, ensuring decoupled and reliable communication between services. Applied Clean Code, Repository Pattern, and modular architecture in a high-availability Docker environment.",
      skills: ["NestJS", "TypeScript", "Node.js", "RabbitMQ", "Docker"],
    },
    {
      company: "Compass UOL",
      role: "Software Developer (Programmer I)",
      period: "Jul 2024 – Jun 2026",
      current: false,
      description:
        "Compass UOL technical scholarship program, with hands-on training in AWS (EC2, Lambda, SageMaker), Docker, MySQL, Terraform and Scrum. Core work on a banking-sector project: modernizing and migrating legacy SAS routines to Python, executed on AWS Glue, validating data via Amazon Athena and Amazon S3 to ensure functional equivalence between original and migrated routines. Also built an AWS Supply Planning forecasting prototype, preparing datasets and configuring ML models for inventory and order predictions.",
      skills: ["Python", "SAS", "AWS Glue", "Amazon Athena", "Amazon S3", "Terraform", "Machine Learning"],
    },
    {
      company: "Kosmo Studio",
      role: "Software Engineer",
      period: "Jan 2022 – Nov 2024",
      current: false,
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

      <div className="relative space-y-6 pl-8 before:absolute before:left-[7px] before:top-2 before:bottom-2 before:w-px before:bg-theme">
        {list.map((exp) => (
          <div key={exp.company} className="relative">
            <span
              className={`absolute -left-8 top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-theme-bg-solid ${
                exp.current ? "bg-green-400" : "bg-theme-faint"
              }`}
            >
              {exp.current && (
                <span className="absolute h-3.5 w-3.5 rounded-full bg-green-400 animate-ping opacity-60" />
              )}
            </span>

            <div className="border border-theme rounded-xl p-6 bg-theme-surface backdrop-blur hover:bg-theme-surface-hover transition-colors">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-base font-semibold text-theme">{exp.role}</h3>
                    {exp.current && <Badge variant="accent">{t.experience.current}</Badge>}
                  </div>
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
          </div>
        ))}
      </div>
    </section>
  );
}
