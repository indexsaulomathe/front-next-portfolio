"use client";

import Container from "@/components/atoms/Container";
import Badge from "@/components/atoms/Badge";
import Button from "@/components/atoms/Button";
import Text from "@/components/atoms/Typography/Text";
import Title from "@/components/atoms/Typography/Title";
import Navbar from "@/components/organisms/Navbar";
import type { Project } from "@/shared/data/projects";
import { useLanguage } from "@/i18n/LanguageContext";

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
  const { t, locale } = useLanguage();
  const currentYear = new Date().getFullYear();

  const shouldOpenInNewTab = openLinksInNewTab ?? project.openLinksInNewTab ?? false;
  const links = project.links;
  const hasLinks = Boolean(links?.github || links?.demo || links?.site);

  const title = locale === "en" && project.titleEn ? project.titleEn : project.title;
  const description =
    locale === "en" && project.descriptionEn ? project.descriptionEn : project.description;
  const content = locale === "en" && project.contentEn ? project.contentEn : project.content;

  const labels =
    locale === "en"
      ? {
          back: "← Back to projects",
          visitSite: "Visit site",
          viewDemo: "View Demo",
          viewCode: "Code on GitHub",
          caseStudy: "Case Study",
          noContent: "Full project detail: problem → solution → impact → trade-offs.",
        }
      : {
          back: "← Voltar para projetos",
          visitSite: "Acessar site",
          viewDemo: "Ver Demo",
          viewCode: "Código no GitHub",
          caseStudy: "Case Study",
          noContent: "Detalhe completo do projeto: problema → solução → impacto → trade-offs.",
        };

  return (
    <main className="min-h-screen text-theme">
      <Navbar />

      <Container>
        <header className="pt-12 pb-8 sm:pt-16 sm:pb-12">
          <Button as="link" href="/projects" variant="ghost" aria-label={labels.back}>
            {labels.back}
          </Button>

          <Title level="h1" className="mt-6 text-theme">
            {title}
          </Title>

          <Text size="lg" className="mt-4 max-w-2xl text-theme-secondary">
            {description}
          </Text>

          {project.tags?.length ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="accent">
                  {tag}
                </Badge>
              ))}
            </div>
          ) : null}

          {hasLinks ? (
            <div className="mt-6 flex gap-3 flex-wrap">
              {links?.site ? (
                <LinkButton href={links.site} variant="primary" openInNewTab={shouldOpenInNewTab}>
                  {labels.visitSite}
                </LinkButton>
              ) : null}
              {links?.demo ? (
                <LinkButton href={links.demo} variant="primary" openInNewTab={shouldOpenInNewTab}>
                  {labels.viewDemo}
                </LinkButton>
              ) : null}
              {links?.github ? (
                <LinkButton href={links.github} variant="secondary" openInNewTab={shouldOpenInNewTab}>
                  {labels.viewCode}
                </LinkButton>
              ) : null}
            </div>
          ) : null}
        </header>

        <section className="pb-16 border-t border-theme pt-12">
          <div className="max-w-3xl">
            <h2 className="text-2xl font-bold text-theme mb-4">{labels.caseStudy}</h2>

            {content ? (
              <Text size="lg" className="text-theme-secondary">
                {content}
              </Text>
            ) : (
              <div className="border border-theme rounded-xl p-6 bg-theme-surface" role="note">
                <p className="text-theme-muted">{labels.noContent}</p>
              </div>
            )}
          </div>
        </section>

        <footer className="border-t border-theme mt-16 pt-8 pb-6 text-center text-theme-faint text-xs sm:text-sm">
          © {currentYear} • Saulo Matheus. {t.footer}
        </footer>
      </Container>
    </main>
  );
}
