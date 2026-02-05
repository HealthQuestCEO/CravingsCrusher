export interface PlayerProgress {
  totalXP: number;
  totalCoins: number;
  challengesCompleted: number;
  badges: string[];
  categoryHistory: {
    move: number;
    brain: number;
    chill: number;
  };
  bingoCard: boolean[];
  bingoWeekStart: string | null;
  weekStreak: number;
  lastPlayDate: string | null;
  bossCompleted: number;
  bingoLines: number;
  bingoBlackouts: number;
  dayStreak: number;
}

export interface Badge {
  id: string;
  name: string;
  emoji: string;
  description: string;
  requirement: BadgeRequirement;
}

export type BadgeRequirement =
  | { type: 'challengesCompleted'; value: number }
  | { type: 'categoryCount'; category: string; value: number }
  | { type: 'bingoLine'; value: number }
  | { type: 'bingoBlackout'; value: number }
  | { type: 'bossCompleted'; value: number }
  | { type: 'dayStreak'; value: number }
  | { type: 'allBadges'; value: number };

export interface BingoSquare {
  id: number;
  label: string;
  category: string;
  stamped: boolean;
}

export interface BingoCard {
  squares: BingoSquare[];
  weekStart: string;
  completedLines: number;
  isBlackout: boolean;
}

export const DEFAULT_PROGRESS: PlayerProgress = {
  totalXP: 0,
  totalCoins: 0,
  challengesCompleted: 0,
  badges: [],
  categoryHistory: { move: 0, brain: 0, chill: 0 },
  bingoCard: new Array(16).fill(false),
  bingoWeekStart: null,
  weekStreak: 0,
  lastPlayDate: null,
  bossCompleted: 0,
  bingoLines: 0,
  bingoBlackouts: 0,
  dayStreak: 0,
};
