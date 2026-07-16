'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Volume2, Sparkles, AlertCircle } from 'lucide-react';
import { Book, OverdueItem } from '@/types';

interface AILibrarianProps {
  books: Book[];
  overdue: OverdueItem[];
  reserveBook: (id: string) => boolean;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

interface Message {
  sender: 'user' | 'jarvis';
  text: string;
  options?: { label: string; action: string }[];
}

export default function AILibrarian({ books, overdue, reserveBook, isOpen, setIsOpen }: AILibrarianProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'jarvis',
      text: 'Greetings, Scholar. I am JARVIS, your neural library assistant. How can I guide your research today?',
      options: [
        { label: 'Recommend books', action: 'recommend' },
        { label: 'Explain library rules', action: 'rules' },
        { label: 'Show overdue books', action: 'overdue' }
      ]
    }
  ]);
  const [inputVal, setInputVal] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleCommand = (cmd: string) => {
    const userMsg: Message = { sender: 'user', text: cmd };
    setMessages(prev => [...prev, userMsg]);

    setTimeout(() => {
      let responseText = '';
      let options: { label: string; action: string }[] | undefined;

      const norm = cmd.toLowerCase();

      if (norm.includes('recommend') || norm.includes('suggest')) {
        const available = books.filter(b => b.available);
        const rand = available.sort(() => 0.5 - Math.random()).slice(0, 2);
        responseText = `Based on your profiles and interest in Computer Science, I recommend: \n1. ${rand[0]?.title} by ${rand[0]?.author} (${rand[0]?.difficulty} level).\n2. ${rand[1]?.title} by ${rand[1]?.author}.\nWould you like me to reserve one of these?`;
        options = rand.map(b => ({ label: `Reserve ${b.title}`, action: `reserve-${b.id}` }));
      } else if (norm.includes('rules')) {
        responseText = 'Library Code of Conduct: \n- Standard checkouts are active for 14 days.\n- Maximum limit is 5 books checked out concurrently.\n- Late returns incur a small deduction in system XP (-10 XP per day). Return books promptly to maintain streak levels!';
      } else if (norm.includes('overdue')) {
        const overdues = overdue.filter(o => o.daysRemaining < 0);
        if (overdues.length === 0) {
          responseText = 'Excellent news: your system records show no overdue checkouts. Keep it up!';
        } else {
          responseText = `ALERT: You have ${overdues.length} overdue book(s):\n` + 
            overdues.map(o => `- "${o.bookTitle}" (${Math.abs(o.daysRemaining)} days late)`).join('\n') + 
            '\nPlease renew these from your dashboard immediately.';
        }
      } else if (norm.includes('reserve-')) {
        const id = norm.split('reserve-')[1];
        const success = reserveBook(id);
        const book = books.find(b => b.id === id);
        if (success && book) {
          responseText = `CONFIRMED: "${book.title}" has been placed in locker ${Math.floor(Math.random() * 50) + 100}. The countdown timer is active.`;
        } else {
          responseText = `Reservation unsuccessful. The book may already be checked out or invalid.`;
        }
      } else if (norm.includes('where is')) {
        const match = books.find(b => norm.includes(b.title.toLowerCase()));
        if (match) {
          responseText = `"${match.title}" is located on ${match.shelfLocation}. Visual positioning highlighted in the 3D room.`;
        } else {
          responseText = `I couldn't locate that specific item. Search for standard titles like "Atomic Habits", "Python Crash Course", or "Clean Code" to index locations.`;
        }
      } else {
        responseText = `Understood. Processing request: "${cmd}". Let me query the global index. I recommend checking out our interactive 3D bookshelf room or reviewing books in the Compare tab.`;
      }

      setMessages(prev => [...prev, { sender: 'jarvis', text: responseText, options }]);
    }, 800);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;
    handleCommand(inputVal);
    setInputVal('');
  };

  return (
    <>
      {/* Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative w-14 h-14 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-400 flex items-center justify-center text-zinc-950 shadow-[0_0_25px_rgba(59,130,246,0.6)] cursor-pointer"
        >
          <div className="absolute inset-0 rounded-full bg-blue-400/20 blur-md animate-pulse" />
          {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        </motion.button>
      </div>

      {/* Assistant Panel Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-24 right-6 w-[440px] h-[580px] bg-[#EADCB9] border border-white/30 rounded-3xl overflow-hidden flex flex-col z-40 shadow-2xl"
          >
            {/* Panel Header */}
            <div className="p-4 border-b border-[#948979]/25 bg-[#DFD0B8]/90 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-pulse" />
                <div>
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#222831] flex items-center gap-1.5">
                    JARVIS AI <Sparkles size={12} className="text-[#393E46]" />
                  </h3>
                  <p className="text-[10px] text-[#393E46] font-mono">Neural Interface Active</p>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1.5 rounded-lg hover:bg-black/5 text-[#393E46] hover:text-[#222831] cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4 no-scrollbar bg-[#EADCB9]/40">
              {messages.map((m, i) => (
                <div 
                  key={i} 
                  className={`flex flex-col max-w-[85%] ${
                    m.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
                  }`}
                >
                  <div className={`p-3 rounded-2xl text-xs font-sans leading-relaxed shadow-sm ${
                    m.sender === 'user'
                      ? 'bg-[#393E46] text-white rounded-br-none'
                      : 'bg-[#DFD0B8] border border-[#948979]/20 text-[#222831] rounded-bl-none'
                  }`}>
                    {m.text.split('\n').map((line, idx) => (
                      <p key={idx} className={idx > 0 ? 'mt-1' : ''}>{line}</p>
                    ))}
                  </div>
                  
                  {/* Action Options Chips */}
                  {m.options && (
                    <div className="flex flex-wrap gap-2 mt-2">
                      {m.options.map((opt, oIdx) => (
                        <button
                          key={oIdx}
                          onClick={() => handleCommand(opt.label)}
                          className="px-2.5 py-1.5 rounded-lg border border-[#948979]/30 bg-[#DFD0B8] hover:border-[#948979]/60 text-[10px] font-mono text-[#393E46] hover:text-[#222831] transition-all cursor-pointer shadow-sm"
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>

            {/* Input panel */}
            <form onSubmit={handleSend} className="p-3 border-t border-[#948979]/20 bg-[#DFD0B8]/60 flex gap-2">
              <input
                type="text"
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                placeholder="Ask JARVIS... 'Where is Atomic Habits?'"
                className="flex-1 bg-[#EADCB9] border border-[#948979]/35 focus:border-[#948979] rounded-xl px-3 py-2 text-xs text-[#222831] placeholder-[#948979] outline-none transition-all"
              />
              <button
                type="submit"
                className="p-2.5 rounded-xl bg-[#393E46] hover:bg-[#222831] text-white shadow-md transition-all cursor-pointer"
              >
                <Send size={12} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
