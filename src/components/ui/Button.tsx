import { type ButtonHTMLAttributes, type ReactNode } from 'react';
import { motion } from 'framer-motion';

type ButtonVariant = 'primary' | 'move' | 'brain' | 'chill' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const variantStyles: Record<ButtonVariant, string> = {
  primary: 'bg-cc-blue hover:bg-cc-blue/80 text-white',
  move: 'bg-cc-teal hover:bg-cc-teal/80 text-white',
  brain: 'bg-cc-orange hover:bg-cc-orange/80 text-white',
  chill: 'bg-cc-light-teal hover:bg-cc-light-teal/80 text-white',
  ghost: 'bg-white/10 hover:bg-white/20 text-white border border-white/20',
  danger: 'bg-red-500 hover:bg-red-600 text-white',
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm min-h-[44px]',
  md: 'px-6 py-3 text-base min-h-[44px]',
  lg: 'px-8 py-4 text-lg min-h-[48px]',
};

export function Button({
  variant = 'primary',
  size = 'md',
  children,
  className = '',
  disabled,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className={`
        font-display font-semibold rounded-2xl transition-colors
        min-w-[44px] select-none
        ${variantStyles[variant]}
        ${sizeStyles[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
      `}
      disabled={disabled}
      {...(props as any)}
    >
      {children}
    </motion.button>
  );
}
