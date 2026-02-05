import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import type { Category } from '../../types/game';
import gameConfig from '../../data/config/game-config.json';
import moveActivities from '../../data/activities/move-your-body.json';
import brainActivities from '../../data/activities/use-your-brain.json';
import chillActivities from '../../data/activities/chill-out.json';

interface CategorySelectProps {
  onSelect: (category: Category) => void;
  onSurpriseMe: () => void;
}

const activityCounts: Record<Category, number> = {
  move: moveActivities.activities.length,
  brain: brainActivities.activities.length,
  chill: chillActivities.activities.length,
};

const categoryOrder: Category[] = ['move', 'brain', 'chill'];
const variantMap: Record<Category, 'move' | 'brain' | 'chill'> = {
  move: 'move',
  brain: 'brain',
  chill: 'chill',
};

export function CategorySelect({ onSelect, onSurpriseMe }: CategorySelectProps) {
  const categories = gameConfig.categories;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex-1 flex flex-col items-center justify-center gap-4"
    >
      <h2 className="text-2xl font-display font-bold text-center mb-2">
        Pick Your Power
      </h2>

      {categoryOrder.map((key, i) => {
        const cat = categories[key];
        return (
          <motion.div
            key={key}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="w-full"
          >
            <Button
              variant={variantMap[key]}
              size="lg"
              className="w-full flex items-center justify-between"
              onClick={() => onSelect(key)}
            >
              <span className="flex items-center gap-3">
                <span className="text-2xl">{cat.icon}</span>
                <span>{cat.label}</span>
              </span>
              <span className="text-sm opacity-70">{activityCounts[key]} activities</span>
            </Button>
          </motion.div>
        );
      })}

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="w-full mt-2"
      >
        <Button
          variant="ghost"
          size="lg"
          className="w-full"
          onClick={onSurpriseMe}
        >
          🎲 Surprise Me!
        </Button>
      </motion.div>
    </motion.div>
  );
}
