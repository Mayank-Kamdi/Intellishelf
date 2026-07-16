'use client';

import React from 'react';
import { UserStats } from '@/types';
import { BarChart3, Clock, CheckCircle2, Bookmark } from 'lucide-react';

interface AnalyticsViewProps {
  stats: UserStats | null;
}

export default function AnalyticsView({ stats }: AnalyticsViewProps) {
  if (!stats) return null;

  return (
    <div className="flex flex-col gap-6">
      
      {/* Title Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2.5">
          Research Analytics <BarChart3 className="text-blue-400" />
        </h1>
        <p className="text-xs font-mono text-zinc-500">Review metrics, genre density, and speed stats</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Metric 1 */}
        <div className="glass-panel p-5 rounded-2xl flex gap-4 items-center">
          <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
            <Clock size={20} />
          </div>
          <div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase block">Weekly Focus</span>
            <span className="text-lg font-bold text-zinc-200 font-display">8.4 Hours / week</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="glass-panel p-5 rounded-2xl flex gap-4 items-center">
          <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center">
            <Bookmark size={20} />
          </div>
          <div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase block">Active Semesters</span>
            <span className="text-lg font-bold text-zinc-200 font-display">25 books logged</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="glass-panel p-5 rounded-2xl flex gap-4 items-center">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase block">Completion Efficiency</span>
            <span className="text-lg font-bold text-zinc-200 font-display">94.2% return rate</span>
          </div>
        </div>

      </div>

      {/* Genre distribution block */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Genre distribution bar list */}
        <div className="glass-panel p-6 rounded-3xl">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-6">
            Genre Distribution Density
          </h3>

          <div className="flex flex-col gap-4">
            {Object.entries(stats.genreProgress).map(([genre, percent], idx) => (
              <div key={genre} className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-zinc-300">{genre}</span>
                  <span className="text-zinc-500">{percent}% density</span>
                </div>
                <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000`} 
                    style={{ 
                      width: `${percent}%`,
                      backgroundColor: idx === 0 ? '#3B82F6' : idx === 1 ? '#8B5CF6' : idx === 2 ? '#10B981' : '#22D3EE'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Simulated reading speed charts */}
        <div className="glass-panel p-6 rounded-3xl">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 mb-6">
            Weekly Temporal Logs (pages read)
          </h3>

          {/* Bar charts using divs */}
          <div className="h-44 flex items-end justify-between gap-2.5 px-2 border-b border-white/5 pb-2">
            {[35, 52, 45, 60, 85, 42, 65].map((pages, idx) => {
              const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="relative w-full flex justify-center">
                    <span className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-zinc-900 border border-white/5 text-[9px] font-mono text-zinc-300 px-1.5 py-0.5 rounded">
                      {pages}p
                    </span>
                    <div 
                      className="w-full rounded-t-lg bg-blue-500/20 group-hover:bg-blue-500 transition-all duration-500 border border-blue-500/10"
                      style={{ height: `${pages * 1.5}px` }}
                    />
                  </div>
                  <span className="text-[9px] font-mono text-zinc-500">{days[idx]}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
