'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sparkles, Stars, Float } from '@react-three/drei';
import * as THREE from 'three';
import FloatingBookMesh from './FloatingBookMesh';
import KnowledgeGalaxy from './KnowledgeGalaxy';
import CameraController from './CameraController';
import { Book } from '@/types';

interface SpaceLibraryProps {
  books: Book[];
  activeCategory: string;
  selectedBook: Book | null;
  onSelectBook: (book: Book) => void;
  onSelectCategory: (category: string) => void;
}

// Interactive AI Orb following a soft sinusoidal breathing pattern
function AIOrb() {
  const orbRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!orbRef.current) return;
    const time = state.clock.getElapsedTime();
    
    // Smooth pulse scaling
    const pulse = 1.0 + Math.sin(time * 2.2) * 0.08;
    orbRef.current.scale.set(pulse, pulse, pulse);
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
      <mesh ref={orbRef} position={[0, -0.4, 0.8]}>
        <sphereGeometry args={[0.22, 32, 32]} />
        <meshStandardMaterial
          color="#948979"
          emissive="#948979"
          emissiveIntensity={1.5}
          roughness={0}
          metalness={1}
        />
      </mesh>
    </Float>
  );
}

// 3D Glass floor platform
function GlassPlatform() {
  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.2, 0]} receiveShadow>
      <planeGeometry args={[40, 40]} />
      <meshStandardMaterial
        color="#222831"
        roughness={0.15}
        metalness={0.85}
        transparent
        opacity={0.8}
      />
    </mesh>
  );
}

// Columns representing huge glowing bookshelves
function BookshelfColumns() {
  return (
    <group position={[0, 0, -6]}>
      {/* Left Column */}
      <mesh position={[-6, 2, 0]}>
        <boxGeometry args={[1.2, 9, 2.5]} />
        <meshStandardMaterial color="#393E46" roughness={0.7} metalness={0.3} />
      </mesh>
      {/* Right Column */}
      <mesh position={[6, 2, 0]}>
        <boxGeometry args={[1.2, 9, 2.5]} />
        <meshStandardMaterial color="#393E46" roughness={0.7} metalness={0.3} />
      </mesh>
    </group>
  );
}

export default function SpaceLibrary({
  books,
  activeCategory,
  selectedBook,
  onSelectBook,
  onSelectCategory
}: SpaceLibraryProps) {
  return (
    <div className="absolute inset-0 z-0 bg-[#0F0F11]">
      <Canvas
        camera={{ position: [0, 1.2, 5], fov: 60 }}
        shadows
      >
        <color attach="background" args={['#0F0F11']} />
        <fog attach="fog" args={['#0F0F11', 4, 18]} />

        {/* Cinematic Camera Controller */}
        <CameraController selectedBook={selectedBook} activeCategory={activeCategory} />

        {/* Studio Lights */}
        <ambientLight intensity={0.45} />
        <directionalLight 
          position={[5, 10, 3]} 
          intensity={1.2} 
          color="#DFD0B8" 
          castShadow 
        />
        <pointLight position={[-6, 3, -4]} intensity={2} color="#3B82F6" />
        <pointLight position={[6, 3, -4]} intensity={2} color="#8B5CF6" />

        {/* Ambient environment sparkles and stars */}
        <Stars radius={100} depth={50} count={2000} factor={4} saturation={0.5} fade speed={1.5} />
        <Sparkles count={120} scale={12} size={1.6} speed={0.45} color="#DFD0B8" />

        {/* Grand Architecture */}
        <GlassPlatform />
        <BookshelfColumns />

        {/* Interconnected Knowledge Nodes */}
        <KnowledgeGalaxy 
          activeCategory={activeCategory} 
          onSelectCategory={onSelectCategory} 
        />

        {/* AI Orb */}
        <AIOrb />

        {/* Render all catalog books spread out systematically in arc coordinates */}
        {books.map((book, idx) => {
          const isCurrentCategory = book.category === activeCategory;
          // Filtered list index calculation to spread active books cleanly
          const categoryBooks = books.filter(b => b.category === activeCategory);
          const localIndex = categoryBooks.indexOf(book);
          
          if (!isCurrentCategory) return null;

          const angle = (localIndex - (categoryBooks.length - 1) / 2) * 0.55;
          const radius = 3.6;
          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius - 1.2;
          const y = Math.sin(localIndex * 2) * 0.15 + (localIndex % 2 === 0 ? 0.2 : -0.2);

          return (
            <FloatingBookMesh
              key={book.id}
              book={book}
              position={[x, y, z]}
              onSelect={onSelectBook}
              isSelected={selectedBook?.id === book.id}
            />
          );
        })}
      </Canvas>
    </div>
  );
}
