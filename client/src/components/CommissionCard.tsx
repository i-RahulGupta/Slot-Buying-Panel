import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StatusBadge from './StatusBadge';
import { TrendingUp, Download } from 'lucide-react';

interface CommissionEntry {
  orderId: string;
  amount: number;
  status: 'pending' | 'paid';
  date: string;
}

interface CommissionCardProps {
  totalEarned: number;
  pendingAmount: number;
  paidAmount: number;
  recentCommissions: CommissionEntry[];
  onDownloadStatement?: () => void;
}

export default function CommissionCard({
  totalEarned,
  pendingAmount,
  paidAmount,
  recentCommissions,
  onDownloadStatement
}: CommissionCardProps) {
  return (
    <Card data-testid="commission-card">
      <CardHeader className="flex flex-row items-center justify-between gap-4">
        <div>
          <CardTitle className="text-lg">Commission Earnings</CardTitle>
          <p className="text-sm text-muted-foreground mt-1">Track your commissions</p>
        </div>
        <div className="p-3 bg-green-100 dark:bg-green-900/30 rounded-md">
          <TrendingUp className="h-5 w-5 text-green-600 dark:text-green-400" />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-3 bg-muted/50 rounded-md">
            <p className="text-2xl font-bold">₹{totalEarned.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Total Earned</p>
          </div>
          <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-md">
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">₹{paidAmount.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Paid</p>
          </div>
          <div className="text-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
            <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">₹{pendingAmount.toLocaleString()}</p>
            <p className="text-xs text-muted-foreground">Pending</p>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium">Recent Commissions</h4>
          {recentCommissions.map((comm) => (
            <div 
              key={comm.orderId} 
              className="flex items-center justify-between py-2 border-b last:border-0"
            >
              <div>
                <p className="text-sm font-medium">Order #{comm.orderId}</p>
                <p className="text-xs text-muted-foreground">{comm.date}</p>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-semibold">₹{comm.amount.toLocaleString()}</span>
                <StatusBadge status={comm.status} />
              </div>
            </div>
          ))}
        </div>

        <Button variant="outline" className="w-full" onClick={onDownloadStatement} data-testid="download-statement">
          <Download className="h-4 w-4 mr-2" />
          Download Statement
        </Button>
      </CardContent>
    </Card>
  );
}
