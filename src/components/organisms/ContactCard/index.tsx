import SectionHeader from "@/components/molecules/SectionHeader";
import Button from "@/components/atoms/Button";

const contactLinks = [
    { label: "Email", value: "seuemail@dominio.com", href: "mailto:seuemail@dominio.com" },
    { label: "LinkedIn", value: "/in/seu-perfil", href: "#" },
    { label: "GitHub", value: "github.com/seuuser", href: "#" },
];

export default function ContactCard() {
    return (
        <section id="contact" className="py-12 sm:py-16">
            <SectionHeader
                title="Contato"
                subtitle="Bora conversar sobre oportunidades e projetos."
            />

            <div className="border border-white/10 rounded-xl p-6 bg-white/5 backdrop-blur">
                <div className="grid gap-8 md:grid-cols-2">
                    <div className="space-y-3">
                        {contactLinks.map((link) => (
                            <div key={link.label} className="text-sm">
                                <p className="text-white/60">{link.label}</p>
                                <a
                                    href={link.href}
                                    className="text-green-400 hover:text-green-300 transition-colors font-medium"
                                >
                                    {link.value}
                                </a>
                            </div>
                        ))}
                    </div>

                    <div className="flex flex-col sm:flex-row md:justify-end gap-3">
                        <Button as="link" href="mailto:seuemail@dominio.com" variant="primary">
                            Enviar email
                        </Button>
                        <Button as="link" href="/projects" variant="secondary">
                            Ver projetos
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
