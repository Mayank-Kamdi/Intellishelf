'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

function ParticleField() {
  const ref = useRef<THREE.Points>(null);
  
  // Generate random floating particles
  const [positions] = React.useState(() => {
    const arr = new Float32Array(300 * 3);
    for (let i = 0; i < 300 * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 15;
    }
    return arr;
  });

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.05;
      ref.current.rotation.x = Math.sin(state.clock.getElapsedTime() * 0.02) * 0.1;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
        <PointMaterial
          transparent
          color="#3B82F6"
          size={0.06}
          sizeAttenuation={true}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </Points>
    </group>
  );
}

function FloatingBook({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      // Float up and down
      meshRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.8) * 0.3;
      // Soft rotation
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
      meshRef.current.rotation.z = Math.cos(state.clock.getElapsedTime() * 0.5) * 0.1;
    }
  });

  return (
    <mesh ref={meshRef} position={[2, 0.5, -1]} rotation={[0.4, 0.5, 0.1]}>
      <boxGeometry args={[1.2, 1.6, 0.25]} />
      <meshStandardMaterial
        color={color}
        roughness={0.2}
        metalness={0.8}
        emissive={color}
        emissiveIntensity={0.2}
      />
    </mesh>
  );
}

export default function HeroScene() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-60">
      <div className="absolute inset-0 bg-radial-at-t from-blue-900/10 via-[#09090B] to-[#09090B]" />
      <div className="absolute top-[20%] left-[30%] w-96 h-96 bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[20%] right-[30%] w-96 h-96 bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <Canvas camera={{ position: [0, 0, 4.5], fov: 60 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#3B82F6" />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#8B5CF6" />
        <ParticleField />
        <FloatingBook color="#3B82F6" />
        <FloatingBook color="#8B5CF6" />
      </Canvas>
    </div>
  );
}
