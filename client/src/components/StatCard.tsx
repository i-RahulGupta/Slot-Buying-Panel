import { Card, CardContent } from '@/components/ui/card';
import { TrendingUp, TrendingDown, type LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: number;
  changeLabel?: string;
  icon: LucideIcon;
}

export default function StatCard({ title, value, change, changeLabel, icon: Icon }: StatCardProps) {
  const isPositive = change && change > 0;
  const isNegative = change && change < 0;

  return (
    <Card className="hover-elevate">
      <CardContent className="p-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-muted-foreground truncate" data-testid={`stat-label-${title.toLowerCase().replace(/\s+/g, '-')}`}>
              {title}
            </p>
            <p className="text-2xl font-bold mt-1" data-testid={`stat-value-${title.toLowerCase().replace(/\s+/g, '-')}`}>
              {value}
            </p>
            {change !== undefined && (
              <div className="flex items-center gap-1 mt-2">
                {isPositive && <TrendingUp className="h-3 w-3 text-green-600 dark:text-green-400" />}
                {isNegative && <TrendingDown className="h-3 w-3 text-red-600 dark:text-red-400" />}
                <span className={`text-xs font-medium ${
                  isPositive ? 'text-green-600 dark:text-green-400' : 
                  isNegative ? 'text-red-600 dark:text-red-400' : 
                  'text-muted-foreground'
                }`}>
                  {isPositive ? '+' : ''}{change}%
                </span>
                {changeLabel && (
                  <span className="text-xs text-muted-foreground">{changeLabel}</span>
                )}
              </div>
            )}
          </div>
          <div className="p-3 bg-primary/10 rounded-md shrink-0">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
