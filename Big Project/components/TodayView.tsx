
import React from 'react';
import { CheckCircle2, Circle, Flame, TrendingUp } from 'lucide-react';
import { Habit } from '../types';
import { calculateStreak } from '../utils/habitUtils';

interface TodayViewProps {
  habits: Habit[];
  onToggle: (id: string, date: string) => void;
}

const TodayView: React.FC<TodayViewProps> = ({ habits, onToggle }) => {
  const today = new Date().toISOString().split('T')[0];
  
  const completedCount = habits.filter(h => h.completions.includes(today)).length;
  const progress = habits.length > 0 ? (completedCount / habits.length) * 100 : 0;

  return (
    <div className="px-6 py-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-slate-800">Today</h2>
        <p className="text-slate-500 text-sm">You've finished {completedCount} of {habits.length} habits.</p>
        
        <div className="mt-4 bg-white p-4 rounded-2xl border border-slate-100 shadow-sm">
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Progress</span>
            <span className="text-sm font-bold text-indigo-600">{Math.round(progress)}%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-1000"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {habits.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-indigo-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="text-indigo-400" size={32} />
            </div>
            <p className="text-slate-500 font-medium">No habits yet. Start by adding one!</p>
          </div>
        ) : (
          habits.map(habit => {
            const isCompleted = habit.completions.includes(today);
            const streak = calculateStreak(habit.completions);
            
            return (
              <button
                key={habit.id}
                onClick={() => onToggle(habit.id, today)}
                className={`w-full group relative flex items-center gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                  isCompleted 
                    ? 'bg-white border-indigo-100 shadow-sm' 
                    : 'bg-white border-slate-100 hover:border-slate-300'
                }`}
              >
                <div className={`shrink-0 transition-transform active:scale-90 ${isCompleted ? 'text-indigo-600' : 'text-slate-300'}`}>
                  {isCompleted ? <CheckCircle2 size={28} /> : <Circle size={28} />}
                </div>
                
                <div className="flex-1 text-left overflow-hidden">
                  <h3 className={`font-semibold truncate transition-colors ${isCompleted ? 'text-slate-400 line-through' : 'text-slate-800'}`}>
                    {habit.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${habit.color} text-white bg-opacity-80`}>
                      {habit.category}
                    </span>
                    {streak > 0 && (
                      <span className="flex items-center gap-1 text-[10px] font-bold text-amber-500">
                        <Flame size={12} fill="currentColor" /> {streak} day streak
                      </span>
                    )}
                  </div>
                </div>
                
                {isCompleted && (
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 animate-in zoom-in duration-300">
                    <div className="w-1.5 h-1.5 bg-indigo-500 rounded-full animate-pulse"></div>
                  </div>
                )}
              </button>
            );
          })
        )}
      </div>
    </div>
  );
};

export default TodayView;
