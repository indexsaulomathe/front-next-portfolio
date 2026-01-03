interface BadgeProps {
    children: React.ReactNode;
    variant?: "default" | "accent";
}

export default function Badge({ children, variant = "default" }: BadgeProps) {
    const baseStyles = "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium transition-colors";
    const variants = {
        default: "border border-white/20 bg-white/5 text-white/70 hover:bg-white/10",
        accent: "border border-green-500/30 bg-green-500/10 text-green-300",
    };

    return (
        <span className={`${baseStyles} ${variants[variant]}`}>
            {children}
        </span>
    );
}
