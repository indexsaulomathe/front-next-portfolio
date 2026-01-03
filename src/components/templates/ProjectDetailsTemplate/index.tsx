import Container from "@/components/atoms/Container";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Text from "@/components/atoms/Typography/Text";
import Title from "@/components/atoms/Typography/Title";
import Navbar from "@/components/organisms/Navbar";
import type { Project } from "@/shared/data/projects";

interface ProjectDetailsTemplateProps {
  project: Project;
  openLinksInNewTab?: boolean;
}

type LinkButtonProps = {
  href: string;
  children: React.ReactNode;
  variant: "primary" | "secondary" | "ghost";
  openInNewTab?: boolean;
};

function LinkButton({ href, children, variant, openInNewTab }: LinkButtonProps) {
  if (openInNewTab) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        <Button variant={variant}>{children}</Button>
      </a>
    );
  }

  return (
    <Button as="link" href={href} variant={variant}>
      {children}
    </Button>
  );
}

export default function ProjectDetailsTemplate({
  project,
  openLinksInNewTab,
}: ProjectDetailsTemplateProps) {
  const currentYear = new Date().getFullYear();

  const shouldOpenInNewTab =
    openLinksInNewTab ?? project.openLinksInNewTab ?? false;

  const links = project.links;
  const hasLinks = Boolean(links?.github || links?.demo || links?.site);

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-black to-slate-900 text-white">
      <Navbar />

      <Container>
        <header className="pt-12 pb-8 sm:pt-16 sm:pb-12">
          <Button
            as="link"
            href="/projects"
            variant="ghost"
            aria-label="Voltar para lista de projetos"
          >
            ← Voltar para projetos
          </Button>

          <Title level="h1" className="mt-6">
            {project.title}
          </Title>

          <Text size="lg" className="mt-4 max-w-2xl">
            {project.description}
          </Text>

          {project.tags?.length ? (
            <div
              className="mt-5 flex flex-wrap gap-2"
              aria-label="Tecnologias e tópicos do projeto"
            >
              {project.tags.map((tag) => (
                <Badge key={tag} variant="accent">
                  {tag}
                </Badge>
              ))}
            </div>
          ) : null}

          {hasLinks ? (
            <div className="mt-6 flex gap-3 flex-wrap" aria-label="Links do projeto">
              {links?.site ? (
                <LinkButton
                  href={links.site}
                  variant="primary"
                  openInNewTab={shouldOpenInNewTab}
                >
                  Acessar site
                </LinkButton>
              ) : null}

              {links?.demo ? (
                <LinkButton
                  href={links.demo}
                  variant="primary"
                  openInNewTab={shouldOpenInNewTab}
                >
                  Ver Demo
                </LinkButton>
              ) : null}

              {links?.github ? (
                <LinkButton
                  href={links.github}
                  variant="secondary"
                  openInNewTab={shouldOpenInNewTab}
                >
                  Código no GitHub
                </LinkButton>
              ) : null}
            </div>
          ) : null}
        </header>

        <section
          className="pb-16 border-t border-white/10 pt-12"
          aria-labelledby="case-study-title"
        >
          <div className="max-w-3xl">
            <h2
              id="case-study-title"
              className="text-2xl font-bold text-white mb-4"
            >
              Case Study
            </h2>

            {project.content ? (
              <Text size="lg" color="default">
                {project.content}
              </Text>
            ) : (
              <div
                className="border border-white/10 rounded-xl p-6 bg-white/5"
                role="note"
                aria-label="Conteúdo do case study ainda não disponível"
              >
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
