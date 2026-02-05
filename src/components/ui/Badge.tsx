interface BadgeProps {
  emoji: string;
  name: string;
  locked?: boolean;
  dateEarned?: string;
  description?: string;
}

export function Badge({ emoji, name, locked = false, dateEarned, description }: BadgeProps) {
  return (
    <div className={`flex flex-col items-center gap-1 p-3 rounded-xl ${locked ? 'opacity-40' : ''}`}>
      <div
        className={`
          w-14 h-14 rounded-full flex items-center justify-center text-2xl
          ${locked ? 'bg-gray-600 grayscale' : 'bg-white/15'}
        `}
      >
        {locked ? '\uD83D\uDD12' : emoji}
      </div>
      <span className="text-xs font-body font-semibold text-center leading-tight">
        {name}
      </span>
      {locked && description && (
        <span className="text-[10px] text-white/50 text-center leading-tight">{description}</span>
      )}
      {!locked && dateEarned && (
        <span className="text-[10px] text-cc-light-teal">{dateEarned}</span>
      )}
    </div>
  );
}
