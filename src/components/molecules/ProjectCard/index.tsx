import Badge from "@/components/atoms/Badge";
import Text from "@/components/atoms/Typography/Text";

interface ProjectCardProps {
    title: string;
    description: string;
    tags: string[];
}

export default function ProjectCard({ title, description, tags }: ProjectCardProps) {
    return (
        <div className="border border-white/10 rounded-xl bg-white/5 p-6 hover:bg-white/10 transition-colors">
            <h3 className="text-lg font-semibold text-white">{title}</h3>

            <Text size="base" className="mt-3">
                {description}
            </Text>

            <div className="mt-4 flex flex-wrap gap-2">
                {tags.map((tag) => (
                    <Badge key={tag} variant="default">
                        {tag}
                    </Badge>
                ))}
            </div>
        </div>
    );
}
