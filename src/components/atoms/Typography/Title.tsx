interface TitleProps {
    children: React.ReactNode;
    level?: "h1" | "h2" | "h3";
    className?: string;
}

const sizeStyles = {
    h1: "text-4xl md:text-5xl",
    h2: "text-3xl md:text-4xl",
    h3: "text-2xl md:text-3xl",
};

export default function Title({ children, level = "h2", className = "" }: TitleProps) {
    const Component = level;
    return (
        <Component className={`${sizeStyles[level]} font-bold tracking-tight text-white ${className}`}>
            {children}
        </Component>
    );
}
