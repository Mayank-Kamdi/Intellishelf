'use client';

import React, { useState, useEffect } from 'react';
import Sidebar from '@/components/dashboard/Sidebar';
import TopNav from '@/components/dashboard/TopNav';
import AILibrarian from '@/components/dashboard/AILibrarian';
import BookDetailsModal from '@/components/dashboard/BookDetailsModal';

// Sub Views
import HomeView from '@/components/dashboard/HomeView';
import Library3DView from '@/components/dashboard/Library3DView';
import CompareView from '@/components/dashboard/CompareView';
import ReservationsView from '@/components/dashboard/ReservationsView';
import OverdueView from '@/components/dashboard/OverdueView';
import AnalyticsView from '@/components/dashboard/AnalyticsView';
import AchievementsView from '@/components/dashboard/AchievementsView';

import { useLibrary } from '@/hooks/useLibrary';
import { querySemanticAI } from '@/utils/mockDb';
import { Book } from '@/types';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Mic, Search, Volume2, Star } from 'lucide-react';

export default function Dashboard() {
  const {
    books,
    stats,
    reservations,
    overdue,
    profile,
    selectedBook,
    compareList,
    isLibrarianOpen,
    searchQuery,
    setSelectedBook,
    setSearchQuery,
    setIsLibrarianOpen,
    reserveBook,
    renewBook,
    toggleCompare,
    clearCompare,
    setReservations,
    setBooks,
    setProfile
  } = useLibrary();

  const [activeTab, setActiveTab] = useState('home');
  const [voiceListening, setVoiceListening] = useState(false);
  const [voiceWaveHeights, setVoiceWaveHeights] = useState<number[]>([10, 10, 10, 10, 10]);

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [roleInput, setRoleInput] = useState('');
  const [initialsInput, setInitialsInput] = useState('');

  // Sync profile form inputs
  useEffect(() => {
    if (profile) {
      setNameInput(profile.name);
      setRoleInput(profile.role);
      setInitialsInput(profile.initials);
    }
  }, [profile, isProfileModalOpen]);

  // Read search query params if navigated from Landing Search
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const query = params.get('q');
      if (query) {
        setSearchQuery(query);
      }
    }
  }, [setSearchQuery]);

  // Handle active speech/waveform timers
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (voiceListening) {
      interval = setInterval(() => {
        setVoiceWaveHeights(Array.from({ length: 12 }, () => Math.floor(Math.random() * 35) + 8));
      }, 100);

      // Simulate recognition after 3s
      const timeout = setTimeout(() => {
        const phrases = [
          'Show Machine Learning books available today',
          'Atomic Habits details',
          'I need a beginner Python book',
          'Explain compiler rules'
        ];
        const phrase = phrases[Math.floor(Math.random() * phrases.length)];
        setSearchQuery(phrase);
        setVoiceListening(false);
      }, 3000);

      return () => {
        clearInterval(interval);
        clearTimeout(timeout);
      };
    } else {
      setVoiceWaveHeights([10, 10, 10, 10, 10]);
    }
  }, [voiceListening, setSearchQuery]);

  const handleCancelHold = (resId: string, bookId: string) => {
    // 1. Remove hold
    const updatedRes = reservations.filter(r => r.id !== resId);
    setReservations(updatedRes);
    // 2. Mark book available
    const updatedBooks = books.map(b => b.id === bookId ? { ...b, available: true } : b);
    setBooks(updatedBooks);
  };

  const handleVoiceTrigger = () => {
    setVoiceListening(!voiceListening);
  };

  const [apiBooks, setApiBooks] = useState<Book[]>([]);
  const [isSearchingApi, setIsSearchingApi] = useState(false);

  // Query Google Books API in real-time
  useEffect(() => {
    if (!searchQuery) {
      setApiBooks([]);
      return;
    }

    const delayDebounce = setTimeout(async () => {
      setIsSearchingApi(true);
      try {
        const res = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchQuery)}&maxResults=12`);
        const data = await res.json();
        if (data.items) {
          const mappedBooks: Book[] = data.items.map((item: any, index: number) => {
            const info = item.volumeInfo;
            // Generate color based on title hash
            const colors = ['#c95e53', '#579f9f', '#1b7b6b', '#9a382c', '#e2a348', '#4c9c8e', '#ea8c8c', '#e87c6b'];
            const colorIndex = Math.abs(info.title.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0)) % colors.length;
            const coverColor = colors[colorIndex];

            let difficulty: 'Beginner' | 'Intermediate' | 'Advanced' = 'Intermediate';
            if (info.pageCount) {
              if (info.pageCount < 250) difficulty = 'Beginner';
              else if (info.pageCount > 500) difficulty = 'Advanced';
            }

            return {
              id: item.id,
              title: info.title || 'Untitled Book',
              author: info.authors ? info.authors.join(', ') : 'Unknown Author',
              coverColor,
              rating: info.averageRating || parseFloat((4 + Math.random() * 0.9).toFixed(1)),
              available: Math.random() > 0.35,
              shelfLocation: `Shelf API-${Math.floor(index / 4) + 1}`,
              shelfIndex: Math.floor(index / 4),
              bookIndex: index % 4,
              pages: info.pageCount || 280,
              difficulty,
              readTime: `${Math.ceil((info.pageCount || 280) * 1.2 / 60)} hours`,
              prerequisites: ['None'],
              description: info.description || info.subtitle || 'No description available in the global registry.',
              whoShouldRead: ['Students of the subject', 'Curious readers', 'General audience'],
              publisher: info.publisher || 'Unknown Publisher',
              category: info.categories ? info.categories[0] : 'General Knowledge',
              borrowedCount: Math.floor(Math.random() * 150) + 10,
              popularityScore: Math.floor(Math.random() * 40) + 60,
              summary: info.description ? `${info.description.slice(0, 350)}...` : 'This book represents global knowledge in the real-time registry.'
            };
          });
          setApiBooks(mappedBooks);
        } else {
          setApiBooks([]);
        }
      } catch (err) {
        console.error("Error fetching books from API:", err);
      } finally {
        setIsSearchingApi(false);
      }
    }, 450); // Debounce to respect API request limits

    return () => clearTimeout(delayDebounce);
  }, [searchQuery]);

  // If we have API search results, render them. Otherwise fallback to local database search.
  const filteredBooks = searchQuery 
    ? (apiBooks.length > 0 ? apiBooks : querySemanticAI(searchQuery, books)) 
    : books;

  // Sync API books back to general list so details modal can resolve related categories
  useEffect(() => {
    if (apiBooks.length > 0) {
      // Avoid infinite cycles: only merge if we have new books not present in standard state
      const existingIds = new Set(books.map(b => b.id));
      const newBooks = apiBooks.filter(ab => !existingIds.has(ab.id));
      if (newBooks.length > 0) {
        setBooks([...books, ...newBooks]);
      }
    }
  }, [apiBooks]);

  // Related books generator for active details cards
  const relatedBooks = selectedBook
    ? books.filter(b => b.category === selectedBook.category && b.id !== selectedBook.id)
    : [];

  const renderActiveView = () => {
    if (searchQuery) {
      // Custom AI query results dashboard grid
      return (
        <div className="flex flex-col gap-6">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-display font-bold text-[#3C2D3D] flex items-center gap-2">
                Global Live Matches <Sparkles size={16} className="text-[#867086] animate-pulse" />
                {isSearchingApi && (
                  <span className="text-[10px] font-mono text-[#6A5A6A] normal-case font-normal animate-pulse ml-2">
                    (Searching global registry...)
                  </span>
                )}
              </h2>
              <p className="text-xs font-mono text-[#6A5A6A]">Query: "{searchQuery}" ({filteredBooks.length} results)</p>
            </div>
            <button 
              onClick={() => setSearchQuery('')}
              className="text-xs font-mono text-[#6A5A6A] hover:text-[#3C2D3D] bg-[#EADFD8] border border-[#DCD0C7] px-3 py-1.5 rounded-lg transition-all shadow-[1px_1px_3px_rgba(0,0,0,0.05)]"
            >
              Clear Search
            </button>
          </div>

          {filteredBooks.length === 0 && !isSearchingApi ? (
            <div className="h-64 glass-panel rounded-3xl flex flex-col items-center justify-center text-center p-6">
              <Search className="text-[#6A5A6A] mb-2" size={32} />
              <p className="text-xs text-[#6A5A6A] font-mono">No matching books indexed in semantic memory</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <div
                  key={book.id}
                  onClick={() => setSelectedBook(book)}
                  className="glass-card p-5 rounded-3xl cursor-pointer flex flex-col justify-between h-56 relative overflow-hidden group border border-white/40 bg-[#EADFD8]"
                >
                  <div>
                    <span className="px-2.5 py-1 rounded bg-[#F3ECE7] border border-[#DCD0C7]/40 text-[9px] font-mono text-[#6A5A6A]">
                      {book.category}
                    </span>
                    <h3 className="font-display font-bold text-base text-[#3C2D3D] group-hover:text-[#867086] transition-colors mt-3.5 line-clamp-2 leading-snug">
                      {book.title}
                    </h3>
                    <p className="text-xs font-mono text-[#6A5A6A] mt-1">By {book.author}</p>
                  </div>
                  <div className="flex justify-between items-center border-t border-[#DCD0C7]/40 pt-3.5">
                    <span className="text-[10px] font-mono text-[#6A5A6A] uppercase tracking-widest">{book.difficulty}</span>
                    <div className="flex items-center gap-1 text-amber-500 text-xs">
                      <Star size={13} className="fill-amber-500" />
                      <span>{book.rating}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      );
    }

    switch (activeTab) {
      case 'home':
        return (
          <HomeView
            books={books}
            stats={stats}
            overdue={overdue}
            onBookSelect={setSelectedBook}
            onViewChange={setActiveTab}
          />
        );
      case '3d':
        return <Library3DView books={books} onBookSelect={setSelectedBook} />;
      case 'compare':
        return (
          <CompareView
            books={books}
            compareList={compareList}
            onToggleCompare={toggleCompare}
            onClearCompare={clearCompare}
          />
        );
      case 'reservations':
        return (
          <ReservationsView
            reservations={reservations}
            onCancelReservation={handleCancelHold}
          />
        );
      case 'overdue':
        return <OverdueView overdue={overdue} onRenew={renewBook} />;
      case 'analytics':
        return <AnalyticsView stats={stats} />;
      case 'gamification':
        return <AchievementsView stats={stats} />;
      default:
        return <HomeView books={books} stats={stats} overdue={overdue} onBookSelect={setSelectedBook} onViewChange={setActiveTab} />;
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#DFD0B8] text-[#222831] overflow-hidden relative">
      
      {/* Voice Listening Overlay */}
      <AnimatePresence>
        {voiceListening && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-50 bg-[#EADCB9]/95 backdrop-blur-md flex flex-col items-center justify-center gap-6"
          >
            <div className="relative w-20 h-20 rounded-full bg-[#393E46]/10 border border-[#393E46]/20 flex items-center justify-center">
              <div className="absolute inset-0 bg-[#393E46]/20 rounded-full animate-ping scale-75" />
              <Volume2 className="text-[#393E46]" size={28} />
            </div>

            <div className="flex items-center gap-1.5 h-10">
              {voiceWaveHeights.slice(0, 10).map((h, idx) => (
                <motion.div
                  key={idx}
                  animate={{ height: h / 2.5 }}
                  className="w-1.5 rounded-full bg-[#393E46]"
                  style={{ height: 10 }}
                  transition={{ type: 'spring', stiffness: 350, damping: 15 }}
                />
              ))}
            </div>

            <h3 className="text-xs font-mono text-[#222831] uppercase tracking-widest animate-pulse">
              Listening to voice queries...
            </h3>
            
            <button
              onClick={() => setVoiceListening(false)}
              className="px-4 py-2 rounded-xl bg-[#DFD0B8] border border-[#948979]/45 text-xs font-mono text-[#393E46] hover:text-[#222831]"
            >
              Cancel speech
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sidebar navigation */}
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setSearchQuery(''); // clear query on nav switch
          setActiveTab(tab);
        }} 
        profile={profile}
        onEditProfile={() => setIsProfileModalOpen(true)}
      />

      {/* Primary Container */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        
        {/* Top Navbar */}
        <TopNav
          stats={stats}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onVoiceTrigger={handleVoiceTrigger}
        />

        {/* Dashboard Main Scrollable Area */}
        <main className="flex-1 overflow-y-auto p-8 relative no-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab + (searchQuery ? '-search' : '')}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
              className="h-full"
            >
              {renderActiveView()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>

      {/* Jarvis chatbot orb assistant */}
      <AILibrarian
        books={books}
        overdue={overdue}
        reserveBook={reserveBook}
        isOpen={isLibrarianOpen}
        setIsOpen={setIsLibrarianOpen}
      />

      {/* Details Dialog Modal */}
      <BookDetailsModal
        book={selectedBook}
        onClose={() => setSelectedBook(null)}
        onReserve={reserveBook}
        relatedBooks={relatedBooks}
        onBookSelect={setSelectedBook}
      />

      {/* Customize Profile Modal Dialog */}
      <AnimatePresence>
        {isProfileModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110000] bg-[#3c2d3d]/45 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              className="w-full max-w-sm bg-[#F3ECE7] border border-white/60 rounded-3xl p-6 shadow-[8px_8px_24px_rgba(78,64,78,0.18)]"
            >
              <h3 className="font-display font-bold text-lg text-[#3C2D3D] mb-4">
                Customize Profile
              </h3>
              
              <div className="flex flex-col gap-4 mb-6">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono font-bold text-[#6A5A6A] uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="glass-input px-4 py-2.5 text-xs text-[#3C2D3D] border border-[#DCD0C7]"
                    placeholder="Enter your name"
                  />
                </div>
                
                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono font-bold text-[#6A5A6A] uppercase tracking-wider">
                    Role / Title
                  </label>
                  <input
                    type="text"
                    value={roleInput}
                    onChange={(e) => setRoleInput(e.target.value)}
                    className="glass-input px-4 py-2.5 text-xs text-[#3C2D3D] border border-[#DCD0C7]"
                    placeholder="e.g. CS Scholar"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono font-bold text-[#6A5A6A] uppercase tracking-wider">
                    Initials (Avatar badge)
                  </label>
                  <input
                    type="text"
                    value={initialsInput}
                    onChange={(e) => setInitialsInput(e.target.value)}
                    className="glass-input px-4 py-2.5 text-xs text-[#3C2D3D] border border-[#DCD0C7]"
                    maxLength={3}
                    placeholder="e.g. MK"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setIsProfileModalOpen(false)}
                  className="px-4 py-2 border border-[#DCD0C7] rounded-xl text-xs font-mono text-[#6A5A6A] hover:bg-[#EADFD8]/40 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    if (setProfile) {
                      setProfile({
                        name: nameInput.trim() || 'Mayank Kamdi',
                        role: roleInput.trim() || 'CS Scholar',
                        initials: (initialsInput.trim() || 'MK').toUpperCase()
                      });
                    }
                    setIsProfileModalOpen(false);
                  }}
                  className="px-5 py-2 bg-[#3C2D3D] hover:bg-[#4C3D4D] text-[#FFFBE9] rounded-xl text-xs font-mono transition-colors shadow-sm"
                >
                  Save Profile
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
