import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import IdleScreenProvider from "@/components/organisms/IdleScreenProvider";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { ThemeProvider } from "@/i18n/ThemeContext";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Saulo Matheus | Software Engineer — Backend Specialist",
  description:
    "Software Engineer especializado em backend com NestJS, Node.js, TypeScript e microsserviços. Construindo sistemas escaláveis com RabbitMQ, Docker e AWS.",
  keywords: [
    "NestJS",
    "Node.js",
    "TypeScript",
    "Backend",
    "Microsserviços",
    "RabbitMQ",
    "Docker",
    "AWS",
    "Software Engineer",
  ],
  authors: [{ name: "Saulo Matheus de Rezende" }],
  openGraph: {
    title: "Saulo Matheus | Software Engineer — Backend Specialist",
    description:
      "Software Engineer especializado em backend com NestJS, Node.js, TypeScript e microsserviços.",
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <LanguageProvider>
            <IdleScreenProvider />
            {children}
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
