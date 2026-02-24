
import React, { useState, useEffect } from 'react';
import { Sparkles, Brain, Lightbulb, Quote, RefreshCw } from 'lucide-react';
import { Habit } from '../types';
import { getAIHabitCoaching } from '../services/geminiService';

interface AIInsightsProps {
  habits: Habit[];
}

const AIInsights: React.FC<AIInsightsProps> = ({ habits }) => {
  const [insight, setInsight] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const fetchInsight = async () => {
    if (habits.length === 0) return;
    setLoading(true);
    const res = await getAIHabitCoaching(habits);
    setInsight(res);
    setLoading(false);
  };

  useEffect(() => {
    fetchInsight();
  }, [habits.length]);

  if (habits.length === 0) {
    return (
      <div className="px-6 py-12 text-center">
        <Sparkles className="mx-auto text-slate-200 mb-4" size={48} />
        <h3 className="text-lg font-bold text-slate-800">Zen AI needs data</h3>
        <p className="text-slate-500 mt-2">Add some habits and complete them to get AI-powered insights and coaching.</p>
      </div>
    );
  }

  return (
    <div className="px-6 py-4">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
          Zen Coach <Sparkles size={20} className="text-indigo-500" />
        </h2>
        <button 
          onClick={fetchInsight}
          disabled={loading}
          className="p-2 text-slate-400 hover:text-indigo-600 transition-colors disabled:opacity-50"
        >
          <RefreshCw size={18} className={loading ? 'animate-spin' : ''} />
        </button>
      </div>

      <div className="space-y-4">
        {loading ? (
          <div className="space-y-4 animate-pulse">
            <div className="h-32 bg-slate-100 rounded-3xl"></div>
            <div className="h-32 bg-slate-100 rounded-3xl"></div>
            <div className="h-32 bg-slate-100 rounded-3xl"></div>
          </div>
        ) : insight ? (
          <>
            <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100">
              <div className="flex items-center gap-3 mb-3 text-indigo-600">
                <Brain size={20} />
                <h3 className="font-bold text-sm uppercase tracking-wider">Analysis</h3>
              </div>
              <p className="text-slate-700 leading-relaxed font-medium">
                {insight.analysis}
              </p>
            </div>

            <div className="bg-emerald-50 p-6 rounded-3xl border border-emerald-100">
              <div className="flex items-center gap-3 mb-3 text-emerald-600">
                <Lightbulb size={20} />
                <h3 className="font-bold text-sm uppercase tracking-wider">Growth Tip</h3>
              </div>
              <p className="text-slate-700 leading-relaxed font-medium">
                {insight.suggestion}
              </p>
            </div>

            <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <Quote size={80} />
              </div>
              <div className="flex items-center gap-3 mb-3 text-slate-400">
                <Quote size={20} />
                <h3 className="font-bold text-sm uppercase tracking-wider">Motivation</h3>
              </div>
              <p className="text-slate-800 italic text-lg font-serif">
                "{insight.motivation}"
              </p>
            </div>
          </>
        ) : (
          <p className="text-center text-slate-400 py-10">Press refresh to generate insights.</p>
        )}
      </div>
    </div>
  );
};

export default AIInsights;
