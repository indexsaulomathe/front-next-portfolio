"use client";

import Container from "@/components/atoms/Container";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import Title from "@/components/atoms/Typography/Title";
import Text from "@/components/atoms/Typography/Text";
import { useLanguage } from "@/i18n/LanguageContext";

const skills = ["NestJS", "Node.js", "TypeScript", "RabbitMQ", "Docker", "AWS"];

export default function Hero() {
  const { t } = useLanguage();
  const s = t.hero;
  const st = s.status;

  const statusItems = [
    { label: st.currentRole, value: st.currentRoleValue },
    { label: st.location, value: st.locationValue },
    { label: st.focus, value: st.focusValue },
    { label: st.openTo, value: st.openToValue },
  ];

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
              <span className="text-green-400">{s.titleHighlight}</span> {s.title}
            </Title>

            <Text size="lg" className="mt-4 max-w-xl">
              {s.description}
            </Text>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <Button href="#projects" as="link" variant="primary">
                {s.btnProjects}
              </Button>
              <Button href="#experience" as="link" variant="secondary">
                {s.btnExperience}
              </Button>
              <Button href="#contact" as="link" variant="ghost">
                {s.btnContact}
              </Button>
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <Button
                href="https://www.linkedin.com/in/indexsaulomathe/"
                as="link"
                variant="ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </Button>
              <Button
                href="https://github.com/indexsaulomathe"
                as="link"
                variant="ghost"
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </Button>
            </div>

            <div className="mt-6 text-xs sm:text-sm text-theme-subtle">
              {s.stackLabel}{" "}
              <span className="text-green-400">
                NestJS • Node.js • TypeScript • RabbitMQ • Docker • AWS
              </span>
            </div>
          </div>

          <div className="border border-theme rounded-xl p-6 bg-theme-surface backdrop-blur">
            <div className="flex items-center justify-between border-b border-theme pb-3">
              <span className="text-xs text-theme-faint">/{st.label}</span>
              <span className="flex items-center gap-1.5 text-xs text-green-400 font-medium">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                {st.badge}
              </span>
            </div>

            <div className="mt-4 space-y-4">
              {statusItems.map((item) => (
                <div key={item.label} className="text-sm">
                  <p className="text-theme-faint text-xs uppercase tracking-wider">{item.label}</p>
                  <p className="text-theme-secondary mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 border-t border-theme pt-4 text-xs text-theme-faint">
              {st.footer}
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
