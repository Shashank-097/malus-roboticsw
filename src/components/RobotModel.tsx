"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export default function RobotModel() {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    // Floating animation
    groupRef.current.position.y = Math.sin(t * 1.2) * 0.1;

    // Smooth rotation
    groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.4;
  });

  return (
    <group ref={groupRef}>
      {/* Base */}
      <mesh position={[0, -1.4, 0]}>
        <cylinderGeometry args={[1.2, 1.2, 0.6, 32]} />
        <meshStandardMaterial
          color="#111827"
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>

      {/* Lower Arm */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.7, 2.2, 0.7]} />
        <meshStandardMaterial
          color="#00C2FF"
          metalness={1}
          roughness={0.15}
        />
      </mesh>

      {/* Upper Arm */}
      <mesh position={[0, 1.8, 0]}>
        <boxGeometry args={[0.6, 1.8, 0.6]} />
        <meshStandardMaterial
          color="#3DFFB5"
          metalness={1}
          roughness={0.15}
        />
      </mesh>

      {/* End Effector */}
      <mesh position={[0, 2.9, 0]}>
        <sphereGeometry args={[0.35, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={1}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}