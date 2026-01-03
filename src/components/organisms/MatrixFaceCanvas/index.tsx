"use client";

import { Canvas } from "@react-three/fiber";
import { Suspense } from "react";
import MatrixHeadGLB from "../MatrixHeadGLB";

export default function MatrixFaceCanvas() {
    return (
        <div className="w-full h-[520px] pointer-events-none">
            <Canvas
                camera={{ position: [0, 0.05, 2.75], fov: 45 }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true }}
            >
                <Suspense fallback={null}>
                    <MatrixHeadGLB />
                </Suspense>
            </Canvas>
        </div>
    );
}
