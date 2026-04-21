"use client";

import Navbar from "@/components/organisms/Navbar";
import Hero from "@/components/organisms/Hero";
import ProjectsGrid from "@/components/organisms/ProjectsGrid";
import Experience from "@/components/organisms/Experience";
import Skills from "@/components/organisms/Skills";
import ContactCard from "@/components/organisms/ContactCard";
import Container from "@/components/atoms/Container";
import { projects } from "@/shared/data/projects";
import { useLanguage } from "@/i18n/LanguageContext";

export default function HomeTemplate() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen text-theme">
      <Navbar />
      <Hero />

      <Container>
        <ProjectsGrid projects={projects} />
        <Experience />
        <Skills />
        <ContactCard />

        <footer className="border-t border-theme mt-16 pt-8 pb-6 text-center text-theme-faint text-xs sm:text-sm">
          © {currentYear} • Saulo Matheus. {t.footer}
        </footer>
      </Container>
    </main>
  );
}
