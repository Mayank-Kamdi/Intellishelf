'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';
import { Book } from '@/types';
import { Sparkles, Compass, Eye, ShieldCheck, QrCode } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Library3DViewProps {
  books: Book[];
  onBookSelect: (book: Book) => void;
}

// Particle field helper
function LibraryKnowledgeDust() {
  const ref = useRef<THREE.Points>(null);
  const [positions] = useState(() => {
    const arr = new Float32Array(200 * 3);
    for (let i = 0; i < 200 * 3; i++) {
      arr[i] = (Math.random() - 0.5) * 12;
    }
    return arr;
  });

  useFrame((state) => {
    if (ref.current) {
      ref.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <Points ref={ref} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#22D3EE"
        size={0.05}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </Points>
  );
}

// Smart Camera Controller that flies to selected shelves
function CameraFlyController({ activeShelf }: { activeShelf: number | null }) {
  const { camera } = useThree();

  useFrame(() => {
    let targetX = 0;
    let targetY = 1;
    let targetZ = 5.5;

    if (activeShelf === 0) {
      // Top shelf zoom
      targetX = -1;
      targetY = 2;
      targetZ = 3;
    } else if (activeShelf === 1) {
      // Middle shelf zoom
      targetX = 1;
      targetY = 0.5;
      targetZ = 3;
    } else if (activeShelf === 2) {
      // Bottom shelf zoom
      targetX = -1;
      targetY = -1;
      targetZ = 3;
    }

    // Smoothly interpolate camera position
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.08);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.08);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.08);
  });

  return null;
}

// 3D Shelf Component containing books
function BookShelf({
  shelfIndex,
  label,
  books,
  yPos,
  activeShelf,
  setActiveShelf,
  hoveredBook,
  setHoveredBook,
  onBookSelect
}: {
  shelfIndex: number;
  label: string;
  books: Book[];
  yPos: number;
  activeShelf: number | null;
  setActiveShelf: (idx: number | null) => void;
  hoveredBook: Book | null;
  setHoveredBook: (b: Book | null) => void;
  onBookSelect: (b: Book) => void;
}) {
  const isSelected = activeShelf === shelfIndex;

  return (
    <group position={[0, yPos, 0]}>
      {/* Wooden/Glass glowing ledge */}
      <mesh onClick={(e) => {
        e.stopPropagation();
        setActiveShelf(isSelected ? null : shelfIndex);
      }}>
        <boxGeometry args={[4, 0.15, 1.2]} />
        <meshStandardMaterial
          color={isSelected ? '#3B82F6' : '#27272A'}
          roughness={0.1}
          metalness={0.8}
          emissive={isSelected ? '#3B82F6' : '#000000'}
          emissiveIntensity={0.6}
        />
      </mesh>

      {/* Shelf Labels */}
      <gridHelper args={[4, 4, '#3b82f6', '#27272a']} position={[0, 0.08, 0]} />

      {/* Books lined up on shelf */}
      {books.map((book, idx) => {
        const xOffset = -1.2 + idx * 0.8;
        const isBookHovered = hoveredBook?.id === book.id;
        
        return (
          <group 
            key={book.id} 
            position={[xOffset, 0.5, 0]}
            onPointerOver={(e) => {
              e.stopPropagation();
              setHoveredBook(book);
            }}
            onPointerOut={() => {
              setHoveredBook(null);
            }}
            onClick={(e) => {
              e.stopPropagation();
              onBookSelect(book);
            }}
          >
            {/* Holographic Book Mesh */}
            <mesh>
              <boxGeometry args={[0.3, 0.8, 0.5]} />
              <meshStandardMaterial
                color={book.coverColor}
                roughness={0.1}
                metalness={0.9}
                emissive={isBookHovered ? book.coverColor : '#000000'}
                emissiveIntensity={isBookHovered ? 1.5 : 0.1}
              />
            </mesh>

            {/* Glowing ring under book on hover */}
            {isBookHovered && (
              <mesh position={[0, -0.4, 0]} rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.2, 0.25, 32]} />
                <meshBasicMaterial color="#22D3EE" side={THREE.DoubleSide} />
              </mesh>
            )}
          </group>
        );
      })}
    </group>
  );
}

export default function Library3DView({ books, onBookSelect }: Library3DViewProps) {
  const [activeShelf, setActiveShelf] = useState<number | null>(null);
  const [hoveredBook, setHoveredBook] = useState<Book | null>(null);
  const [showQR, setShowQR] = useState(false);

  // Group books by shelfIndex (0, 1, 2)
  const shelf0 = books.filter(b => b.shelfIndex === 0);
  const shelf1 = books.filter(b => b.shelfIndex === 1);
  const shelf2 = books.filter(b => b.shelfIndex === 2);

  return (
    <div className="flex flex-col gap-6 h-full relative min-h-[500px]">
      
      {/* Dashboard headers */}
      <div className="flex justify-between items-center relative z-10">
        <div>
          <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2.5">
            3D Room Holodeck <Compass className="text-blue-400" />
          </h1>
          <p className="text-xs font-mono text-zinc-500">Rotate shelf models, inspect locations, and select covers</p>
        </div>

        {/* Scan Shelf QR Trigger */}
        <button
          onClick={() => setShowQR(!showQR)}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-blue-500/20 bg-blue-500/5 hover:bg-blue-500/10 text-xs font-mono text-blue-400 transition-all cursor-pointer"
        >
          <QrCode size={14} />
          <span>Scan Shelf QR</span>
        </button>
      </div>

      {/* QR scanner simulation modal */}
      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="absolute top-20 right-0 w-64 glass-panel rounded-2xl p-4 flex flex-col items-center text-center z-20 shadow-2xl"
          >
            <div className="w-full flex justify-between items-center border-b border-white/5 pb-2 mb-3">
              <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Holo QR Scanner</span>
              <button onClick={() => setShowQR(false)} className="text-zinc-500 hover:text-zinc-300 text-xs">Close</button>
            </div>
            
            <div className="w-32 h-32 bg-white/5 rounded-xl border border-white/15 flex items-center justify-center p-3 relative overflow-hidden group">
              <div className="absolute inset-0 bg-cyan-400/10 animate-pulse pointer-events-none" />
              <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400 animate-[bounce_2s_infinite]" />
              <QrCode size={64} className="text-zinc-400 group-hover:text-cyan-400 transition-colors" />
            </div>

            <p className="text-[10px] font-mono text-zinc-500 mt-3 leading-relaxed">
              Aim camera at book spine QR markers to unlock high-fidelity neural digests instantly.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Information Overlay Panel */}
      <div className="absolute bottom-6 left-6 z-15 glass-panel p-4 rounded-2xl flex flex-col gap-1 shadow-lg max-w-sm pointer-events-none">
        <span className="text-[9px] font-mono text-zinc-500 uppercase tracking-wider">HUD Diagnostics</span>
        <h4 className="font-display font-bold text-xs text-white">
          {hoveredBook ? `Target: "${hoveredBook.title}"` : activeShelf !== null ? `Section: Shelf ${activeShelf === 0 ? 'Alpha' : activeShelf === 1 ? 'Beta' : 'Gamma'}` : 'System Idle'}
        </h4>
        <p className="text-[10px] text-zinc-400 font-mono mt-1">
          {hoveredBook 
            ? `Pages: ${hoveredBook.pages} | Level: ${hoveredBook.difficulty} | Click to Inspect` 
            : 'Left Click + Drag: Orbit | Scroll Wheel: Zoom | Click Shelf: Focus'}
        </p>
      </div>

      {/* Main 3D Canvas Box */}
      <div className="flex-1 w-full bg-[#0a0a0c] rounded-3xl overflow-hidden border border-white/5 shadow-inner relative h-[450px]">
        <Canvas camera={{ position: [0, 1, 5.5], fov: 50 }}>
          <ambientLight intensity={0.3} />
          
          {/* Custom colorful lighting */}
          <pointLight position={[5, 5, 5]} intensity={1.5} color="#22D3EE" />
          <pointLight position={[-5, 5, -5]} intensity={1} color="#8B5CF6" />
          
          <LibraryKnowledgeDust />

          {/* Core shelving assembly */}
          <group position={[0, -0.5, 0]}>
            <BookShelf
              shelfIndex={0}
              label="Shelf Alpha"
              books={shelf0}
              yPos={1.5}
              activeShelf={activeShelf}
              setActiveShelf={setActiveShelf}
              hoveredBook={hoveredBook}
              setHoveredBook={setHoveredBook}
              onBookSelect={onBookSelect}
            />
            <BookShelf
              shelfIndex={1}
              label="Shelf Beta"
              books={shelf1}
              yPos={0.2}
              activeShelf={activeShelf}
              setActiveShelf={setActiveShelf}
              hoveredBook={hoveredBook}
              setHoveredBook={setHoveredBook}
              onBookSelect={onBookSelect}
            />
            <BookShelf
              shelfIndex={2}
              label="Shelf Gamma"
              books={shelf2}
              yPos={-1.1}
              activeShelf={activeShelf}
              setActiveShelf={setActiveShelf}
              hoveredBook={hoveredBook}
              setHoveredBook={setHoveredBook}
              onBookSelect={onBookSelect}
            />
          </group>

          {/* Smooth camera motions */}
          <CameraFlyController activeShelf={activeShelf} />
          
          <OrbitControls 
            enableDamping 
            dampingFactor={0.05} 
            maxPolarAngle={Math.PI / 1.8} 
            minPolarAngle={Math.PI / 4}
            maxDistance={8}
            minDistance={2.5}
          />
        </Canvas>
      </div>

    </div>
  );
}
