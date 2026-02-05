import { motion } from 'framer-motion';
import { Button } from '../ui/Button';
import { GoogleSignIn } from '../auth/GoogleSignIn';
import dialogueData from '../../data/dialogue/alien-dialogue.json';
import { useMemo } from 'react';

interface WelcomeScreenProps {
  userName: string | null;
  isSignedIn: boolean;
  isGuest: boolean;
  onPlay: () => void;
  onPlayAsGuest: () => void;
}

export function WelcomeScreen({ userName, isSignedIn, isGuest, onPlay, onPlayAsGuest }: WelcomeScreenProps) {
  const welcomeLine = useMemo(() => {
    const lines = dialogueData.welcomeLines;
    return lines[Math.floor(Math.random() * lines.length)];
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="flex-1 flex flex-col items-center justify-center gap-6 text-center"
    >
      {/* Alien avatar */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
        className="w-20 h-20 rounded-full bg-gradient-to-br from-cc-teal to-cc-blue flex items-center justify-center text-5xl shadow-lg"
      >
        👾
      </motion.div>

      <h1 className="text-3xl font-display font-bold bg-gradient-to-r from-cc-teal to-cc-blue bg-clip-text text-transparent">
        Craving Crusher
      </h1>

      <p className="font-body text-white/80 text-lg max-w-xs">
        {welcomeLine}
      </p>

      {isSignedIn || isGuest ? (
        <div className="space-y-3">
          {userName && (
            <p className="font-body text-cc-light-teal text-sm">
              Hey {userName}!
            </p>
          )}
          <Button variant="primary" size="lg" onClick={onPlay}>
            Play!
          </Button>
        </div>
      ) : (
        <div className="space-y-4 flex flex-col items-center">
          <GoogleSignIn />
          <button
            onClick={onPlayAsGuest}
            className="text-white/60 hover:text-white/80 font-body text-sm underline underline-offset-2 min-h-[44px] flex items-center"
          >
            Play as Guest
          </button>
        </div>
      )}
    </motion.div>
  );
}
