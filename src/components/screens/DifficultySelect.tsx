import { motion } from 'framer-motion';
import { Card } from '../ui/Card';
import type { Difficulty } from '../../types/game';
import gameConfig from '../../data/config/game-config.json';

interface DifficultySelectProps {
  onSelect: (difficulty: Difficulty) => void;
  challengesCompleted: number;
}

const difficultyOrder: Difficulty[] = ['quick', 'standard', 'boss'];

export function DifficultySelect({ onSelect, challengesCompleted }: DifficultySelectProps) {
  const difficulties = gameConfig.difficulties;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex-1 flex flex-col items-center justify-center gap-4"
    >
      <h2 className="text-2xl font-display font-bold text-center mb-2">
        Choose Your Challenge
      </h2>

      {difficultyOrder.map((key, i) => {
        const diff = difficulties[key as keyof typeof difficulties] as any;
        const locked = key === 'boss' && challengesCompleted < (diff.unlockAfter || 3);

        return (
          <motion.div
            key={key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="w-full"
          >
            <Card
              interactive={!locked}
              className={`w-full ${locked ? 'opacity-50' : ''}`}
              onClick={() => !locked && onSelect(key)}
            >
              <div className="flex items-center gap-4">
                <span className="text-3xl">{diff.icon}</span>
                <div className="flex-1">
                  <h3 className="font-display font-bold text-lg">{diff.label}</h3>
                  <p className="text-sm font-body text-white/60">
                    {diff.duration}s — {diff.xp} XP, {diff.coins} coins
                  </p>
                </div>
                {locked && (
                  <div className="text-right">
                    <span className="text-lg">🔒</span>
                    <p className="text-xs font-body text-white/40">
                      Complete {diff.unlockAfter} first
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        );
      })}
    </motion.div>
  );
}
