interface BadgeProps {
    children: React.ReactNode;
    variant?: "default" | "accent";
}

export default function Badge({ children, variant = "default" }: BadgeProps) {
    const baseStyles = "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-medium transition-colors";
    const variants = {
        default: "border border-theme bg-theme-surface text-theme-secondary hover:bg-theme-surface-hover",
        accent: "border border-green-500/30 bg-green-500/10 text-green-600 dark:text-green-300",
    };

    return (
        <span className={`${baseStyles} ${variants[variant]}`}>
            {children}
        </span>
    );
}
