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
        <h1 className="text-2xl font-display font-bold text-[#222831] flex items-center gap-2.5">
          Research Analytics <BarChart3 className="text-[#948979]" />
        </h1>
        <p className="text-sm font-mono text-[#393E46]">Review metrics, genre density, and speed stats</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Metric 1 */}
        <div className="glass-panel p-5 rounded-2xl flex gap-4 items-center bg-[#EADCB9] border border-white/20 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-[#948979]/20 border border-[#948979]/25 text-[#393E46] flex items-center justify-center">
            <Clock size={20} />
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#393E46] uppercase block font-bold">Weekly Focus</span>
            <span className="text-lg font-bold text-[#222831] font-display">8.4 Hours / week</span>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="glass-panel p-5 rounded-2xl flex gap-4 items-center bg-[#EADCB9] border border-white/20 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-[#948979]/20 border border-[#948979]/25 text-[#393E46] flex items-center justify-center">
            <Bookmark size={20} />
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#393E46] uppercase block font-bold">Active Semesters</span>
            <span className="text-lg font-bold text-[#222831] font-display">25 books logged</span>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="glass-panel p-5 rounded-2xl flex gap-4 items-center bg-[#EADCB9] border border-white/20 shadow-sm">
          <div className="w-12 h-12 rounded-xl bg-[#948979]/20 border border-[#948979]/25 text-[#393E46] flex items-center justify-center">
            <CheckCircle2 size={20} />
          </div>
          <div>
            <span className="text-[10px] font-mono text-[#393E46] uppercase block font-bold">Completion Efficiency</span>
            <span className="text-lg font-bold text-[#222831] font-display">94.2% return rate</span>
          </div>
        </div>

      </div>

      {/* Genre distribution block */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Genre distribution bar list */}
        <div className="glass-panel p-6 rounded-3xl bg-[#EADCB9] border border-white/20 shadow-sm">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#393E46] mb-6">
            Genre Distribution Density
          </h3>

          <div className="flex flex-col gap-4">
            {Object.entries(stats.genreProgress).map(([genre, percent], idx) => (
              <div key={genre} className="flex flex-col gap-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-[#222831] font-bold">{genre}</span>
                  <span className="text-[#393E46]">{percent}% density</span>
                </div>
                <div className="w-full h-2.5 bg-[#DFD0B8] rounded-full overflow-hidden border border-[#948979]/15">
                  <div 
                    className="h-full rounded-full transition-all duration-1000" 
                    style={{ 
                      width: `${percent}%`,
                      backgroundColor: idx === 0 ? '#4b88a2' : idx === 1 ? '#8f7e9f' : idx === 2 ? '#3f6154' : '#c97a7a'
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Reading speed charts */}
        <div className="glass-panel p-6 rounded-3xl bg-[#EADCB9] border border-white/20 shadow-sm">
          <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#393E46] mb-6">
            Weekly Temporal Logs (pages read)
          </h3>

          {/* Bar charts using divs */}
          <div className="h-44 flex items-end justify-between gap-2.5 px-2 border-b border-[#948979]/20 pb-2">
            {[35, 52, 45, 60, 85, 42, 65].map((pages, idx) => {
              const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
              return (
                <div key={idx} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="relative w-full flex justify-center">
                    <span className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-[#393E46] border border-[#222831] text-[9px] font-mono text-[#DFD0B8] px-1.5 py-0.5 rounded shadow-sm z-10">
                      {pages}p
                    </span>
                    <div 
                      className="w-full rounded-t-lg bg-[#393E46]/20 group-hover:bg-[#393E46] transition-all duration-500 border border-[#948979]/10"
                      style={{ height: `${pages * 1.5}px` }}
                    />
                  </div>
                  <span className="text-[9px] font-mono text-[#393E46] font-bold">{days[idx]}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>

    </div>
  );
}
