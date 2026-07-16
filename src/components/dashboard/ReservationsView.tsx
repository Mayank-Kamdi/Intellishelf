'use client';

import React, { useState, useEffect } from 'react';
import { Reservation } from '@/types';
import { Shield, Clock, Package, Eye, ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ReservationsViewProps {
  reservations: Reservation[];
  onCancelReservation: (resId: string, bookId: string) => void;
}

export default function ReservationsView({ reservations, onCancelReservation }: ReservationsViewProps) {
  const [localReservations, setLocalReservations] = useState<Reservation[]>([]);

  useEffect(() => {
    setLocalReservations(reservations);
  }, [reservations]);

  // Real-time ticking effect
  useEffect(() => {
    const timer = setInterval(() => {
      setLocalReservations(prev => 
        prev.map(res => {
          if (res.timeLeft <= 0) return res;
          return { ...res, timeLeft: res.timeLeft - 1 };
        }).filter(res => res.timeLeft > 0)
      );
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const remainingSecs = secs % 60;
    return `${mins.toString().padStart(2, '0')}:${remainingSecs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Title Header */}
      <div>
        <h1 className="text-2xl font-display font-bold text-[#222831] flex items-center gap-2.5">
          Holographic Locker Vaults <Shield className="text-[#3f6154]" />
        </h1>
        <p className="text-sm font-mono text-[#393E46]">Reserved materials are deposited into secure terminal lockers</p>
      </div>

      {localReservations.length === 0 ? (
        <div className="h-72 glass-panel rounded-3xl flex flex-col items-center justify-center text-center p-6 border-dashed border-[#948979]/30 bg-[#EADCB9]/40">
          <Package className="text-[#393E46] mb-3" size={36} />
          <h3 className="text-sm font-semibold text-[#222831]">No Active Locker Reservations</h3>
          <p className="text-xs text-[#393E46] max-w-xs mt-1">
            Browse our library index or launch the 3D room to select and reserve materials in a smart locker.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {localReservations.map((res) => (
            <motion.div
              layout
              key={res.id}
              className="glass-panel p-6 rounded-3xl border border-white/20 bg-[#EADCB9] relative overflow-hidden flex flex-col justify-between h-60 shadow-sm"
            >
              {/* Vault BG elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#3f6154]/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex justify-between items-start">
                <div>
                  <span className="px-2.5 py-1 rounded-lg bg-[#DFD0B8] border border-[#948979]/30 text-[10px] font-mono text-[#3f6154] font-bold shadow-sm">
                    Locker L-{res.lockerNumber} SECURED
                  </span>
                  <h3 className="font-display font-bold text-base text-[#222831] mt-3.5 leading-snug">{res.bookTitle}</h3>
                  <p className="text-xs font-mono text-[#393E46] mt-1">Reserved at {res.timestamp}</p>
                </div>
                
                {/* Lock icon graphical status */}
                <div className="w-12 h-12 rounded-2xl bg-[#3f6154]/15 border border-[#3f6154]/25 text-[#3f6154] flex items-center justify-center shadow-sm">
                  <Shield size={20} className="animate-pulse" />
                </div>
              </div>

              {/* Timer Progress Indicator */}
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex justify-between text-xs font-mono text-[#393E46]">
                  <span className="flex items-center gap-1.5 font-bold"><Clock size={13} className="text-[#948979]" /> Pickup Timeout</span>
                  <span className="text-[#222831] font-extrabold">{formatTime(res.timeLeft)}</span>
                </div>
                <div className="w-full h-2 bg-[#DFD0B8] rounded-full overflow-hidden border border-[#948979]/15">
                  <div 
                    className="h-full bg-[#3f6154] transition-all duration-1000"
                    style={{ width: `${(res.timeLeft / 1200) * 100}%` }}
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2.5 mt-4 border-t border-[#948979]/20 pt-4">
                <button
                  onClick={() => onCancelReservation(res.id, res.bookId)}
                  className="flex-1 py-2 rounded-xl bg-[#DFD0B8] hover:bg-[#dfcbb1] border border-red-600/30 text-[11px] font-mono uppercase tracking-wider text-red-600 font-bold hover:text-red-700 transition-all cursor-pointer shadow-sm"
                >
                  Cancel Hold
                </button>
                <div className="flex-1 py-2 rounded-xl bg-[#3f6154]/10 border border-[#3f6154]/25 text-[11px] font-mono uppercase tracking-wider text-[#3f6154] font-bold text-center flex items-center justify-center gap-1.5 select-none shadow-sm">
                  <span>Vault Ready</span>
                </div>
              </div>

            </motion.div>
          ))}
        </div>
      )}

    </div>
  );
}
