"use client";

import { useState } from "react";
import { useIdleScreen } from "@/hooks/useIdleScreen";
import MatrixFaceCanvas from "@/components/organisms/MatrixFaceCanvas";

type MatrixChar = {
    left: number;
    duration: number;
    delay: number;
    char: string;
    fontSize: number;
    opacity: number;
};

function createMatrixChars(count = 40): MatrixChar[] {
    return Array.from({ length: count }, () => ({
        left: Math.random() * 100,
        duration: 3 + Math.random() * 4,
        delay: Math.random() * 2,
        char: String.fromCharCode(33 + Math.floor(Math.random() * 94)),
        fontSize: 10 + Math.random() * 10,
        opacity: 0.15 + Math.random() * 0.35,
    }));
}

function IdleOverlayContent({ onDismiss }: { onDismiss: () => void }) {
    const [matrixChars] = useState<MatrixChar[]>(() => createMatrixChars(40));

    return (
        <div
            className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-sm cursor-pointer"
            onClick={onDismiss}
        >
            {/* Matrix Rain */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {matrixChars.map((c, i) => (
                    <div
                        key={i}
                        className="absolute text-green-400 font-mono animate-[matrix-fall_linear_infinite]"
                        style={{
                            left: `${c.left}%`,
                            top: `-20px`,
                            animationDuration: `${c.duration}s`,
                            animationDelay: `${c.delay}s`,
                            fontSize: `${c.fontSize}px`,
                            opacity: c.opacity,
                        }}
                    >
                        {c.char}
                    </div>
                ))}
            </div>

            {/* Cabeça 3D */}
            <div className="absolute inset-0 flex items-center justify-center px-4 pointer-events-none">
                <div className="w-full max-w-[680px]">
                    <MatrixFaceCanvas />

                    <div className="mt-4 text-center">
                        <p className="text-white/80 font-mono text-sm">
                            Aguardando atividade...
                        </p>
                        <p className="text-white/40 font-mono text-xs mt-2">
                            Clique para continuar
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
        @keyframes matrix-fall {
          0% { transform: translateY(0); opacity: 0.8; }
          100% { transform: translateY(100vh); opacity: 0; }
        }
        .animate-\\[matrix-fall_linear_infinite\\] {
          animation-name: matrix-fall;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
      `}</style>
        </div>
    );
}

export default function IdleScreenOverlay() {
    const isIdle = useIdleScreen(1); // 1 minuto
    const [dismissed, setDismissed] = useState(false);

    if (!isIdle && dismissed) {
        setDismissed(false);
    }

    if (!isIdle || dismissed) return null;

    return <IdleOverlayContent onDismiss={() => setDismissed(true)} />;
}
