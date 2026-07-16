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
        <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2.5">
          Holographic Locker Vaults <Shield className="text-emerald-400" />
        </h1>
        <p className="text-xs font-mono text-zinc-500">Reserved materials are deposited into secure terminal lockers</p>
      </div>

      {localReservations.length === 0 ? (
        <div className="h-72 glass-panel rounded-3xl flex flex-col items-center justify-center text-center p-6 border-dashed border-white/10">
          <Package className="text-zinc-600 mb-3" size={36} />
          <h3 className="text-sm font-semibold text-zinc-300">No Active Locker Reservations</h3>
          <p className="text-xs text-zinc-500 max-w-xs mt-1">
            Browse our library index or launch the 3D room to select and reserve materials in a smart locker.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {localReservations.map((res) => (
            <motion.div
              layout
              key={res.id}
              className="glass-panel p-6 rounded-3xl border border-white/5 relative overflow-hidden flex flex-col justify-between h-60"
            >
              {/* Vault BG elements */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex justify-between items-start">
                <div>
                  <span className="px-2.5 py-1 rounded-lg bg-zinc-900 border border-white/5 text-[10px] font-mono text-emerald-400">
                    Locker L-{res.lockerNumber} SECURED
                  </span>
                  <h3 className="font-display font-bold text-lg text-white mt-3 leading-snug">{res.bookTitle}</h3>
                  <p className="text-xs font-mono text-zinc-500 mt-1">Reserved at {res.timestamp}</p>
                </div>
                
                {/* Lock icon graphical status */}
                <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
                  <Shield size={20} className="animate-pulse" />
                </div>
              </div>

              {/* Timer Progress Indicator */}
              <div className="mt-4 flex flex-col gap-2">
                <div className="flex justify-between text-xs font-mono text-zinc-400">
                  <span className="flex items-center gap-1.5"><Clock size={13} /> Pickup Timeout</span>
                  <span className="text-zinc-200 font-bold">{formatTime(res.timeLeft)}</span>
                </div>
                <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-emerald-500 transition-all duration-1000"
                    style={{ width: `${(res.timeLeft / 1200) * 100}%` }}
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-2.5 mt-4 border-t border-white/5 pt-4">
                <button
                  onClick={() => onCancelReservation(res.id, res.bookId)}
                  className="flex-1 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-[11px] font-mono uppercase tracking-wider text-rose-400 hover:text-rose-300 transition-all"
                >
                  Cancel Hold
                </button>
                <div className="flex-1 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono uppercase tracking-wider text-emerald-400 text-center flex items-center justify-center gap-1.5 select-none">
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
