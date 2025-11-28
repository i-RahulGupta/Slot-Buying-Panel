import { useState } from 'react';
import OrderCard from '@/components/OrderCard';
import DataTable from '@/components/DataTable';
import StatusBadge from '@/components/StatusBadge';
import SearchBar from '@/components/SearchBar';
import FormDialog from '@/components/FormDialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, LayoutGrid, List, Filter } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// todo: remove mock functionality
const mockOrders = [
  {
    id: 'ORD-2024-156',
    buyerName: 'Rajesh Kumar',
    date: 'Nov 28, 2024',
    status: 'pending' as const,
    items: [
      { name: 'Premium Electric Kettle', quantity: 50, price: 650 },
      { name: 'Smart LED Bulb Set', quantity: 100, price: 180 },
    ],
    totalAmount: 50500,
  },
  {
    id: 'ORD-2024-155',
    buyerName: 'Priya Sharma',
    date: 'Nov 27, 2024',
    status: 'approved' as const,
    items: [
      { name: 'Portable Blender', quantity: 30, price: 890 },
    ],
    totalAmount: 26700,
  },
  {
    id: 'ORD-2024-154',
    buyerName: 'Amit Patel',
    date: 'Nov 27, 2024',
    status: 'in_progress' as const,
    items: [
      { name: 'Non-Stick Cookware Set', quantity: 15, price: 1200 },
      { name: 'Air Fryer Compact', quantity: 10, price: 1100 },
    ],
    totalAmount: 29000,
  },
  {
    id: 'ORD-2024-153',
    buyerName: 'Sunita Reddy',
    date: 'Nov 26, 2024',
    status: 'completed' as const,
    items: [
      { name: 'Wireless Earbuds', quantity: 40, price: 520 },
    ],
    totalAmount: 20800,
  },
  {
    id: 'ORD-2024-152',
    buyerName: 'Vikram Singh',
    date: 'Nov 25, 2024',
    status: 'rejected' as const,
    items: [
      { name: 'Smart Watch Basic', quantity: 25, price: 650 },
    ],
    totalAmount: 16250,
  },
  {
    id: 'ORD-2024-151',
    buyerName: 'Ananya Mehta',
    date: 'Nov 24, 2024',
    status: 'completed' as const,
    items: [
      { name: 'Bluetooth Speaker', quantity: 60, price: 420 },
      { name: 'Wireless Earbuds', quantity: 30, price: 520 },
    ],
    totalAmount: 40800,
  },
];

export default function OrdersPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredOrders = mockOrders.filter((order) => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.buyerName.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && order.status === activeTab;
  });

  const orderCounts = {
    all: mockOrders.length,
    pending: mockOrders.filter(o => o.status === 'pending').length,
    approved: mockOrders.filter(o => o.status === 'approved').length,
    in_progress: mockOrders.filter(o => o.status === 'in_progress').length,
    completed: mockOrders.filter(o => o.status === 'completed').length,
    rejected: mockOrders.filter(o => o.status === 'rejected').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">{isAdmin ? 'Order Management' : 'My Orders'}</h1>
          <p className="text-muted-foreground">
            {isAdmin ? 'View and manage all orders' : 'Track your order history'}
          </p>
        </div>
        {!isAdmin && (
          <FormDialog
            trigger={
              <Button data-testid="place-order-button">
                <Plus className="h-4 w-4 mr-2" />
                Place New Order
              </Button>
            }
            title="Place New Order"
            description="Select products and quantities for your order."
            fields={[
              { name: 'product', label: 'Product', type: 'select', options: [
                { value: 'P001', label: 'Premium Electric Kettle - ₹650' },
                { value: 'P002', label: 'Smart LED Bulb Set - ₹180' },
                { value: 'P003', label: 'Portable Blender - ₹890' },
              ], required: true },
              { name: 'quantity', label: 'Quantity', type: 'number', placeholder: '50', required: true },
              { name: 'notes', label: 'Order Notes', type: 'textarea', placeholder: 'Any special instructions...' },
            ]}
            onSubmit={(data) => console.log('Place order:', data)}
            submitLabel="Place Order"
          />
        )}
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all" data-testid="tab-all">All ({orderCounts.all})</TabsTrigger>
            <TabsTrigger value="pending" data-testid="tab-pending">Pending ({orderCounts.pending})</TabsTrigger>
            <TabsTrigger value="approved" data-testid="tab-approved">Approved ({orderCounts.approved})</TabsTrigger>
            <TabsTrigger value="in_progress" data-testid="tab-in-progress">In Progress ({orderCounts.in_progress})</TabsTrigger>
            <TabsTrigger value="completed" data-testid="tab-completed">Completed ({orderCounts.completed})</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <SearchBar
            placeholder="Search orders..."
            onSearch={setSearchQuery}
            className="w-64"
          />
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === 'grid' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('grid')}
              data-testid="view-grid"
            >
              <LayoutGrid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'secondary' : 'ghost'}
              size="icon"
              onClick={() => setViewMode('list')}
              data-testid="view-list"
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredOrders.map((order) => (
            <OrderCard
              key={order.id}
              {...order}
              isAdmin={isAdmin}
              onViewDetails={() => console.log('View order:', order.id)}
              onDownloadInvoice={() => console.log('Download invoice:', order.id)}
              onApprove={() => console.log('Approve order:', order.id)}
              onReject={() => console.log('Reject order:', order.id)}
            />
          ))}
        </div>
      ) : (
        <DataTable
          data={filteredOrders}
          columns={[
            { key: 'id', header: 'Order ID' },
            ...(isAdmin ? [{ key: 'buyerName' as const, header: 'Buyer' }] : []),
            { key: 'date', header: 'Date' },
            { key: 'items', header: 'Items', render: (item) => `${item.items.length} item${item.items.length > 1 ? 's' : ''}` },
            { key: 'totalAmount', header: 'Total', render: (item) => `₹${item.totalAmount.toLocaleString()}` },
            { key: 'status', header: 'Status', render: (item) => <StatusBadge status={item.status} /> },
          ]}
          onRowClick={(item) => console.log('View order:', item)}
        />
      )}

      {filteredOrders.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No orders found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
