import { notFound } from "next/navigation";
import type { Metadata } from "next";

import ProjectDetailsTemplate from "@/components/templates/ProjectDetailsTemplate";
import { projects } from "@/shared/data/projects";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) return { title: "Projeto não encontrado" };

  return {
    title: `${project.title} • Saulo Matheus`,
    description: project.description,
  };
}

export default async function ProjectSlugPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  return <ProjectDetailsTemplate project={project} />;
}
