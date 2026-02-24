
export interface Habit {
  id: string;
  name: string;
  description: string;
  category: 'Health' | 'Productivity' | 'Mindfulness' | 'Personal' | 'Other';
  frequency: 'daily' | 'weekly';
  createdAt: number;
  completions: string[]; // ISO Date strings (YYYY-MM-DD)
  color: string;
}

export interface HabitStats {
  id: string;
  currentStreak: number;
  bestStreak: number;
  totalCompletions: number;
  completionRate: number;
}

export type View = 'today' | 'habits' | 'stats' | 'ai';
