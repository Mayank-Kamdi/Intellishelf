'use client';

import React from 'react';
import { Book, UserStats, OverdueItem } from '@/types';
import { BookOpen, Trophy, Clock, Star, ArrowUpRight, Flame, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

interface HomeViewProps {
  books: Book[];
  stats: UserStats | null;
  overdue: OverdueItem[];
  onBookSelect: (book: Book) => void;
  onViewChange: (tab: string) => void;
}

export default function HomeView({ books, stats, overdue, onBookSelect, onViewChange }: HomeViewProps) {
  const trending = [...books].sort((a, b) => b.popularityScore - a.popularityScore).slice(0, 3);
  const recommended = [...books].filter(b => b.difficulty === 'Beginner' || b.category === 'Artificial Intelligence').slice(0, 3);
  const goalPercentage = stats ? Math.round((stats.readingGoalProgress / stats.readingGoal) * 100) : 0;
  const overdueAlerts = overdue.filter(item => item.daysRemaining < 0);

  return (
    <div className="flex flex-col gap-6 max-h-full overflow-y-auto no-scrollbar">
      
      {/* Top Banner Alert */}
      {overdueAlerts.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-3 rounded-2xl bg-red-500/5 border border-[#BF6B6B]/35 text-[#BF6B6B] flex items-center justify-between text-xs font-mono"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#BF6B6B] animate-pulse shrink-0" />
            <span>ALERT: You have {overdueAlerts.length} overdue checkouts. Extension required!</span>
          </div>
          <button 
            onClick={() => onViewChange('overdue')}
            className="px-3 py-1 rounded-xl bg-[#BF6B6B]/10 hover:bg-[#BF6B6B]/20 border border-[#BF6B6B]/30 transition-all font-bold"
          >
            Resolve
          </button>
        </motion.div>
      )}

      {/* Grid statistics metrics panel */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        
        {/* XP stats */}
        <div className="glass-panel p-5 flex items-center justify-between group hover:border-[#948979]/50 transition-all shadow-[2px_2px_8px_rgba(0,0,0,0.03)] bg-[#EADCB9] rounded-2xl border border-white/20">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono font-bold text-[#393E46] uppercase tracking-wider">Scholar XP</span>
            <span className="text-2xl font-display font-extrabold text-[#222831]">{stats?.xp}</span>
            <span className="text-[11px] text-[#948979] font-mono font-medium">Rank Level {stats?.level}</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#948979]/20 flex items-center justify-center text-[#393E46]">
            <Trophy size={18} />
          </div>
        </div>

        {/* Books read */}
        <div className="glass-panel p-5 flex items-center justify-between group hover:border-[#948979]/50 transition-all shadow-[2px_2px_8px_rgba(0,0,0,0.03)] bg-[#EADCB9] rounded-2xl border border-white/20">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono font-bold text-[#393E46] uppercase tracking-wider">Books Read</span>
            <span className="text-2xl font-display font-extrabold text-[#222831]">{stats?.booksRead}</span>
            <span className="text-[11px] text-[#948979] font-mono font-medium">Semester total</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#948979]/20 flex items-center justify-center text-[#393E46]">
            <BookOpen size={18} />
          </div>
        </div>

        {/* Hours read */}
        <div className="glass-panel p-5 flex items-center justify-between group hover:border-[#948979]/50 transition-all shadow-[2px_2px_8px_rgba(0,0,0,0.03)] bg-[#EADCB9] rounded-2xl border border-white/20">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono font-bold text-[#393E46] uppercase tracking-wider">Focus Time</span>
            <span className="text-2xl font-display font-extrabold text-[#222831]">{stats?.hoursRead}h</span>
            <span className="text-[11px] text-[#948979] font-mono font-medium">Minutes logged</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#948979]/20 flex items-center justify-center text-[#393E46]">
            <Clock size={18} />
          </div>
        </div>

        {/* Streak details */}
        <div className="glass-panel p-5 flex items-center justify-between group hover:border-[#948979]/50 transition-all shadow-[2px_2px_8px_rgba(0,0,0,0.03)] bg-[#EADCB9] rounded-2xl border border-white/20">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-mono font-bold text-[#393E46] uppercase tracking-wider">Daily Streak</span>
            <span className="text-2xl font-display font-extrabold text-[#222831]">{stats?.streak}d</span>
            <span className="text-[11px] text-[#948979] font-mono font-medium">Active consistency</span>
          </div>
          <div className="w-10 h-10 rounded-xl bg-[#948979]/20 flex items-center justify-center text-[#393E46]">
            <Flame size={18} className="fill-[#948979]/10" />
          </div>
        </div>

      </div>

      {/* Main dashboard content grids */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        
        {/* Left Side: Book lists */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          
          {/* Trending Books section */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <h2 className="text-base font-display font-bold text-[#222831] flex items-center gap-1.5">
                Trending Books <Sparkles size={14} className="text-[#393E46]" />
              </h2>
              <button 
                onClick={() => onViewChange('3d')}
                className="text-[11px] font-mono text-[#393E46] hover:text-[#222831] transition-colors flex items-center gap-0.5"
              >
                Launch 3D Room <ArrowUpRight size={12} />
              </button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {trending.map((book) => (
                <div
                  key={book.id}
                  onClick={() => onBookSelect(book)}
                  className="glass-card p-4 flex flex-col justify-between h-40 relative overflow-hidden group cursor-pointer bg-[#EADCB9] border border-white/20 rounded-2xl shadow-sm hover:border-[#948979]/40 transition-all"
                >
                  <div className="absolute inset-0 bg-radial-at-t from-white/10 to-transparent pointer-events-none" />
                  <div>
                    <span className="px-2 py-0.5 rounded bg-[#DFD0B8]/50 border border-[#948979]/30 text-[9px] font-mono text-[#393E46]">
                      {book.category}
                    </span>
                    <h3 className="font-display font-bold text-sm text-[#222831] group-hover:text-[#393E46] transition-colors mt-2 line-clamp-2 leading-snug">
                      {book.title}
                    </h3>
                    <p className="text-[10px] font-mono text-[#393E46] mt-0.5">By {book.author}</p>
                  </div>
                  
                  <div className="flex justify-between items-center border-t border-[#948979]/20 pt-2">
                    <span className="text-[10px] font-mono text-[#948979]">Score: {book.popularityScore}</span>
                    <div className="flex items-center gap-0.5 text-amber-600 text-[10px] font-bold">
                      <Star size={10} className="fill-amber-600" />
                      <span>{book.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recommended Materials */}
          <div>
            <h2 className="text-base font-display font-bold text-[#222831] mb-3">Recommended For You</h2>
            <div className="flex flex-col gap-2">
              {recommended.map((book) => (
                <div
                  key={book.id}
                  onClick={() => onBookSelect(book)}
                  className="glass-panel p-3.5 cursor-pointer flex items-center justify-between bg-[#EADCB9] border border-white/25 hover:border-[#948979]/40 rounded-2xl transition-all group shadow-sm"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-8 h-11 rounded flex items-center justify-center text-[7px] font-mono p-1 text-center font-bold text-white/95"
                      style={{ background: `linear-gradient(135deg, ${book.coverColor}, #222831)` }}
                    >
                      {book.title.slice(0, 2)}
                    </div>
                    <div>
                      <h3 className="font-display font-bold text-sm text-[#222831] group-hover:text-[#393E46] transition-all">
                        {book.title}
                      </h3>
                      <p className="text-[11px] font-mono text-[#393E46]">By {book.author} | {book.pages} pages</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-[10px] font-mono text-[#393E46] bg-[#DFD0B8]/50 border border-[#948979]/30 px-2 py-0.5 rounded-lg">
                      {book.difficulty}
                    </span>
                    <ArrowUpRight size={14} className="text-[#393E46] group-hover:text-[#222831] transition-all" />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Right Side: Progress rings */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          
          {/* Progress Ring Widget */}
          <div className="glass-panel p-5 flex flex-col items-center text-center bg-[#EADCB9] border border-white/20 rounded-2xl shadow-sm">
            <h3 className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#393E46] mb-4 w-full text-left">
              Attendance & Target
            </h3>
            
            {/* Circular Progress Ring */}
            <div className="relative w-28 h-28 flex items-center justify-center">
              <svg className="w-full h-full transform -rotate-90">
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  stroke="rgba(34,40,49,0.06)"
                  strokeWidth="8"
                  fill="transparent"
                />
                <circle
                  cx="56"
                  cy="56"
                  r="48"
                  stroke="#393E46"
                  strokeWidth="8"
                  fill="transparent"
                  strokeDasharray={301}
                  strokeDashoffset={301 - (301 * goalPercentage) / 100}
                  className="transition-all duration-1000 ease-out"
                  strokeLinecap="round"
                />
              </svg>
              
              <div className="absolute flex flex-col items-center">
                <span className="text-xl font-display font-extrabold text-[#222831]">{goalPercentage}%</span>
                <span className="text-[9px] font-mono text-[#393E46] uppercase tracking-widest">Completed</span>
              </div>
            </div>

            <div className="mt-4 flex justify-between w-full text-[10px] font-mono text-[#393E46] border-t border-[#948979]/20 pt-3">
              <span>Goal: {stats?.readingGoal} items</span>
              <span className="text-[#222831] font-bold">Current: {stats?.readingGoalProgress} read</span>
            </div>
          </div>

          {/* Gamified Achievements panel */}
          <div className="glass-panel p-5 flex flex-col gap-3 bg-[#EADCB9] border border-white/20 rounded-2xl shadow-sm">
            <h3 className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#393E46]">
              Active Trophies
            </h3>
            
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#DFD0B8]/50 border border-[#948979]/30">
                <div className="w-7 h-7 rounded-lg bg-[#948979]/20 text-[#393E46] flex items-center justify-center">
                  <Trophy size={14} />
                </div>
                <div>
                  <h4 className="text-[11px] font-semibold text-[#222831]">Explorer Badge</h4>
                  <p className="text-[9px] font-mono text-[#393E46]">Read 3 distinct genres</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 p-2 rounded-xl bg-[#DFD0B8]/50 border border-[#948979]/30">
                <div className="w-7 h-7 rounded-lg bg-[#948979]/20 text-[#393E46] flex items-center justify-center">
                  <Sparkles size={14} />
                </div>
                <div>
                  <h4 className="text-[11px] font-semibold text-[#222831]">Research Expert</h4>
                  <p className="text-[9px] font-mono text-[#393E46]">5 Advanced books indexed</p>
                </div>
              </div>
            </div>

            <button 
              onClick={() => onViewChange('gamification')}
              className="w-full mt-1 py-1.5 rounded-xl border border-[#948979]/35 bg-[#DFD0B8] hover:bg-[#DFD0B8]/80 text-[10px] font-mono uppercase text-[#222831] transition-all cursor-pointer font-bold shadow-sm"
            >
              View Leaderboard
            </button>
          </div>

        </div>

      </div>

    </div>
  );
}
