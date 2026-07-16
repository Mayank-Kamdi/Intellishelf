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
      case 'green': return 'border-[#3f6154]/30 text-[#3f6154] bg-[#3f6154]/5';
      case 'yellow': return 'border-amber-600/30 text-amber-700 bg-amber-600/5';
      case 'orange': return 'border-orange-600/30 text-orange-700 bg-orange-600/5';
      case 'red': return 'border-red-600/30 text-red-700 bg-red-600/5';
    }
  };

  const getTimelineDotColor = (status: OverdueItem['status']) => {
    switch (status) {
      case 'green': return 'bg-[#3f6154] shadow-[0_0_8px_rgba(63,97,84,0.4)]';
      case 'yellow': return 'bg-amber-600 shadow-[0_0_8px_rgba(217,119,6,0.4)]';
      case 'orange': return 'bg-orange-600 shadow-[0_0_8px_rgba(234,88,12,0.4)]';
      case 'red': return 'bg-red-600 shadow-[0_0_8px_rgba(220,38,38,0.4)]';
    }
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Title Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-[#222831] flex items-center gap-2.5">
          Checkout Timeline <ShieldAlert className="text-red-600 animate-pulse" />
        </h1>
        <p className="text-sm font-mono text-[#393E46]">Track checkouts, return deadlines, and secure extensions</p>
      </div>

      <div className="glass-panel p-6 rounded-3xl mt-2 relative bg-[#EADCB9] border border-white/20 shadow-sm">
        {/* Central Timeline Line */}
        <div className="absolute left-9 top-16 bottom-16 w-[2px] bg-[#948979]/20" />

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
              <div className="w-6 h-6 rounded-full bg-[#DFD0B8] border-2 border-[#948979]/40 flex items-center justify-center shrink-0 mt-2.5">
                <div className={`w-2.5 h-2.5 rounded-full ${getTimelineDotColor(item.status)}`} />
              </div>

              {/* Information Panel */}
              <div className={`flex-1 p-5 rounded-2xl border ${getStatusColor(item.status)} bg-[#DFD0B8]/60 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm`}>
                <div>
                  <h3 className="font-display font-bold text-sm text-[#222831]">{item.bookTitle}</h3>
                  <p className="text-xs text-[#393E46] mt-1 font-mono">By {item.author}</p>
                  
                  <div className="flex items-center gap-2 text-[10px] text-[#393E46] font-mono mt-3">
                    <Calendar size={12} className="text-[#948979]" />
                    <span>Due: {item.dueDate}</span>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  {/* Days remaining badge */}
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-[#393E46] uppercase block font-bold">Remaining Status</span>
                    <span className="text-xs font-bold font-mono text-[#222831]">
                      {item.daysRemaining < 0 
                        ? `${Math.abs(item.daysRemaining)} Days Overdue` 
                        : `${item.daysRemaining} Days Left`}
                    </span>
                  </div>

                  {/* Action extension button */}
                  <button
                    onClick={() => onRenew(item.id)}
                    className="p-3 rounded-xl bg-[#DFD0B8] border border-[#948979]/30 hover:border-[#948979]/60 text-[#393E46] hover:text-[#222831] transition-all flex items-center justify-center cursor-pointer shadow-sm"
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
