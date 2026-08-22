import type { Metadata } from "next";
import ProjectsTemplate from "@/components/templates/ProjectsTemplate";
import ProjectsGrid from "@/components/organisms/ProjectsGrid";
import { projects } from "@/shared/data/projects";
import { FC } from "react";

interface ProjectsGridProps {
  projects: typeof projects;
}

const TypedProjectsGrid: FC<ProjectsGridProps> = ProjectsGrid;

export const metadata: Metadata = {
  title: "Projetos",
  description:
    "Projetos backend de Saulo Matheus: NestJS, Node.js, TypeScript, microsserviços e integrações com RabbitMQ.",
  alternates: { canonical: "/projects" },
};

export default function ProjectsPage() {
  return (
    <ProjectsTemplate>
      <TypedProjectsGrid projects={projects} />
    </ProjectsTemplate>
  );
}
