
import React, { useState, useEffect, useCallback } from 'react';
import { 
  Plus, 
  Calendar, 
  List, 
  BarChart3, 
  Sparkles, 
  CheckCircle2, 
  Circle, 
  Trash2,
  Bell,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { Habit, View } from './types';
import { initDB, getAllHabits, saveHabit, deleteHabit } from './db';
import HabitForm from './components/HabitForm';
import TodayView from './components/TodayView';
import HabitsList from './components/HabitsList';
import StatsView from './components/StatsView';
import AIInsights from './components/AIInsights';

const App: React.FC = () => {
  const [view, setView] = useState<View>('today');
  const [habits, setHabits] = useState<Habit[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const bootstrap = async () => {
      initDB();
      const stored = await getAllHabits();
      setHabits(stored);
      setIsLoading(false);
    };
    bootstrap();
  }, []);

  const refreshHabits = async () => {
    const updated = await getAllHabits();
    setHabits(updated);
  };

  const handleToggleHabit = async (id: string, date: string) => {
    const habit = habits.find(h => h.id === id);
    if (!habit) return;

    const newCompletions = habit.completions.includes(date)
      ? habit.completions.filter(d => d !== date)
      : [...habit.completions, date];

    const updatedHabit = { ...habit, completions: newCompletions };
    await saveHabit(updatedHabit);
    setHabits(prev => prev.map(h => h.id === id ? updatedHabit : h));
  };

  const handleAddHabit = async (newHabit: Habit) => {
    await saveHabit(newHabit);
    setHabits(prev => [...prev, newHabit]);
    setShowAddForm(false);
  };

  const handleDeleteHabit = async (id: string) => {
    if (confirm('Delete this habit?')) {
      await deleteHabit(id);
      setHabits(prev => prev.filter(h => h.id !== id));
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto h-screen flex flex-col bg-slate-50 relative overflow-hidden">
      {/* Header */}
      <header className="px-6 py-4 flex justify-between items-center bg-white border-b border-slate-100 shrink-0">
        <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          ZenHabit
        </h1>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => alert("Notification permissions would be requested here in a real PWA context.")}
            className="p-2 text-slate-400 hover:text-indigo-600 transition-colors"
          >
            <Bell size={20} />
          </button>
          <button 
            onClick={() => setShowAddForm(true)}
            className="bg-indigo-600 text-white p-2 rounded-full shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all active:scale-95"
          >
            <Plus size={20} />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pb-24">
        {view === 'today' && (
          <TodayView habits={habits} onToggle={handleToggleHabit} />
        )}
        {view === 'habits' && (
          <HabitsList habits={habits} onDelete={handleDeleteHabit} />
        )}
        {view === 'stats' && (
          <StatsView habits={habits} />
        )}
        {view === 'ai' && (
          <AIInsights habits={habits} />
        )}
      </main>

      {/* Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-md border-t border-slate-100 flex justify-around items-center py-3 px-4 safe-area-bottom">
        <NavButton active={view === 'today'} icon={<Calendar size={22} />} label="Today" onClick={() => setView('today')} />
        <NavButton active={view === 'habits'} icon={<List size={22} />} label="Habits" onClick={() => setView('habits')} />
        <NavButton active={view === 'stats'} icon={<BarChart3 size={22} />} label="Stats" onClick={() => setView('stats')} />
        <NavButton active={view === 'ai'} icon={<Sparkles size={22} />} label="Zen AI" onClick={() => setView('ai')} />
      </nav>

      {/* Form Modal */}
      {showAddForm && (
        <HabitForm onClose={() => setShowAddForm(false)} onSubmit={handleAddHabit} />
      )}
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; icon: React.ReactNode; label: string; onClick: () => void }> = ({ active, icon, label, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex flex-col items-center transition-all ${active ? 'text-indigo-600 scale-105' : 'text-slate-400'}`}
  >
    {icon}
    <span className="text-[10px] font-medium mt-1">{label}</span>
  </button>
);

export default App;
