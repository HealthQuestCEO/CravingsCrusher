import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { MunchieMonster } from '../game/MunchieMonster';
import type { Difficulty } from '../../types/game';
import dialogueData from '../../data/dialogue/alien-dialogue.json';

interface MonsterIntroProps {
  difficulty: Difficulty;
  onReady: () => void;
}

export function MonsterIntro({ difficulty, onReady }: MonsterIntroProps) {
  const dialogue = dialogueData.monsterIntro[difficulty];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex-1 flex flex-col items-center justify-center gap-6 text-center"
    >
      <MunchieMonster difficulty={difficulty} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="space-y-4"
      >
        <h2 className="text-2xl font-display font-bold text-cc-yellow">
          Munchie Monster!
        </h2>
        <p className="font-body text-white/80 text-lg max-w-xs">
          {dialogue}
        </p>
        <Button variant="primary" size="lg" onClick={onReady}>
          I'm Ready!
        </Button>
      </motion.div>
    </motion.div>
  );
}
