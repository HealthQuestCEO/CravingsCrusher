import { type ReactNode } from 'react';
import { StarField } from './StarField';
import { TopBar } from './TopBar';
import type { GameScreen } from '../../types/game';

interface AppShellProps {
  children: ReactNode;
  totalXP: number;
  totalCoins: number;
  onNavigate: (screen: GameScreen) => void;
  currentScreen: GameScreen;
}

export function AppShell({ children, totalXP, totalCoins, onNavigate, currentScreen }: AppShellProps) {
  return (
    <div className="min-h-screen bg-cc-dark text-white relative overflow-hidden">
      <StarField />
      <TopBar
        totalXP={totalXP}
        totalCoins={totalCoins}
        onNavigate={onNavigate}
        currentScreen={currentScreen}
      />
      <main className="relative z-10 pt-14 pb-8 px-4 min-h-screen flex flex-col max-w-lg mx-auto">
        {children}
      </main>
    </div>
  );
}
