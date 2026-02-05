import { useState, useCallback, useEffect } from 'react';
import type { PlayerProgress } from '../types/progress';
import { DEFAULT_PROGRESS } from '../types/progress';
import { getItem, setItem, STORAGE_KEYS } from '../lib/storage';
import type { Difficulty, Category } from '../types/game';
import badgeData from '../data/rewards/xp-badges.json';

function loadProgress(): PlayerProgress {
  return {
    totalXP: getItem<number>(STORAGE_KEYS.totalXP, 0),
    totalCoins: getItem<number>(STORAGE_KEYS.totalCoins, 0),
    challengesCompleted: getItem<number>(STORAGE_KEYS.challengesCompleted, 0),
    badges: getItem<string[]>(STORAGE_KEYS.badges, []),
    categoryHistory: getItem(STORAGE_KEYS.categoryHistory, { move: 0, brain: 0, chill: 0 }),
    bingoCard: getItem<boolean[]>(STORAGE_KEYS.bingoCard, new Array(16).fill(false)),
    bingoWeekStart: getItem<string | null>(STORAGE_KEYS.bingoWeekStart, null),
    weekStreak: getItem<number>(STORAGE_KEYS.weekStreak, 0),
    lastPlayDate: getItem<string | null>(STORAGE_KEYS.lastPlayDate, null),
    bossCompleted: getItem<number>(STORAGE_KEYS.bossCompleted, 0),
    bingoLines: getItem<number>(STORAGE_KEYS.bingoLines, 0),
    bingoBlackouts: getItem<number>(STORAGE_KEYS.bingoBlackouts, 0),
    dayStreak: getItem<number>(STORAGE_KEYS.dayStreak, 0),
  };
}

function saveProgress(progress: PlayerProgress): void {
  setItem(STORAGE_KEYS.totalXP, progress.totalXP);
  setItem(STORAGE_KEYS.totalCoins, progress.totalCoins);
  setItem(STORAGE_KEYS.challengesCompleted, progress.challengesCompleted);
  setItem(STORAGE_KEYS.badges, progress.badges);
  setItem(STORAGE_KEYS.categoryHistory, progress.categoryHistory);
  setItem(STORAGE_KEYS.bingoCard, progress.bingoCard);
  setItem(STORAGE_KEYS.bingoWeekStart, progress.bingoWeekStart);
  setItem(STORAGE_KEYS.weekStreak, progress.weekStreak);
  setItem(STORAGE_KEYS.lastPlayDate, progress.lastPlayDate);
  setItem(STORAGE_KEYS.bossCompleted, progress.bossCompleted);
  setItem(STORAGE_KEYS.bingoLines, progress.bingoLines);
  setItem(STORAGE_KEYS.bingoBlackouts, progress.bingoBlackouts);
  setItem(STORAGE_KEYS.dayStreak, progress.dayStreak);
}

export function useProgress() {
  const [progress, setProgress] = useState<PlayerProgress>(loadProgress);

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const addXP = useCallback((amount: number) => {
    setProgress(prev => ({ ...prev, totalXP: prev.totalXP + amount }));
  }, []);

  const addCoins = useCallback((amount: number) => {
    setProgress(prev => ({ ...prev, totalCoins: prev.totalCoins + amount }));
  }, []);

  const incrementChallenges = useCallback((category: Category, difficulty: Difficulty) => {
    setProgress(prev => {
      const today = new Date().toISOString().split('T')[0];
      const lastPlay = prev.lastPlayDate;
      let dayStreak = prev.dayStreak;

      if (lastPlay) {
        const lastDate = new Date(lastPlay);
        const todayDate = new Date(today);
        const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
        if (diffDays === 1) {
          dayStreak += 1;
        } else if (diffDays > 1) {
          dayStreak = 1;
        }
      } else {
        dayStreak = 1;
      }

      return {
        ...prev,
        challengesCompleted: prev.challengesCompleted + 1,
        categoryHistory: {
          ...prev.categoryHistory,
          [category]: prev.categoryHistory[category] + 1,
        },
        lastPlayDate: today,
        dayStreak,
        bossCompleted: difficulty === 'boss' ? prev.bossCompleted + 1 : prev.bossCompleted,
      };
    });
  }, []);

  const unlockBadge = useCallback((badgeId: string) => {
    setProgress(prev => {
      if (prev.badges.includes(badgeId)) return prev;
      return { ...prev, badges: [...prev.badges, badgeId] };
    });
  }, []);

  const checkBadgeEligibility = useCallback((): string[] => {
    const newBadges: string[] = [];
    for (const badge of badgeData.badges) {
      if (progress.badges.includes(badge.id)) continue;
      const req = badge.requirement;
      let earned = false;
      switch (req.type) {
        case 'challengesCompleted':
          earned = progress.challengesCompleted >= req.value;
          break;
        case 'categoryCount':
          earned = progress.categoryHistory[(req as any).category as Category] >= req.value;
          break;
        case 'bingoLine':
          earned = progress.bingoLines >= req.value;
          break;
        case 'bingoBlackout':
          earned = progress.bingoBlackouts >= req.value;
          break;
        case 'bossCompleted':
          earned = progress.bossCompleted >= req.value;
          break;
        case 'dayStreak':
          earned = progress.dayStreak >= req.value;
          break;
        case 'allBadges':
          earned = progress.badges.length >= req.value;
          break;
      }
      if (earned) newBadges.push(badge.id);
    }
    return newBadges;
  }, [progress]);

  const updateBingoCard = useCallback((squareIndex: number) => {
    setProgress(prev => {
      const card = [...prev.bingoCard];
      card[squareIndex] = true;
      return { ...prev, bingoCard: card };
    });
  }, []);

  const addBingoLine = useCallback(() => {
    setProgress(prev => ({ ...prev, bingoLines: prev.bingoLines + 1 }));
  }, []);

  const addBingoBlackout = useCallback(() => {
    setProgress(prev => ({ ...prev, bingoBlackouts: prev.bingoBlackouts + 1 }));
  }, []);

  const resetProgress = useCallback(() => {
    setProgress({ ...DEFAULT_PROGRESS });
  }, []);

  const setFullProgress = useCallback((p: PlayerProgress) => {
    setProgress(p);
  }, []);

  return {
    progress,
    addXP,
    addCoins,
    incrementChallenges,
    unlockBadge,
    checkBadgeEligibility,
    updateBingoCard,
    addBingoLine,
    addBingoBlackout,
    resetProgress,
    setFullProgress,
  };
}
