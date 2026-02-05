import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import type { ScienceFact } from '../../types/game';

interface SciencePopProps {
  fact: ScienceFact | null;
  open: boolean;
  onClose: () => void;
}

export function SciencePop({ fact, open, onClose }: SciencePopProps) {
  if (!fact) return null;

  return (
    <Modal open={open} onClose={onClose}>
      <div className="text-center">
        <div className="text-4xl mb-3">🧪</div>
        <h3 className="text-lg font-display font-bold text-cc-yellow mb-2">
          {fact.title}
        </h3>
        <p className="font-body text-white/80 mb-4 leading-relaxed">
          {fact.text}
        </p>
        <Button variant="primary" size="sm" onClick={onClose}>
          Cool!
        </Button>
      </div>
    </Modal>
  );
}
