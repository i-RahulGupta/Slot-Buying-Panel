import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StatusBadge from './StatusBadge';
import { MapPin, Calendar, Package, Eye, Edit2 } from 'lucide-react';

interface SlotCardProps {
  id: string;
  buyerName: string;
  territory: string;
  state: string;
  status: 'active' | 'pending' | 'inactive';
  feePaid: boolean;
  expiryDate: string;
  categories: string[];
  onView?: () => void;
  onEdit?: () => void;
}

export default function SlotCard({ 
  id, 
  buyerName, 
  territory, 
  state, 
  status, 
  feePaid, 
  expiryDate, 
  categories,
  onView,
  onEdit
}: SlotCardProps) {
  return (
    <Card className="hover-elevate" data-testid={`slot-card-${id}`}>
      <CardHeader className="flex flex-row items-start justify-between gap-2 pb-3">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">Slot #{id}</p>
          <h3 className="font-semibold text-lg truncate">{buyerName}</h3>
        </div>
        <StatusBadge status={status} />
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground shrink-0" />
          <span className="truncate">{territory}, {state}</span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground shrink-0" />
          <span>Valid until {expiryDate}</span>
        </div>
        <div className="flex items-start gap-2 text-sm">
          <Package className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
          <div className="flex flex-wrap gap-1">
            {categories.slice(0, 3).map((cat) => (
              <span key={cat} className="px-2 py-0.5 bg-muted rounded text-xs">{cat}</span>
            ))}
            {categories.length > 3 && (
              <span className="px-2 py-0.5 bg-muted rounded text-xs">+{categories.length - 3}</span>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between pt-2 border-t">
          <StatusBadge status={feePaid ? 'paid' : 'pending'} label={feePaid ? 'Fee Paid' : 'Fee Pending'} />
          <div className="flex gap-1">
            <Button size="icon" variant="ghost" onClick={onView} data-testid={`view-slot-${id}`}>
              <Eye className="h-4 w-4" />
            </Button>
            <Button size="icon" variant="ghost" onClick={onEdit} data-testid={`edit-slot-${id}`}>
              <Edit2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
