"use client";

import Container from "@/components/atoms/Container";
import Navbar from "@/components/organisms/Navbar";
import Title from "@/components/atoms/Typography/Title";
import Text from "@/components/atoms/Typography/Text";
import ContactForm from "@/components/organisms/ContactForm";
import { useLanguage } from "@/i18n/LanguageContext";
import { contactLinks } from "@/shared/data/contact-links";

export default function ContactTemplate() {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <main className="min-h-screen text-theme">
      <Navbar />

      <Container>
        <header className="pt-12 pb-10 sm:pt-16 sm:pb-12">
          <Title level="h1" className="text-theme">
            {t.contact.title}
          </Title>
          <Text size="lg" className="mt-4 max-w-2xl text-theme-secondary">
            {t.contact.subtitle}
          </Text>
        </header>

        <div className="grid gap-8 lg:grid-cols-[1fr_320px] pb-16">
          <div className="border border-theme rounded-xl p-6 bg-theme-surface backdrop-blur">
            <ContactForm />
          </div>

          <div className="border border-theme rounded-xl p-6 bg-theme-surface backdrop-blur h-fit space-y-4">
            {contactLinks.map((link) => (
              <div key={link.label} className="text-sm">
                <p className="text-theme-muted">{link.label}</p>
                <a
                  href={link.href}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="text-green-400 hover:text-green-300 transition-colors font-medium break-all"
                >
                  {link.value}
                </a>
              </div>
            ))}
          </div>
        </div>

        <footer className="border-t border-theme mt-4 pt-8 pb-6 text-center text-theme-faint text-xs sm:text-sm">
          © {currentYear} • Saulo Matheus. {t.footer}
        </footer>
      </Container>
    </main>
  );
}
