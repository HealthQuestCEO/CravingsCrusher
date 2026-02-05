import { motion } from 'framer-motion';
import type { Difficulty } from '../../types/game';

interface MunchieMonsterProps {
  difficulty: Difficulty;
  defeated?: boolean;
  escaped?: boolean;
}

const sizeMap: Record<Difficulty, string> = {
  quick: 'text-6xl',
  standard: 'text-7xl',
  boss: 'text-8xl',
};

export function MunchieMonster({ difficulty, defeated = false, escaped = false }: MunchieMonsterProps) {
  if (defeated) {
    return (
      <motion.div
        initial={{ scale: 1, rotate: 0, opacity: 1 }}
        animate={{ scale: 0, rotate: 720, opacity: 0 }}
        transition={{ duration: 0.8, ease: 'easeIn' }}
        className={`${sizeMap[difficulty]} select-none`}
      >
        👾
      </motion.div>
    );
  }

  if (escaped) {
    return (
      <motion.div
        animate={{ scale: [1, 1.2, 1.2], x: [-5, 5, -5, 5, 0] }}
        transition={{ duration: 0.6 }}
        className={`${sizeMap[difficulty]} select-none`}
      >
        👾
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ y: 200, scale: 0.5, opacity: 0 }}
      animate={{ y: 0, scale: [0.5, 1.2, 1], opacity: 1 }}
      transition={{ type: 'spring', damping: 10, stiffness: 100 }}
      className={`${sizeMap[difficulty]} select-none`}
    >
      👾
    </motion.div>
  );
}
