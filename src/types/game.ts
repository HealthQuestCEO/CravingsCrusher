export type Difficulty = 'quick' | 'standard' | 'boss';

export type Category = 'move' | 'brain' | 'chill';

export type GameScreen =
  | 'welcome'
  | 'difficulty'
  | 'category'
  | 'monsterIntro'
  | 'countdown'
  | 'challenge'
  | 'result'
  | 'bingoUpdate'
  | 'xpSummary'
  | 'bingo'
  | 'badges'
  | 'settings';

export interface Activity {
  id: string;
  name: string;
  instructions: string;
  category: Category;
  icon: string;
  bingoSquareId: number;
}

export interface GameState {
  screen: GameScreen;
  difficulty: Difficulty | null;
  category: Category | null;
  activity: Activity | null;
  timeRemaining: number;
  completed: boolean;
  surpriseMe: boolean;
}

export interface DifficultyConfig {
  label: string;
  icon: string;
  duration: number;
  xp: number;
  coins: number;
  unlockAfter?: number;
}

export interface CategoryConfig {
  label: string;
  icon: string;
  color: string;
}

export interface ScienceFact {
  id: string;
  title: string;
  text: string;
  category: string;
}

export interface WheelSegment {
  id: number;
  activityId: string;
  label: string;
  category: Category;
}
