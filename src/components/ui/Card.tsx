import { type ReactNode, type HTMLAttributes } from 'react';
import { motion } from 'framer-motion';

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  glow?: string;
  interactive?: boolean;
}

export function Card({ children, glow, interactive = false, className = '', ...props }: CardProps) {
  return (
    <motion.div
      whileTap={interactive ? { scale: 0.97 } : undefined}
      className={`
        bg-white/8 border border-white/12 backdrop-blur-sm rounded-2xl p-4
        ${interactive ? 'cursor-pointer hover:bg-white/12 transition-colors' : ''}
        ${glow ? `shadow-lg` : ''}
        ${className}
      `}
      style={glow ? { boxShadow: `0 0 20px ${glow}33` } : undefined}
      {...(props as any)}
    >
      {children}
    </motion.div>
  );
}
