import ProjectsTemplate from "@/components/templates/ProjectsTemplate";
import ProjectsGrid from "@/components/organisms/ProjectsGrid";
import { projects } from "@/shared/data/projects";
import { FC } from "react";

interface ProjectsGridProps {
  projects: typeof projects;
}

const TypedProjectsGrid: FC<ProjectsGridProps> = ProjectsGrid;

export default function ProjectsPage() {
  return (
    <ProjectsTemplate>
      <TypedProjectsGrid projects={projects} />
    </ProjectsTemplate>
  );
}
