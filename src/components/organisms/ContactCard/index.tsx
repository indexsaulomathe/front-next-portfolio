"use client";

import SectionHeader from "@/components/molecules/SectionHeader";
import Button from "@/components/atoms/Button";
import { useLanguage } from "@/i18n/LanguageContext";

const contactLinks = [
  {
    label: "Email",
    value: "saulo_matheprog@hotmail.com",
    href: "mailto:saulo_matheprog@hotmail.com",
    external: false,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/indexsaulomathe",
    href: "https://www.linkedin.com/in/indexsaulomathe/",
    external: true,
  },
  {
    label: "GitHub",
    value: "github.com/indexsaulomathe",
    href: "https://github.com/indexsaulomathe",
    external: true,
  },
];

export default function ContactCard() {
  const { t } = useLanguage();

  return (
    <section id="contact" className="py-12 sm:py-16">
      <SectionHeader title={t.contact.title} subtitle={t.contact.subtitle} />

      <div className="border border-theme rounded-xl p-6 bg-theme-surface backdrop-blur">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="space-y-4">
            {contactLinks.map((link) => (
              <div key={link.label} className="text-sm">
                <p className="text-theme-muted">{link.label}</p>
                <a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="text-green-400 hover:text-green-300 transition-colors font-medium"
                >
                  {link.value}
                </a>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row md:justify-end gap-3">
            <Button as="link" href="mailto:saulo_matheprog@hotmail.com" variant="primary">
              {t.contact.sendEmail}
            </Button>
            <Button as="link" href="/projects" variant="secondary">
              {t.contact.viewProjects}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
