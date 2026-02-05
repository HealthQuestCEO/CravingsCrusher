import { useCallback, useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { AuthProvider } from './components/auth/AuthProvider';
import { AppShell } from './components/layout/AppShell';
import { WelcomeScreen } from './components/screens/WelcomeScreen';
import { DifficultySelect } from './components/screens/DifficultySelect';
import { CategorySelect } from './components/screens/CategorySelect';
import { MonsterIntro } from './components/screens/MonsterIntro';
import { CountdownScreen } from './components/screens/CountdownScreen';
import { ActiveChallenge } from './components/screens/ActiveChallenge';
import { ResultScreen } from './components/screens/ResultScreen';
import { BingoUpdate } from './components/screens/BingoUpdate';
import { XPSummary } from './components/screens/XPSummary';
import { BingoBoard } from './components/screens/BingoBoard';
import { BadgeCase } from './components/screens/BadgeCase';
import { SettingsScreen } from './components/screens/SettingsScreen';
import { SurpriseWheel } from './components/game/SurpriseWheel';
import { useGameState } from './hooks/useGameState';
import { useProgress } from './hooks/useProgress';
import { useBingo } from './hooks/useBingo';
import { useSound } from './hooks/useSound';
import { useSync } from './hooks/useSync';
import { useAuth } from './hooks/useAuth';
import { trackEvent } from './lib/analytics';
import type { Category, Difficulty, Activity, GameScreen } from './types/game';
import gameConfig from './data/config/game-config.json';
import moveData from './data/activities/move-your-body.json';
import brainData from './data/activities/use-your-brain.json';
import chillData from './data/activities/chill-out.json';
import bingoCardConfig from './data/bingo/bingo-card-config.json';

const allActivities: Record<Category, Activity[]> = {
  move: moveData.activities as Activity[],
  brain: brainData.activities as Activity[],
  chill: chillData.activities as Activity[],
};

function GameInner() {
  const game = useGameState();
  const progress = useProgress();
  const bingo = useBingo();
  const sound = useSound();
  const sync = useSync();
  const auth = useAuth();

  const [xpEarned, setXpEarned] = useState(0);
  const [coinsEarned, setCoinsEarned] = useState(0);
  const [newBadges, setNewBadges] = useState<string[]>([]);
  const [bingoSquareLabel, setBingoSquareLabel] = useState('');
  const [newBingoLines, setNewBingoLines] = useState(0);
  const [isBingoBlackout, setIsBingoBlackout] = useState(false);
  const [previousScreen, setPreviousScreen] = useState<GameScreen>('welcome');
  const [isGuestMode, setIsGuestMode] = useState(false);
  const [showWheel, setShowWheel] = useState(false);

  // Sync on auth change
  useEffect(() => {
    if (auth.user) {
      sync.mergeAndSync(progress.progress).then(merged => {
        if (merged) {
          progress.setFullProgress(merged);
        }
      });
    }
  }, [auth.user]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleNavigate = useCallback((screen: GameScreen) => {
    setPreviousScreen(game.screen);
    game.setScreen(screen);
  }, [game]);

  const handlePlay = useCallback(() => {
    game.setScreen('difficulty');
    sound.play('buttonClick');
  }, [game, sound]);

  const handlePlayAsGuest = useCallback(() => {
    setIsGuestMode(true);
    trackEvent({ event: 'auth_guest_play' });
  }, []);

  const handleDifficultySelect = useCallback((difficulty: Difficulty) => {
    game.setDifficulty(difficulty);
    game.setScreen('category');
    sound.play('buttonClick');
  }, [game, sound]);

  const handleCategorySelect = useCallback((category: Category) => {
    game.setCategory(category);
    // Pick a random activity
    const activities = allActivities[category];
    const activity = activities[Math.floor(Math.random() * activities.length)];
    game.setActivity(activity);
    game.setScreen('monsterIntro');
    sound.play('buttonClick');

    trackEvent({
      event: 'game_start',
      difficulty: game.difficulty!,
      category,
      surpriseMe: false,
    });
  }, [game, sound]);

  const handleSurpriseMe = useCallback(() => {
    setShowWheel(true);
    game.setSurpriseMe(true);
  }, [game]);

  const handleWheelResult = useCallback((activityId: string, category: Category) => {
    setShowWheel(false);
    game.setCategory(category);
    const activities = allActivities[category];
    const activity = activities.find(a => a.id === activityId) || activities[0];
    game.setActivity(activity);
    game.setScreen('monsterIntro');

    trackEvent({
      event: 'surprise_spin',
      activityId,
    });
    trackEvent({
      event: 'game_start',
      difficulty: game.difficulty!,
      category,
      surpriseMe: true,
    });
  }, [game]);

  const handleMonsterReady = useCallback(() => {
    game.setScreen('countdown');
    sound.play('monsterAppear');
  }, [game, sound]);

  const handleCountdownComplete = useCallback(() => {
    game.setScreen('challenge');
  }, [game]);

  const handleChallengeComplete = useCallback((completed: boolean) => {
    game.setCompleted(completed);

    const diff = gameConfig.difficulties[game.difficulty! as keyof typeof gameConfig.difficulties] as any;
    const earnedXP = completed ? diff.xp : Math.round(diff.xp * 0.25);
    const earnedCoins = completed ? diff.coins : 0;

    setXpEarned(earnedXP);
    setCoinsEarned(earnedCoins);

    progress.addXP(earnedXP);
    progress.addCoins(earnedCoins);

    if (completed) {
      progress.incrementChallenges(game.category!, game.difficulty!);
      sound.play('victory');
    } else {
      sound.play('gentleBuzz');
    }

    trackEvent({
      event: 'game_complete',
      duration: diff.duration,
      completed,
      xp: earnedXP,
      coins: earnedCoins,
    });

    game.setScreen('result');
  }, [game, progress, sound]);

  const handleResultPlayAgain = useCallback(() => {
    game.setScreen('difficulty');
  }, [game]);

  const handleResultContinue = useCallback(() => {
    if (game.completed && game.activity) {
      // Stamp bingo square
      const squareIdx = (game.activity.bingoSquareId - 1) % 16;
      if (!bingo.stamped[squareIdx]) {
        bingo.stampSquare(squareIdx);
        progress.updateBingoCard(squareIdx);

        const square = bingoCardConfig.squares[squareIdx];
        setBingoSquareLabel(square?.label || 'Activity');
        sound.play('bingoStamp');

        // Check for new lines
        const { newLines, isBlackout } = bingo.checkLines();
        const prevLines = newBingoLines;
        if (newLines.length > prevLines) {
          setNewBingoLines(newLines.length);
          progress.addBingoLine();
          if (isBlackout) {
            progress.addBingoBlackout();
            setIsBingoBlackout(true);
          }
        } else {
          setNewBingoLines(0);
          setIsBingoBlackout(false);
        }

        game.setScreen('bingoUpdate');
        return;
      }
    }

    // Skip to XP summary
    handleXPContinue();
  }, [game, bingo, progress, sound]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleBingoContinue = useCallback(() => {
    handleXPContinue();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleXPContinue = useCallback(() => {
    // Check badges
    const eligible = progress.checkBadgeEligibility();
    const newlyEarned: string[] = [];
    for (const badgeId of eligible) {
      progress.unlockBadge(badgeId);
      newlyEarned.push(badgeId);
      sound.play('badgeUnlock');
      trackEvent({ event: 'badge_unlock', badgeId });
    }
    setNewBadges(newlyEarned);
    game.setScreen('xpSummary');

    // Sync to server
    if (auth.user) {
      sync.saveToServer(progress.progress);
    }
  }, [progress, game, sound, auth.user, sync]);

  const handleXPSummaryContinue = useCallback(() => {
    game.resetGame();
  }, [game]);

  const handleBack = useCallback(() => {
    game.setScreen(previousScreen === 'welcome' ? 'welcome' : previousScreen);
  }, [game, previousScreen]);

  const getDuration = useCallback((): number => {
    if (!game.difficulty) return 90;
    const diff = gameConfig.difficulties[game.difficulty as keyof typeof gameConfig.difficulties] as any;
    return diff.duration;
  }, [game.difficulty]);

  const renderScreen = () => {
    if (showWheel && game.screen === 'category') {
      return (
        <SurpriseWheel
          onResult={handleWheelResult}
          onCancel={() => setShowWheel(false)}
        />
      );
    }

    switch (game.screen) {
      case 'welcome':
        return (
          <WelcomeScreen
            userName={auth.user?.displayName || null}
            isSignedIn={!!auth.user}
            isGuest={isGuestMode}
            onPlay={handlePlay}
            onPlayAsGuest={handlePlayAsGuest}
          />
        );
      case 'difficulty':
        return (
          <DifficultySelect
            onSelect={handleDifficultySelect}
            challengesCompleted={progress.progress.challengesCompleted}
          />
        );
      case 'category':
        return (
          <CategorySelect
            onSelect={handleCategorySelect}
            onSurpriseMe={handleSurpriseMe}
          />
        );
      case 'monsterIntro':
        return (
          <MonsterIntro
            difficulty={game.difficulty!}
            onReady={handleMonsterReady}
          />
        );
      case 'countdown':
        return <CountdownScreen onComplete={handleCountdownComplete} />;
      case 'challenge':
        return (
          <ActiveChallenge
            activity={game.activity!}
            duration={getDuration()}
            onComplete={handleChallengeComplete}
          />
        );
      case 'result':
        return (
          <ResultScreen
            completed={game.completed}
            difficulty={game.difficulty!}
            xpEarned={xpEarned}
            coinsEarned={coinsEarned}
            onPlayAgain={handleResultPlayAgain}
            onContinue={handleResultContinue}
          />
        );
      case 'bingoUpdate':
        return (
          <BingoUpdate
            squareLabel={bingoSquareLabel}
            newLines={newBingoLines}
            isBlackout={isBingoBlackout}
            onContinue={handleBingoContinue}
          />
        );
      case 'xpSummary':
        return (
          <XPSummary
            xpEarned={xpEarned}
            coinsEarned={coinsEarned}
            newBadges={newBadges}
            totalXP={progress.progress.totalXP}
            totalCoins={progress.progress.totalCoins}
            onContinue={handleXPSummaryContinue}
          />
        );
      case 'bingo':
        return (
          <BingoBoard
            squares={bingo.getSquares()}
            stampedCount={bingo.stampedCount}
            onBack={handleBack}
          />
        );
      case 'badges':
        return (
          <BadgeCase
            earnedBadges={progress.progress.badges}
            onBack={handleBack}
          />
        );
      case 'settings':
        return (
          <SettingsScreen
            onBack={handleBack}
            onToggleSound={sound.toggleMute}
            onResetProgress={progress.resetProgress}
          />
        );
      default:
        return null;
    }
  };

  return (
    <AppShell
      totalXP={progress.progress.totalXP}
      totalCoins={progress.progress.totalCoins}
      onNavigate={handleNavigate}
      currentScreen={game.screen}
    >
      <AnimatePresence mode="wait">
        {renderScreen()}
      </AnimatePresence>
    </AppShell>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <GameInner />
    </AuthProvider>
  );
}
