'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Search, Mic, Sparkles, ArrowRight, Volume2 } from 'lucide-react';

import InteractiveBookshelf from './InteractiveBookshelf';

export default function LandingHero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [aiMessage, setAiMessage] = useState('Welcome, Scholar. What knowledge do you seek today?');
  const [waveHeights, setWaveHeights] = useState<number[]>([10, 10, 10, 10, 10]);
  const waveIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Handle mock voice recognition
  useEffect(() => {
    if (isListening) {
      setAiMessage('Listening to audio stream...');
      waveIntervalRef.current = setInterval(() => {
        setWaveHeights(Array.from({ length: 12 }, () => Math.floor(Math.random() * 40) + 10));
      }, 100);

      // Simulate recognition after 3 seconds
      const timeout = setTimeout(() => {
        const voicePhrases = [
          'Recommend AI books under 300 pages',
          'I need a beginner Python book',
          'Books similar to Atomic Habits',
          'Show Machine Learning books available today'
        ];
        const randomPhrase = voicePhrases[Math.floor(Math.random() * voicePhrases.length)];
        setSearchQuery(randomPhrase);
        setIsListening(false);
        setAiMessage(`Identified query: "${randomPhrase}"`);
        
        // Wait a second then execute search
        setTimeout(() => {
          router.push(`/dashboard?q=${encodeURIComponent(randomPhrase)}`);
        }, 1200);
      }, 3500);

      return () => {
        clearTimeout(timeout);
        if (waveIntervalRef.current) clearInterval(waveIntervalRef.current);
      };
    } else {
      if (waveIntervalRef.current) clearInterval(waveIntervalRef.current);
      setWaveHeights([10, 10, 10, 10, 10]);
    }
  }, [isListening, router]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/dashboard?q=${encodeURIComponent(searchQuery)}`);
    } else {
      router.push('/dashboard');
    }
  };

  const handleQuickSearch = (phrase: string) => {
    router.push(`/dashboard?q=${encodeURIComponent(phrase)}`);
  };

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-full w-full px-4 text-center max-w-4xl mx-auto py-6 h-full">
      {/* Top Banner */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-3 flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#B294A6]/20 bg-[#EADFD8]/60 text-[#867086] text-[10px] font-mono tracking-wider uppercase"
      >
        <Sparkles size={11} className="animate-pulse" /> Next-Gen AI System Enabled
      </motion.div>

      {/* Hero Headings */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
        className="text-4xl md:text-5xl font-display font-bold tracking-tight text-[#3C2D3D]"
      >
        Intelli<span className="text-[#867086] font-extrabold bg-gradient-to-r from-[#867086] to-[#B294A6] bg-clip-text text-transparent">Shelf</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="mt-2 text-xs md:text-sm text-[#6A5A6A] font-sans tracking-wide max-w-xl"
      >
        Every Shelf Holds a Story. Every Story Shapes a Future.
      </motion.p>

      {/* Neural Search Input Panel */}
      <motion.form
        onSubmit={handleSearchSubmit}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-xl px-4 mt-4 mb-3"
      >
        <div className="glass-panel p-1.5 rounded-2xl flex items-center gap-2 border border-[#DCD0C7] bg-[#EADFD8]/30 focus-within:ring-2 focus-within:ring-[#867086]/35 transition-all duration-300">
          <div className="pl-3 text-[#6A5A6A]">
            <Search size={16} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Ask anything... 'Recommend a Python book under 300 pages'"
            className="flex-1 bg-transparent py-2 px-2 text-[#3C2D3D] placeholder-[#9F8B9C] focus:outline-none font-sans text-xs md:text-sm"
          />
          
          <button
            type="button"
            onClick={() => setIsListening(!isListening)}
            className={`p-2 rounded-xl border transition-all duration-300 flex items-center justify-center ${
              isListening
                ? 'bg-red-500/10 border-red-500/30 text-[#BF6B6B] animate-pulse'
                : 'bg-[#E5DAD2] border-[#DCD0C7] hover:bg-[#DDD0C6] text-[#6A5A6A]'
            }`}
          >
            <Mic size={14} />
          </button>
          
          <button
            type="submit"
            className="hidden md:flex px-4 py-2 rounded-xl bg-gradient-to-r from-[#867086] to-[#B294A6] hover:from-[#766076] hover:to-[#A28496] text-white font-medium text-xs items-center gap-1.5 shadow-[2px_2px_8px_rgba(134,112,134,0.15)] transition-all duration-300"
          >
            <span>Explore</span>
            <ArrowRight size={12} />
          </button>
        </div>
      </motion.form>

      {/* Voice Waveform Overlay */}
      <AnimatePresence>
        {isListening && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="mb-3 flex items-center justify-center gap-1.5 p-1.5 px-3 rounded-full bg-[#E5DAD2] border border-[#DCD0C7]"
          >
            {waveHeights.slice(0, 8).map((h, i) => (
              <motion.div
                key={i}
                animate={{ height: h / 3 }}
                className="w-1 rounded bg-[#BF6B6B]"
                style={{ height: 5 }}
                transition={{ type: 'spring', stiffness: 300, damping: 15 }}
              />
            ))}
            <span className="text-[9px] font-mono text-[#BF6B6B] px-1 uppercase tracking-wider">Listening</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Conversation speech bubble */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="h-6 flex items-center justify-center mb-1 max-w-md"
      >
        <p className="text-[10px] font-mono text-[#6A5A6A] flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#867086] animate-ping inline-block" />
          {aiMessage}
        </p>
      </motion.div>

      {/* Interactive Bookshelf Component */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="w-full mt-2"
      >
        <InteractiveBookshelf />
      </motion.div>
    </div>
  );
}
