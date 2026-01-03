import { notFound } from "next/navigation";
import type { Metadata } from "next";

import ProjectDetailsTemplate from "@/components/templates/ProjectDetailsTemplate";
import { projects } from "@/shared/data/projects";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export function generateMetadata({ params }: PageProps): Metadata {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) return { title: "Projeto não encontrado" };

  return {
    title: `${project.title} • Saulo Matheus`,
    description: project.description,
  };
}

export default function ProjectSlugPage({ params }: PageProps) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) notFound();

  return <ProjectDetailsTemplate project={project} />;
}
