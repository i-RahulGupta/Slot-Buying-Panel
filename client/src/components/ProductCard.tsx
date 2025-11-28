import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import StatusBadge from './StatusBadge';
import { ShoppingCart, Eye } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  category: string;
  manufacturingCost: number;
  distributorPrice: number;
  mrp: number;
  moq: number;
  inStock: boolean;
  onView?: () => void;
  onAddToCart?: () => void;
  isAdmin?: boolean;
}

export default function ProductCard({ 
  id, 
  name, 
  category, 
  manufacturingCost, 
  distributorPrice, 
  mrp, 
  moq, 
  inStock,
  onView,
  onAddToCart,
  isAdmin = false
}: ProductCardProps) {
  const margin = ((mrp - distributorPrice) / mrp * 100).toFixed(1);

  return (
    <Card className="hover-elevate overflow-hidden" data-testid={`product-card-${id}`}>
      <div className="aspect-square bg-muted flex items-center justify-center">
        <div className="text-4xl text-muted-foreground/30 font-bold">
          {name.charAt(0)}
        </div>
      </div>
      <CardContent className="p-4 space-y-3">
        <div>
          <span className="text-xs text-muted-foreground">{category}</span>
          <h3 className="font-semibold truncate">{name}</h3>
        </div>

        <div className="grid grid-cols-2 gap-2 text-sm">
          {isAdmin && (
            <div>
              <p className="text-xs text-muted-foreground">Mfg. Cost</p>
              <p className="font-medium">₹{manufacturingCost.toLocaleString()}</p>
            </div>
          )}
          <div>
            <p className="text-xs text-muted-foreground">Distributor</p>
            <p className="font-medium">₹{distributorPrice.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">MRP</p>
            <p className="font-medium">₹{mrp.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Margin</p>
            <p className="font-medium text-green-600 dark:text-green-400">{margin}%</p>
          </div>
        </div>

        <div className="flex items-center justify-between pt-2 border-t">
          <div className="flex items-center gap-2">
            <StatusBadge status={inStock ? 'active' : 'inactive'} label={inStock ? 'In Stock' : 'Out of Stock'} />
            <span className="text-xs text-muted-foreground">MOQ: {moq}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={onView} data-testid={`view-product-${id}`}>
            <Eye className="h-4 w-4 mr-2" />
            View
          </Button>
          {!isAdmin && (
            <Button className="flex-1" onClick={onAddToCart} disabled={!inStock} data-testid={`add-cart-${id}`}>
              <ShoppingCart className="h-4 w-4 mr-2" />
              Add
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
