
import React, { useMemo } from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { Habit } from '../types';
import { getHabitPerformanceData } from '../utils/habitUtils';

interface StatsViewProps {
  habits: Habit[];
}

const StatsView: React.FC<StatsViewProps> = ({ habits }) => {
  const chartData = useMemo(() => getHabitPerformanceData(habits), [habits]);

  const categoryData = useMemo(() => {
    const cats: Record<string, number> = {};
    habits.forEach(h => {
      cats[h.category] = (cats[h.category] || 0) + h.completions.length;
    });
    return Object.entries(cats).map(([name, value]) => ({ name, value }));
  }, [habits]);

  const COLORS = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#0ea5e9'];

  return (
    <div className="px-6 py-4 pb-12">
      <h2 className="text-2xl font-bold text-slate-800 mb-6">Analytics</h2>

      <div className="space-y-6">
        {/* Weekly Trend */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-sm font-bold text-slate-400 uppercase mb-6 tracking-wider">Weekly Activity</h3>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                  labelStyle={{ fontWeight: 'bold' }}
                />
                <Line 
                  type="monotone" 
                  dataKey="completed" 
                  stroke="#6366f1" 
                  strokeWidth={4} 
                  dot={{ r: 6, fill: '#6366f1', strokeWidth: 2, stroke: '#fff' }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
          <h3 className="text-sm font-bold text-slate-400 uppercase mb-6 tracking-wider">Effort Distribution</h3>
          <div className="h-[200px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <Tooltip 
                   cursor={{ fill: '#f8fafc' }}
                   contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Totals */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-indigo-600 p-5 rounded-3xl text-white shadow-lg shadow-indigo-100">
            <p className="text-xs font-bold text-indigo-200 uppercase">Active Habits</p>
            <p className="text-3xl font-bold mt-1">{habits.length}</p>
          </div>
          <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm">
            <p className="text-xs font-bold text-slate-400 uppercase">Total Completed</p>
            <p className="text-3xl font-bold text-slate-800 mt-1">
              {habits.reduce((acc, h) => acc + h.completions.length, 0)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsView;
