interface TextProps {
    children: React.ReactNode;
    size?: "sm" | "base" | "lg";
    color?: "default" | "muted";
    className?: string;
}

const sizeStyles = {
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
};

const colorStyles = {
    default: "text-white",
    muted: "text-white/60",
};

export default function Text({ children, size = "base", color = "muted", className = "" }: TextProps) {
    return (
        <p className={`${sizeStyles[size]} ${colorStyles[color]} leading-relaxed ${className}`}>
            {children}
        </p>
    );
}
