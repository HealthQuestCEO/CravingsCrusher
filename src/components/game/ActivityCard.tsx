import { Card } from '../ui/Card';
import type { Activity } from '../../types/game';

interface ActivityCardProps {
  activity: Activity;
}

const categoryColors: Record<string, string> = {
  move: '#2eae8f',
  brain: '#fa8a10',
  chill: '#7bcec6',
};

export function ActivityCard({ activity }: ActivityCardProps) {
  return (
    <Card glow={categoryColors[activity.category]} className="text-center">
      <div className="text-3xl mb-2">{activity.icon}</div>
      <h2 className="text-xl font-display font-bold mb-2">{activity.name}</h2>
      <p className="text-base font-body text-white/80 leading-relaxed">
        {activity.instructions}
      </p>
    </Card>
  );
}
