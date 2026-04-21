"use client";

import { useState } from "react";
import { useIdleScreen } from "@/hooks/useIdleScreen";
import PlaneGame from "@/components/organisms/PlaneGame";

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
    opacity: 0.1 + Math.random() * 0.25,
  }));
}

function IdleOverlayContent({ onDismiss }: { onDismiss: () => void }) {
  const [matrixChars] = useState<MatrixChar[]>(() => createMatrixChars(40));

  return (
    <div
      className="fixed inset-0 z-[9999] bg-black/85 backdrop-blur-sm cursor-pointer"
      onClick={onDismiss}
    >
      {/* Matrix rain background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {matrixChars.map((c, i) => (
          <div
            key={i}
            className="absolute text-green-400 font-mono animate-[matrix-fall_linear_infinite]"
            style={{
              left: `${c.left}%`,
              top: "-20px",
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

      {/* Game area — pointer events enabled so mouse controls plane */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center gap-4 px-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full max-w-2xl">
          <div className="border border-green-400/20 rounded-xl overflow-hidden bg-black/40"
            style={{ height: "280px" }}
          >
            <PlaneGame />
          </div>

          <div className="mt-3 text-center">
            <p className="text-white/40 font-mono text-xs">
              click outside to dismiss
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function IdleScreenOverlay() {
  const isIdle = useIdleScreen(60000);
  const [dismissed, setDismissed] = useState(false);
  const [prevIsIdle, setPrevIsIdle] = useState(isIdle);

  // Adjusting state during render — React recommended pattern for derived state.
  // When idle session starts fresh, reset dismissed without a useEffect.
  if (prevIsIdle !== isIdle) {
    setPrevIsIdle(isIdle);
    if (isIdle && dismissed) setDismissed(false);
  }

  if (!isIdle || dismissed) return null;

  return <IdleOverlayContent onDismiss={() => setDismissed(true)} />;
}
