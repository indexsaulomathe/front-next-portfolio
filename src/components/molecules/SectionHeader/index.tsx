import Title from "@/components/atoms/Typography/Title";
import Text from "@/components/atoms/Typography/Text";

interface SectionHeaderProps {
    title: string;
    subtitle?: string;
}

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
    return (
        <div className="mb-8">
            <Title>{title}</Title>
            {subtitle && (
                <Text size="base" color="muted" className="mt-2 max-w-2xl">
                    {subtitle}
                </Text>
            )}
        </div>
    );
}
