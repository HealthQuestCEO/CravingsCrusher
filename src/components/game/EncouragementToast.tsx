import { motion, AnimatePresence } from 'framer-motion';

interface EncouragementToastProps {
  message: string | null;
}

export function EncouragementToast({ message }: EncouragementToastProps) {
  return (
    <AnimatePresence mode="wait">
      {message && (
        <motion.div
          key={message}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className="text-center py-2"
        >
          <span className="inline-block bg-white/10 rounded-full px-4 py-1.5 text-sm font-body text-cc-yellow font-semibold">
            👾 {message}
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
