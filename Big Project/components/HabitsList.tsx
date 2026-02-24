
import React from 'react';
import { Trash2, Flame, Calendar, Info } from 'lucide-react';
import { Habit } from '../types';
import { calculateStreak } from '../utils/habitUtils';

interface HabitsListProps {
  habits: Habit[];
  onDelete: (id: string) => void;
}

const HabitsList: React.FC<HabitsListProps> = ({ habits, onDelete }) => {
  return (
    <div className="px-6 py-4">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">My Habits</h2>
          <p className="text-slate-500 text-sm">Organize and manage your goals.</p>
        </div>
      </div>

      <div className="grid gap-4">
        {habits.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
            <Info className="mx-auto text-slate-300 mb-2" />
            <p className="text-slate-400 font-medium">No habits registered yet.</p>
          </div>
        ) : (
          habits.map(habit => (
            <div key={habit.id} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm relative group">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-slate-800 text-lg">{habit.name}</h3>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${habit.color} text-white`}>
                      {habit.category}
                    </span>
                  </div>
                  <p className="text-slate-400 text-xs mt-1">{habit.description || 'No description provided.'}</p>
                </div>
                <button 
                  onClick={() => onDelete(habit.id)}
                  className="p-2 text-slate-300 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-all"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-slate-50">
                <div className="flex flex-col items-center p-2 rounded-xl bg-slate-50">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Streak</span>
                  <div className="flex items-center gap-1 text-amber-500 font-bold">
                    <Flame size={14} fill="currentColor" />
                    <span>{calculateStreak(habit.completions)}</span>
                  </div>
                </div>
                <div className="flex flex-col items-center p-2 rounded-xl bg-slate-50">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Total</span>
                  <div className="flex items-center gap-1 text-indigo-600 font-bold">
                    <Calendar size={14} />
                    <span>{habit.completions.length}</span>
                  </div>
                </div>
                <div className="flex flex-col items-center p-2 rounded-xl bg-slate-50">
                  <span className="text-[10px] font-bold text-slate-400 uppercase">Status</span>
                  <span className="text-xs font-bold text-emerald-500">Active</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HabitsList;
