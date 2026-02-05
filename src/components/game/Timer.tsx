import { ProgressRing } from '../ui/ProgressRing';
import { motion } from 'framer-motion';

interface TimerProps {
  timeRemaining: number;
  totalTime: number;
  isUrgent: boolean;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}:${s.toString().padStart(2, '0')}` : `${s}`;
}

export function Timer({ timeRemaining, totalTime, isUrgent }: TimerProps) {
  const progress = totalTime > 0 ? timeRemaining / totalTime : 0;

  return (
    <motion.div
      animate={isUrgent ? { scale: [1, 1.05, 1] } : {}}
      transition={isUrgent ? { repeat: Infinity, duration: 0.5 } : {}}
    >
      <ProgressRing progress={progress} size={160} strokeWidth={8}>
        <span className={`text-4xl font-display font-bold ${isUrgent ? 'text-red-400' : 'text-white'}`}>
          {formatTime(timeRemaining)}
        </span>
      </ProgressRing>
    </motion.div>
  );
}
