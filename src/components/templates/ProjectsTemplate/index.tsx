import Container from "@/components/atoms/Container";
import Navbar from "@/components/organisms/Navbar";
import Title from "@/components/atoms/Typography/Title";
import Text from "@/components/atoms/Typography/Text";

interface ProjectsTemplateProps {
  children: React.ReactNode;
}

export default function ProjectsTemplate({ children }: ProjectsTemplateProps) {
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen bg-gradient-to-br from-black via-black to-slate-900 text-white">
      <Navbar />

      <Container>
        <header className="pt-12 pb-12 sm:pt-16 sm:pb-16">
          <Title level="h1">Todos os Projetos</Title>
          <Text size="lg" className="mt-4 max-w-2xl">
            Estudos de caso curtos com foco em impacto, decisões técnicas e resultados.
          </Text>
        </header>

        {children}

        <footer className="border-t border-white/10 mt-16 pt-8 pb-6 text-center text-white/40 text-xs sm:text-sm">
          © {currentYear} • Saulo Matheus. Todos os direitos reservados.
        </footer>
      </Container>
    </main>
  );
}
