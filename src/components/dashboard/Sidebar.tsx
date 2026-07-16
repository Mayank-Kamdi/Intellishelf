'use client';

import React from 'react';
import { LayoutDashboard, BookOpen, Compass, RotateCcw, Award, Settings, BarChart2, ShieldAlert } from 'lucide-react';
import { motion } from 'framer-motion';

import { UserProfile } from '@/types';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  profile: UserProfile | null;
  onEditProfile: () => void;
}

export default function Sidebar({ activeTab, setActiveTab, profile, onEditProfile }: SidebarProps) {
  const menuItems = [
    { id: 'home', label: 'Dashboard', icon: LayoutDashboard },
    { id: '3d', label: '3D Room', icon: Compass },
    { id: 'compare', label: 'Compare Books', icon: BookOpen },
    { id: 'reservations', label: 'Reservations', icon: RotateCcw },
    { id: 'overdue', label: 'Overdue Logs', icon: ShieldAlert },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'gamification', label: 'Achievements', icon: Award }
  ];

  return (
    <aside className="w-60 border-r border-[#222831]/40 bg-[#393E46] flex flex-col justify-between py-6 px-4 shrink-0 h-full">
      <div className="flex flex-col gap-6">
        
        {/* Profile Card Header (Interactive) */}
        <div 
          onClick={onEditProfile}
          className="flex items-center gap-3 px-2 py-1.5 mb-1 cursor-pointer group hover:bg-[#222831]/30 rounded-2xl transition-all border border-transparent hover:border-[#222831]/30 shadow-sm"
          title="Click to edit profile"
        >
          <div className="relative w-11 h-11 rounded-full p-[1px] bg-gradient-to-tr from-[#948979] to-[#DFD0B8] shadow-[2px_2px_8px_rgba(0,0,0,0.15)] group-hover:scale-105 transition-all">
            <div className="w-full h-full rounded-full bg-[#DFD0B8] flex items-center justify-center font-mono font-bold text-sm text-[#222831]">
              {profile?.initials || 'MK'}
            </div>
          </div>
          <div className="text-left min-w-0">
            <h2 className="font-display font-bold text-sm tracking-tight text-[#DFD0B8] truncate group-hover:text-white transition-colors">
              {profile?.name || 'Mayank Kamdi'}
            </h2>
            <p className="text-[10px] font-mono text-[#948979] truncate">{profile?.role || 'CS Scholar'}</p>
          </div>
        </div>

        {/* Brand logo label */}
        <div className="px-2 pb-2 border-b border-[#222831]/40">
          <h1 className="text-xs font-mono font-bold tracking-wider text-[#948979] uppercase">IntelliShelf OS</h1>
        </div>

        {/* Menu Options */}
        <nav className="flex flex-col gap-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`relative group w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all duration-300 ${
                  isActive
                    ? 'text-[#222831]'
                    : 'text-[#948979] hover:text-[#DFD0B8] hover:bg-[#222831]/30'
                }`}
              >
                {/* Active Claymorphic Elevated Pill */}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-active-clay"
                    className="absolute inset-0 bg-[#DFD0B8] border border-white/10 rounded-xl shadow-[2px_2px_6px_rgba(0,0,0,0.18)]"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}

                <Icon size={16} className={`relative z-10 ${isActive ? 'text-[#222831]' : 'text-[#948979] group-hover:text-[#DFD0B8]'}`} />
                <span className="relative z-10 font-sans">{item.label}</span>

                {/* Notification indicator dots */}
                {item.id === 'reservations' && (
                  <span className="relative z-10 ml-auto w-2 h-2 rounded-full bg-[#3f6154]" />
                )}
                {item.id === 'overdue' && (
                  <span className="relative z-10 ml-auto w-2 h-2 rounded-full bg-[#BF6B6B] animate-pulse" />
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Exit Button */}
      <button 
        onClick={() => window.location.href = '/'}
        className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-[#948979] hover:text-[#BF6B6B] hover:bg-[#222831]/30 border border-transparent hover:border-[#222831]/30 transition-all cursor-pointer group"
      >
        <Settings size={16} className="group-hover:rotate-45 transition-transform" />
        <span className="font-sans">Exit Holodeck</span>
      </button>
    </aside>
  );
}
