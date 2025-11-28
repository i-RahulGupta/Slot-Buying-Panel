import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, FileText, UserPlus, ShoppingCart, type LucideIcon } from 'lucide-react';

interface QuickAction {
  id: string;
  label: string;
  icon: LucideIcon;
  onClick: () => void;
}

interface QuickActionsProps {
  actions: QuickAction[];
  title?: string;
}

export default function QuickActions({ actions, title = 'Quick Actions' }: QuickActionsProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg">{title}</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        {actions.map((action) => (
          <Button
            key={action.id}
            variant="outline"
            className="h-auto py-4 flex flex-col gap-2"
            onClick={action.onClick}
            data-testid={`quick-action-${action.id}`}
          >
            <action.icon className="h-5 w-5" />
            <span className="text-xs">{action.label}</span>
          </Button>
        ))}
      </CardContent>
    </Card>
  );
}

export { Plus, FileText, UserPlus, ShoppingCart };
