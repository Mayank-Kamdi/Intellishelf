'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Search, Mic, Sparkles, ArrowRight, Play, Pause, Volume2, VolumeX, Music2 } from 'lucide-react';

import InteractiveBookshelf from './InteractiveBookshelf';

// YouTube video ID for the ambient track
const YT_VIDEO_ID = '6X_OEUFV0v4';
const SONG_TITLE = 'Ambient Study Music';

// YouTube player instance interface
interface YTPlayer {
  playVideo(): void;
  pauseVideo(): void;
  setVolume(v: number): void;
  getPlayerState(): number;
  destroy(): void;
}

declare global {
  interface Window {
    YT: {
      Player: new (el: HTMLElement | string, opts: object) => YTPlayer;
      PlayerState: { PLAYING: number; PAUSED: number; ENDED: number };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}

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
  const [playerReady, setPlayerReady] = useState(false);
  const playerRef = useRef<YTPlayer | null>(null);
  const iframeContainerRef = useRef<HTMLDivElement>(null);
  const musicAnimRef = useRef<NodeJS.Timeout | null>(null);

  // Animate music wave when playing
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

  // Load YouTube IFrame API
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const initPlayer = () => {
      if (!iframeContainerRef.current) return;
      playerRef.current = new window.YT.Player(iframeContainerRef.current, {
        videoId: YT_VIDEO_ID,
        playerVars: {
          autoplay: 0,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          rel: 0,
          showinfo: 0,
          loop: 1,
          playlist: YT_VIDEO_ID,
        },
        events: {
          onReady: () => {
            playerRef.current?.setVolume(volume);
            setPlayerReady(true);
          },
          onStateChange: (e: { data: number }) => {
            setIsPlaying(e.data === 1);
          },
        },
      });
    };

    if (window.YT && window.YT.Player) {
      initPlayer();
    } else {
      window.onYouTubeIframeAPIReady = initPlayer;
      if (!document.getElementById('yt-iframe-api')) {
        const tag = document.createElement('script');
        tag.id = 'yt-iframe-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.head.appendChild(tag);
      }
    }

    return () => {
      playerRef.current?.destroy();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const togglePlay = useCallback(() => {
    if (!playerRef.current || !playerReady) return;
    if (isPlaying) {
      playerRef.current.pauseVideo();
    } else {
      playerRef.current.playVideo();
      playerRef.current.setVolume(volume);
    }
  }, [isPlaying, playerReady, volume]);

  const toggleMute = useCallback(() => {
    if (!playerRef.current) return;
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    playerRef.current.setVolume(newMuted ? 0 : volume);
  }, [isMuted, volume]);

  const handleVolumeChange = useCallback((v: number) => {
    setVolume(v);
    setIsMuted(false);
    playerRef.current?.setVolume(v);
  }, []);

  // Handle mock voice recognition
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
          'Show Machine Learning books available today'
        ];
        const randomPhrase = voicePhrases[Math.floor(Math.random() * voicePhrases.length)];
        setSearchQuery(randomPhrase);
        setIsListening(false);
        setAiMessage(`Identified query: "${randomPhrase}"`);
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

  return (
    <div className="relative z-10 flex flex-col items-center justify-center min-h-full w-full px-4 text-center max-w-4xl mx-auto py-6 h-full">

      {/* Hidden YouTube iframe container */}
      <div className="absolute opacity-0 pointer-events-none w-0 h-0 overflow-hidden" aria-hidden>
        <div ref={iframeContainerRef} />
      </div>

      {/* ── Floating Music Player ── */}
      <div className="fixed top-5 right-5 z-[99999]">
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.8, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-2 pl-3 pr-2 py-2 rounded-2xl border border-[#C8B9C8]/40 bg-[#EAE0DA]/80 backdrop-blur-md shadow-[0_4px_24px_rgba(60,45,61,0.12)]"
          style={{ minWidth: 220 }}
        >
          {/* Music icon pulse */}
          <div className="relative shrink-0">
            <div className={`w-7 h-7 rounded-xl flex items-center justify-center ${isPlaying ? 'bg-[#867086]' : 'bg-[#C8B9C8]/60'} transition-colors duration-300`}>
              <Music2 size={13} className="text-white" />
            </div>
            {isPlaying && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full bg-[#10B981] border border-white animate-pulse" />
            )}
          </div>

          {/* Song info + waveform */}
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-mono text-[#3C2D3D] font-bold truncate leading-tight">
              {SONG_TITLE}
            </p>
            <div className="flex items-center gap-[2px] mt-1 h-3">
              {musicWave.map((h, i) => (
                <motion.div
                  key={i}
                  animate={{ height: isPlaying ? h : 3 }}
                  transition={{ duration: 0.18, ease: 'easeInOut' }}
                  className="w-[2px] rounded-full bg-[#867086]"
                  style={{ minHeight: 3 }}
                />
              ))}
            </div>
          </div>

          {/* Volume control */}
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
              title="Volume"
            />
          </div>

          {/* Play / Pause */}
          <button
            onClick={togglePlay}
            disabled={!playerReady}
            className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all cursor-pointer ${
              playerReady
                ? 'bg-[#3C2D3D] hover:bg-[#4C3D4D] text-[#FFFBE9]'
                : 'bg-[#C8B9C8]/40 text-[#9F8B9C] cursor-not-allowed'
            }`}
            title={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} style={{ marginLeft: 1 }} />}
          </button>
        </motion.div>

        {/* Loading hint */}
        {!playerReady && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-[9px] font-mono text-[#948979] text-center mt-1"
          >
            Loading player…
          </motion.p>
        )}
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

      {/* AI Message */}
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
