'use client';

import React from 'react';
import { OverdueItem } from '@/types';
import { ShieldAlert, RefreshCw, Calendar, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface OverdueViewProps {
  overdue: OverdueItem[];
  onRenew: (id: string) => void;
}

export default function OverdueView({ overdue, onRenew }: OverdueViewProps) {
  const getStatusColor = (status: OverdueItem['status']) => {
    switch (status) {
      case 'green': return 'border-emerald-500/30 text-emerald-400 bg-emerald-500/5';
      case 'yellow': return 'border-amber-500/30 text-amber-400 bg-amber-500/5';
      case 'orange': return 'border-orange-500/30 text-orange-400 bg-orange-500/5';
      case 'red': return 'border-red-500/30 text-red-400 bg-red-500/5';
    }
  };

  const getTimelineDotColor = (status: OverdueItem['status']) => {
    switch (status) {
      case 'green': return 'bg-emerald-400 shadow-[0_0_10px_rgba(16,185,129,0.5)]';
      case 'yellow': return 'bg-amber-400 shadow-[0_0_10px_rgba(245,158,11,0.5)]';
      case 'orange': return 'bg-orange-400 shadow-[0_0_10px_rgba(249,115,22,0.5)]';
      case 'red': return 'bg-red-400 shadow-[0_0_10px_rgba(239,68,68,0.5)]';
    }
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Title Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2.5">
          Checkout Timeline <ShieldAlert className="text-red-400 animate-pulse" />
        </h1>
        <p className="text-xs font-mono text-zinc-500">Track checkouts, return deadlines, and secure extensions</p>
      </div>

      <div className="glass-panel p-6 rounded-3xl mt-2 relative">
        {/* Central Timeline Line */}
        <div className="absolute left-9 top-16 bottom-16 w-[2px] bg-white/5" />

        <div className="flex flex-col gap-8">
          {overdue.map((item, idx) => (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={item.id}
              className="flex gap-6 items-start relative z-10"
            >
              {/* Timeline dot */}
              <div className="w-6 h-6 rounded-full bg-zinc-950 border-2 border-zinc-800 flex items-center justify-center shrink-0 mt-2.5">
                <div className={`w-2.5 h-2.5 rounded-full ${getTimelineDotColor(item.status)}`} />
              </div>

              {/* Information Panel */}
              <div className={`flex-1 p-5 rounded-2xl border ${getStatusColor(item.status)} flex flex-col md:flex-row md:items-center justify-between gap-4`}>
                <div>
                  <h3 className="font-display font-bold text-sm text-white">{item.bookTitle}</h3>
                  <p className="text-xs text-zinc-400 mt-1 font-mono">By {item.author}</p>
                  
                  <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-mono mt-3">
                    <Calendar size={12} />
                    <span>Due: {item.dueDate}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Days remaining badge */}
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-zinc-500 uppercase block">Remaining Status</span>
                    <span className="text-xs font-bold font-mono">
                      {item.daysRemaining < 0 
                        ? `${Math.abs(item.daysRemaining)} Days Overdue` 
                        : `${item.daysRemaining} Days Left`}
                    </span>
                  </div>

                  {/* Action extension button */}
                  <button
                    onClick={() => onRenew(item.id)}
                    className="p-3 rounded-xl bg-zinc-950 border border-white/5 hover:border-white/10 text-zinc-400 hover:text-white transition-all flex items-center justify-center"
                    title="Renew/Extend Checkout"
                  >
                    <RefreshCw size={14} className="hover:rotate-180 transition-transform duration-500" />
                  </button>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </div>
  );
}
