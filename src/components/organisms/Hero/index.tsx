import Container from "@/components/atoms/Container";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Title from "@/components/atoms/Typography/Title";
import Text from "@/components/atoms/Typography/Text";

const skills = ["NestJS", "Next.js", "Node.js", "Docker", "RabbitMQ"];

const features = [
  "Interfaces modernas com React/Next.js",
  "APIs REST robustas com NestJS",
  "Pipelines event-driven e real-time",
  "Docker, CI-CD e Cloud deploy",
];

export default function Hero() {
  return (
    <section className="pt-12 sm:pt-16 lg:pt-20 pb-10">
      <Container>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <Badge key={skill}>{skill}</Badge>
              ))}
            </div>

            <Title level="h1" className="mt-6">
              Portfolio de<span className="text-green-400"> Saulo Matheus</span> com Projetos Reais
            </Title>

            <Text size="lg" className="mt-4 max-w-xl">
              Desenvolvo soluções completas com Vue, Next.js e NestJS, criando interfaces modernas e backends robustos com foco em performance, escalabilidade e experiência do usuário.
            </Text>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button href="#projects" as="link" variant="primary">
                Ver projetos
              </Button>
              <Button href="/projects" as="link" variant="secondary">
                Página de projetos
              </Button>
              <Button href="#contact" as="link" variant="ghost">
                Contato
              </Button>
            </div>

            <div className="mt-6 text-xs sm:text-sm text-white/50">
              Stack: <span className="text-green-400">NestJS • Next.js • Node.js • RabbitMQ • Docker • Deploy</span>
            </div>
          </div>

          {/* Status Card */}
          <div className="border border-white/10 rounded-xl p-6 bg-white/5 backdrop-blur">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs text-white/60">/status</span>
              <span className="text-xs text-green-400 font-medium">ONLINE</span>
            </div>

            <div className="mt-4 space-y-3">
              {features.map((feature) => (
                <div key={feature} className="text-sm text-white/70">
                  <span className="text-green-400 mr-2">✓</span> {feature}
                </div>
              ))}
            </div>

            <div className="mt-5 border-t border-white/10 pt-4 text-xs text-white/40">
              Desenvolvendo soluções backend escaláveis e confiáveis.
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
