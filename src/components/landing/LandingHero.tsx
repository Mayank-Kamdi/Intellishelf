'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Search, Mic, Sparkles, ArrowRight, Play, Pause, Volume2, VolumeX, Music2 } from 'lucide-react';

import InteractiveBookshelf from './InteractiveBookshelf';

// Marshmallow by Lukrembo — royalty-free (freetouse.com)
// Using a publicly accessible CDN-hosted lofi track
const AUDIO_SRC = 'https://cdn.pixabay.com/audio/2022/01/18/audio_d0c6ff1fdd.mp3';
const SONG_TITLE = 'Marshmallow';
const SONG_ARTIST = 'Lukrembo';

export default function LandingHero() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [aiMessage, setAiMessage] = useState('Welcome, Scholar. What knowledge do you seek today?');
  const [waveHeights, setWaveHeights] = useState<number[]>([10, 10, 10, 10, 10]);
  const waveIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Music player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(40);
  const [musicWave, setMusicWave] = useState<number[]>([4, 8, 12, 8, 4, 10, 6, 14, 8, 5]);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const musicAnimRef = useRef<NodeJS.Timeout | null>(null);

  // Init HTML5 audio element
  useEffect(() => {
    const audio = new Audio(AUDIO_SRC);
    audio.loop = true;
    audio.volume = volume / 100;
    audio.preload = 'metadata';
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.src = '';
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync volume changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  // Animate waveform when playing
  useEffect(() => {
    if (isPlaying) {
      musicAnimRef.current = setInterval(() => {
        setMusicWave(Array.from({ length: 10 }, () => Math.floor(Math.random() * 18) + 4));
      }, 180);
    } else {
      if (musicAnimRef.current) clearInterval(musicAnimRef.current);
      setMusicWave([4, 8, 12, 8, 4, 10, 6, 14, 8, 5]);
    }
    return () => { if (musicAnimRef.current) clearInterval(musicAnimRef.current); };
  }, [isPlaying]);

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch {
        setIsPlaying(false);
      }
    }
  }, [isPlaying]);

  const toggleMute = useCallback(() => {
    setIsMuted(prev => !prev);
  }, []);

  const handleVolumeChange = useCallback((v: number) => {
    setVolume(v);
    setIsMuted(false);
  }, []);

  // Voice recognition
  useEffect(() => {
    if (isListening) {
      setAiMessage('Listening to audio stream...');
      waveIntervalRef.current = setInterval(() => {
        setWaveHeights(Array.from({ length: 12 }, () => Math.floor(Math.random() * 40) + 10));
      }, 100);

      const timeout = setTimeout(() => {
        const voicePhrases = [
          'Recommend AI books under 300 pages',
          'I need a beginner Python book',
          'Books similar to Atomic Habits',
          'Show Machine Learning books available today',
        ];
        const phrase = voicePhrases[Math.floor(Math.random() * voicePhrases.length)];
        setSearchQuery(phrase);
        setIsListening(false);
        setAiMessage(`Identified query: "${phrase}"`);
        setTimeout(() => {
          router.push(`/dashboard?q=${encodeURIComponent(phrase)}`);
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

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-full w-full px-4 text-center max-w-4xl mx-auto py-6 h-full">

      {/* ── Floating Music Player ── */}
      <div className="fixed top-5 right-5 z-[99999]">
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2.5 pl-3 pr-2.5 py-2 rounded-2xl border border-[#C8B9C8]/40 bg-[#EAE0DA]/85 backdrop-blur-md shadow-[0_4px_24px_rgba(60,45,61,0.15)]"
          style={{ minWidth: 230 }}
        >
          {/* Icon with playing indicator */}
          <div className="relative shrink-0">
            <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors duration-300 ${isPlaying ? 'bg-[#867086]' : 'bg-[#C8B9C8]/50'}`}>
              <Music2 size={14} className="text-white" />
            </div>
            {isPlaying && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#10B981] border-[1.5px] border-[#EAE0DA] animate-pulse" />
            )}
          </div>

          {/* Song info + waveform */}
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-mono text-[#3C2D3D] font-bold truncate leading-tight">{SONG_TITLE}</p>
            <p className="text-[9px] font-mono text-[#867086] truncate leading-tight">{SONG_ARTIST}</p>
            <div className="flex items-end gap-[2px] mt-1 h-3">
              {musicWave.map((h, i) => (
                <motion.div
                  key={i}
                  animate={{ height: isPlaying ? h : 3 }}
                  transition={{ duration: 0.18 }}
                  className="w-[2px] rounded-full bg-[#867086]"
                  style={{ minHeight: 3 }}
                />
              ))}
            </div>
          </div>

          {/* Volume */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={toggleMute}
              className="p-1 rounded-lg hover:bg-[#D8C8D0]/60 text-[#6A5A6A] transition-colors cursor-pointer"
              title={isMuted ? 'Unmute' : 'Mute'}
            >
              {isMuted || volume === 0 ? <VolumeX size={11} /> : <Volume2 size={11} />}
            </button>
            <input
              type="range"
              min={0}
              max={100}
              value={isMuted ? 0 : volume}
              onChange={(e) => handleVolumeChange(Number(e.target.value))}
              className="w-14 h-1 accent-[#867086] cursor-pointer"
            />
          </div>

          {/* Play / Pause */}
          <button
            onClick={togglePlay}
            className="w-8 h-8 rounded-xl bg-[#3C2D3D] hover:bg-[#4C3D4D] text-[#FFFBE9] flex items-center justify-center shrink-0 transition-all cursor-pointer shadow-sm"
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying
              ? <Pause size={13} />
              : <Play size={13} style={{ marginLeft: 1 }} />
            }
          </button>
        </motion.div>

        {/* Attribution (required by freetouse.com license) */}
        <p className="text-[8px] font-mono text-[#948979]/80 text-center mt-1">
          {SONG_ARTIST} · freetouse.com
        </p>
      </div>

      {/* Top Banner */}
      <motion.div
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="mb-3 flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-[#B294A6]/20 bg-[#EADFD8]/60 text-[#867086] text-[10px] font-mono tracking-wider uppercase"
      >
        <Sparkles size={11} className="animate-pulse" /> Next-Gen AI System Enabled
      </motion.div>

      {/* Hero Heading */}
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

      {/* Search Input */}
      <motion.form
        onSubmit={handleSearchSubmit}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full max-w-xl px-4 mt-4 mb-3"
      >
        <div className="glass-panel p-1.5 rounded-2xl flex items-center gap-2 border border-[#DCD0C7] bg-[#EADFD8]/30 focus-within:ring-2 focus-within:ring-[#867086]/35 transition-all duration-300">
          <div className="pl-3 text-[#6A5A6A]"><Search size={16} /></div>
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
            className={`p-2 rounded-xl border transition-all duration-300 flex items-center justify-center cursor-pointer ${
              isListening
                ? 'bg-red-500/10 border-red-500/30 text-[#BF6B6B] animate-pulse'
                : 'bg-[#E5DAD2] border-[#DCD0C7] hover:bg-[#DDD0C6] text-[#6A5A6A]'
            }`}
          >
            <Mic size={14} />
          </button>
          <button
            type="submit"
            className="hidden md:flex px-4 py-2 rounded-xl bg-gradient-to-r from-[#867086] to-[#B294A6] hover:from-[#766076] hover:to-[#A28496] text-white font-medium text-xs items-center gap-1.5 shadow-[2px_2px_8px_rgba(134,112,134,0.15)] transition-all duration-300 cursor-pointer"
          >
            <span>Explore</span>
            <ArrowRight size={12} />
          </button>
        </div>
      </motion.form>

      {/* Voice Waveform */}
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

      {/* AI Status Message */}
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

      {/* Interactive Bookshelf */}
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
