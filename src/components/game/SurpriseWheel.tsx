import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import wheelData from '../../data/spinner/surprise-me-wheel.json';
import type { Category } from '../../types/game';

interface SurpriseWheelProps {
  onResult: (activityId: string, category: Category) => void;
  onCancel: () => void;
}

const categoryColors: Record<string, string> = {
  move: '#2eae8f',
  brain: '#fa8a10',
  chill: '#7bcec6',
};

export function SurpriseWheel({ onResult, onCancel }: SurpriseWheelProps) {
  const [spinning, setSpinning] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [selectedSegment, setSelectedSegment] = useState<typeof wheelData.segments[0] | null>(null);

  const segments = wheelData.segments;
  const segmentAngle = 360 / segments.length;

  const spin = useCallback(() => {
    if (spinning) return;
    setSpinning(true);
    setSelectedSegment(null);

    const winnerIndex = Math.floor(Math.random() * segments.length);
    const extraSpins = 5 * 360;
    const targetAngle = extraSpins + (360 - winnerIndex * segmentAngle - segmentAngle / 2);

    setRotation(prev => prev + targetAngle);

    setTimeout(() => {
      setSpinning(false);
      setSelectedSegment(segments[winnerIndex]);
    }, 3000);
  }, [spinning, segments, segmentAngle]);

  return (
    <div className="flex flex-col items-center gap-6">
      <h2 className="text-2xl font-display font-bold text-cc-yellow">Surprise Me!</h2>

      {/* Wheel */}
      <div className="relative w-64 h-64">
        {/* Pointer */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 z-10 text-2xl">
          ▼
        </div>

        <motion.div
          className="w-full h-full rounded-full border-4 border-white/20 overflow-hidden relative"
          animate={{ rotate: rotation }}
          transition={{ duration: 3, ease: [0.2, 0.8, 0.3, 1] }}
        >
          <svg viewBox="0 0 200 200" className="w-full h-full">
            {segments.map((seg, i) => {
              const startAngle = (i * segmentAngle * Math.PI) / 180;
              const endAngle = ((i + 1) * segmentAngle * Math.PI) / 180;
              const x1 = 100 + 100 * Math.cos(startAngle);
              const y1 = 100 + 100 * Math.sin(startAngle);
              const x2 = 100 + 100 * Math.cos(endAngle);
              const y2 = 100 + 100 * Math.sin(endAngle);
              const largeArc = segmentAngle > 180 ? 1 : 0;

              return (
                <path
                  key={seg.id}
                  d={`M100,100 L${x1},${y1} A100,100 0 ${largeArc},1 ${x2},${y2} Z`}
                  fill={categoryColors[seg.category]}
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="0.5"
                />
              );
            })}
          </svg>

          {/* Center hub */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-14 h-14 rounded-full bg-cc-dark border-2 border-white/30 flex items-center justify-center text-2xl">
              👾
            </div>
          </div>
        </motion.div>
      </div>

      {/* Result or Spin button */}
      {selectedSegment ? (
        <div className="text-center space-y-3">
          <p className="font-display text-lg text-white">
            {selectedSegment.label}
          </p>
          <div className="flex gap-3">
            <Button variant="primary" onClick={() => onResult(selectedSegment.activityId, selectedSegment.category as Category)}>
              Let's Go!
            </Button>
            <Button variant="ghost" onClick={spin}>
              Spin Again
            </Button>
          </div>
        </div>
      ) : (
        <div className="flex gap-3">
          <Button variant="primary" size="lg" onClick={spin} disabled={spinning}>
            {spinning ? 'Spinning...' : 'Spin!'}
          </Button>
          <Button variant="ghost" onClick={onCancel}>
            Back
          </Button>
        </div>
      )}
    </div>
  );
}
