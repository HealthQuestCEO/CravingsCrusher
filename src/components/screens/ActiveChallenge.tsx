import { useState, useEffect, useCallback, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Timer } from '../game/Timer';
import { ActivityCard } from '../game/ActivityCard';
import { EncouragementToast } from '../game/EncouragementToast';
import { SciencePop } from '../game/SciencePop';
import { Button } from '../ui/Button';
import { useTimer } from '../../hooks/useTimer';
import type { Activity, ScienceFact } from '../../types/game';
import dialogueData from '../../data/dialogue/alien-dialogue.json';
import scienceData from '../../data/science/evidence-based-education.json';

interface ActiveChallengeProps {
  activity: Activity;
  duration: number;
  onComplete: (completed: boolean) => void;
}

export function ActiveChallenge({ activity, duration, onComplete }: ActiveChallengeProps) {
  const [encouragementMsg, setEncouragementMsg] = useState<string | null>(null);
  const [scienceFact, setScienceFact] = useState<ScienceFact | null>(null);
  const [showScience, setShowScience] = useState(false);
  const [isUrgent, setIsUrgent] = useState(false);

  const randomFact = useMemo(() => {
    const relevant = scienceData.facts.filter(
      f => f.category === activity.category || f.category === 'general'
    );
    return relevant[Math.floor(Math.random() * relevant.length)];
  }, [activity.category]);

  const timer = useTimer({
    onHalf: () => {
      setScienceFact(randomFact);
      setShowScience(true);
    },
    onUrgent: () => {
      setIsUrgent(true);
    },
    onComplete: () => {
      onComplete(false);
    },
  });

  useEffect(() => {
    timer.start(duration);
  }, [duration]); // eslint-disable-line react-hooks/exhaustive-deps

  // Rotate encouragement messages every 15s
  useEffect(() => {
    const lines = dialogueData.encouragement;
    let idx = 0;

    const show = () => {
      setEncouragementMsg(lines[idx % lines.length]);
      idx++;
      setTimeout(() => setEncouragementMsg(null), 3000);
    };

    const interval = setInterval(show, 15000);
    // Show first one after 5s
    const initial = setTimeout(show, 5000);

    return () => {
      clearInterval(interval);
      clearTimeout(initial);
    };
  }, []);

  const handleDidIt = useCallback(() => {
    timer.stop();
    onComplete(true);
  }, [timer, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex-1 flex flex-col items-center justify-between gap-4 py-4"
    >
      <Timer
        timeRemaining={timer.timeRemaining}
        totalTime={timer.totalTime}
        isUrgent={isUrgent}
      />

      <ActivityCard activity={activity} />

      <EncouragementToast message={encouragementMsg} />

      <Button variant="primary" size="lg" className="w-full" onClick={handleDidIt}>
        I Did It!
      </Button>

      <SciencePop
        fact={scienceFact}
        open={showScience}
        onClose={() => setShowScience(false)}
      />
    </motion.div>
  );
}
