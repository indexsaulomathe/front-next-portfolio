import Container from "@/components/atoms/Container";
import Button from "@/components/atoms/Button";

const navItems = [
    { label: "Projetos", href: "#projects" },
    { label: "Skills", href: "#skills" },
    { label: "Contato", href: "#contact" },
];

export default function Navbar() {
    return (
        <header className="sticky top-0 z-50 border-b border-white/10 bg-black/30 backdrop-blur-md">
            <Container>
                <div className="flex h-16 items-center justify-between">
                    <a href="/" className="flex items-center gap-2">
                        <div className="h-10 w-10 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center justify-center">
                            <span className="text-xs font-bold text-green-400">SM</span>
                        </div>
                        <div>
                            <div className="text-sm font-semibold text-white">Saulo Matheus</div>
                            <div className="text-xs text-white/50">Backend • NestJS</div>
                        </div>
                    </a>

                    <nav className="hidden md:flex items-center gap-8">
                        {navItems.map((item) => (
                            <a
                                key={item.href}
                                href={item.href}
                                className="text-sm text-white/70 hover:text-white transition-colors"
                            >
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    <Button as="link" href="#contact" variant="secondary" className="h-10 px-4">
                        Contato
                    </Button>
                </div>
            </Container>
        </header>
    );
}
