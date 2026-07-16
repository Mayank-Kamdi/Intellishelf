'use client';

import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Line } from '@react-three/drei';
import * as THREE from 'three';

interface KnowledgeWorld {
  name: string;
  color: string;
  position: [number, number, number];
}

interface KnowledgeGalaxyProps {
  activeCategory: string;
  onSelectCategory: (category: string) => void;
}

const WORLDS: KnowledgeWorld[] = [
  { name: 'Programming', color: '#3B82F6', position: [-4, 1.5, -2] },
  { name: 'Artificial Intelligence', color: '#8B5CF6', position: [0, 2.5, -3] },
  { name: 'Psychology', color: '#EF4444', position: [4, 1.2, -2] },
  { name: 'History', color: '#EAB308', position: [-3, -1.5, -1] },
  { name: 'Business', color: '#10B981', position: [3, -1.8, -1] },
  { name: 'Science', color: '#EC4899', position: [-1.5, 0.5, -4] },
  { name: 'Engineering', color: '#F97316', position: [2, 0.8, -4.5] }
];

export default function KnowledgeGalaxy({ activeCategory, onSelectCategory }: KnowledgeGalaxyProps) {
  const groupRef = useRef<THREE.Group>(null);
  const [hoveredWorld, setHoveredWorld] = useState<string | null>(null);

  useFrame((state) => {
    if (!groupRef.current) return;
    const elapsed = state.clock.getElapsedTime();
    
    // Slow rotational drift of the entire galaxy
    groupRef.current.rotation.y = elapsed * 0.03;
  });

  return (
    <group ref={groupRef}>
      {/* Dynamic connecting lines */}
      {WORLDS.map((world, idx) => {
        // Connect nearby worlds to build a star-map visual pattern
        const nextWorld = WORLDS[(idx + 1) % WORLDS.length];
        return (
          <Line
            key={`line-${idx}`}
            points={[world.position, nextWorld.position]}
            color={world.name === activeCategory || nextWorld.name === activeCategory ? '#948979' : '#393E46'}
            lineWidth={world.name === activeCategory || nextWorld.name === activeCategory ? 1.5 : 0.6}
            opacity={0.3}
            transparent
          />
        );
      })}

      {/* Floating Worlds */}
      {WORLDS.map((world) => {
        const isSelected = world.name === activeCategory;
        const isHovered = hoveredWorld === world.name;

        return (
          <group 
            key={world.name} 
            position={world.position}
            onClick={(e) => {
              e.stopPropagation();
              onSelectCategory(world.name);
            }}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredWorld(world.name);
            }}
            onPointerOut={() => setHoveredWorld(null)}
          >
            {/* World core sphere */}
            <mesh>
              <sphereGeometry args={[isSelected ? 0.35 : 0.24, 32, 32]} />
              <meshStandardMaterial
                color={world.color}
                emissive={world.color}
                emissiveIntensity={isHovered || isSelected ? 1.8 : 0.4}
                roughness={0.1}
              />
            </mesh>

            {/* Glowing ring */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[isSelected ? 0.45 : 0.32, isSelected ? 0.52 : 0.36, 64]} />
              <meshBasicMaterial 
                color={world.color} 
                side={THREE.DoubleSide} 
                transparent 
                opacity={isHovered || isSelected ? 0.8 : 0.25} 
              />
            </mesh>

            {/* Title floating label */}
            <Text
              position={[0, 0.6, 0]}
              fontSize={0.22}
              color={isSelected ? '#222831' : '#393E46'}
              font="https://fonts.gstatic.com/s/spacegrotesk/v15/V8mQoQDjQSkFtoMM3T6r8E79F213T0s6.woff"
              anchorX="center"
              anchorY="middle"
            >
              {world.name}
            </Text>
          </group>
        );
      })}
    </group>
  );
}
