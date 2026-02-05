import type { GameScreen } from '../../types/game';

interface TopBarProps {
  totalXP: number;
  totalCoins: number;
  onNavigate: (screen: GameScreen) => void;
  currentScreen: GameScreen;
}

export function TopBar({ totalXP, totalCoins, onNavigate, currentScreen }: TopBarProps) {
  const isGameActive = ['countdown', 'challenge', 'monsterIntro'].includes(currentScreen);

  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-cc-dark/80 backdrop-blur-md border-b border-white/10">
      <div className="flex items-center justify-between px-4 py-2 max-w-lg mx-auto">
        {/* Stats pills */}
        <div className="flex gap-2">
          <div className="flex items-center gap-1 bg-white/10 rounded-full px-3 py-1 text-sm font-body">
            <span aria-hidden="true">⭐</span>
            <span className="font-semibold">{totalXP.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1 bg-white/10 rounded-full px-3 py-1 text-sm font-body">
            <span aria-hidden="true">🪙</span>
            <span className="font-semibold">{totalCoins.toLocaleString()}</span>
          </div>
        </div>

        {/* Nav buttons */}
        {!isGameActive && (
          <div className="flex gap-1">
            <button
              onClick={() => onNavigate('bingo')}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Bingo Board"
            >
              📊
            </button>
            <button
              onClick={() => onNavigate('badges')}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Badge Case"
            >
              🏆
            </button>
            <button
              onClick={() => onNavigate('settings')}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Settings"
            >
              ⚙️
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
