import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StatusBadge from './StatusBadge';
import { Package, Calendar, FileText, Truck } from 'lucide-react';

type OrderStatus = 'pending' | 'approved' | 'rejected' | 'in_progress' | 'completed';

interface OrderItem {
  name: string;
  quantity: number;
  price: number;
}

interface OrderCardProps {
  id: string;
  date: string;
  status: OrderStatus;
  items: OrderItem[];
  totalAmount: number;
  buyerName?: string;
  onViewDetails?: () => void;
  onDownloadInvoice?: () => void;
  onApprove?: () => void;
  onReject?: () => void;
  isAdmin?: boolean;
}

export default function OrderCard({
  id,
  date,
  status,
  items,
  totalAmount,
  buyerName,
  onViewDetails,
  onDownloadInvoice,
  onApprove,
  onReject,
  isAdmin = false
}: OrderCardProps) {
  return (
    <Card className="hover-elevate" data-testid={`order-card-${id}`}>
      <CardHeader className="flex flex-row items-start justify-between gap-2 pb-3">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">Order #{id}</p>
          {buyerName && <p className="font-semibold">{buyerName}</p>}
        </div>
        <StatusBadge status={status} />
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 shrink-0" />
          <span>{date}</span>
        </div>

        <div className="space-y-2">
          {items.slice(0, 2).map((item, idx) => (
            <div key={idx} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 min-w-0">
                <Package className="h-4 w-4 text-muted-foreground shrink-0" />
                <span className="truncate">{item.name}</span>
                <span className="text-muted-foreground shrink-0">x{item.quantity}</span>
              </div>
              <span className="font-medium shrink-0">₹{(item.price * item.quantity).toLocaleString()}</span>
            </div>
          ))}
          {items.length > 2 && (
            <p className="text-xs text-muted-foreground">+{items.length - 2} more items</p>
          )}
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <span className="text-sm text-muted-foreground">Total Amount</span>
          <span className="font-bold text-lg">₹{totalAmount.toLocaleString()}</span>
        </div>

        <div className="flex flex-wrap gap-2 pt-2">
          <Button variant="outline" size="sm" onClick={onViewDetails} data-testid={`view-order-${id}`}>
            <FileText className="h-4 w-4 mr-1" />
            Details
          </Button>
          {(status === 'approved' || status === 'completed') && (
            <Button variant="outline" size="sm" onClick={onDownloadInvoice} data-testid={`download-invoice-${id}`}>
              <Truck className="h-4 w-4 mr-1" />
              Invoice
            </Button>
          )}
          {isAdmin && status === 'pending' && (
            <>
              <Button size="sm" onClick={onApprove} data-testid={`approve-order-${id}`}>
                Approve
              </Button>
              <Button variant="destructive" size="sm" onClick={onReject} data-testid={`reject-order-${id}`}>
                Reject
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
