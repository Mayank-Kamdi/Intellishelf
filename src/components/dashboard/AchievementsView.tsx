'use client';

import React from 'react';
import { UserStats } from '@/types';
import { Award, Trophy, Zap, Star } from 'lucide-react';

interface AchievementsViewProps {
  stats: UserStats | null;
}

export default function AchievementsView({ stats }: AchievementsViewProps) {
  if (!stats) return null;

  const competitors = [
    { rank: 1, name: 'Aarav Sharma', level: 9, xp: 4850, active: true },
    { rank: 2, name: 'Sarah Connor', level: 7, xp: 3200, active: false },
    { rank: 3, name: 'You (Mayank)', level: stats.level, xp: stats.xp, active: true, highlighted: true },
    { rank: 4, name: 'Devin AI', level: 4, xp: 1250, active: false },
    { rank: 5, name: 'Elena Gilbert', level: 3, xp: 850, active: false }
  ];

  const badges = [
    { id: 'b1', title: 'Explorer', desc: 'Checked out books in 3 distinct genres', unlocked: true, color: '#3B82F6' },
    { id: 'b2', title: 'Researcher', desc: 'Read 5 Advanced machine learning textbooks', unlocked: true, color: '#8B5CF6' },
    { id: 'b3', title: 'Bookworm', desc: 'Maintain a 14-day consecutive active streak', unlocked: false, color: '#10B981' },
    { id: 'b4', title: 'Speed Reader', desc: 'Finished a book of 500+ pages in 2 days', unlocked: false, color: '#EF4444' }
  ];

  return (
    <div className="flex flex-col gap-6">
      
      {/* Title Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2.5">
          Academy Achievements <Award className="text-amber-400" />
        </h1>
        <p className="text-xs font-mono text-zinc-500">Collect experience points, unlock achievement badges, and climb leaderboards</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Badges list */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="glass-panel p-6 rounded-3xl">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-6">
              Achievement Badges
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-4 rounded-2xl border flex flex-col justify-between h-36 transition-all ${
                    badge.unlocked 
                      ? 'bg-zinc-900/40 border-white/5 hover:border-zinc-800' 
                      : 'bg-zinc-950/20 border-white/5 opacity-50'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ 
                        backgroundColor: `${badge.color}10`,
                        border: `1px solid ${badge.color}30`,
                        color: badge.color
                      }}
                    >
                      <Trophy size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-zinc-200">{badge.title}</h4>
                      <span className="text-[9px] font-mono uppercase tracking-widest mt-0.5 block" style={{ color: badge.color }}>
                        {badge.unlocked ? 'UNLOCKED' : 'LOCKED'}
                      </span>
                    </div>
                  </div>
                  <p className="text-[10px] text-zinc-500 font-mono mt-3 leading-relaxed">{badge.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Leaderboard list */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="glass-panel p-6 rounded-3xl">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-6">
              Scholar Leaderboard
            </h3>

            <div className="flex flex-col gap-2.5">
              {competitors.map((c) => (
                <div
                  key={c.rank}
                  className={`p-3 rounded-xl border flex justify-between items-center transition-all ${
                    c.highlighted
                      ? 'bg-blue-500/10 border-blue-500/30 shadow-[0_0_15px_rgba(59,130,246,0.15)]'
                      : 'bg-zinc-900/20 border-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="w-5 font-mono text-xs text-zinc-500 text-center font-bold">#{c.rank}</span>
                    <div>
                      <h4 className="text-xs font-semibold text-zinc-200">{c.name}</h4>
                      <p className="text-[9px] font-mono text-zinc-500">Scholar Rank</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono">
                    <span className="text-zinc-400">Lvl {c.level}</span>
                    <span className="text-blue-400 font-bold">{c.xp} XP</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
