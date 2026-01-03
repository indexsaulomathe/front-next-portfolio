import Navbar from "@/components/organisms/Navbar";
import Hero from "@/components/organisms/Hero";
import ProjectsGrid from "@/components/organisms/ProjectsGrid";
import Skills from "@/components/organisms/Skills";
import ContactCard from "@/components/organisms/ContactCard";
import Container from "@/components/atoms/Container";
import { projects } from "@/shared/data/projects";

export default function HomeTemplate() {
    const currentYear = new Date().getFullYear();

    return (
        <main className="min-h-screen bg-gradient-to-br from-black via-black to-slate-900 text-white">
            <Navbar />
            <Hero />

            <Container>
                <ProjectsGrid projects={projects} />
                <Skills />
                <ContactCard />

                <footer className="border-t border-white/10 mt-16 pt-8 pb-6 text-center text-white/40 text-xs sm:text-sm">
                    © {currentYear} • Saulo Matheus. Todos os direitos reservados.
                </footer>
            </Container>
        </main>
    );
}
