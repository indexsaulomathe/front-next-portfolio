"use client";

import { Float, OrbitControls, Stars } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import * as THREE from "three";

function Knot() {
    const mesh = useRef<THREE.Mesh>(null);
    const [hover, setHover] = useState(false);

    const material = useMemo(
        () =>
            new THREE.MeshStandardMaterial({
                metalness: 0.7,
                roughness: 0.25,
            }),
        []
    );

    useFrame(() => {
        if (!mesh.current) return;
        mesh.current.rotation.x += 0.005;
        mesh.current.rotation.y += 0.007;

        mesh.current.scale.setScalar(hover ? 1.12 : 1);
        material.color.lerp(new THREE.Color(hover ? "#7c3aed" : "#22c55e"), 0.08);
    });

    return (
        <Float speed={1.2} rotationIntensity={0.6} floatIntensity={0.8}>
            <mesh
                ref={mesh}
                material={material}
                onPointerEnter={() => setHover(true)}
                onPointerLeave={() => setHover(false)}
            >
                <torusKnotGeometry args={[1, 0.35, 160, 16]} />
            </mesh>
        </Float>
    );
}

export default function ThreeScene() {
    return (
        <>
            <color attach="background" args={["#050510"]} />
            <Stars radius={60} depth={40} count={1400} factor={3} fade speed={1} />

            <ambientLight intensity={0.6} />
            <directionalLight position={[5, 5, 5]} intensity={1.2} />
            <pointLight position={[-6, -2, 4]} intensity={1.1} />

            <Knot />

            <OrbitControls
                enablePan={false}
                enableZoom={false}
                maxPolarAngle={Math.PI / 1.7}
                minPolarAngle={Math.PI / 2.6}
            />
        </>
    );
}
