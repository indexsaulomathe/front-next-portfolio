"use client";

import SectionHeader from "@/components/molecules/SectionHeader";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Link from "next/link";
import type { Project } from "@/shared/data/projects";
import { useLanguage } from "@/i18n/LanguageContext";

interface ProjectsGridProps {
  projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
  const { t, locale } = useLanguage();
  const p = t.projects;

  return (
    <section id="projects" className="py-12 sm:py-16">
      <SectionHeader title={p.title} subtitle={p.subtitle} />

      <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
        {projects.map((project) => {
          const title = locale === "en" && project.titleEn ? project.titleEn : project.title;
          const description =
            locale === "en" && project.descriptionEn ? project.descriptionEn : project.description;

          return (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="border border-theme rounded-xl p-6 bg-theme-surface backdrop-blur hover:bg-theme-surface-hover transition-colors group"
            >
              <div className="flex items-start justify-between gap-4">
                <h3 className="text-base sm:text-lg font-semibold text-theme group-hover:text-green-400 transition-colors">
                  {title}
                </h3>
                <span className="text-xs text-green-400 font-medium">{p.caseLabel}</span>
              </div>

              <p className="mt-3 text-sm text-theme-muted leading-relaxed">{description}</p>

              <div className="mt-4 flex flex-wrap gap-2">
                {project.tags.slice(0, 4).map((tag) => (
                  <Badge key={tag} variant="default">
                    {tag}
                  </Badge>
                ))}
              </div>

              <div className="mt-5 text-sm text-theme-secondary group-hover:text-green-400 transition-colors">
                {p.viewCase}
              </div>
            </Link>
          );
        })}
      </div>

      <div className="mt-6">
        <Button as="link" href="/projects" variant="secondary">
          {p.viewAll}
        </Button>
      </div>
    </section>
  );
}
