"use client";

import { usePathname } from "next/navigation";
import Container from "@/components/atoms/Container";
import Button from "@/components/atoms/Button";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";
import { useTheme } from "@/i18n/ThemeContext";
import type { Locale } from "@/i18n/translations";

type Hash = "#projects" | "#experience" | "#skills" | "#contact";

export default function Navbar() {
  const pathname = usePathname();
  const { t, locale, setLocale } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const isHome =
    pathname === "/" ||
    pathname === "/front-next-portfolio" ||
    pathname === "/front-next-portfolio/";

  const navItems = [
    { label: t.nav.projects, hash: "#projects" as Hash },
    { label: t.nav.experience, hash: "#experience" as Hash },
    { label: t.nav.skills, hash: "#skills" as Hash },
    { label: t.nav.contact, hash: "#contact" as Hash },
  ];

  const buildHref = (hash: Hash) => (isHome ? hash : `/${hash}`);
  const otherLocale: Locale = locale === "en" ? "pt" : "en";

  return (
    <header
      className="sticky top-0 z-50 border-b border-theme backdrop-blur-md"
      style={{ background: "var(--navbar-bg)" }}
    >
      <Container>
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2" aria-label="Home">
            <div className="h-10 w-10 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center justify-center">
              <span className="text-xs font-bold text-green-400">SM</span>
            </div>
            <div>
              <div className="text-sm font-semibold text-theme">Saulo Matheus</div>
              <div className="text-xs text-theme-subtle">Backend • NestJS</div>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.hash}
                href={buildHref(item.hash)}
                className="text-sm text-theme-secondary hover:text-green-400 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="text-xs text-theme-subtle hover:text-green-400 transition-colors px-2 py-1 border border-theme rounded-md hover:border-green-400/40"
              aria-label="Toggle theme"
            >
              {theme === "dark" ? "☀" : "☾"}
            </button>

            <button
              onClick={() => setLocale(otherLocale)}
              className="text-xs font-medium text-theme-subtle hover:text-green-400 transition-colors px-2 py-1 border border-theme rounded-md hover:border-green-400/40"
              aria-label="Switch language"
            >
              {otherLocale.toUpperCase()}
            </button>

            <Button
              as="link"
              href={buildHref("#contact")}
              variant="secondary"
              className="h-10 px-4"
            >
              {t.nav.contactBtn}
            </Button>
          </div>
        </div>
      </Container>
    </header>
  );
}
