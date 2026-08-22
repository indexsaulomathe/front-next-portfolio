import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import IdleScreenProvider from "@/components/organisms/IdleScreenProvider";
import { LanguageProvider } from "@/i18n/LanguageContext";
import { ThemeProvider } from "@/i18n/ThemeContext";
import { siteMetadata } from "@/shared/seo/site-metadata";
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const title = "Saulo Matheus | Backend Software Engineer";
const description =
  "Backend Software Engineer especializado em NestJS, Node.js, TypeScript e Python, construindo microsserviços, integrações assíncronas com RabbitMQ e sistemas de pagamento escaláveis na AWS.";

export const metadata: Metadata = {
  metadataBase: new URL(`${siteMetadata.siteUrl}/`),
  title: {
    default: title,
    template: "%s | Saulo Matheus",
  },
  description,
  keywords: [
    "Saulo Matheus",
    "Backend Software Engineer",
    "NestJS",
    "Node.js",
    "TypeScript",
    "Python",
    "Microsserviços",
    "RabbitMQ",
    "PostgreSQL",
    "Docker",
    "AWS",
  ],
  authors: [{ name: siteMetadata.author, url: siteMetadata.siteUrl }],
  creator: siteMetadata.author,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title,
    description,
    url: siteMetadata.siteUrl,
    siteName: "Saulo Matheus | Backend Software Engineer",
    locale: "pt_BR",
    type: "website",
    images: [{ url: "opengraph-image.png", width: 1200, height: 630, type: "image/png" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["opengraph-image.png"],
  },
  manifest: "manifest.webmanifest",
  icons: {
    // Absolute URLs: unlike openGraph/twitter images, Next does not resolve
    // relative `icons` hrefs against metadataBase — a relative path here breaks
    // on nested routes (e.g. /projects/[slug]) since it resolves against the
    // current page URL instead of the site root.
    icon: [
      { url: `${siteMetadata.siteUrl}/icon-192.png`, sizes: "192x192", type: "image/png" },
      { url: `${siteMetadata.siteUrl}/icon-512.png`, sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: `${siteMetadata.siteUrl}/apple-touch-icon.png`, sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteMetadata.author,
  alternateName: "Saulo Matheus",
  url: siteMetadata.siteUrl,
  jobTitle: "Backend Software Engineer",
  description,
  knowsAbout: [
    "NestJS",
    "Node.js",
    "TypeScript",
    "Python",
    "RabbitMQ",
    "PostgreSQL",
    "Docker",
    "AWS",
    "Microservices",
  ],
  sameAs: [
    "https://www.linkedin.com/in/indexsaulomathe/",
    "https://github.com/indexsaulomathe",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Brasil Card Instituição de Pagamentos",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
      </head>
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
