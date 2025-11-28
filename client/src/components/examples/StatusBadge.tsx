import StatusBadge from '../StatusBadge';

export default function StatusBadgeExample() {
  return (
    <div className="flex flex-wrap gap-2">
      <StatusBadge status="active" />
      <StatusBadge status="pending" />
      <StatusBadge status="rejected" />
      <StatusBadge status="in_progress" />
      <StatusBadge status="completed" />
    </div>
  );
}
