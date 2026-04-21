"use client";

import Container from "@/components/atoms/Container";
import Navbar from "@/components/organisms/Navbar";
import Title from "@/components/atoms/Typography/Title";
import Text from "@/components/atoms/Typography/Text";
import { useLanguage } from "@/i18n/LanguageContext";

interface ProjectsTemplateProps {
  children: React.ReactNode;
}

export default function ProjectsTemplate({ children }: ProjectsTemplateProps) {
  const { t, locale } = useLanguage();
  const currentYear = new Date().getFullYear();

  const heading = locale === "en" ? "All Projects" : "Todos os Projetos";
  const subheading =
    locale === "en"
      ? "Short case studies focused on impact, technical decisions, and results."
      : "Estudos de caso curtos com foco em impacto, decisões técnicas e resultados.";

  return (
    <main className="min-h-screen text-theme">
      <Navbar />

      <Container>
        <header className="pt-12 pb-12 sm:pt-16 sm:pb-16">
          <Title level="h1" className="text-theme">{heading}</Title>
          <Text size="lg" className="mt-4 max-w-2xl text-theme-secondary">
            {subheading}
          </Text>
        </header>

        {children}

        <footer className="border-t border-theme mt-16 pt-8 pb-6 text-center text-theme-faint text-xs sm:text-sm">
          © {currentYear} • Saulo Matheus. {t.footer}
        </footer>
      </Container>
    </main>
  );
}
