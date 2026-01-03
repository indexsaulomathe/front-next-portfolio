import SectionHeader from "@/components/molecules/SectionHeader";
import Badge from "@/components/atoms/Badge";

const skillGroups = [
    {
        title: "Backend",
        items: ["NestJS", "TypeScript", "TypeORM", "PostgreSQL", "REST APIs"]
    },
    {
        title: "Frontend",
        items: ["React", "TypeScript", "Tailwind CSS", "Next.js", "Vue.js", "REST APIs"]
    },
    {
        title: "Infra",
        items: ["Docker", "Nginx", "CI/CD", "Cloud Deploy", "Cloudflare"]
    },
    {
        title: "Mensageria",
        items: ["RabbitMQ", "Event-driven", "Observability"]
    },
];

export default function Skills() {
    return (
        <section id="skills" className="py-12 sm:py-16">
            <SectionHeader
                title="Skills"
                subtitle="Stack e práticas que uso no dia a dia para entregar sistemas confiáveis."
            />

            <div className="grid gap-4 md:grid-cols-3">
                {skillGroups.map((group) => (
                    <div
                        key={group.title}
                        className="border border-white/10 rounded-xl p-6 bg-white/5 backdrop-blur hover:bg-white/10 transition-colors"
                    >
                        <h3 className="text-sm font-semibold text-white">
                            <span className="text-green-400">{group.title}</span>
                        </h3>
                        <div className="mt-4 flex flex-wrap gap-2">
                            {group.items.map((item) => (
                                <Badge key={item} variant="default">
                                    {item}
                                </Badge>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
