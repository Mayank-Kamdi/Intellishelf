'use client';

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Book } from '@/types';

interface FloatingBookMeshProps {
  book: Book;
  position: [number, number, number];
  onSelect: (book: Book) => void;
  isSelected?: boolean;
}

export default function FloatingBookMesh({ book, position, onSelect, isSelected = false }: FloatingBookMeshProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hovered, setHovered] = useState(false);
  const randomOffset = useRef(Math.random() * 100);

  useFrame((state) => {
    if (!groupRef.current) return;
    const time = state.clock.getElapsedTime() + randomOffset.current;

    // Hover spring physics interpolation
    const targetScale = hovered ? 1.15 : 1.0;
    groupRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);

    // Floating vertical movement
    if (isSelected) {
      groupRef.current.position.y = position[1] + 1.2 + Math.sin(time * 1.5) * 0.15;
      groupRef.current.rotation.y = time * 0.8;
      groupRef.current.rotation.x = Math.sin(time * 0.5) * 0.1;
    } else {
      groupRef.current.position.y = position[1] + Math.sin(time * 0.8) * 0.08;
      // Soft ambient rotation
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, hovered ? time * 0.5 : position[1] * 0.1, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, hovered ? 0.2 : 0, 0.05);
    }
  });

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    setHovered(true);
    // Play subtle hover sound if available
    try {
      const audio = new Audio('/audio/magic_chime.mp3');
      audio.volume = 0.08;
      audio.play().catch(() => {});
    } catch (_) {}
  };

  const handlePointerOut = () => {
    setHovered(false);
  };

  const handleClick = (e: any) => {
    e.stopPropagation();
    onSelect(book);
    try {
      const audio = new Audio('/audio/turn_page.mp3');
      audio.volume = 0.15;
      audio.play().catch(() => {});
    } catch (_) {}
  };

  return (
    <group 
      ref={groupRef} 
      position={position}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      {/* Outer book spine & front/back cover group */}
      <mesh castShadow receiveShadow>
        <boxGeometry args={[0.9, 1.25, 0.18]} />
        <meshStandardMaterial 
          color={book.coverColor}
          roughness={0.15}
          metalness={0.7}
          emissive={book.coverColor}
          emissiveIntensity={hovered ? 0.35 : 0.08}
        />
      </mesh>

      {/* Cream paper sheets inside cover */}
      <mesh position={[0.02, 0, 0]} castShadow>
        <boxGeometry args={[0.82, 1.18, 0.14]} />
        <meshStandardMaterial 
          color="#FFFDE9"
          roughness={0.8}
          metalness={0.1}
        />
      </mesh>

      {/* Gold metallic decals or spine ribs */}
      <mesh position={[-0.43, 0, 0]}>
        <boxGeometry args={[0.03, 1.15, 0.15]} />
        <meshStandardMaterial 
          color="#E2A348"
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
}
