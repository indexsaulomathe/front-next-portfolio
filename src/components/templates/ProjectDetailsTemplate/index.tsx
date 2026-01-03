import Container from "@/components/atoms/Container";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Text from "@/components/atoms/Typography/Text";
import Title from "@/components/atoms/Typography/Title";
import Navbar from "@/components/organisms/Navbar";
import type { Project } from "@/shared/data/projects";

interface ProjectDetailsTemplateProps {
  project: Project;
}

export default function ProjectDetailsTemplate({ project }: ProjectDetailsTemplateProps) {
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-black to-slate-900 text-white">
      <Navbar />

      <Container>
        <header className="pt-12 pb-8 sm:pt-16 sm:pb-12">
          <Button as="link" href="/projects" variant="ghost">
            ← Voltar para projetos
          </Button>

          <Title level="h1" className="mt-6">
            {project.title}
          </Title>

          <Text size="lg" className="mt-4 max-w-2xl">
            {project.description}
          </Text>

          <div className="mt-5 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="accent">
                {tag}
              </Badge>
            ))}
          </div>

          {project.links?.github || project.links?.demo ? (
            <div className="mt-6 flex gap-3 flex-wrap">
              {project.links?.github && (
                <Button
                  as="link"
                  href={project.links.github}
                  variant="secondary"
                >
                  Código no GitHub
                </Button>
              )}

              {project.links?.demo && (
                <Button
                  as="link"
                  href={project.links.demo}
                  variant="primary"
                >
                  Ver Demo
                </Button>
              )}
            </div>
          ) : null}
        </header>

        <section className="pb-16 border-t border-white/10 pt-12">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-white mb-4">Case Study</h2>
            {project.content ? (
              <Text size="lg" color="default">
                {project.content}
              </Text>
            ) : (
              <div className="border border-white/10 rounded-xl p-6 bg-white/5">
                <p className="text-white/60">
                  Detalhe completo do projeto: problema → solução → impacto → trade-offs.
                </p>
              </div>
            )}
          </div>
        </section>

        <footer className="border-t border-white/10 mt-16 pt-8 pb-6 text-center text-white/40 text-xs sm:text-sm">
          © {currentYear} • Saulo Matheus. Todos os direitos reservados.
        </footer>
      </Container>
    </main>
  );
}
