import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { MunchieMonster } from '../game/MunchieMonster';
import { Button } from '../ui/Button';
import type { Difficulty } from '../../types/game';
import dialogueData from '../../data/dialogue/alien-dialogue.json';

interface ResultScreenProps {
  completed: boolean;
  difficulty: Difficulty;
  xpEarned: number;
  coinsEarned: number;
  onPlayAgain: () => void;
  onContinue: () => void;
}

export function ResultScreen({ completed, difficulty, xpEarned, coinsEarned, onPlayAgain, onContinue }: ResultScreenProps) {
  const message = useMemo(() => {
    const lines = completed ? dialogueData.victory : dialogueData.timeUp;
    return lines[Math.floor(Math.random() * lines.length)];
  }, [completed]);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex-1 flex flex-col items-center justify-center gap-6 text-center"
    >
      <MunchieMonster
        difficulty={difficulty}
        defeated={completed}
        escaped={!completed}
      />

      <h2 className={`text-3xl font-display font-bold ${completed ? 'text-cc-yellow' : 'text-cc-light-teal'}`}>
        {completed ? 'You Crushed It!' : 'Nice Try!'}
      </h2>

      <p className="font-body text-white/80 text-lg max-w-xs">
        {message}
      </p>

      {completed && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex gap-6"
        >
          <div className="text-center">
            <div className="text-2xl font-display font-bold text-cc-yellow">+{xpEarned}</div>
            <div className="text-xs font-body text-white/60">XP</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-display font-bold text-cc-orange">+{coinsEarned}</div>
            <div className="text-xs font-body text-white/60">Coins</div>
          </div>
        </motion.div>
      )}

      <div className="flex gap-3 mt-4">
        <Button variant="primary" onClick={onPlayAgain}>
          Play Again
        </Button>
        <Button variant="ghost" onClick={onContinue}>
          Continue
        </Button>
      </div>
    </motion.div>
  );
}
