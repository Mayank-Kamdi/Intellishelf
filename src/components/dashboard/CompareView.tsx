'use client';

import React, { useState } from 'react';
import { Book } from '@/types';
import { Sparkles, Star, BarChart, FileText, Clock, Trash2, GitCompare } from 'lucide-react';

interface CompareViewProps {
  books: Book[];
  compareList: Book[];
  onToggleCompare: (book: Book) => void;
  onClearCompare: () => void;
}

export default function CompareView({ books, compareList, onToggleCompare, onClearCompare }: CompareViewProps) {
  const [dropdownOpen, setDropdownOpen] = useState<'first' | 'second' | null>(null);

  const renderComparisonRow = (label: string, field1: string | number, field2: string | number, type: 'text' | 'rating' | 'progress') => {
    return (
      <div className="grid grid-cols-3 py-4 border-b border-white/5 text-sm font-sans items-center">
        <span className="text-zinc-500 font-mono text-xs uppercase">{label}</span>
        
        {/* Book 1 Spec */}
        <div className="text-zinc-200">
          {type === 'rating' ? (
            <div className="flex items-center gap-1 text-amber-400">
              <Star size={14} className="fill-amber-400" />
              <span>{field1} / 5</span>
            </div>
          ) : type === 'progress' ? (
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-blue-500" style={{ width: `${field1}%` }} />
              </div>
              <span className="text-xs text-zinc-400 font-mono">{field1}%</span>
            </div>
          ) : (
            <span>{field1}</span>
          )}
        </div>

        {/* Book 2 Spec */}
        <div className="text-zinc-200">
          {type === 'rating' ? (
            <div className="flex items-center gap-1 text-amber-400">
              <Star size={14} className="fill-amber-400" />
              <span>{field2} / 5</span>
            </div>
          ) : type === 'progress' ? (
            <div className="flex items-center gap-2">
              <div className="w-24 h-2 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-500" style={{ width: `${field2}%` }} />
              </div>
              <span className="text-xs text-zinc-400 font-mono">{field2}%</span>
            </div>
          ) : (
            <span>{field2}</span>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col gap-6">
      
      {/* Title */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-display font-bold text-white flex items-center gap-2">
            AI Comparison Engine <GitCompare className="text-blue-400" />
          </h1>
          <p className="text-xs font-mono text-zinc-500">Contrast specifications, reading times, and topic coverage</p>
        </div>
        {compareList.length > 0 && (
          <button 
            onClick={onClearCompare}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-red-500/20 bg-red-500/5 hover:bg-red-500/10 text-xs font-mono text-red-400 transition-all"
          >
            <Trash2 size={12} />
            <span>Reset comparison</span>
          </button>
        )}
      </div>

      {/* Main Grid Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Left Book selector */}
        <div className="glass-panel p-5 rounded-2xl relative">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-2">Reference Book</span>
          {compareList[0] ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-11 rounded bg-gradient-to-tr from-blue-500 to-indigo-500" style={{ backgroundColor: compareList[0].coverColor }} />
                <div>
                  <h3 className="font-semibold text-sm text-white line-clamp-1">{compareList[0].title}</h3>
                  <p className="text-xs font-mono text-zinc-500">By {compareList[0].author}</p>
                </div>
              </div>
              <button 
                onClick={() => onToggleCompare(compareList[0])}
                className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-red-400 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ) : (
            <div className="py-4 text-center">
              <p className="text-xs text-zinc-500 italic mb-3">No reference book selected</p>
              <select
                onChange={(e) => {
                  const b = books.find(item => item.id === e.target.value);
                  if (b) onToggleCompare(b);
                }}
                className="w-full bg-zinc-900 border border-white/5 text-xs text-zinc-300 rounded-xl p-2 outline-none"
                defaultValue=""
              >
                <option value="" disabled>Select a book...</option>
                {books.map(b => (
                  <option key={b.id} value={b.id} disabled={compareList.some(c => c.id === b.id)}>{b.title}</option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Right Book selector */}
        <div className="glass-panel p-5 rounded-2xl relative">
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-wider block mb-2">Comparison Target</span>
          {compareList[1] ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-11 rounded bg-gradient-to-tr from-indigo-500 to-cyan-500" style={{ backgroundColor: compareList[1].coverColor }} />
                <div>
                  <h3 className="font-semibold text-sm text-white line-clamp-1">{compareList[1].title}</h3>
                  <p className="text-xs font-mono text-zinc-500">By {compareList[1].author}</p>
                </div>
              </div>
              <button 
                onClick={() => onToggleCompare(compareList[1])}
                className="p-1.5 rounded-lg hover:bg-white/5 text-zinc-500 hover:text-red-400 transition-colors"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ) : (
            <div className="py-4 text-center">
              <p className="text-xs text-zinc-500 italic mb-3">No target book selected</p>
              <select
                onChange={(e) => {
                  const b = books.find(item => item.id === e.target.value);
                  if (b) onToggleCompare(b);
                }}
                className="w-full bg-zinc-900 border border-white/5 text-xs text-zinc-300 rounded-xl p-2 outline-none"
                defaultValue=""
              >
                <option value="" disabled>Select a book...</option>
                {books.map(b => (
                  <option key={b.id} value={b.id} disabled={compareList.some(c => c.id === b.id)}>{b.title}</option>
                ))}
              </select>
            </div>
          )}
        </div>

      </div>

      {/* Specs layout */}
      {compareList.length === 2 ? (
        <div className="glass-panel p-6 rounded-3xl mt-4">
          <div className="grid grid-cols-3 border-b border-white/10 pb-3 font-mono text-xs text-zinc-400 uppercase tracking-wider">
            <span>Parameter</span>
            <span className="text-blue-400 truncate">{compareList[0].title}</span>
            <span className="text-indigo-400 truncate">{compareList[1].title}</span>
          </div>

          <div className="flex flex-col">
            {renderComparisonRow('Author', compareList[0].author, compareList[1].author, 'text')}
            {renderComparisonRow('Category', compareList[0].category, compareList[1].category, 'text')}
            {renderComparisonRow('Pages', compareList[0].pages, compareList[1].pages, 'text')}
            {renderComparisonRow('Difficulty', compareList[0].difficulty, compareList[1].difficulty, 'text')}
            {renderComparisonRow('Reading Time', compareList[0].readTime, compareList[1].readTime, 'text')}
            {renderComparisonRow('System Rating', compareList[0].rating, compareList[1].rating, 'rating')}
            {renderComparisonRow('Popularity Score', compareList[0].popularityScore, compareList[1].popularityScore, 'progress')}
            {renderComparisonRow('Index Location', compareList[0].shelfLocation, compareList[1].shelfLocation, 'text')}
          </div>
          
          {/* AI Comparison Summary Card */}
          <div className="mt-6 p-4 rounded-2xl bg-blue-950/15 border border-blue-500/10 flex gap-3 text-xs leading-relaxed">
            <Sparkles size={18} className="text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-mono text-cyan-400 uppercase font-bold block mb-1">JARVIS Cross-Evaluation Analysis</span>
              <p className="text-zinc-300">
                "{compareList[0].title}" operates at a <strong className="text-zinc-100">{compareList[0].difficulty}</strong> learning curve while focusing heavily on {compareList[0].category}. By contrast, "{compareList[1].title}" requires <strong className="text-zinc-100">{compareList[1].difficulty}</strong> level comprehension. Scholars should start with {compareList[0].pages > compareList[1].pages ? compareList[1].title : compareList[0].title} to build basic context prior to tackling theoretical deep dives.
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className="h-64 glass-panel rounded-3xl flex flex-col items-center justify-center text-center p-6 border-dashed border-white/10">
          <p className="text-sm text-zinc-500 max-w-xs">
            Please select two books from the selectors above to initialize the AI side-by-side evaluation comparison engine.
          </p>
        </div>
      )}

    </div>
  );
}
