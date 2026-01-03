"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import * as THREE from "three";

type Props = {
  url?: string;
};

export default function MatrixHeadGLB({ url = "models/head.glb" }: Props) {
  const gltf = useGLTF(url);

  const groupRef = useRef<THREE.Group>(null);
  const baseRef = useRef<THREE.Points>(null);
  const glowRef = useRef<THREE.Points>(null);


  const geometry = useMemo(() => {
    const geometries: THREE.BufferGeometry[] = [];

    gltf.scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) geometries.push(mesh.geometry);
      }
    });

    const merged = new THREE.BufferGeometry();
    const positions: number[] = [];

    for (const g of geometries) {
      const pos = g.attributes.position as THREE.BufferAttribute | undefined;
      if (!pos) continue;

      for (let i = 0; i < pos.count; i++) {
        positions.push(pos.getX(i), pos.getY(i), pos.getZ(i));
      }
    }

    merged.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(new Float32Array(positions), 3)
    );

    merged.computeBoundingBox();
    const box = merged.boundingBox!;
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const scale = 2.1 / Math.max(size.x, size.y, size.z);
    const posAttr = merged.attributes.position as THREE.BufferAttribute;

    for (let i = 0; i < posAttr.count; i++) {
      posAttr.setXYZ(
        i,
        (posAttr.getX(i) - center.x) * scale,
        (posAttr.getY(i) - center.y) * scale,
        (posAttr.getZ(i) - center.z) * scale
      );
    }

    posAttr.needsUpdate = true;
    merged.computeBoundingSphere();

    return merged;
  }, [gltf.scene]);

  const baseMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: "#00ff66",
        size: 0.0095,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.92,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  const glowMaterial = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: "#00ff66",
        size: 0.018,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.16,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      }),
    []
  );

  useFrame(({ mouse, clock }) => {
    const t = clock.getElapsedTime();
    const group = groupRef.current;
    if (!group) return;

    // mouse follow (cinematic clamp + easing)
    const mx = THREE.MathUtils.clamp(mouse.x, -0.65, 0.65);
    const my = THREE.MathUtils.clamp(mouse.y, -0.5, 0.5);

    const targetY = mx * 0.48;
    const targetX = -my * 0.3;

    group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, targetY, 0.055);
    group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetX, 0.055);

    // breathing + micro tilt
    group.position.y = Math.sin(t * 1.1) * 0.02;
    group.rotation.z = Math.sin(t * 0.8) * 0.02;

    const s = 1 + Math.sin(t * 1.0) * 0.01;
    group.scale.setScalar(s);

    // head pulse
    if (baseRef.current) {
      const m = baseRef.current.material as THREE.PointsMaterial;
      m.opacity = 0.88 + Math.sin(t * 2.0) * 0.05;
    }
    if (glowRef.current) {
      const m = glowRef.current.material as THREE.PointsMaterial;
      m.opacity = 0.12 + (Math.sin(t * 1.4) * 0.05 + 0.05);
    }



  }
  );

  return (
    <group ref={groupRef}>
      <points ref={glowRef} geometry={geometry} material={glowMaterial} />
      <points ref={baseRef} geometry={geometry} material={baseMaterial} />
    </group>
  );
}

useGLTF.preload("models/head.glb");
