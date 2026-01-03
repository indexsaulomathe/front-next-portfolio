import ProjectDetailsTemplate from "@/components/templates/ProjectDetailsTemplate";
import { projects } from "@/shared/data/projects";
import { notFound } from "next/navigation";

type PageProps = {
  params: { slug: string };
};

export default function ProjectPage({ params }: PageProps) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return notFound();

  return <ProjectDetailsTemplate project={project} />;
}
