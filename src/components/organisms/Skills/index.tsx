"use client";

import SectionHeader from "@/components/molecules/SectionHeader";
import Badge from "@/components/atoms/Badge";
import { useLanguage } from "@/i18n/LanguageContext";

const skillGroups = [
  {
    title: "Backend",
    items: ["NestJS", "Node.js", "TypeScript", "TypeORM", "PostgreSQL", "REST APIs"],
  },
  {
    title: "Frontend",
    items: ["React", "Next.js", "Vue.js", "Nuxt.js", "Tailwind CSS", "TypeScript"],
  },
  {
    title: "Messaging & Infra",
    items: ["RabbitMQ", "Docker", "Nginx", "CI/CD", "Cloudflare"],
  },
  {
    title: "Cloud & Tools",
    items: ["AWS", "Git", "Clean Code", "Modular Architecture", "Agile"],
  },
];

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section id="skills" className="py-12 sm:py-16">
      <SectionHeader title={t.skills.title} subtitle={t.skills.subtitle} />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skillGroups.map((group) => (
          <div
            key={group.title}
            className="border border-theme rounded-xl p-6 bg-theme-surface backdrop-blur hover:bg-theme-surface-hover transition-colors"
          >
            <h3 className="text-sm font-semibold">
              <span className="text-green-400">{group.title}</span>
            </h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <Badge key={item} variant="default">
                  {item}
                </Badge>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
