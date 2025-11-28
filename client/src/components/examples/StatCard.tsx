import StatCard from '../StatCard';
import { Users } from 'lucide-react';

export default function StatCardExample() {
  return (
    <StatCard
      title="Active Buyers"
      value="156"
      change={12.5}
      changeLabel="vs last month"
      icon={Users}
    />
  );
}
