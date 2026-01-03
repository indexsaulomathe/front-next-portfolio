"use client";

import { useEffect, useRef } from "react";

export default function MatrixRain() {
    const ref = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
        const canvas = ref.current!;
        const ctx = canvas.getContext("2d")!;
        let w = (canvas.width = window.innerWidth);
        let h = (canvas.height = window.innerHeight);

        const chars = "アイウエオカキクケコサシスセソ0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        const fontSize = 14;
        let columns = Math.floor(w / fontSize);
        let drops = Array.from({ length: columns }, () => Math.random() * h);

        const onResize = () => {
            w = canvas.width = window.innerWidth;
            h = canvas.height = window.innerHeight;
            columns = Math.floor(w / fontSize);
            drops = Array.from({ length: columns }, () => Math.random() * h);
        };

        window.addEventListener("resize", onResize);

        let raf = 0;
        const draw = () => {
            // “fade” do frame anterior
            ctx.fillStyle = "rgba(0, 0, 0, 0.07)";
            ctx.fillRect(0, 0, w, h);

            ctx.font = `${fontSize}px monospace`;
            ctx.fillStyle = "rgba(0, 255, 102, 0.55)";

            for (let i = 0; i < drops.length; i++) {
                const text = chars[Math.floor(Math.random() * chars.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);

                if (drops[i] * fontSize > h && Math.random() > 0.975) drops[i] = 0;
                drops[i] += 1;
            }

            raf = requestAnimationFrame(draw);
        };

        draw();

        return () => {
            cancelAnimationFrame(raf);
            window.removeEventListener("resize", onResize);
        };
    }, []);

    return (
        <canvas
            ref={ref}
            className="fixed inset-0 -z-10 opacity-70"
            aria-hidden="true"
        />
    );
}
