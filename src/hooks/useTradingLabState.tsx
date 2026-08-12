import { useState, useEffect } from 'react';

export interface TradingLabState {
  xp: number;
  level: number;
  completedChallenges: string[];
  badges: string[];
  dailyChallengeCompleted: string | null; // Date string
  thirtyDayProgress: string[];
  recentCandles: string[];
  recentCharts: string[];
  recentSetups: string[];
  recentPsych: string[];
  mistakes: { id: string, module: string }[];
  streak: number;
  lastActiveDate: string | null;
}

const INITIAL_STATE: TradingLabState = {
  xp: 0,
  level: 1,
  completedChallenges: [],
  badges: [],
  dailyChallengeCompleted: null,
  thirtyDayProgress: [],
  recentCandles: [],
  recentCharts: [],
  recentSetups: [],
  recentPsych: [],
  mistakes: [],
  streak: 0,
  lastActiveDate: null
};

const LEVELS = [
  { name: 'Trading Beginner', xp: 0 },
  { name: 'Candle Learner', xp: 100 },
  { name: 'Chart Reader', xp: 250 },
  { name: 'Structure Student', xp: 500 },
  { name: 'Setup Hunter', xp: 800 },
  { name: 'Risk Aware', xp: 1200 },
  { name: 'Psychology Aware', xp: 1600 },
  { name: 'M Forex Apprentice', xp: 2000 },
  { name: 'Market Observer', xp: 2500 },
  { name: 'Disciplined Trader', xp: 3000 },
];

export const BADGES = [
  { id: 'candle_explorer', name: 'Candle Explorer', icon: '🕯️', desc: 'Complete 5 candle challenges' },
  { id: 'chart_reader', name: 'Chart Reader', icon: '📈', desc: 'Complete 5 chart challenges' },
  { id: 'setup_hunter', name: 'Setup Hunter', icon: '🎯', desc: 'Complete 5 setup challenges' },
  { id: 'psychology_aware', name: 'Psychology Aware', icon: '🧠', desc: 'Complete psychology test' },
  { id: 'risk_aware', name: 'Risk Aware', icon: '🛡️', desc: 'Complete risk challenge' },
  { id: 'boss_battle', name: 'Boss Battle Survivor', icon: '🔥', desc: 'Complete Boss Battle' },
];

export function useTradingLabState() {
  const [state, setState] = useState<TradingLabState>(() => {
    try {
      const saved = localStorage.getItem('mforex_trading_lab');
      if (saved) {
        const parsed = JSON.parse(saved);
        return { ...INITIAL_STATE, ...parsed }; // Merge to handle new keys
      }
      return INITIAL_STATE;
    } catch (e) {
      return INITIAL_STATE;
    }
  });

  useEffect(() => {
    localStorage.setItem('mforex_trading_lab', JSON.stringify(state));
  }, [state]);

  const addXP = (amount: number) => {
    setState(prev => {
      const newXp = Math.max(0, prev.xp + amount);
      let newLevel = 1;
      for (let i = LEVELS.length - 1; i >= 0; i--) {
        if (newXp >= LEVELS[i].xp) {
          newLevel = i + 1;
          break;
        }
      }
      return { ...prev, xp: newXp, level: newLevel };
    });
  };

  const markCompleted = (challengeId: string, moduleType: 'candle' | 'chart' | 'setup' | 'psych', badgeToUnlock?: string) => {
    setState(prev => {
      const newCompleted = prev.completedChallenges.includes(challengeId) 
        ? prev.completedChallenges 
        : [...prev.completedChallenges, challengeId];
      
      const newBadges = [...prev.badges];
      if (badgeToUnlock && !newBadges.includes(badgeToUnlock)) {
        newBadges.push(badgeToUnlock);
      }

      // Update recents
      let newRecents = [...(prev[`recent${moduleType === 'candle' ? 'Candles' : moduleType === 'chart' ? 'Charts' : moduleType === 'setup' ? 'Setups' : 'Psych'}`] as string[])];
      newRecents.push(challengeId);
      if (newRecents.length > 15) newRecents.shift(); // Keep last 15

      const today = new Date().toISOString().split('T')[0];
      let newStreak = prev.streak;
      if (prev.lastActiveDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        if (prev.lastActiveDate === yesterday.toISOString().split('T')[0]) {
          newStreak += 1;
        } else {
          newStreak = 1;
        }
      }

      return {
        ...prev,
        completedChallenges: newCompleted,
        badges: newBadges,
        [`recent${moduleType === 'candle' ? 'Candles' : moduleType === 'chart' ? 'Charts' : moduleType === 'setup' ? 'Setups' : 'Psych'}`]: newRecents,
        streak: newStreak,
        lastActiveDate: today
      };
    });
  };

  const logMistake = (challengeId: string, module: string) => {
    setState(prev => {
      if (prev.mistakes.find(m => m.id === challengeId)) return prev;
      return { ...prev, mistakes: [...prev.mistakes, { id: challengeId, module }] };
    });
  }

  const mark30DayCompleted = (dayId: string) => {
    setState(prev => {
      if (prev.thirtyDayProgress.includes(dayId)) return prev;
      return { ...prev, thirtyDayProgress: [...prev.thirtyDayProgress, dayId] };
    });
  }

  const resetProgress = () => {
    setState(INITIAL_STATE);
  };

  const currentLevelName = LEVELS[Math.min(state.level - 1, LEVELS.length - 1)].name;
  const nextLevel = LEVELS[Math.min(state.level, LEVELS.length - 1)];
  const currentLevelInfo = LEVELS[Math.min(state.level - 1, LEVELS.length - 1)];
  
  let progressToNextLevel = 100;
  if (state.level < LEVELS.length) {
    const xpIntoLevel = state.xp - currentLevelInfo.xp;
    const xpNeededForNext = nextLevel.xp - currentLevelInfo.xp;
    progressToNextLevel = Math.floor((xpIntoLevel / xpNeededForNext) * 100);
  }

  // Calculate generic difficulty based on level
  const getAdaptiveDifficulty = () => {
    if (state.level < 3) return 'easy';
    if (state.level < 6) return 'medium';
    return 'hard';
  };

  return {
    state,
    currentLevelName,
    progressToNextLevel,
    nextLevelXp: nextLevel.xp,
    addXP,
    markCompleted,
    logMistake,
    mark30DayCompleted,
    resetProgress,
    levels: LEVELS,
    getAdaptiveDifficulty
  };
}
