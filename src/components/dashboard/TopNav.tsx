'use client';

import React, { useState } from 'react';
import { Search, Mic, Bell, Sparkles, Award, Zap } from 'lucide-react';
import { UserStats } from '@/types';

interface TopNavProps {
  stats: UserStats | null;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onVoiceTrigger: () => void;
}

export default function TopNav({ stats, searchQuery, setSearchQuery, onVoiceTrigger }: TopNavProps) {
  const [notifications, setNotifications] = useState([
    'Welcome back, Scholar! Keep your 12-day reading streak going.',
    'ALERT: Deep Learning is 6 days overdue. Please renew or return.'
  ]);
  const [showNotif, setShowNotif] = useState(false);

  return (
    <header className="h-16 border-b border-[#948979]/30 bg-[#EADCB9]/70 backdrop-blur-md flex items-center justify-between pl-6 pr-24 shrink-0 relative z-30">
      
      {/* Hello user title */}
      <div className="flex items-center gap-2">
        <h2 className="text-sm font-display font-bold uppercase tracking-wider text-[#222831]">
          Hello, Mayank!
        </h2>
      </div>

      {/* Search Input Bar (Neumorphic Inset) */}
      <div className="w-80 relative flex items-center">
        <div className="absolute left-3 text-[#393E46]">
          <Search size={14} />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search books, shelf indexes..."
          className="w-full glass-input py-1.5 pl-9 pr-9 text-xs outline-none text-[#222831] border border-[#948979]/35 bg-[#DFD0B8]/40 focus:bg-[#DFD0B8]/80 transition-colors"
        />
        
        {/* Voice Trigger Microphone */}
        <button
          onClick={onVoiceTrigger}
          className="absolute right-2 p-1 rounded-lg bg-[#DFD0B8] hover:bg-[#ebdcb9] border border-[#948979]/30 text-[#393E46] hover:text-[#222831] transition-all"
        >
          <Mic size={12} />
        </button>
      </div>

      {/* Right items: Stats badges and profile */}
      <div className="flex items-center gap-4">
        {stats && (
          <div className="flex items-center gap-3">
            {/* Streak Tracker Badge */}
            <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#DFD0B8] border border-[#948979]/40 text-[#222831] text-[10px] font-mono font-bold shadow-sm">
              <Zap size={11} className="fill-[#948979] text-[#948979]" />
              <span>{stats.streak}d Streak</span>
            </div>

            {/* User Level and XP pill */}
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-lg bg-[#DFD0B8] border border-[#948979]/40 text-[#222831] text-[10px] font-mono shadow-sm">
              <Award size={11} className="text-[#393E46]" />
              <span>Lvl {stats.level}</span>
              <div className="w-10 h-1 bg-[#EADCB9] rounded-full overflow-hidden">
                <div 
                  className="h-full bg-[#393E46] transition-all duration-500" 
                  style={{ width: `${(stats.xp % 500) / 5}%` }}
                />
              </div>
            </div>
          </div>
        )}

        {/* Notifications Hub */}
        <div className="relative">
          <button 
            onClick={() => setShowNotif(!showNotif)}
            className="relative p-2 rounded-xl border border-[#948979]/40 bg-[#DFD0B8] hover:bg-[#ebdcb9] text-[#393E46] hover:text-[#222831] transition-all cursor-pointer shadow-sm"
          >
            <Bell size={14} />
            {notifications.length > 0 && (
              <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#393E46] rounded-full animate-pulse" />
            )}
          </button>

          {showNotif && (
            <div className="absolute right-0 mt-2 w-72 glass-panel p-3.5 flex flex-col gap-2.5 shadow-xl z-50 text-xs bg-[#EADCB9] border border-[#948979]/40 rounded-2xl">
              <div className="flex justify-between items-center border-b border-[#948979]/30 pb-1.5">
                <span className="font-mono text-[#393E46] uppercase tracking-wider text-[10px]">Alert Feed</span>
                {notifications.length > 0 && (
                  <button 
                    onClick={() => setNotifications([])}
                    className="text-[9px] font-mono text-[#948979] hover:text-[#222831]"
                  >
                    Clear All
                  </button>
                )}
              </div>
              
              <div className="flex flex-col gap-2">
                {notifications.length === 0 ? (
                  <p className="text-[10px] text-[#948979] italic py-1 text-center">No active notifications</p>
                ) : (
                  notifications.map((n, idx) => (
                    <div key={idx} className="p-2 rounded-lg bg-[#DFD0B8]/50 text-[11px] text-[#222831] border border-[#948979]/30 flex gap-1.5">
                      <Sparkles size={12} className="text-[#393E46] shrink-0 mt-0.5" />
                      <span>{n}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
