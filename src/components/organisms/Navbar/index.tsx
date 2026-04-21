"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Container from "@/components/atoms/Container";
import Button from "@/components/atoms/Button";
import Link from "next/link";
import { useLanguage } from "@/i18n/LanguageContext";
import { useTheme } from "@/i18n/ThemeContext";
import type { Locale } from "@/i18n/translations";

const PlaneGame = dynamic(() => import("@/components/organisms/PlaneGame"), { ssr: false });

type Hash = "#projects" | "#experience" | "#skills" | "#contact";

export default function Navbar() {
  const pathname = usePathname();
  const { t, locale, setLocale } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const [gameOpen, setGameOpen] = useState(false);

  // Any keypress closes the game modal
  useEffect(() => {
    if (!gameOpen) return;
    const close = () => setGameOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [gameOpen]);

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
    <>
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
                onClick={() => setGameOpen(true)}
                className="text-xs text-theme-subtle hover:text-green-400 transition-colors px-2 py-1 border border-theme rounded-md hover:border-green-400/40"
                aria-label="Play game"
                title="Play game"
              >
                ✈
              </button>

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

      {gameOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <div className="relative">
            <button
              onClick={() => setGameOpen(false)}
              className="absolute -top-12 -right-12 z-10 w-10 h-10 flex items-center justify-center text-2xl font-bold text-green-400/70 hover:text-green-400 hover:scale-110 transition-all border border-green-500/30 rounded-full hover:border-green-400/60 bg-black/60"
              aria-label="Close game"
            >
              ✕
            </button>
            <div className="w-[min(90vw,700px)] h-[min(80vh,420px)] rounded-xl border border-green-500/30 overflow-hidden bg-[#0a0f0a]">
              <PlaneGame />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
