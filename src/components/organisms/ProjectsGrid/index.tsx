import SectionHeader from "@/components/molecules/SectionHeader";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Link from "next/link";
import type { Project } from "@/shared/data/projects";

interface ProjectsGridProps {
    projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
    return (
        <section id="projects" className="py-12 sm:py-16">
            <SectionHeader
                title="Projetos"
                subtitle="Seleção dos trabalhos com foco em impacto, decisões técnicas e resultados."
            />

            <div className="grid gap-4 sm:gap-5 md:grid-cols-2">
                {projects.map((project) => (
                    <Link
                        key={project.slug}
                        href={`/projects/${project.slug}`}
                        className="border border-white/10 rounded-xl p-6 bg-white/5 backdrop-blur hover:bg-white/10 transition-colors group"
                    >
                        <div className="flex items-start justify-between gap-4">
                            <h3 className="text-base sm:text-lg font-semibold text-white group-hover:text-green-400 transition-colors">
                                {project.title}
                            </h3>
                            <span className="text-xs text-green-400 font-medium">CASE</span>
                        </div>

                        <p className="mt-3 text-sm text-white/60 leading-relaxed">
                            {project.description}
                        </p>

                        <div className="mt-4 flex flex-wrap gap-2">
                            {project.tags.slice(0, 4).map((tag) => (
                                <Badge key={tag} variant="default">
                                    {tag}
                                </Badge>
                            ))}
                        </div>

                        <div className="mt-5">
                            <Button as="link" href={`/projects/${project.slug}`} variant="ghost">
                                Ver case study →
                            </Button>
                        </div>
                    </Link>
                ))}
            </div>

            <div className="mt-6">
                <Button as="link" href="/projects" variant="secondary">
                    Ver todos os projetos
                </Button>
            </div>
        </section>
    );
}
