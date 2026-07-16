export interface Book {
  id: string;
  title: string;
  author: string;
  coverColor: string;
  rating: number;
  available: boolean;
  shelfLocation: string; // e.g. "Shelf A-1"
  shelfIndex: number;    // 0, 1, 2
  bookIndex: number;     // position on shelf
  pages: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  readTime: string;      // e.g. "8 hours"
  prerequisites: string[];
  description: string;
  whoShouldRead: string[];
  publisher: string;
  category: string;
  borrowedCount: number;
  popularityScore: number; // 0-100
  summary: string;       // AI generated summary (~100 words)
}

export interface UserStats {
  xp: number;
  level: number;
  streak: number;
  booksRead: number;
  hoursRead: number;
  genreProgress: { [genre: string]: number }; // percentage 0-100
  readingGoal: number; // monthly target e.g. 5
  readingGoalProgress: number; // e.g. 3
}

export interface Reservation {
  id: string;
  bookId: string;
  bookTitle: string;
  coverColor: string;
  timestamp: string;
  lockerNumber: number;
  timeLeft: number; // in seconds
}

export interface OverdueItem {
  id: string;
  bookTitle: string;
  author: string;
  coverColor: string;
  dueDate: string;
  daysRemaining: number; // positive = remaining, negative = overdue
  status: 'green' | 'yellow' | 'orange' | 'red';
}

export interface UserProfile {
  name: string;
  role: string;
  initials: string;
}
