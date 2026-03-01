"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@react-three/drei";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import RobotModel from "./RobotModel";
import * as THREE from "three";

function ParallaxWrapper() {
  const group = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const { mouse } = state;

    group.current.rotation.y = mouse.x * 0.5;
    group.current.rotation.x = mouse.y * 0.2;
  });

  return (
    <group ref={group}>
      <RobotModel />
    </group>
  );
}

export default function RobotCanvas() {
  return (
    <Canvas camera={{ position: [4, 2, 6], fov: 45 }}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.5} />
      <pointLight position={[-5, -2, -5]} intensity={0.8} color="#00C2FF" />
      <Environment preset="city" />
      <ParallaxWrapper />
    </Canvas>
  );
}