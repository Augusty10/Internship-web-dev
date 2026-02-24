
export const calculateStreak = (completions: string[]): number => {
  if (completions.length === 0) return 0;
  
  const sorted = [...completions].sort((a, b) => b.localeCompare(a));
  const today = new Date().toISOString().split('T')[0];
  const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
  
  // If the last completion wasn't today or yesterday, streak is broken
  if (sorted[0] !== today && sorted[0] !== yesterday) return 0;
  
  let streak = 0;
  let currentDate = new Date(sorted[0]);
  
  for (let i = 0; i < sorted.length; i++) {
    const compDateStr = sorted[i];
    const expectedStr = currentDate.toISOString().split('T')[0];
    
    if (compDateStr === expectedStr) {
      streak++;
      currentDate.setDate(currentDate.getDate() - 1);
    } else {
      break;
    }
  }
  
  return streak;
};

export const getHabitPerformanceData = (habits: any[]) => {
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(d.getDate() - (6 - i));
    return d.toISOString().split('T')[0];
  });

  return last7Days.map(date => ({
    date: date.slice(5),
    completed: habits.filter(h => h.completions.includes(date)).length,
  }));
};
