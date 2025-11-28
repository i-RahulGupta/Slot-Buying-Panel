import StatCard from '@/components/StatCard';
import ProgressBar from '@/components/ProgressBar';
import CommissionCard from '@/components/CommissionCard';
import OrderCard from '@/components/OrderCard';
import AnalyticsChart from '@/components/AnalyticsChart';
import QuickActions from '@/components/QuickActions';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart, Package, Store, DollarSign, Target, FileText, Plus, TrendingUp } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// todo: remove mock functionality
const mockBuyerStats = {
  monthlyOrders: 45,
  monthlyTarget: 60,
  retailersAdded: 23,
  totalEarnings: 125000,
};

const mockRecentOrders = [
  {
    id: 'ORD-2024-156',
    date: 'Nov 28, 2024',
    status: 'in_progress' as const,
    items: [
      { name: 'Premium Electric Kettle', quantity: 50, price: 650 },
      { name: 'Smart LED Bulb Set', quantity: 100, price: 180 },
    ],
    totalAmount: 50500,
  },
  {
    id: 'ORD-2024-142',
    date: 'Nov 25, 2024',
    status: 'completed' as const,
    items: [
      { name: 'Portable Blender', quantity: 25, price: 890 },
    ],
    totalAmount: 22250,
  },
];

const mockOrdersData = [
  { name: 'Week 1', value: 12 },
  { name: 'Week 2', value: 15 },
  { name: 'Week 3', value: 10 },
  { name: 'Week 4', value: 18 },
];

const mockProductPerformance = [
  { name: 'Electronics', value: 40 },
  { name: 'Kitchen', value: 30 },
  { name: 'Home', value: 20 },
  { name: 'Other', value: 10 },
];

export default function BuyerDashboard() {
  const { user } = useAuth();
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Welcome, {user?.name?.split(' ')[0] || 'Buyer'}</h1>
          <p className="text-muted-foreground">{user?.territory || 'Your dashboard overview'}</p>
        </div>
        <Button data-testid="place-order-button">
          <ShoppingCart className="h-4 w-4 mr-2" />
          Place Order
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Monthly Orders"
          value={mockBuyerStats.monthlyOrders}
          change={15}
          changeLabel="vs last month"
          icon={Package}
        />
        <StatCard
          title="Retailers Added"
          value={mockBuyerStats.retailersAdded}
          change={8}
          changeLabel="this month"
          icon={Store}
        />
        <StatCard
          title="Total Earnings"
          value={`₹${(mockBuyerStats.totalEarnings / 1000).toFixed(0)}K`}
          change={12.5}
          changeLabel="vs last month"
          icon={DollarSign}
        />
        <StatCard
          title="Target Progress"
          value={`${Math.round((mockBuyerStats.monthlyOrders / mockBuyerStats.monthlyTarget) * 100)}%`}
          icon={Target}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Monthly Target Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-3xl font-bold">{mockBuyerStats.monthlyOrders}</p>
                  <p className="text-muted-foreground">of {mockBuyerStats.monthlyTarget} orders target</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Remaining</p>
                  <p className="text-xl font-semibold">{mockBuyerStats.monthlyTarget - mockBuyerStats.monthlyOrders} orders</p>
                </div>
              </div>
              <ProgressBar 
                value={mockBuyerStats.monthlyOrders} 
                max={mockBuyerStats.monthlyTarget}
                showMilestones
              />
              {(mockBuyerStats.monthlyOrders / mockBuyerStats.monthlyTarget) >= 0.8 && (
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />
                  <p className="text-sm text-yellow-700 dark:text-yellow-300">
                    Great progress! You've reached 80% of your monthly target.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4">
              <CardTitle className="text-lg">Recent Orders</CardTitle>
              <Button variant="outline" size="sm" data-testid="view-all-orders">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {mockRecentOrders.map((order) => (
                  <OrderCard
                    key={order.id}
                    {...order}
                    onViewDetails={() => console.log('View order:', order.id)}
                    onDownloadInvoice={() => console.log('Download invoice:', order.id)}
                  />
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnalyticsChart
              title="Weekly Orders"
              data={mockOrdersData}
              type="bar"
            />
            <AnalyticsChart
              title="Sales by Category"
              data={mockProductPerformance}
              type="pie"
            />
          </div>
        </div>

        <div className="space-y-6">
          <QuickActions
            actions={[
              { id: 'place-order', label: 'Place Order', icon: ShoppingCart, onClick: () => console.log('Place order') },
              { id: 'add-retailer', label: 'Add Retailer', icon: Plus, onClick: () => console.log('Add retailer') },
              { id: 'view-products', label: 'Products', icon: Package, onClick: () => console.log('View products') },
              { id: 'documents', label: 'Documents', icon: FileText, onClick: () => console.log('Documents') },
            ]}
          />

          <CommissionCard
            totalEarned={125000}
            pendingAmount={25000}
            paidAmount={100000}
            recentCommissions={[
              { orderId: 'ORD-142', amount: 5000, status: 'paid', date: 'Nov 25, 2024' },
              { orderId: 'ORD-138', amount: 7500, status: 'paid', date: 'Nov 22, 2024' },
              { orderId: 'ORD-156', amount: 4200, status: 'pending', date: 'Nov 28, 2024' },
            ]}
            onDownloadStatement={() => console.log('Download statement')}
          />

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Slot Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Slot ID</span>
                <span className="font-medium">SL-2024-087</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Territory</span>
                <span className="font-medium">Mumbai, Maharashtra</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Valid Until</span>
                <span className="font-medium">Dec 31, 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Slot Fee</span>
                <span className="font-medium text-green-600 dark:text-green-400">Paid</span>
              </div>
              <Button variant="outline" className="w-full mt-2" data-testid="view-slot-details">
                View Full Details
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
