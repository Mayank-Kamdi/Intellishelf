import { Book, UserStats, Reservation, OverdueItem, UserProfile } from '../types';

export const INITIAL_RESERVATIONS: Reservation[] = [
  {
    id: 'res-1',
    bookId: '1',
    bookTitle: 'Atomic Habits',
    coverColor: '#F59E0B',
    timestamp: '10:45 AM',
    lockerNumber: 104,
    timeLeft: 850
  },
  {
    id: 'res-2',
    bookId: '3',
    bookTitle: 'Hands-On Machine Learning',
    coverColor: '#8B5CF6',
    timestamp: '11:15 AM',
    lockerNumber: 128,
    timeLeft: 1100
  }
];

export const INITIAL_PROFILE: UserProfile = {
  name: 'Mayank Kamdi',
  role: 'CS Scholar',
  initials: 'MK'
};

const TEMP_INITIAL_BOOKS: Book[] = [
  {
    id: '1',
    title: 'Atomic Habits',
    author: 'James Clear',
    coverColor: '#F59E0B',
    rating: 4.8,
    available: true,
    shelfLocation: 'Shelf Alpha-1',
    shelfIndex: 0,
    bookIndex: 0,
    pages: 320,
    difficulty: 'Beginner',
    readTime: '6.5 hours',
    prerequisites: ['None'],
    description: 'An easy and proven way to build good habits and break bad ones. James Clear offers a framework for improving every day.',
    whoShouldRead: ['Anyone trying to build productive routines', 'Students', 'Professionals'],
    publisher: 'Penguin Books',
    category: 'Self Improvement',
    borrowedCount: 154,
    popularityScore: 98,
    summary: 'Atomic Habits provides an actionable system for self-improvement. James Clear highlights the compounding effect of 1% daily changes. He details the four laws of behavior change: make it obvious, attractive, easy, and satisfying. The core thesis is that systems, not goals, determine long-term success, helping individuals build permanent, positive habits.'
  },
  {
    id: '2',
    title: 'Python Crash Course',
    author: 'Eric Matthes',
    coverColor: '#3B82F6',
    rating: 4.7,
    available: true,
    shelfLocation: 'Shelf Alpha-2',
    shelfIndex: 0,
    bookIndex: 1,
    pages: 544,
    difficulty: 'Beginner',
    readTime: '11 hours',
    prerequisites: ['Basic computer literacy'],
    description: 'A fast-paced, thorough introduction to programming with Python that will have you writing programs, solving problems, and making things that work in no time.',
    whoShouldRead: ['Programming beginners', 'Students starting Python', 'Web developers looking for scripting skills'],
    publisher: 'No Starch Press',
    category: 'Software Development',
    borrowedCount: 98,
    popularityScore: 89,
    summary: 'Python Crash Course is a project-based guide to programming. The first half covers syntax, basic data structures, functions, classes, and testing. The second half guides you through building a 2D arcade game, a interactive web application, and interactive data visualizations. It serves as an exceptional guide to fast-track foundational skills.'
  },
  {
    id: '3',
    title: 'Hands-On Machine Learning',
    author: 'Aurélien Géron',
    coverColor: '#8B5CF6',
    rating: 4.9,
    available: true,
    shelfLocation: 'Shelf Beta-1',
    shelfIndex: 1,
    bookIndex: 0,
    pages: 856,
    difficulty: 'Advanced',
    readTime: '24 hours',
    prerequisites: ['Python coding', 'Linear Algebra', 'Calculus'],
    description: 'Through a series of recent breakthroughs, deep learning has boosted the entire field of machine learning. Now, even programmers who know close to nothing about this technology can use simple, efficient tools to implement programs capable of learning from data.',
    whoShouldRead: ['Data Scientists', 'AI Engineers', 'Advanced Software Developers'],
    publisher: "O'Reilly Media",
    category: 'Artificial Intelligence',
    borrowedCount: 82,
    popularityScore: 95,
    summary: 'This guide offers a practical, code-first introduction to building intelligent systems using Scikit-Learn, Keras, and TensorFlow. Aurélien Géron guides readers through the entire machine learning pipeline, from basic regression analysis to complex Deep Neural Network architectures, transformers, and reinforcement learning strategies.'
  },
  {
    id: '4',
    title: 'Deep Learning',
    author: 'Ian Goodfellow',
    coverColor: '#22D3EE',
    rating: 4.6,
    available: false,
    shelfLocation: 'Shelf Beta-2',
    shelfIndex: 1,
    bookIndex: 1,
    pages: 800,
    difficulty: 'Advanced',
    readTime: '22 hours',
    prerequisites: ['Multivariate Calculus', 'Linear Algebra', 'Probability Theory'],
    description: 'An information-rich textbook introducing a broad range of topics in deep learning, covering mathematical and conceptual backgrounds, deep learning techniques used in industry, and research perspectives.',
    whoShouldRead: ['Graduate Students', 'AI researchers', 'Machine Learning engineers looking for deep theory'],
    publisher: 'MIT Press',
    category: 'Artificial Intelligence',
    borrowedCount: 61,
    popularityScore: 82,
    summary: 'Written by industry pioneers Ian Goodfellow, Yoshua Bengio, and Aaron Courville, Deep Learning is widely regarded as the definitive mathematical bible of the field. It covers deep feedforward networks, optimization algorithms, convolutional networks, sequence modeling, and autoencoders, alongside cutting-edge generative models.'
  },
  {
    id: '5',
    title: 'Clean Code',
    author: 'Robert C. Martin',
    coverColor: '#10B981',
    rating: 4.8,
    available: true,
    shelfLocation: 'Shelf Gamma-1',
    shelfIndex: 2,
    bookIndex: 0,
    pages: 464,
    difficulty: 'Intermediate',
    readTime: '9 hours',
    prerequisites: ['At least one year of object-oriented programming'],
    description: 'Even bad code can function. But if code isn’t clean, it can bring a development organization to its knees. Every year, countless hours and significant resources are lost because of poorly written code.',
    whoShouldRead: ['Professional developers', 'Computer Science seniors', 'Tech Leads'],
    publisher: 'Prentice Hall',
    category: 'Software Engineering',
    borrowedCount: 120,
    popularityScore: 92,
    summary: 'Clean Code emphasizes the craftsmanship of coding. Robert C. Martin presents rules, guidelines, and code smell analysis for writing highly maintainable, readable, and solid code. Key topics include expressive naming, small and focused functions, error handling, unit tests, and design pattern execution to eliminate technical debt.'
  },
  {
    id: '6',
    title: 'Zero to One',
    author: 'Peter Thiel',
    coverColor: '#EF4444',
    rating: 4.5,
    available: true,
    shelfLocation: 'Shelf Gamma-2',
    shelfIndex: 2,
    bookIndex: 1,
    pages: 224,
    difficulty: 'Beginner',
    readTime: '4 hours',
    prerequisites: ['None'],
    description: 'The next Bill Gates will not build an operating system. The next Larry Page or Sergey Brin won’t make a search engine. If you are copying these guys, you aren’t learning from them.',
    whoShouldRead: ['Entrepreneurs', 'Tech Enthusiasts', 'Venture Capitalists'],
    publisher: 'Crown Business',
    category: 'Business & Startup',
    borrowedCount: 110,
    popularityScore: 87,
    summary: 'Zero to One presents a provocative, contrarian philosophy on entrepreneurship. Peter Thiel argues that creating something brand new ("0 to 1") is far more impactful than copying existing items ("1 to n"). He illustrates how startups must build technology monopolies to escape raw competition and secure long-term value.'
  }
];

// Dynamic generator function to scale database to 10,000+ books
function generateMoreBooks(initialList: Book[]): Book[] {
  const categories = [
    'Programming',
    'Artificial Intelligence',
    'Psychology',
    'History',
    'Business',
    'Science',
    'Engineering'
  ];
  
  const techColors = [
    '#3B82F6', '#8B5CF6', '#EF4444', '#EAB308', 
    '#10B981', '#EC4899', '#F97316', '#22D3EE', 
    '#14B8A6', '#6366F1'
  ];

  const subjects = [
    'Advanced', 'Foundations of', 'Introduction to', 'Mastering',
    'Principles of', 'Guide to', 'The Art of', 'Exploring'
  ];
  const topics = [
    'Quantum Computing', 'Data Structuring', 'Distributed Systems', 'Parallel Architectures',
    'Behavioral Economics', 'Stochastic Systems', 'Microservices Scaling', 'Astrophysics',
    'Nanotechnology', 'Evolutionary Genetics', 'Thermodynamics', 'Medieval Warfare',
    'Cognitive Bias', 'Neuromorphic Hardware', 'Statistical Learning', 'Reinforcement Learning'
  ];
  const suffixes = [
    'Vol 1', 'Vol 2', 'Handbook', 'Primer', 'Manual', 'Compendium', 'Digest'
  ];

  const authors = [
    'A. Turing', 'N. Chomsky', 'R. Feynman', 'A. Lovelace', 'C. Shannon', 'D. Knuth',
    'G. Hinton', 'Y. LeCun', 'J. Pearl', 'H. Simon', 'M. Minsky', 'J. McCarthy'
  ];

  const publishers = [
    'MIT Press', 'Cambridge University Press', 'Oxford Press', 'Springer Nature',
    'O\'Reilly Media', 'Addison-Wesley', 'No Starch Press', 'Prentice Hall'
  ];

  const difficulties = ['Beginner', 'Intermediate', 'Advanced'] as const;

  const result = [...initialList];
  
  for (let i = result.length + 1; i <= 10050; i++) {
    const category = categories[i % categories.length];
    const sub = subjects[i % subjects.length];
    const topic = topics[(i * 3) % topics.length];
    const suffix = suffixes[i % suffixes.length];
    const title = `${sub} ${topic} (${suffix})`;
    const author = authors[(i * 7) % authors.length];
    const coverColor = techColors[i % techColors.length];
    const difficulty = difficulties[i % difficulties.length];
    const pages = 150 + (i % 850);
    const readTime = `${Math.round(pages / 50)} hours`;

    result.push({
      id: String(i),
      title,
      author,
      coverColor,
      rating: parseFloat((4.0 + (i % 10) / 10).toFixed(1)),
      available: i % 7 !== 0,
      shelfLocation: `Shelf ${category.slice(0, 3)}-${(i % 10) + 1}`,
      shelfIndex: i % 4,
      bookIndex: i % 8,
      pages,
      difficulty,
      readTime,
      prerequisites: ['None'],
      description: `A comprehensive scholarly work exploring the modern frontiers of ${topic}. Specifically curated for researchers.`,
      whoShouldRead: ['Scholars', 'Researchers', 'Enthusiasts'],
      publisher: publishers[i % publishers.length],
      category,
      borrowedCount: i % 200,
      popularityScore: 50 + (i % 50),
      summary: `This text covers the historical progression, current state-of-the-art methodology, and future paradigms of ${topic}. It details core research architectures, practical implementation algorithms, and theoretical case studies to establish comprehensive mastery.`
    });
  }
  return result;
}

export const INITIAL_BOOKS: Book[] = generateMoreBooks(TEMP_INITIAL_BOOKS);


export const INITIAL_STATS: UserStats = {
  xp: 1450,
  level: 4,
  streak: 12,
  booksRead: 18,
  hoursRead: 45,
  genreProgress: {
    'Software Development': 80,
    'Artificial Intelligence': 45,
    'Self Improvement': 90,
    'Business & Startup': 30
  },
  readingGoal: 5,
  readingGoalProgress: 3
};

export const INITIAL_OVERDUE: OverdueItem[] = [
  {
    id: 'o1',
    bookTitle: 'Deep Learning',
    author: 'Ian Goodfellow',
    coverColor: '#22D3EE',
    dueDate: '2026-07-10',
    daysRemaining: -6,
    status: 'red'
  },
  {
    id: 'o2',
    bookTitle: 'Design Patterns',
    author: 'Erich Gamma',
    coverColor: '#8B5CF6',
    dueDate: '2026-07-17',
    daysRemaining: 1,
    status: 'yellow'
  },
  {
    id: 'o3',
    bookTitle: 'The Lean Startup',
    author: 'Eric Ries',
    coverColor: '#EF4444',
    dueDate: '2026-07-25',
    daysRemaining: 9,
    status: 'green'
  }
];

// LocalStorage helpers with hydration fallback
export function getStoredBooks(): Book[] {
  if (typeof window === 'undefined') return INITIAL_BOOKS;
  const stored = localStorage.getItem('libraryverse_books');
  if (stored) return JSON.parse(stored);
  localStorage.setItem('libraryverse_books', JSON.stringify(INITIAL_BOOKS));
  return INITIAL_BOOKS;
}

export function saveBooks(books: Book[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('libraryverse_books', JSON.stringify(books));
  }
}

export function getStoredStats(): UserStats {
  if (typeof window === 'undefined') return INITIAL_STATS;
  const stored = localStorage.getItem('libraryverse_stats');
  if (stored) return JSON.parse(stored);
  localStorage.setItem('libraryverse_stats', JSON.stringify(INITIAL_STATS));
  return INITIAL_STATS;
}

export function saveStats(stats: UserStats) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('libraryverse_stats', JSON.stringify(stats));
  }
}

export function getStoredReservations(): Reservation[] {
  if (typeof window === 'undefined') return INITIAL_RESERVATIONS;
  const stored = localStorage.getItem('libraryverse_reservations');
  if (stored) return JSON.parse(stored);
  localStorage.setItem('libraryverse_reservations', JSON.stringify(INITIAL_RESERVATIONS));
  return INITIAL_RESERVATIONS;
}

export function saveReservations(res: Reservation[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('libraryverse_reservations', JSON.stringify(res));
  }
}

export function getStoredOverdue(): OverdueItem[] {
  if (typeof window === 'undefined') return INITIAL_OVERDUE;
  const stored = localStorage.getItem('libraryverse_overdue');
  if (stored) return JSON.parse(stored);
  localStorage.setItem('libraryverse_overdue', JSON.stringify(INITIAL_OVERDUE));
  return INITIAL_OVERDUE;
}

export function saveOverdue(items: OverdueItem[]) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('libraryverse_overdue', JSON.stringify(items));
  }
}

// Profile Storage Helpers
export function getStoredProfile(): UserProfile {
  if (typeof window === 'undefined') return INITIAL_PROFILE;
  const stored = localStorage.getItem('libraryverse_profile');
  if (stored) return JSON.parse(stored);
  localStorage.setItem('libraryverse_profile', JSON.stringify(INITIAL_PROFILE));
  return INITIAL_PROFILE;
}

export function saveProfile(profile: UserProfile) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('libraryverse_profile', JSON.stringify(profile));
  }
}

// "Semantic" AI Matcher for dashboard AI Search
export function querySemanticAI(query: string, books: Book[]): Book[] {
  const q = query.toLowerCase();
  
  // Custom natural language filters:
  
  // 1. Pages filter
  const underPageMatch = q.match(/under\s+(\d+)\s+pages?/);
  const maxPages = underPageMatch ? parseInt(underPageMatch[1], 10) : null;
  
  // 2. Difficulty filter
  let diffFilter: string | null = null;
  if (q.includes('beginner') || q.includes('easy') || q.includes('intro')) {
    diffFilter = 'Beginner';
  } else if (q.includes('intermediate') || q.includes('medium')) {
    diffFilter = 'Intermediate';
  } else if (q.includes('advanced') || q.includes('deep') || q.includes('expert')) {
    diffFilter = 'Advanced';
  }

  // 3. Similarity filter
  let similarTo: string | null = null;
  if (q.includes('similar to')) {
    const parts = q.split('similar to');
    if (parts.length > 1) {
      similarTo = parts[1].trim();
    }
  }

  return books.filter(book => {
    // Page count filter check
    if (maxPages && book.pages > maxPages) return false;
    
    // Difficulty filter check
    if (diffFilter && book.difficulty !== diffFilter) return false;

    // Similarity check (Atomic Habits matching self-help etc.)
    if (similarTo) {
      if (similarTo.includes('atomic habits') && book.category === 'Self Improvement') return true;
      if (similarTo.includes('python') && book.category === 'Software Development') return true;
    }

    // Keyword & Category Match
    const matchesKeyword = 
      book.title.toLowerCase().includes(q) ||
      book.author.toLowerCase().includes(q) ||
      book.description.toLowerCase().includes(q) ||
      book.category.toLowerCase().includes(q) ||
      book.summary.toLowerCase().includes(q);

    // Natural synonyms
    const isPythonSearch = (q.includes('python') || q.includes('programming') || q.includes('code')) && book.category === 'Software Development';
    const isAiSearch = (q.includes('ai') || q.includes('ml') || q.includes('machine learning') || q.includes('deep learning')) && book.category === 'Artificial Intelligence';
    const isSelfHelp = (q.includes('habit') || q.includes('habits') || q.includes('productivity') || q.includes('mindset')) && book.category === 'Self Improvement';

    return matchesKeyword || isPythonSearch || isAiSearch || isSelfHelp;
  });
}
