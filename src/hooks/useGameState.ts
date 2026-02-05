import { useState, useCallback } from 'react';
import type { GameScreen, Difficulty, Category, Activity, GameState } from '../types/game';

const initialState: GameState = {
  screen: 'welcome',
  difficulty: null,
  category: null,
  activity: null,
  timeRemaining: 0,
  completed: false,
  surpriseMe: false,
};

export function useGameState() {
  const [state, setState] = useState<GameState>(initialState);

  const setScreen = useCallback((screen: GameScreen) => {
    setState(prev => ({ ...prev, screen }));
  }, []);

  const setDifficulty = useCallback((difficulty: Difficulty) => {
    setState(prev => ({ ...prev, difficulty }));
  }, []);

  const setCategory = useCallback((category: Category) => {
    setState(prev => ({ ...prev, category, surpriseMe: false }));
  }, []);

  const setActivity = useCallback((activity: Activity) => {
    setState(prev => ({ ...prev, activity }));
  }, []);

  const setTimeRemaining = useCallback((timeRemaining: number) => {
    setState(prev => ({ ...prev, timeRemaining }));
  }, []);

  const setCompleted = useCallback((completed: boolean) => {
    setState(prev => ({ ...prev, completed }));
  }, []);

  const setSurpriseMe = useCallback((surpriseMe: boolean) => {
    setState(prev => ({ ...prev, surpriseMe }));
  }, []);

  const resetGame = useCallback(() => {
    setState(initialState);
  }, []);

  return {
    ...state,
    setScreen,
    setDifficulty,
    setCategory,
    setActivity,
    setTimeRemaining,
    setCompleted,
    setSurpriseMe,
    resetGame,
  };
}
