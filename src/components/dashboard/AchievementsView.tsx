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
        <h1 className="text-2xl font-display font-bold text-[#222831] flex items-center gap-2.5">
          Academy Achievements <Award className="text-[#948979]" />
        </h1>
        <p className="text-sm font-mono text-[#393E46]">Collect experience points, unlock achievement badges, and climb leaderboards</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Badges list */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="glass-panel p-6 rounded-3xl bg-[#EADCB9] border border-white/20 shadow-sm">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#393E46] mb-6">
              Achievement Badges
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {badges.map((badge) => (
                <div
                  key={badge.id}
                  className={`p-4 rounded-2xl border flex flex-col justify-between h-36 transition-all ${
                    badge.unlocked 
                      ? 'bg-[#DFD0B8]/80 border-[#948979]/35 hover:border-[#948979]/50 shadow-sm' 
                      : 'bg-[#DFD0B8]/40 border-[#948979]/20 opacity-60'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ 
                        backgroundColor: `${badge.color}15`,
                        border: `1px solid ${badge.color}35`,
                        color: badge.color
                      }}
                    >
                      <Trophy size={18} />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-[#222831]">{badge.title}</h4>
                      <span className="text-[9px] font-mono font-bold uppercase tracking-widest mt-0.5 block" style={{ color: badge.color }}>
                        {badge.unlocked ? 'UNLOCKED' : 'LOCKED'}
                      </span>
                    </div>
                  </div>
                  <p className="text-[10.5px] text-[#393E46] font-mono mt-3 leading-relaxed">{badge.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Leaderboard list */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="glass-panel p-6 rounded-3xl bg-[#EADCB9] border border-white/20 shadow-sm">
            <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#393E46] mb-6">
              Scholar Leaderboard
            </h3>

            <div className="flex flex-col gap-2.5">
              {competitors.map((c) => (
                <div
                  key={c.rank}
                  className={`p-3.5 rounded-xl border flex justify-between items-center transition-all ${
                    c.highlighted
                      ? 'bg-[#393E46] border-[#222831] text-[#DFD0B8] shadow-md'
                      : 'bg-[#DFD0B8]/50 border-[#948979]/20 text-[#222831]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-5 font-mono text-xs text-center font-bold ${c.highlighted ? 'text-[#DFD0B8]' : 'text-[#948979]'}`}>
                      #{c.rank}
                    </span>
                    <div>
                      <h4 className={`text-xs font-semibold ${c.highlighted ? 'text-white' : 'text-[#222831]'}`}>{c.name}</h4>
                      <p className={`text-[9px] font-mono ${c.highlighted ? 'text-[#948979]' : 'text-[#393E46]'}`}>Scholar Rank</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-mono">
                    <span className={c.highlighted ? 'text-[#DFD0B8]' : 'text-[#393E46]'}>Lvl {c.level}</span>
                    <span className={c.highlighted ? 'text-amber-400 font-extrabold' : 'text-[#222831] font-bold'}>{c.xp} XP</span>
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
