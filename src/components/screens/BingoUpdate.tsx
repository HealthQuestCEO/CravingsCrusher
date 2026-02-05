import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

interface BingoUpdateProps {
  squareLabel: string;
  newLines: number;
  isBlackout: boolean;
  onContinue: () => void;
}

export function BingoUpdate({ squareLabel, newLines, isBlackout, onContinue }: BingoUpdateProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex-1 flex flex-col items-center justify-center gap-6 text-center"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: [0, 1.3, 1] }}
        transition={{ duration: 0.5 }}
        className="text-6xl"
      >
        📋
      </motion.div>

      <h2 className="text-2xl font-display font-bold text-cc-yellow">
        Bingo Stamp!
      </h2>

      <p className="font-body text-white/80 text-lg max-w-xs">
        You stamped: <span className="text-cc-light-teal font-semibold">{squareLabel}</span>
      </p>

      {isBlackout && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="space-y-2"
        >
          <div className="text-5xl">🎉</div>
          <p className="font-display font-bold text-xl text-cc-yellow">BLACKOUT!</p>
          <p className="font-body text-white/70">You filled the whole board!</p>
        </motion.div>
      )}

      {newLines > 0 && !isBlackout && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.5, type: 'spring' }}
          className="space-y-2"
        >
          <div className="text-5xl">🎊</div>
          <p className="font-display font-bold text-xl text-cc-yellow">BINGO!</p>
          <p className="font-body text-white/70">You completed a line!</p>
        </motion.div>
      )}

      <Button variant="primary" onClick={onContinue}>
        Continue
      </Button>
    </motion.div>
  );
}
