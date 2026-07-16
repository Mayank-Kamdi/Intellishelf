'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ArrowRight, Sparkles, BookOpen } from 'lucide-react'

interface BookItem {
  id: string
  title: string
  author: string
  genre: string
  description: string
  color: string
  height: string
  width: string
  rotation?: number
  accentColor?: string
  spineDesign: React.ReactNode
}

export default function InteractiveBookshelf() {
  const router = useRouter()
  const [hoveredBook, setHoveredBook] = useState<BookItem | null>(null)

  const books: BookItem[] = [
    {
      id: 'book-1',
      title: 'The Art of Digital Design',
      author: 'A. Goldwood',
      genre: 'Design',
      description: 'Explore the foundations of visual aesthetics and interface theory.',
      color: '#c95e53',
      height: '240px',
      width: '42px',
      accentColor: '#f2cd60',
      spineDesign: (
        <div className="w-full h-full relative flex flex-col justify-between py-4 px-1.5">
          <div className="border border-dashed border-[#f2cd60]/60 w-full h-6 rounded flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-[#f2cd60]" />
          </div>
          <div className="border-2 border-[#f2cd60] w-6 h-10 mx-auto rounded-full flex items-center justify-center">
            <span className="w-1.5 h-1.5 bg-[#f2cd60] rotate-45" />
          </div>
          <div className="border border-dashed border-[#f2cd60]/60 w-full h-6 rounded flex items-center justify-center">
            <span className="w-1 h-1 rounded-full bg-[#f2cd60]" />
          </div>
        </div>
      )
    },
    {
      id: 'book-2',
      title: 'Modern Novel writing',
      author: 'L. S. Vane',
      genre: 'Literature',
      description: 'A study on narrative structure and contemporary fictional prose.',
      color: '#579f9f',
      height: '260px',
      width: '45px',
      accentColor: '#FFFBE9',
      spineDesign: (
        <div className="w-full h-full relative flex flex-col items-center justify-between py-6">
          <div className="w-2 h-2 rounded-full bg-[#FFFBE9] rotate-45" />
          <div className="bg-[#FFFBE9] text-[#579f9f] font-mono text-[9px] font-bold py-3 px-1 rounded uppercase tracking-[0.2em] [writing-mode:vertical-rl] select-none shadow-sm">
            NOVEL
          </div>
          <div className="w-2 h-2 rounded-full bg-[#FFFBE9] rotate-45" />
        </div>
      )
    },
    {
      id: 'book-3',
      title: 'Algorithms & Data structures',
      author: 'P. E. Knuth',
      genre: 'Computer Science',
      description: 'The fundamental systems governing software efficiency and design.',
      color: '#1b7b6b',
      height: '255px',
      width: '40px',
      accentColor: '#f2cd60',
      spineDesign: (
        <div className="w-full h-full relative flex flex-col justify-between py-8 px-1">
          <div className="flex flex-col gap-1 w-full items-center">
            <div className="h-[2px] w-full bg-[#f2cd60]" />
            <div className="h-[2px] w-full bg-[#f2cd60]" />
          </div>
          <div className="flex flex-col gap-2 items-center">
            <div className="w-2.5 h-2.5 rounded-full border border-[#f2cd60] flex items-center justify-center">
              <div className="w-1 h-1 bg-[#f2cd60] rounded-full" />
            </div>
            <div className="w-3 h-1.5 bg-[#f2cd60]/80 rounded-sm" />
            <div className="w-2.5 h-2.5 rounded-full border border-[#f2cd60] flex items-center justify-center">
              <div className="w-1 h-1 bg-[#f2cd60] rounded-full" />
            </div>
          </div>
          <div className="flex flex-col gap-1 w-full items-center">
            <div className="h-[2px] w-full bg-[#f2cd60]" />
            <div className="h-[2px] w-full bg-[#f2cd60]" />
          </div>
        </div>
      )
    },
    {
      id: 'book-4',
      title: 'Neuromorphic Engineering',
      author: 'Dr. C. Mead',
      genre: 'AI & Electronics',
      description: 'Bridging biological neural architectures and silicon microchips.',
      color: '#9a382c',
      height: '250px',
      width: '46px',
      accentColor: '#09090B',
      spineDesign: (
        <div className="w-full h-full relative flex flex-col justify-between py-6 px-1.5">
          <div className="flex flex-col gap-1 w-full">
            <div className="h-[1px] w-full bg-[#f2cd60] opacity-60" />
            <div className="h-[1px] w-full bg-[#f2cd60] opacity-60" />
          </div>
          <div className="w-full h-24 bg-[#09090B] border border-[#f2cd60]/30 rounded flex items-center justify-center">
            <div className="w-1 h-16 bg-[#f2cd60]/50 rounded" />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <div className="h-[1px] w-full bg-[#f2cd60] opacity-60" />
            <div className="h-[1px] w-full bg-[#f2cd60] opacity-60" />
          </div>
        </div>
      )
    },
    {
      id: 'book-5',
      title: 'Oceanography and Climate change',
      author: 'Sylvia A. Earle',
      genre: 'Earth Science',
      description: 'Understanding currents, ocean floors, and systemic climatic changes.',
      color: '#e2a348',
      height: '240px',
      width: '42px',
      accentColor: '#FFFBE9',
      spineDesign: (
        <div className="w-full h-full relative flex flex-col justify-between py-5 px-1.5">
          <div className="h-[2px] w-full bg-[#FFFBE9]/80" />
          <div className="flex flex-col gap-2 items-center text-[#FFFBE9]/80 py-2">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 12h20M2 8c4 3 6-3 10 0s6-3 10 0M2 16c4 3 6-3 10 0s6-3 10 0" />
            </svg>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 12h20M2 8c4 3 6-3 10 0s6-3 10 0M2 16c4 3 6-3 10 0s6-3 10 0" />
            </svg>
          </div>
          <div className="h-[2px] w-full bg-[#FFFBE9]/80" />
        </div>
      )
    },
    {
      id: 'book-6',
      title: 'Poetry of the Cosmos',
      author: 'Carl Sagan',
      genre: 'Astronomy',
      description: 'Poetic reflections on galactic systems and cosmic existence.',
      color: '#fdf6ed',
      height: '245px',
      width: '28px',
      rotation: -8,
      accentColor: '#c95e53',
      spineDesign: (
        <div className="w-full h-full relative flex flex-col justify-between py-6 px-0.5 border-l border-r border-[#c95e53]/35">
          <div className="h-[3px] w-full bg-[#c95e53]" />
          <div className="w-[2px] h-[70%] bg-[#c95e53]/40 mx-auto" />
          <div className="h-[3px] w-full bg-[#c95e53]" />
        </div>
      )
    },
    {
      id: 'book-7',
      title: 'The Design System Playbook',
      author: 'Sarah Drasner',
      genre: 'Design Systems',
      description: 'Building cohesive, scalable, and premium visual software tokens.',
      color: '#4c9c8e',
      height: '240px',
      width: '50px',
      accentColor: '#FFFBE9',
      spineDesign: (
        <div className="w-full h-full relative flex flex-col justify-between py-5 px-2">
          <div className="grid grid-cols-2 gap-0.5 w-full">
            <span className="w-1.5 h-1.5 bg-[#FFFBE9]/60 rotate-45 mx-auto" />
            <span className="w-1.5 h-1.5 bg-[#FFFBE9]/60 rotate-45 mx-auto" />
          </div>
          <div className="w-full h-10 border border-[#FFFBE9]/40 bg-[#FFFBE9]/10 rounded flex items-center justify-center">
            <span className="text-[8px] font-mono text-[#FFFBE9]/90 tracking-tighter">SPEC</span>
          </div>
          <div className="grid grid-cols-2 gap-0.5 w-full">
            <span className="w-1.5 h-1.5 bg-[#FFFBE9]/60 rotate-45 mx-auto" />
            <span className="w-1.5 h-1.5 bg-[#FFFBE9]/60 rotate-45 mx-auto" />
          </div>
        </div>
      )
    },
    {
      id: 'book-8',
      title: 'Architectures of Tomorrow',
      author: 'Zaha Hadid',
      genre: 'Architecture',
      description: 'Deconstructivism and smooth parametric designs in modern urban spaces.',
      color: '#ea8c8c',
      height: '#ea8c8c',
      width: '44px',
      accentColor: '#FFFBE9',
      spineDesign: (
        <div className="w-full h-full relative flex flex-col justify-between py-6 px-1">
          <div className="h-[2px] w-full bg-[#FFFBE9]" />
          <div className="w-full h-32 flex flex-col justify-around py-2">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="flex justify-center gap-1">
                <span className="w-1.5 h-1.5 border border-[#FFFBE9]/50 rotate-45" />
                <span className="w-1.5 h-1.5 border border-[#FFFBE9]/50 rotate-45" />
              </div>
            ))}
          </div>
          <div className="h-[2px] w-full bg-[#FFFBE9]" />
        </div>
      )
    },
    {
      id: 'book-9',
      title: 'Botanical Illustration & Ecology',
      author: 'J. M. B.',
      genre: 'Biology',
      description: 'Detailed vector mappings and taxonomic histories of flora.',
      color: '#f2b84b',
      height: '235px',
      width: '42px',
      accentColor: '#1b7b6b',
      spineDesign: (
        <div className="w-full h-full relative flex flex-col justify-between py-4 px-2 items-center">
          <div className="h-1.5 w-1.5 rounded-full bg-[#1b7b6b]" />
          <div className="flex flex-col items-center gap-1.5 py-4">
            <span className="w-1 h-3 bg-[#1b7b6b] rounded-full rotate-[15deg]" />
            <span className="w-1 h-3 bg-[#1b7b6b] rounded-full rotate-[-15deg]" />
            <span className="w-1 h-3 bg-[#1b7b6b] rounded-full rotate-[15deg]" />
            <span className="w-1 h-3 bg-[#1b7b6b] rounded-full rotate-[-15deg]" />
          </div>
          <div className="h-1.5 w-1.5 rounded-full bg-[#1b7b6b]" />
        </div>
      )
    },
    {
      id: 'book-10',
      title: 'Machine Intelligence & Cybernetics',
      author: 'Norbert Wiener',
      genre: 'Cybernetics',
      description: 'Control and communication systems in animals, machines, and organizations.',
      color: '#2c8a75',
      height: '265px',
      width: '45px',
      accentColor: '#f2cd60',
      spineDesign: (
        <div className="w-full h-full relative flex flex-col justify-between py-6 px-1">
          <div className="flex flex-col gap-1 w-full">
            <div className="h-[2px] w-full bg-[#f2cd60]" />
            <div className="h-[1px] w-full bg-[#f2cd60]/50" />
          </div>
          <div className="flex flex-col gap-3 items-center">
            <div className="w-2.5 h-2.5 bg-[#f2cd60] rotate-45" />
            <div className="w-2 h-2 border border-[#f2cd60] rotate-45" />
            <div className="w-2.5 h-2.5 bg-[#f2cd60] rotate-45" />
          </div>
          <div className="flex flex-col gap-1 w-full">
            <div className="h-[1px] w-full bg-[#f2cd60]/50" />
            <div className="h-[2px] w-full bg-[#f2cd60]" />
          </div>
        </div>
      )
    },
    {
      id: 'book-11',
      title: 'The Philosophy of Aesthetics',
      author: 'W. Benjamin',
      genre: 'Philosophy',
      description: 'Art in the age of mechanical reproduction and digital translation.',
      color: '#e87c6b',
      height: '242px',
      width: '46px',
      accentColor: '#FFFBE9',
      spineDesign: (
        <div className="w-full h-full relative flex flex-col justify-between py-5 px-2">
          <div className="h-[2px] w-full bg-[#FFFBE9]/80" />
          <div className="flex flex-col items-center justify-center gap-1.5 py-4 text-[#FFFBE9]/70">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.75z" />
            </svg>
            <div className="w-1.5 h-1.5 rounded-full bg-[#FFFBE9]" />
          </div>
          <div className="h-[2px] w-full bg-[#FFFBE9]/80" />
        </div>
      )
    },
    {
      id: 'book-12',
      title: 'Quantum Field Theory',
      author: 'R. P. Feynman',
      genre: 'Physics',
      description: 'Relativistic quantum mechanics and electromagnetic particle interactions.',
      color: '#f3f9f8',
      height: '250px',
      width: '32px',
      rotation: 6,
      accentColor: '#579f9f',
      spineDesign: (
        <div className="w-full h-full relative flex flex-col justify-between py-6 px-1 border-l border-[#579f9f]/20 border-r border-[#579f9f]/20">
          <div className="h-[2px] w-full bg-[#579f9f]" />
          <div className="flex flex-col gap-1 items-center">
            <span className="w-1.5 h-1.5 rounded-full bg-[#579f9f]/50" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#579f9f]/50" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#579f9f]/50" />
          </div>
          <div className="h-[2px] w-full bg-[#579f9f]" />
        </div>
      )
    },
    {
      id: 'book-13',
      title: 'The Cyberpunk Anthology',
      author: 'William Gibson',
      genre: 'Fiction',
      description: 'High tech, low life, neon lights, and neural interface cyberspace.',
      color: '#bc4134',
      height: '240px',
      width: '32px',
      rotation: 12,
      accentColor: '#f2cd60',
      spineDesign: (
        <div className="w-full h-full relative flex flex-col justify-between py-5 px-1">
          <div className="h-[2px] w-full bg-[#f2cd60]" />
          <div className="flex flex-col items-center justify-center py-2 text-[#f2cd60]">
            <span className="text-[10px] rotate-90 font-bold tracking-wider">NEON</span>
          </div>
          <div className="h-[2px] w-full bg-[#f2cd60]" />
        </div>
      )
    }
  ]

  const handleBookClick = (book: BookItem) => {
    router.push(`/dashboard?q=${encodeURIComponent(book.title)}`)
  }

  return (
    <div className="relative w-full flex flex-col items-center justify-end py-10 px-4 select-none">
      
      {/* Book details card overlay (absolute floating card) */}
      <div className="h-28 w-full max-w-xl mb-12 flex items-center justify-center relative z-20">
        <AnimatePresence mode="wait">
          {hoveredBook ? (
            <motion.div
              key={hoveredBook.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="w-full bg-[#E5DAD2] border border-[#DCD0C7] rounded-2xl p-5 shadow-[4px_4px_16px_rgba(163,145,134,0.15)] flex justify-between items-center gap-4"
            >
              <div className="flex-1 text-left">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded text-white"
                    style={{ backgroundColor: hoveredBook.color }}
                  >
                    {hoveredBook.genre}
                  </span>
                  <span className="text-xs text-[#6A5A6A] font-mono">by {hoveredBook.author}</span>
                </div>
                <h3 className="text-lg font-display font-semibold text-[#3C2D3D] leading-snug">
                  {hoveredBook.title}
                </h3>
                <p className="text-xs text-[#6A5A6A] mt-1 line-clamp-1">
                  {hoveredBook.description}
                </p>
              </div>
              <button
                onClick={() => handleBookClick(hoveredBook)}
                className="flex items-center gap-1.5 bg-[#3C2D3D] hover:bg-[#4C3D4D] text-[#FFFBE9] px-4 py-2 rounded-xl text-xs font-mono tracking-wider transition-colors shrink-0"
              >
                <span>Read</span>
                <ArrowRight size={13} />
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              exit={{ opacity: 0 }}
              className="text-center text-xs font-mono text-[#6A5A6A]/80 tracking-widest flex flex-col items-center gap-1"
            >
              <BookOpen size={16} className="opacity-60 mb-1" />
              <span>HOVER OVER A BOOK TO CHOOSE YOUR TOPIC</span>
              <span className="text-[10px] opacity-60">CLICK TO LAUNCH THE NEURAL INTERFACE</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bookshelf Display */}
      <div className="w-full max-w-4xl relative flex flex-col items-center">
        {/* Books container */}
        <div className="flex items-end justify-center px-6 relative z-10 w-full" style={{ gap: '2px' }}>
          {books.map((book) => {
            const initialRotation = book.rotation || 0
            return (
              <motion.div
                key={book.id}
                onMouseEnter={() => setHoveredBook(book)}
                onMouseLeave={() => setHoveredBook(null)}
                onClick={() => handleBookClick(book)}
                className="cursor-pointer origin-bottom relative shadow-[2px_-2px_6px_rgba(0,0,0,0.08)]"
                style={{
                  width: book.width,
                  height: book.height === '#ea8c8c' ? '238px' : book.height, // fix specific height mismatch
                  backgroundColor: book.color,
                  borderTopLeftRadius: '4px',
                  borderTopRightRadius: '4px',
                }}
                initial={{ rotate: initialRotation, y: 0 }}
                whileHover={{
                  rotate: 0,
                  y: -18,
                  scale: 1.03,
                  transition: {
                    type: 'spring',
                    stiffness: 300,
                    damping: 18,
                  },
                }}
                transition={{
                  type: 'spring',
                  stiffness: 260,
                  damping: 22,
                }}
              >
                {/* 3D spine gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-white/10 to-black/15 pointer-events-none rounded-t-[4px]" />
                
                {/* Custom spine graphics */}
                {book.spineDesign}
              </motion.div>
            )
          })}
        </div>

        {/* Shelf structure */}
        <div className="w-full relative z-20">
          {/* Main wooden board */}
          <div 
            className="w-full h-4.5 rounded-md border-t border-[#DDD0C6] shadow-md"
            style={{
              background: 'linear-gradient(to bottom, #d2b48c, #c5a072)',
              boxShadow: '0 6px 12px rgba(163, 145, 134, 0.15)',
            }}
          />
          {/* Board depth edge */}
          <div 
            className="w-[98%] mx-auto h-2 rounded-b-md opacity-80"
            style={{
              background: '#a68255',
            }}
          />
        </div>
      </div>
    </div>
  )
}
