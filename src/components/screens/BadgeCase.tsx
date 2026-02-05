import { motion } from 'framer-motion';
import { Badge as BadgeComponent } from '../ui/Badge';
import { Button } from '../ui/Button';
import badgeData from '../../data/rewards/xp-badges.json';

interface BadgeCaseProps {
  earnedBadges: string[];
  onBack: () => void;
}

export function BadgeCase({ earnedBadges, onBack }: BadgeCaseProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex-1 flex flex-col items-center gap-4"
    >
      <h2 className="text-2xl font-display font-bold">Badge Case</h2>
      <p className="font-body text-white/60 text-sm">
        {earnedBadges.length}/{badgeData.badges.length} badges earned
      </p>

      <div className="grid grid-cols-3 gap-2 w-full max-w-sm">
        {badgeData.badges.map((badge, i) => {
          const earned = earnedBadges.includes(badge.id);
          return (
            <motion.div
              key={badge.id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <BadgeComponent
                emoji={badge.emoji}
                name={badge.name}
                locked={!earned}
                description={badge.description}
              />
            </motion.div>
          );
        })}
      </div>

      <Button variant="ghost" onClick={onBack}>
        Back
      </Button>
    </motion.div>
  );
}
