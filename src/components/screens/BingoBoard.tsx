import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

interface BingoSquareData {
  id: number;
  label: string;
  category: string;
  stamped: boolean;
}

interface BingoBoardProps {
  squares: BingoSquareData[];
  stampedCount: number;
  onBack: () => void;
}

const categoryColors: Record<string, string> = {
  move: '#2eae8f',
  brain: '#fa8a10',
  chill: '#7bcec6',
};

export function BingoBoard({ squares, stampedCount, onBack }: BingoBoardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex-1 flex flex-col items-center gap-4"
    >
      <h2 className="text-2xl font-display font-bold">
        Boost Builder Bingo
      </h2>
      <p className="font-body text-white/60 text-sm">
        {stampedCount}/16 squares this week
      </p>

      <div className="grid grid-cols-4 gap-2 w-full max-w-sm">
        {squares.map((sq, i) => (
          <motion.div
            key={sq.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.03 }}
            className={`
              aspect-square rounded-xl flex items-center justify-center p-1 text-center
              border-2 transition-all
              ${sq.stamped
                ? 'bg-white/20 border-white/30'
                : 'bg-white/5 border-white/10'
              }
            `}
            style={sq.stamped ? { borderColor: categoryColors[sq.category], backgroundColor: `${categoryColors[sq.category]}33` } : undefined}
          >
            {sq.stamped ? (
              <span className="text-2xl">✅</span>
            ) : (
              <span className="text-[10px] font-body text-white/60 leading-tight">
                {sq.label}
              </span>
            )}
          </motion.div>
        ))}
      </div>

      <Button variant="ghost" onClick={onBack}>
        Back
      </Button>
    </motion.div>
  );
}
