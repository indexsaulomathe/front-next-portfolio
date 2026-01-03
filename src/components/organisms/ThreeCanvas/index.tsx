"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import ThreeScene from "@/components/organisms/ThreeScene";

export default function ThreeCanvas() {
    return (
        <div className="h-[420px] w-full rounded-2xl overflow-hidden border border-white/10 bg-black/40">
            <Canvas
                camera={{ position: [0, 0, 6], fov: 50 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true }}
            >
                <Suspense fallback={null}>
                    <ThreeScene />
                </Suspense>
            </Canvas>
        </div>
    );
}
