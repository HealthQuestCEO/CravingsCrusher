import { useState, useCallback, useEffect } from 'react';
import { getItem, setItem, STORAGE_KEYS } from '../lib/storage';
import bingoConfig from '../data/bingo/bingo-card-config.json';

interface BingoState {
  stamped: boolean[];
  weekStart: string;
}

function getMonday(): string {
  const now = new Date();
  const day = now.getDay();
  const diff = now.getDate() - day + (day === 0 ? -6 : 1);
  const monday = new Date(now.setDate(diff));
  return monday.toISOString().split('T')[0];
}

function loadBingo(): BingoState {
  const currentMonday = getMonday();
  const savedWeekStart = getItem<string | null>(STORAGE_KEYS.bingoWeekStart, null);

  if (savedWeekStart !== currentMonday) {
    // Reset for new week
    const fresh = { stamped: new Array(16).fill(false), weekStart: currentMonday };
    setItem(STORAGE_KEYS.bingoCard, fresh.stamped);
    setItem(STORAGE_KEYS.bingoWeekStart, fresh.weekStart);
    return fresh;
  }

  return {
    stamped: getItem<boolean[]>(STORAGE_KEYS.bingoCard, new Array(16).fill(false)),
    weekStart: currentMonday,
  };
}

const LINES = [
  // Rows
  [0, 1, 2, 3],
  [4, 5, 6, 7],
  [8, 9, 10, 11],
  [12, 13, 14, 15],
  // Columns
  [0, 4, 8, 12],
  [1, 5, 9, 13],
  [2, 6, 10, 14],
  [3, 7, 11, 15],
  // Diagonals
  [0, 5, 10, 15],
  [3, 6, 9, 12],
];

export function useBingo() {
  const [bingo, setBingo] = useState<BingoState>(loadBingo);

  useEffect(() => {
    setItem(STORAGE_KEYS.bingoCard, bingo.stamped);
    setItem(STORAGE_KEYS.bingoWeekStart, bingo.weekStart);
  }, [bingo]);

  const stampSquare = useCallback((index: number) => {
    setBingo(prev => {
      if (index < 0 || index >= 16 || prev.stamped[index]) return prev;
      const newStamped = [...prev.stamped];
      newStamped[index] = true;
      return { ...prev, stamped: newStamped };
    });
  }, []);

  const checkLines = useCallback((): { newLines: number[][]; isBlackout: boolean } => {
    const completedLines = LINES.filter(line => line.every(i => bingo.stamped[i]));
    const isBlackout = bingo.stamped.every(Boolean);
    return { newLines: completedLines, isBlackout };
  }, [bingo.stamped]);

  const getSquares = useCallback(() => {
    return bingoConfig.squares.map((sq, i) => ({
      ...sq,
      stamped: bingo.stamped[i] || false,
    }));
  }, [bingo.stamped]);

  const stampedCount = bingo.stamped.filter(Boolean).length;

  const resetCard = useCallback(() => {
    const currentMonday = getMonday();
    setBingo({ stamped: new Array(16).fill(false), weekStart: currentMonday });
  }, []);

  return {
    stamped: bingo.stamped,
    stampSquare,
    checkLines,
    getSquares,
    stampedCount,
    resetCard,
  };
}
