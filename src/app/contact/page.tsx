import type { Metadata } from "next";
import ContactTemplate from "@/components/templates/ContactTemplate";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fala com Saulo Matheus sobre oportunidades e projetos de backend.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return <ContactTemplate />;
}
