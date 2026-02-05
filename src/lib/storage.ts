const PREFIX = 'cc_';

export const STORAGE_KEYS = {
  totalXP: `${PREFIX}total_xp`,
  totalCoins: `${PREFIX}total_coins`,
  challengesCompleted: `${PREFIX}challenges_completed`,
  bingoCard: `${PREFIX}bingo_card`,
  bingoWeekStart: `${PREFIX}bingo_week_start`,
  badges: `${PREFIX}badges`,
  categoryHistory: `${PREFIX}category_history`,
  lastPlayDate: `${PREFIX}last_play_date`,
  weekStreak: `${PREFIX}week_streak`,
  lastSyncTimestamp: `${PREFIX}last_sync`,
  soundEnabled: `${PREFIX}sound_enabled`,
  bossCompleted: `${PREFIX}boss_completed`,
  bingoLines: `${PREFIX}bingo_lines`,
  bingoBlackouts: `${PREFIX}bingo_blackouts`,
  dayStreak: `${PREFIX}day_streak`,
} as const;

export function getItem<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (raw === null) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function setItem<T>(key: string, value: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    // localStorage full or unavailable
  }
}

export function removeItem(key: string): void {
  try {
    localStorage.removeItem(key);
  } catch {
    // ignore
  }
}
