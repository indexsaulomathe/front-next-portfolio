"use client";

import { useGLTF } from "@react-three/drei";
import { useMemo } from "react";
import * as THREE from "three";

interface MatrixHeadGLBProps {
  url?: string;
}

export default function MatrixHeadGLB({ url = "/models/head.glb" }: MatrixHeadGLBProps) {
  const gltf = useGLTF(url);

  const { merged } = useMemo(() => {
    const geometries: THREE.BufferGeometry[] = [];

    // Collect all geometries from scene
    gltf.scene.traverse((obj) => {
      if ((obj as THREE.Mesh).isMesh) {
        const mesh = obj as THREE.Mesh;
        if (mesh.geometry) {
          geometries.push(mesh.geometry);
        }
      }
    });

    // Merge all geometries into one
    const mergedGeo = new THREE.BufferGeometry();
    const positions: number[] = [];

    geometries.forEach((g) => {
      const pos = g.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < pos.count; i++) {
        positions.push(pos.getX(i), pos.getY(i), pos.getZ(i));
      }
    });

    mergedGeo.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(new Float32Array(positions), 3)
    );

    // Center and scale geometry
    mergedGeo.computeBoundingBox();
    const box = mergedGeo.boundingBox!;
    const size = new THREE.Vector3();
    const center = new THREE.Vector3();
    box.getSize(size);
    box.getCenter(center);

    const scale = 2.0 / Math.max(size.x, size.y, size.z);
    const posAttr = mergedGeo.attributes.position as THREE.BufferAttribute;

    for (let i = 0; i < posAttr.count; i++) {
      const x = (posAttr.getX(i) - center.x) * scale;
      const y = (posAttr.getY(i) - center.y) * scale;
      const z = (posAttr.getZ(i) - center.z) * scale;
      posAttr.setXYZ(i, x, y, z);
    }

    posAttr.needsUpdate = true;
    mergedGeo.computeBoundingSphere();

    return { merged: mergedGeo };
  }, [gltf.scene]);

  const material = useMemo(
    () =>
      new THREE.PointsMaterial({
        color: new THREE.Color("#00ff66"),
        size: 0.01,
        sizeAttenuation: true,
        transparent: true,
        opacity: 0.95,
        depthWrite: false,
      }),
    []
  );

  return <points geometry={merged} material={material} />;
}

useGLTF.preload("/models/head.glb");
