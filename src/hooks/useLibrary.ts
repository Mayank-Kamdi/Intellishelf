'use client';

import { useState, useEffect } from 'react';
import { Book, UserStats, Reservation, OverdueItem, UserProfile } from '../types';
import {
  getStoredBooks,
  saveBooks,
  getStoredStats,
  saveStats,
  getStoredReservations,
  saveReservations,
  getStoredOverdue,
  saveOverdue,
  getStoredProfile,
  saveProfile
} from '../utils/mockDb';

export function useLibrary() {
  const [books, setBooks] = useState<Book[]>([]);
  const [stats, setStats] = useState<UserStats | null>(null);
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [overdue, setOverdue] = useState<OverdueItem[]>([]);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [compareList, setCompareList] = useState<Book[]>([]);
  const [isLibrarianOpen, setIsLibrarianOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Hydrate from local storage on mount
  useEffect(() => {
    setBooks(getStoredBooks());
    setStats(getStoredStats());
    setReservations(getStoredReservations());
    setOverdue(getStoredOverdue());
    setProfile(getStoredProfile());
  }, []);

  // Sync state modifications to storage
  const updateBooksState = (newBooks: Book[]) => {
    setBooks(newBooks);
    saveBooks(newBooks);
  };

  const updateStatsState = (newStats: UserStats) => {
    setStats(newStats);
    saveStats(newStats);
  };

  const updateReservationsState = (newRes: Reservation[]) => {
    setReservations(newRes);
    saveReservations(newRes);
  };

  const updateOverdueState = (newOverdue: OverdueItem[]) => {
    setOverdue(newOverdue);
    saveOverdue(newOverdue);
  };

  // Smart reservation action (confetti and flying animation helper)
  const reserveBook = (bookId: string) => {
    const book = books.find(b => b.id === bookId);
    if (!book || !book.available) return false;

    // 1. Mark book as unavailable
    const updatedBooks = books.map(b => 
      b.id === bookId ? { ...b, available: false } : b
    );
    updateBooksState(updatedBooks);

    // 2. Add to reservations
    const lockerNum = Math.floor(Math.random() * 50) + 100;
    const newReservation: Reservation = {
      id: `res-${Date.now()}`,
      bookId: book.id,
      bookTitle: book.title,
      coverColor: book.coverColor,
      timestamp: new Date().toLocaleTimeString(),
      lockerNumber: lockerNum,
      timeLeft: 1200 // 20 minutes in seconds
    };
    const updatedRes = [...reservations, newReservation];
    updateReservationsState(updatedRes);

    // 3. Grant XP / stats upgrade for active engagement
    if (stats) {
      const updatedStats = {
        ...stats,
        xp: stats.xp + 150,
        readingGoalProgress: Math.min(stats.readingGoal, stats.readingGoalProgress + 1)
      };
      // Check for level up
      if (updatedStats.xp >= updatedStats.level * 500) {
        updatedStats.level += 1;
      }
      updateStatsState(updatedStats);
    }

    return true;
  };

  // Renew book in overdue timeline
  const renewBook = (overdueId: string) => {
    const item = overdue.find(o => o.id === overdueId);
    if (!item) return;

    // Reset remaining days
    const updatedOverdue = overdue.map(o => 
      o.id === overdueId 
        ? { ...o, daysRemaining: 14, status: 'green' as const, dueDate: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] } 
        : o
    );
    updateOverdueState(updatedOverdue);

    // Grant small XP boost
    if (stats) {
      updateStatsState({ ...stats, xp: stats.xp + 50 });
    }
  };

  // Add/remove book from side-by-side comparison
  const toggleCompare = (book: Book) => {
    setCompareList(prev => {
      const exists = prev.find(b => b.id === book.id);
      if (exists) {
        return prev.filter(b => b.id !== book.id);
      }
      if (prev.length >= 2) {
        // Replace second item
        return [prev[0], book];
      }
      return [...prev, book];
    });
  };

  const clearCompare = () => setCompareList([]);

  const updateProfileState = (newProfile: UserProfile) => {
    setProfile(newProfile);
    saveProfile(newProfile);
  };

  return {
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
    setBooks: updateBooksState,
    setStats: updateStatsState,
    setReservations: updateReservationsState,
    setProfile: updateProfileState
  };
}
