import Link from "next/link";
import { ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost";

type ButtonProps = {
    variant?: Variant;
    children: ReactNode;
    className?: string;
    onClick?: () => void;
    type?: "button" | "submit";
};

type LinkButtonProps = ButtonProps & {
    href: string;
};

type Props = ButtonProps | (LinkButtonProps & { as: "link" });

const baseStyles =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black";

const variants: Record<Variant, string> = {
    primary: "bg-green-500 text-black hover:bg-green-400 focus:ring-green-500",
    secondary: "border border-white/20 bg-white/5 text-white hover:bg-white/10 focus:ring-green-500",
    ghost: "text-white/70 hover:text-white",
};

export default function Button(props: Props) {
    const variant = props.variant ?? "primary";
    const className = `${baseStyles} ${variants[variant]} ${props.className ?? ""}`;

    if ("as" in props && props.as === "link") {
        return (
            <Link href={props.href} className={className}>
                {props.children}
            </Link>
        );
    }

    return (
        <button
            type={(props as ButtonProps).type ?? "button"}
            onClick={(props as ButtonProps).onClick}
            className={className}
        >
            {props.children}
        </button>
    );
}
