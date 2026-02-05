import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';

interface XPSummaryProps {
  xpEarned: number;
  coinsEarned: number;
  newBadges: string[];
  totalXP: number;
  totalCoins: number;
  onContinue: () => void;
}

export function XPSummary({ xpEarned, coinsEarned, newBadges, totalXP, totalCoins, onContinue }: XPSummaryProps) {
  const [displayXP, setDisplayXP] = useState(0);
  const [displayCoins, setDisplayCoins] = useState(0);

  useEffect(() => {
    const steps = 30;
    let step = 0;
    const interval = setInterval(() => {
      step++;
      setDisplayXP(Math.round((step / steps) * xpEarned));
      setDisplayCoins(Math.round((step / steps) * coinsEarned));
      if (step >= steps) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [xpEarned, coinsEarned]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex-1 flex flex-col items-center justify-center gap-6 text-center"
    >
      <h2 className="text-2xl font-display font-bold">
        Rewards!
      </h2>

      <div className="flex gap-8">
        <div className="text-center">
          <div className="text-4xl font-display font-bold text-cc-yellow">+{displayXP}</div>
          <div className="text-sm font-body text-white/60">XP Earned</div>
          <div className="text-xs font-body text-white/40 mt-1">Total: {totalXP}</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-display font-bold text-cc-orange">+{displayCoins}</div>
          <div className="text-sm font-body text-white/60">Coins Earned</div>
          <div className="text-xs font-body text-white/40 mt-1">Total: {totalCoins}</div>
        </div>
      </div>

      {newBadges.length > 0 && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1, type: 'spring' }}
          className="space-y-2"
        >
          <div className="text-4xl">🏆</div>
          <p className="font-display font-bold text-lg text-cc-yellow">
            New Badge{newBadges.length > 1 ? 's' : ''} Unlocked!
          </p>
          <div className="flex gap-2 justify-center">
            {newBadges.map(id => (
              <span key={id} className="bg-white/10 rounded-full px-3 py-1 text-sm font-body">
                {id}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      <Button variant="primary" size="lg" onClick={onContinue}>
        Awesome!
      </Button>
    </motion.div>
  );
}
