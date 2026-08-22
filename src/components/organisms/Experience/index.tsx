"use client";

import SectionHeader from "@/components/molecules/SectionHeader";
import Badge from "@/components/atoms/Badge";
import { useLanguage } from "@/i18n/LanguageContext";

interface Position {
  role: string;
  period: string;
  description: string;
  skills: string[];
}

interface CompanyEntry {
  company: string;
  current: boolean;
  positions: Position[];
}

const experiences: { pt: CompanyEntry[]; en: CompanyEntry[] } = {
  pt: [
    {
      company: "Brasil Card Instituição de Pagamentos",
      current: true,
      positions: [
        {
          role: "Engenheiro de Software",
          period: "Out 2024 – Presente",
          description:
            "Desenvolvimento e manutenção de microsserviços backend com NestJS, Node.js e TypeScript para sistemas financeiros e de pagamentos. Projeto de integrações assíncronas e orientadas a eventos com RabbitMQ, garantindo comunicação confiável e desacoplada entre serviços. Otimização de APIs REST, consultas PostgreSQL e fluxos de processamento de dados de alto volume, aplicando Clean Architecture, SOLID, Repository Pattern e design modular em ambientes conteinerizados com Docker. Investigação de incidentes, gargalos de desempenho e falhas em sistemas distribuídos.",
          skills: ["NestJS", "TypeScript", "Node.js", "RabbitMQ", "PostgreSQL", "Docker"],
        },
      ],
    },
    {
      company: "Compass UOL",
      current: false,
      positions: [
        {
          role: "Programador | Python & AWS",
          period: "Fev 2025 – Jun 2026",
          description:
            "Atuação em projeto do setor bancário voltado à modernização de programas SAS e rotinas de processamento de dados bancários para Python em ambiente AWS, desenvolvendo e adaptando rotinas no AWS Glue e preservando a equivalência funcional com os processos legados. Consultas e validações com Amazon Athena sobre dados no Amazon S3. Também atuei em um protótipo com AWS Supply Planning para cenários de previsão de estoque e pedidos, preparando datasets em Python e configurando o modelo de IA/ML utilizado.",
          skills: ["Python", "SAS", "AWS Glue", "Amazon Athena", "Amazon S3", "Machine Learning"],
        },
        {
          role: "Estagiário de Programação | AWS & Machine Learning",
          period: "Jul 2024 – Jan 2025",
          description:
            "Participação no Programa de Bolsas da Compass UOL, com formação prática em computação em nuvem, desenvolvimento de software e Machine Learning. Experiência prática com Amazon EC2, AWS Lambda, Amazon SageMaker, Python, Node.js, Docker, MySQL, Terraform, Git e Scrum.",
          skills: ["AWS", "Python", "Node.js", "Docker", "Terraform", "Machine Learning"],
        },
      ],
    },
    {
      company: "Kosmo Studio",
      current: false,
      positions: [
        {
          role: "Engenheiro de Software | Full Stack",
          period: "Jan 2022 – Nov 2024",
          description:
            "Desenvolvimento de aplicações web modernas e responsivas integradas a APIs REST, utilizando Node.js, React, Vue.js, Nuxt.js e TypeScript. Participação em todo o ciclo de desenvolvimento — prototipação, implementação e deploy em produção — colaborando com equipes multidisciplinares em ambientes ágeis. Criação de componentes reutilizáveis e suporte a fluxos de integração contínua.",
          skills: ["Vue.js", "Nuxt.js", "React.js", "NestJS", "TypeScript", "Tailwind CSS"],
        },
      ],
    },
  ],
  en: [
    {
      company: "Brasil Card Instituição de Pagamentos",
      current: true,
      positions: [
        {
          role: "Software Engineer",
          period: "Oct 2024 – Present",
          description:
            "Development and maintenance of backend microservices with NestJS, Node.js and TypeScript for financial and payment systems. Design of asynchronous, event-driven integrations with RabbitMQ, ensuring reliable, decoupled communication between services. Optimization of REST APIs, PostgreSQL queries and high-volume data processing pipelines, applying Clean Architecture, SOLID, Repository Pattern and modular design in containerized environments with Docker. Investigation of incidents, performance bottlenecks and distributed-system failures.",
          skills: ["NestJS", "TypeScript", "Node.js", "RabbitMQ", "PostgreSQL", "Docker"],
        },
      ],
    },
    {
      company: "Compass UOL",
      current: false,
      positions: [
        {
          role: "Software Developer | Python & AWS",
          period: "Feb 2025 – Jun 2026",
          description:
            "Worked on a banking-sector project modernizing legacy SAS programs and banking data-processing routines into Python on AWS, developing and adapting routines in AWS Glue while preserving functional equivalence with the legacy processes. Queried and validated data with Amazon Athena over datasets in Amazon S3. Also worked on an AWS Supply Planning prototype for inventory and order forecasting scenarios, preparing datasets in Python and configuring the AI/ML model used.",
          skills: ["Python", "SAS", "AWS Glue", "Amazon Athena", "Amazon S3", "Machine Learning"],
        },
        {
          role: "Programmer Intern | AWS & Machine Learning",
          period: "Jul 2024 – Jan 2025",
          description:
            "Participated in the Compass UOL Scholarship Program, with hands-on training in cloud computing, software development and Machine Learning. Practical experience with Amazon EC2, AWS Lambda, Amazon SageMaker, Python, Node.js, Docker, MySQL, Terraform, Git and Scrum.",
          skills: ["AWS", "Python", "Node.js", "Docker", "Terraform", "Machine Learning"],
        },
      ],
    },
    {
      company: "Kosmo Studio",
      current: false,
      positions: [
        {
          role: "Software Engineer | Full Stack",
          period: "Jan 2022 – Nov 2024",
          description:
            "Development of modern, responsive web applications integrated with REST APIs, using Node.js, React, Vue.js, Nuxt.js and TypeScript. Involved throughout the full development lifecycle — prototyping, implementation and production deployment — collaborating with multidisciplinary teams in agile environments. Built reusable components and supported continuous integration workflows.",
          skills: ["Vue.js", "Nuxt.js", "React.js", "NestJS", "TypeScript", "Tailwind CSS"],
        },
      ],
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
        {list.map((entry) => (
          <div key={entry.company} className="relative">
            <span
              className={`absolute -left-8 top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-theme-bg-solid ${
                entry.current ? "bg-green-400" : "bg-theme-faint"
              }`}
            >
              {entry.current && (
                <span className="absolute h-3.5 w-3.5 rounded-full bg-green-400 animate-ping opacity-60" />
              )}
            </span>

            <div className="border border-theme rounded-xl p-6 bg-theme-surface backdrop-blur hover:bg-theme-surface-hover transition-colors">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-base font-semibold text-theme">{entry.company}</h3>
                {entry.current && <Badge variant="accent">{t.experience.current}</Badge>}
              </div>
              <p className="text-theme-faint text-xs mt-0.5">{t.experience.indirect}</p>

              <div className="mt-4 space-y-4">
                {entry.positions.map((pos, i) => (
                  <div key={pos.role} className={i > 0 ? "pt-4 border-t border-theme" : ""}>
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                      <p className="text-sm font-medium text-green-400">{pos.role}</p>
                      <p className="text-theme-muted text-xs shrink-0">{pos.period}</p>
                    </div>

                    <p className="mt-2 text-sm text-theme-muted leading-relaxed">
                      {pos.description}
                    </p>

                    <div className="mt-3 flex flex-wrap gap-2">
                      {pos.skills.map((skill) => (
                        <Badge key={skill} variant="default">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
