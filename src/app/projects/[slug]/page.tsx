import ProjectDetailsTemplate from "@/components/templates/ProjectDetailsTemplate";
import { projects } from "@/shared/data/projects";
import { notFound } from "next/navigation";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return notFound();

  return <ProjectDetailsTemplate project={project} />;
}
