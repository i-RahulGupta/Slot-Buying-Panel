import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import StatusBadge from './StatusBadge';
import { MapPin, Phone, ShoppingBag, Calendar, MoreVertical } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface RetailerCardProps {
  id: string;
  name: string;
  location: string;
  phone: string;
  totalOrders: number;
  lastOrderDate: string;
  kycVerified: boolean;
  onViewDetails?: () => void;
  onAddOrder?: () => void;
  onSetReminder?: () => void;
}

export default function RetailerCard({
  id,
  name,
  location,
  phone,
  totalOrders,
  lastOrderDate,
  kycVerified,
  onViewDetails,
  onAddOrder,
  onSetReminder
}: RetailerCardProps) {
  return (
    <Card className="hover-elevate" data-testid={`retailer-card-${id}`}>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">
              {name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <h3 className="font-semibold truncate">{name}</h3>
                <div className="flex items-center gap-1 text-sm text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{location}</span>
                </div>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button size="icon" variant="ghost" data-testid={`retailer-menu-${id}`}>
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={onViewDetails}>View Details</DropdownMenuItem>
                  <DropdownMenuItem onClick={onAddOrder}>Add Order</DropdownMenuItem>
                  <DropdownMenuItem onClick={onSetReminder}>Set Reminder</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <Phone className="h-3.5 w-3.5" />
                <span>{phone}</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground">
                <ShoppingBag className="h-3.5 w-3.5" />
                <span>{totalOrders} orders</span>
              </div>
              <div className="flex items-center gap-1.5 text-muted-foreground col-span-2">
                <Calendar className="h-3.5 w-3.5" />
                <span>Last order: {lastOrderDate}</span>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t flex items-center justify-between">
              <StatusBadge 
                status={kycVerified ? 'approved' : 'pending'} 
                label={kycVerified ? 'KYC Verified' : 'KYC Pending'} 
              />
              <Button size="sm" variant="outline" onClick={onAddOrder} data-testid={`add-order-${id}`}>
                New Order
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
