'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { ArrowRight, BookOpen, Star } from 'lucide-react'
import Image from 'next/image'

interface BookItem {
  id: string
  title: string
  author: string
  genre: string
  description: string
  rating: number
  pages: number
  coverUrl: string
  spineColor: string
  height: number
  width: number
  rotation?: number
}

const HERO_BOOKS: BookItem[] = [
  {
    id: 'b1',
    title: 'Atomic Habits',
    author: 'James Clear',
    genre: 'Self-Help',
    description: 'An easy and proven way to build good habits and break bad ones.',
    rating: 4.8,
    pages: 320,
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg',
    spineColor: '#F59E0B',
    height: 270,
    width: 48,
  },
  {
    id: 'b2',
    title: 'Dune',
    author: 'Frank Herbert',
    genre: 'Sci-Fi',
    description: 'Epic tale of politics, religion, and ecology on a desert planet.',
    rating: 4.9,
    pages: 688,
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780441013593-L.jpg',
    spineColor: '#B45309',
    height: 285,
    width: 52,
  },
  {
    id: 'b3',
    title: 'Sapiens',
    author: 'Yuval Noah Harari',
    genre: 'History',
    description: 'A sweeping narrative of humankind from the Stone Age to 21st century.',
    rating: 4.7,
    pages: 443,
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg',
    spineColor: '#1D4ED8',
    height: 265,
    width: 46,
  },
  {
    id: 'b4',
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Classic',
    description: 'A portrait of the Jazz Age in all its decadence and excess.',
    rating: 4.5,
    pages: 180,
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg',
    spineColor: '#16A34A',
    height: 250,
    width: 38,
  },
  {
    id: 'b5',
    title: 'The Pragmatic Programmer',
    author: 'David Thomas',
    genre: 'Tech',
    description: 'Your journey to mastery through practical programming wisdom.',
    rating: 4.8,
    pages: 352,
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780135957059-L.jpg',
    spineColor: '#7C3AED',
    height: 260,
    width: 44,
  },
  {
    id: 'b6',
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopia',
    description: 'A harrowing vision of totalitarianism and the loss of truth.',
    rating: 4.8,
    pages: 328,
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780451524935-L.jpg',
    spineColor: '#DC2626',
    height: 258,
    width: 40,
    rotation: -5,
  },
  {
    id: 'b7',
    title: 'Deep Work',
    author: 'Cal Newport',
    genre: 'Productivity',
    description: 'Rules for focused success in a distracted world.',
    rating: 4.6,
    pages: 296,
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg',
    spineColor: '#0891B2',
    height: 255,
    width: 44,
  },
  {
    id: 'b8',
    title: 'The Alchemist',
    author: 'Paulo Coelho',
    genre: 'Fiction',
    description: "A philosopher's stone: following one's personal legend.",
    rating: 4.7,
    pages: 208,
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg',
    spineColor: '#D97706',
    height: 245,
    width: 38,
  },
  {
    id: 'b9',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    genre: 'Engineering',
    description: 'A handbook of agile software craftsmanship for developers.',
    rating: 4.8,
    pages: 464,
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg',
    spineColor: '#059669',
    height: 268,
    width: 48,
  },
  {
    id: 'b10',
    title: 'Thinking, Fast and Slow',
    author: 'Daniel Kahneman',
    genre: 'Psychology',
    description: 'How two systems in our brain shape our judgments and choices.',
    rating: 4.6,
    pages: 499,
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780374533557-L.jpg',
    spineColor: '#9333EA',
    height: 275,
    width: 50,
  },
  {
    id: 'b11',
    title: 'Zero to One',
    author: 'Peter Thiel',
    genre: 'Business',
    description: 'Notes on startups, or how to build the future.',
    rating: 4.5,
    pages: 224,
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780804139021-L.jpg',
    spineColor: '#0F172A',
    height: 248,
    width: 40,
    rotation: 6,
  },
  {
    id: 'b12',
    title: 'The Hobbit',
    author: 'J.R.R. Tolkien',
    genre: 'Fantasy',
    description: 'The adventure of Bilbo Baggins into the wild lands beyond the Shire.',
    rating: 4.9,
    pages: 310,
    coverUrl: 'https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg',
    spineColor: '#B45309',
    height: 262,
    width: 42,
    rotation: -8,
  },
]

export default function InteractiveBookshelf() {
  const router = useRouter()
  const [hoveredBook, setHoveredBook] = useState<BookItem | null>(null)
  const [imgErrors, setImgErrors] = useState<Set<string>>(new Set())

  const handleBookClick = (book: BookItem) => {
    router.push(`/dashboard?q=${encodeURIComponent(book.title)}`)
  }

  const handleImgError = (bookId: string) => {
    setImgErrors(prev => new Set([...prev, bookId]))
  }

  return (
    <div className="relative w-full flex flex-col items-center justify-end py-10 px-4 select-none">

      {/* Book details card overlay */}
      <div className="h-32 w-full max-w-2xl mb-10 flex items-center justify-center relative z-20">
        <AnimatePresence mode="wait">
          {hoveredBook ? (
            <motion.div
              key={hoveredBook.id}
              initial={{ opacity: 0, y: 15, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="w-full bg-[#E5DAD2]/90 backdrop-blur-sm border border-[#DCD0C7] rounded-2xl p-4 shadow-[4px_4px_20px_rgba(163,145,134,0.2)] flex justify-between items-center gap-4"
            >
              {/* Cover thumbnail */}
              <div
                className="w-14 h-20 rounded-lg overflow-hidden shrink-0 shadow-md"
                style={{ backgroundColor: hoveredBook.spineColor }}
              >
                {!imgErrors.has(hoveredBook.id) ? (
                  <Image
                    src={hoveredBook.coverUrl}
                    alt={hoveredBook.title}
                    width={56}
                    height={80}
                    className="w-full h-full object-cover"
                    onError={() => handleImgError(hoveredBook.id)}
                    unoptimized
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <BookOpen size={18} className="text-white/70" />
                  </div>
                )}
              </div>

              {/* Book info */}
              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center gap-2 mb-1 flex-wrap">
                  <span
                    className="text-[9px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-full text-white shrink-0"
                    style={{ backgroundColor: hoveredBook.spineColor }}
                  >
                    {hoveredBook.genre}
                  </span>
                  <span className="text-[10px] text-[#6A5A6A] font-mono">by {hoveredBook.author}</span>
                  <span className="text-[10px] text-[#948979] font-mono">{hoveredBook.pages}pp</span>
                </div>
                <h3 className="text-base font-display font-bold text-[#3C2D3D] leading-snug truncate">
                  {hoveredBook.title}
                </h3>
                <p className="text-[11px] text-[#6A5A6A] mt-0.5 line-clamp-1">{hoveredBook.description}</p>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={9}
                      className={i < Math.floor(hoveredBook.rating) ? 'text-[#D97706] fill-[#D97706]' : 'text-[#948979]'}
                    />
                  ))}
                  <span className="text-[10px] text-[#948979] ml-1 font-mono">{hoveredBook.rating}</span>
                </div>
              </div>

              {/* CTA button */}
              <button
                onClick={() => handleBookClick(hoveredBook)}
                className="flex items-center gap-1.5 bg-[#3C2D3D] hover:bg-[#4C3D4D] text-[#FFFBE9] px-4 py-2.5 rounded-xl text-[11px] font-mono tracking-wider transition-colors shrink-0 cursor-pointer"
              >
                <span>Explore</span>
                <ArrowRight size={12} />
              </button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              className="text-center text-[11px] font-mono text-[#6A5A6A]/80 tracking-widest flex flex-col items-center gap-1"
            >
              <BookOpen size={16} className="opacity-50 mb-1" />
              <span>HOVER OVER A BOOK TO PREVIEW</span>
              <span className="text-[9px] opacity-50">CLICK TO LAUNCH THE LIBRARY</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bookshelf */}
      <div className="w-full max-w-5xl relative flex flex-col items-center">
        {/* Books row */}
        <div
          className="flex items-end justify-center px-4 relative z-10 w-full"
          style={{ gap: '3px' }}
        >
          {HERO_BOOKS.map((book) => {
            const hasError = imgErrors.has(book.id)
            return (
              <motion.div
                key={book.id}
                onMouseEnter={() => setHoveredBook(book)}
                onMouseLeave={() => setHoveredBook(null)}
                onClick={() => handleBookClick(book)}
                className="cursor-pointer origin-bottom relative shrink-0"
                style={{
                  width: `${book.width}px`,
                  height: `${book.height}px`,
                  borderTopLeftRadius: '3px',
                  borderTopRightRadius: '3px',
                  overflow: 'hidden',
                }}
                initial={{ rotate: book.rotation || 0, y: 0 }}
                whileHover={{
                  rotate: 0,
                  y: -22,
                  scale: 1.05,
                  zIndex: 30,
                  transition: { type: 'spring', stiffness: 350, damping: 20 },
                }}
                transition={{ type: 'spring', stiffness: 260, damping: 22 }}
              >
                {/* Real book cover image */}
                {!hasError ? (
                  <Image
                    src={book.coverUrl}
                    alt={book.title}
                    fill
                    className="object-cover"
                    onError={() => handleImgError(book.id)}
                    unoptimized
                    sizes={`${book.width}px`}
                  />
                ) : (
                  /* Fallback spine when image fails */
                  <div
                    className="w-full h-full flex flex-col items-center justify-between py-4"
                    style={{ backgroundColor: book.spineColor }}
                  >
                    <div className="w-full h-[2px] bg-white/20" />
                    <span
                      className="text-white/80 font-mono text-[8px] font-bold tracking-widest uppercase"
                      style={{ writingMode: 'vertical-rl', textOrientation: 'mixed' }}
                    >
                      {book.title.slice(0, 20)}
                    </span>
                    <div className="w-full h-[2px] bg-white/20" />
                  </div>
                )}

                {/* 3D gloss overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-white/5 to-black/25 pointer-events-none" />

                {/* Bottom spine shadow */}
                <div className="absolute bottom-0 left-0 right-0 h-6 bg-gradient-to-t from-black/30 to-transparent pointer-events-none" />
              </motion.div>
            )
          })}
        </div>

        {/* Wooden shelf */}
        <div className="w-full relative z-20 mt-0">
          <div
            className="w-full rounded-md border-t border-[#DDD0C6]"
            style={{
              height: '14px',
              background: 'linear-gradient(to bottom, #d2b48c, #c09060)',
              boxShadow: '0 4px 16px rgba(120, 90, 50, 0.25), inset 0 1px 0 rgba(255,255,255,0.15)',
            }}
          />
          <div
            className="w-[99%] mx-auto rounded-b-md"
            style={{ height: '8px', background: '#a07040', opacity: 0.85 }}
          />
        </div>
      </div>
    </div>
  )
}
