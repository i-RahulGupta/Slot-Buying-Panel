import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import StatusBadge from './StatusBadge';
import { MessageSquare, Clock, Tag } from 'lucide-react';

type Priority = 'low' | 'medium' | 'high';
type TicketStatus = 'pending' | 'in_progress' | 'completed';

interface TicketCardProps {
  id: string;
  ticketNumber: string;
  subject: string;
  category: string;
  priority: Priority;
  status: TicketStatus;
  createdAt: string;
  messageCount: number;
  assignedTo?: string;
  onView?: () => void;
}

const priorityColors: Record<Priority, string> = {
  low: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
  medium: 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400',
  high: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400',
};

export default function TicketCard({
  id,
  ticketNumber,
  subject,
  category,
  priority,
  status,
  createdAt,
  messageCount,
  assignedTo,
  onView
}: TicketCardProps) {
  return (
    <Card className="hover-elevate" data-testid={`ticket-card-${id}`}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between gap-2 mb-3">
          <div className="min-w-0">
            <p className="text-xs text-muted-foreground">#{ticketNumber}</p>
            <h3 className="font-semibold truncate">{subject}</h3>
          </div>
          <StatusBadge status={status} />
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          <Badge variant="secondary" className="no-default-hover-elevate no-default-active-elevate">
            <Tag className="h-3 w-3 mr-1" />
            {category}
          </Badge>
          <Badge className={`${priorityColors[priority]} no-default-hover-elevate no-default-active-elevate`}>
            {priority.charAt(0).toUpperCase() + priority.slice(1)} Priority
          </Badge>
        </div>

        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            <span>{createdAt}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>{messageCount} messages</span>
          </div>
        </div>

        {assignedTo && (
          <p className="text-sm text-muted-foreground mb-3">
            Assigned to: <span className="font-medium text-foreground">{assignedTo}</span>
          </p>
        )}

        <Button variant="outline" className="w-full" onClick={onView} data-testid={`view-ticket-${id}`}>
          View Ticket
        </Button>
      </CardContent>
    </Card>
  );
}
