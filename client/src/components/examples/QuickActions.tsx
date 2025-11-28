import QuickActions, { Plus, FileText, UserPlus, ShoppingCart } from '../QuickActions';

export default function QuickActionsExample() {
  return (
    <div className="max-w-xs">
      <QuickActions
        actions={[
          { id: 'new-slot', label: 'New Slot', icon: Plus, onClick: () => console.log('New slot') },
          { id: 'add-product', label: 'Add Product', icon: FileText, onClick: () => console.log('Add product') },
          { id: 'add-buyer', label: 'Add Buyer', icon: UserPlus, onClick: () => console.log('Add buyer') },
          { id: 'new-order', label: 'New Order', icon: ShoppingCart, onClick: () => console.log('New order') },
        ]}
      />
    </div>
  );
}
