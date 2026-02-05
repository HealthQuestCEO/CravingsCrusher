import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { Modal } from '../ui/Modal';
import { useAuth } from '../../hooks/useAuth';
import { getItem, STORAGE_KEYS } from '../../lib/storage';

interface SettingsScreenProps {
  onBack: () => void;
  onToggleSound: () => boolean;
  onResetProgress: () => void;
}

export function SettingsScreen({ onBack, onToggleSound, onResetProgress }: SettingsScreenProps) {
  const { user, signInWithGoogle, signOut, isGuest } = useAuth();
  const [soundEnabled, setSoundEnabled] = useState(() => getItem<boolean>(STORAGE_KEYS.soundEnabled, true));
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const handleToggleSound = useCallback(() => {
    const newValue = onToggleSound();
    setSoundEnabled(newValue);
  }, [onToggleSound]);

  const handleReset = useCallback(() => {
    onResetProgress();
    setShowResetConfirm(false);
  }, [onResetProgress]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex-1 flex flex-col gap-4"
    >
      <h2 className="text-2xl font-display font-bold text-center">Settings</h2>

      {/* Sound */}
      <div className="bg-white/8 rounded-2xl p-4 flex items-center justify-between">
        <div>
          <h3 className="font-display font-semibold">Sound Effects</h3>
          <p className="text-sm font-body text-white/60">
            {soundEnabled ? 'On' : 'Off'}
          </p>
        </div>
        <button
          onClick={handleToggleSound}
          className={`w-14 h-8 rounded-full transition-colors flex items-center px-1 min-h-[44px] ${
            soundEnabled ? 'bg-cc-teal' : 'bg-white/20'
          }`}
          aria-label={`Sound ${soundEnabled ? 'on' : 'off'}`}
        >
          <div className={`w-6 h-6 rounded-full bg-white transition-transform ${soundEnabled ? 'translate-x-6' : ''}`} />
        </button>
      </div>

      {/* Account */}
      <div className="bg-white/8 rounded-2xl p-4">
        <h3 className="font-display font-semibold mb-2">Account</h3>
        {user ? (
          <div className="space-y-3">
            <p className="text-sm font-body text-white/70">
              Signed in as {user.displayName || user.email}
            </p>
            <Button variant="ghost" size="sm" onClick={signOut}>
              Sign Out
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm font-body text-white/70">
              {isGuest ? 'Playing as guest. Sign in to save across devices.' : 'Not signed in.'}
            </p>
            <Button variant="primary" size="sm" onClick={signInWithGoogle}>
              Sign in with Google
            </Button>
          </div>
        )}
      </div>

      {/* Reset */}
      <div className="bg-white/8 rounded-2xl p-4">
        <h3 className="font-display font-semibold mb-2">Data</h3>
        <Button variant="danger" size="sm" onClick={() => setShowResetConfirm(true)}>
          Reset All Progress
        </Button>
      </div>

      <Button variant="ghost" onClick={onBack} className="mt-auto">
        Back
      </Button>

      <Modal open={showResetConfirm} onClose={() => setShowResetConfirm(false)}>
        <div className="text-center space-y-4">
          <h3 className="font-display font-bold text-lg">Reset Progress?</h3>
          <p className="font-body text-white/70 text-sm">
            This will erase all your XP, coins, badges, and bingo progress. This can't be undone.
          </p>
          <div className="flex gap-3 justify-center">
            <Button variant="danger" onClick={handleReset}>
              Yes, Reset
            </Button>
            <Button variant="ghost" onClick={() => setShowResetConfirm(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}
