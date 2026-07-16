'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star, Calendar, MapPin, Sparkles, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';
import { Book } from '@/types';
import confetti from 'canvas-confetti';

interface BookDetailsModalProps {
  book: Book | null;
  onClose: () => void;
  onReserve: (id: string) => void;
  relatedBooks: Book[];
  onBookSelect: (book: Book) => void;
}

export default function BookDetailsModal({
  book,
  onClose,
  onReserve,
  relatedBooks,
  onBookSelect
}: BookDetailsModalProps) {
  const [isPreviewing, setIsPreviewing] = useState(false);
  const [isReserving, setIsReserving] = useState(false);
  const [showSuccessLocker, setShowSuccessLocker] = useState(false);
  const [lockerNum, setLockerNum] = useState(101);

  if (!book) return null;

  const handleReserve = () => {
    setIsReserving(true);
    const generatedLocker = Math.floor(Math.random() * 50) + 100;
    setLockerNum(generatedLocker);

    // Simulate book flying to locker animation
    setTimeout(() => {
      onReserve(book.id);
      setIsReserving(false);
      setShowSuccessLocker(true);
      
      // Blast confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-zinc-950/80 backdrop-blur-sm">
        
        {/* Reservation fly-to-locker overlay */}
        {isReserving && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950/90">
            <motion.div
              initial={{ scale: 0.5, y: 100, rotate: 0 }}
              animate={{ 
                scale: [0.5, 1.2, 0.4], 
                y: [100, -50, -200], 
                x: [0, 50, 0],
                rotate: [0, 15, 360]
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="w-32 h-44 rounded-xl shadow-2xl flex items-center justify-center p-4 relative"
              style={{ background: `linear-gradient(135deg, ${book.coverColor}, #09090b)` }}
            >
              <span className="font-display font-bold text-center text-xs text-white">{book.title}</span>
            </motion.div>
            
            {/* Locker graphic */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mt-8 flex flex-col items-center"
            >
              <div className="w-20 h-20 rounded-2xl bg-zinc-900 border border-blue-500/30 flex items-center justify-center glow-primary">
                <span className="font-mono text-xl text-blue-400 font-bold">L-{lockerNum}</span>
              </div>
              <p className="mt-4 text-xs font-mono text-zinc-400 uppercase tracking-widest animate-pulse">
                Transferring book to holographic locker...
              </p>
            </motion.div>
          </div>
        )}

        {/* Locker Success Overlay */}
        {showSuccessLocker && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-zinc-950/95 px-6 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
              <CheckCircle size={32} />
            </div>
            <h2 className="text-2xl font-display font-bold text-white mb-2">Reservation Secured</h2>
            <p className="text-zinc-400 text-sm max-w-sm mb-6">
              "{book.title}" has been successfully transferred to Smart Locker <strong className="text-blue-400 font-mono">L-{lockerNum}</strong>. Pick up within 20 minutes using your student ID tag.
            </p>
            <button
              onClick={() => {
                setShowSuccessLocker(false);
                onClose();
              }}
              className="px-6 py-2.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-mono uppercase tracking-wider text-zinc-300 transition-all"
            >
              Close Console
            </button>
          </motion.div>
        )}

        {/* Primary Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-4xl max-h-[85vh] overflow-y-auto glass-panel rounded-3xl p-6 md:p-8 flex flex-col gap-6 no-scrollbar"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-xl bg-zinc-900/60 border border-white/5 text-zinc-400 hover:text-white transition-all z-10"
          >
            <X size={16} />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            
            {/* Book Cover and Quick Info */}
            <div className="md:col-span-4 flex flex-col gap-4">
              <div className="relative aspect-[3/4.2] rounded-2xl overflow-hidden p-[1px] bg-white/5">
                <div 
                  className="w-full h-full rounded-[15px] flex flex-col justify-between p-6 relative overflow-hidden"
                  style={{ background: `linear-gradient(135deg, ${book.coverColor}dd, #09090b)` }}
                >
                  <div className="absolute inset-0 bg-radial-at-t from-white/10 to-transparent pointer-events-none" />
                  
                  {/* Holographic glowing label */}
                  <div className="self-end px-2.5 py-1 rounded bg-black/30 border border-white/10 text-[9px] font-mono text-white/80 uppercase tracking-widest">
                    {book.category}
                  </div>
                  
                  <div className="flex flex-col gap-1.5 z-10">
                    <h2 className="text-xl md:text-2xl font-display font-bold text-white drop-shadow-md leading-tight">
                      {book.title}
                    </h2>
                    <p className="text-xs font-mono text-zinc-300 drop-shadow">By {book.author}</p>
                  </div>
                </div>
              </div>

              {/* Status Spec */}
              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <div className="p-3 rounded-xl bg-zinc-900/40 border border-white/5 text-center">
                  <span className="text-zinc-500 block mb-1">Status</span>
                  <span className={book.available ? 'text-emerald-400' : 'text-rose-400'}>
                    {book.available ? 'AVAILABLE' : 'RESERVED'}
                  </span>
                </div>
                <div className="p-3 rounded-xl bg-zinc-900/40 border border-white/5 text-center">
                  <span className="text-zinc-500 block mb-1">Index Location</span>
                  <span className="text-blue-400">{book.shelfLocation}</span>
                </div>
              </div>

              {/* Borrow/Reserve actions */}
              <div className="flex flex-col gap-2">
                <button
                  disabled={!book.available}
                  onClick={handleReserve}
                  className={`w-full py-3 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all ${
                    book.available
                      ? 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-[0_4px_20px_rgba(59,130,246,0.35)]'
                      : 'bg-zinc-800 text-zinc-500 border border-zinc-700/50 cursor-not-allowed'
                  }`}
                >
                  <Sparkles size={16} />
                  <span>{book.available ? 'Reserve holographic Locker' : 'Reserved/Out of Stock'}</span>
                </button>

                <button
                  onClick={() => setIsPreviewing(!isPreviewing)}
                  className="w-full py-2.5 rounded-xl border border-zinc-800 hover:border-zinc-700 bg-zinc-900/30 hover:bg-zinc-900/60 text-zinc-300 text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <BookOpen size={14} />
                  <span>{isPreviewing ? 'Close Digital Preview' : 'Flip Open Preview'}</span>
                </button>
              </div>
            </div>

            {/* Book Metadata & AI summary details */}
            <div className="md:col-span-8 flex flex-col gap-6">
              
              {/* Preview Flip Animation view */}
              <AnimatePresence>
                {isPreviewing ? (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="p-5 rounded-2xl bg-zinc-950/80 border border-blue-500/20 glow-primary relative"
                  >
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-xs font-mono text-blue-400 uppercase tracking-widest">Digital Preview Page 1-2</span>
                      <span className="text-[10px] text-zinc-500">Press Preview button to close</span>
                    </div>
                    {/* Simulated page flip content */}
                    <div className="grid grid-cols-2 gap-4 text-xs leading-relaxed text-zinc-400 font-serif p-3 bg-zinc-900/50 rounded-xl">
                      <div className="border-r border-white/5 pr-4">
                        <h4 className="font-display font-bold text-zinc-200 mb-2">CHAPTER ONE</h4>
                        <p>In the digital age, understanding structured systems of habits governs outcome curves. The compounding changes made by one percent shifts are often visually undetectable on a day-to-day timeline, yet result in astronomical transformations when evaluated over longer intervals...</p>
                      </div>
                      <div className="pl-2">
                        <h4 className="font-display font-bold text-zinc-200 mb-2">CHAPTER TWO</h4>
                        <p>Systems over goals. When you prioritize the target, you build short-term sprint capacity, but lack structural stability once the marker is reached. To develop sustainable, lifelong momentum, one must design feedback loops that make execution permanent...</p>
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>

              {/* Main Info */}
              <div>
                <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{book.publisher}</span>
                <h1 className="text-3xl font-display font-bold text-white mt-1">{book.title}</h1>
                <p className="text-sm text-zinc-400 mt-2">{book.description}</p>
              </div>

              {/* AI Assistant Section */}
              <div className="p-5 rounded-2xl bg-blue-950/15 border border-blue-500/10 flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-cyan-400" />
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-400">JARVIS Summary Analysis</h3>
                </div>
                
                <p className="text-xs text-zinc-300 leading-relaxed font-sans">{book.summary}</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-white/5 pt-4">
                  <div className="text-left">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">Difficulty level</span>
                    <p className="text-xs font-medium text-zinc-200 mt-0.5">{book.difficulty}</p>
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">Est. Reading Time</span>
                    <p className="text-xs font-medium text-zinc-200 mt-0.5">{book.readTime}</p>
                  </div>
                  <div className="text-left">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">Prerequisites</span>
                    <p className="text-xs font-medium text-zinc-200 mt-0.5 truncate">{book.prerequisites.join(', ')}</p>
                  </div>
                </div>
              </div>

              {/* Who should read */}
              <div>
                <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-2">Ideal Candidates</h4>
                <div className="flex flex-wrap gap-1.5">
                  {book.whoShouldRead.map((item, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-white/5 text-[11px] text-zinc-300">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Related / Recommended books */}
              {relatedBooks.length > 0 && (
                <div>
                  <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3">Related Materials</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {relatedBooks.map((rel) => (
                      <div
                        key={rel.id}
                        onClick={() => onBookSelect(rel)}
                        className="p-3 rounded-xl border border-white/5 bg-zinc-900/20 hover:bg-zinc-900/60 cursor-pointer transition-all flex items-center justify-between group"
                      >
                        <div>
                          <p className="text-xs font-semibold text-zinc-200 group-hover:text-blue-400 transition-colors line-clamp-1">{rel.title}</p>
                          <p className="text-[10px] font-mono text-zinc-500 mt-0.5">By {rel.author}</p>
                        </div>
                        <ArrowRight size={14} className="text-zinc-500 group-hover:translate-x-1 transition-transform" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
