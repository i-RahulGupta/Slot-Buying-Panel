import { Badge } from '@/components/ui/badge';

type Status = 'active' | 'approved' | 'paid' | 'completed' | 'pending' | 'in_progress' | 'rejected' | 'overdue' | 'inactive' | 'draft' | 'disabled';

interface StatusBadgeProps {
  status: Status;
  label?: string;
}

const statusConfig: Record<Status, { className: string; label: string }> = {
  active: { className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', label: 'Active' },
  approved: { className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', label: 'Approved' },
  paid: { className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', label: 'Paid' },
  completed: { className: 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400', label: 'Completed' },
  pending: { className: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400', label: 'Pending' },
  in_progress: { className: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400', label: 'In Progress' },
  rejected: { className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', label: 'Rejected' },
  overdue: { className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', label: 'Overdue' },
  inactive: { className: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400', label: 'Inactive' },
  draft: { className: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400', label: 'Draft' },
  disabled: { className: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400', label: 'Disabled' },
};

export default function StatusBadge({ status, label }: StatusBadgeProps) {
  const config = statusConfig[status];
  
  return (
    <Badge 
      variant="secondary" 
      className={`${config.className} font-medium text-xs no-default-hover-elevate no-default-active-elevate`}
      data-testid={`status-badge-${status}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 ${
        status === 'active' || status === 'approved' || status === 'paid' || status === 'completed' 
          ? 'bg-green-600 dark:bg-green-400' 
          : status === 'pending' || status === 'in_progress'
          ? 'bg-yellow-600 dark:bg-yellow-400'
          : status === 'rejected' || status === 'overdue' || status === 'inactive'
          ? 'bg-red-600 dark:bg-red-400'
          : 'bg-gray-600 dark:bg-gray-400'
      }`} />
      {label || config.label}
    </Badge>
  );
}
