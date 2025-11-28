import { useState } from 'react';
import StatCard from '@/components/StatCard';
import DataTable from '@/components/DataTable';
import AnalyticsChart from '@/components/AnalyticsChart';
import QuickActions, { Plus, FileText, UserPlus, ShoppingCart } from '@/components/QuickActions';
import StatusBadge from '@/components/StatusBadge';
import FormDialog from '@/components/FormDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, ShoppingBag, DollarSign, TrendingUp, MapPin, Package } from 'lucide-react';

// todo: remove mock functionality
const mockStats = {
  totalSlots: 156,
  activeSlots: 142,
  totalRevenue: 4250000,
  monthlyOrders: 1234,
  pendingApprovals: 12,
  totalProducts: 89,
};

const mockRecentOrders = [
  { id: 'ORD-001', buyer: 'Rajesh Kumar', amount: 45000, status: 'pending' as const, date: 'Nov 28, 2024' },
  { id: 'ORD-002', buyer: 'Priya Sharma', amount: 72000, status: 'approved' as const, date: 'Nov 27, 2024' },
  { id: 'ORD-003', buyer: 'Amit Patel', amount: 38500, status: 'completed' as const, date: 'Nov 27, 2024' },
  { id: 'ORD-004', buyer: 'Sunita Reddy', amount: 91000, status: 'in_progress' as const, date: 'Nov 26, 2024' },
  { id: 'ORD-005', buyer: 'Vikram Singh', amount: 56000, status: 'pending' as const, date: 'Nov 26, 2024' },
];

const mockRevenueData = [
  { name: 'Jan', value: 320000 },
  { name: 'Feb', value: 380000 },
  { name: 'Mar', value: 420000 },
  { name: 'Apr', value: 390000 },
  { name: 'May', value: 480000 },
  { name: 'Jun', value: 520000 },
];

const mockCategoryData = [
  { name: 'Electronics', value: 35 },
  { name: 'Home', value: 28 },
  { name: 'Kitchen', value: 22 },
  { name: 'Fashion', value: 15 },
];

const mockCityPerformance = [
  { name: 'Mumbai', value: 45 },
  { name: 'Delhi', value: 38 },
  { name: 'Bangalore', value: 32 },
  { name: 'Chennai', value: 28 },
  { name: 'Kolkata', value: 22 },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Welcome back! Here's your business overview.</p>
        </div>
        <FormDialog
          trigger={
            <Button data-testid="add-slot-button">
              <Plus className="h-4 w-4 mr-2" />
              Add New Slot
            </Button>
          }
          title="Create New Slot"
          description="Add a new slot buyer to the system."
          fields={[
            { name: 'buyerName', label: 'Buyer Name', type: 'text', placeholder: 'Enter buyer name', required: true },
            { name: 'email', label: 'Email', type: 'email', placeholder: 'buyer@example.com', required: true },
            { name: 'phone', label: 'Phone', type: 'text', placeholder: '+91 98765 43210', required: true },
            { name: 'territory', label: 'Territory', type: 'select', options: [
              { value: 'mumbai', label: 'Mumbai, Maharashtra' },
              { value: 'delhi', label: 'Delhi NCR' },
              { value: 'bangalore', label: 'Bangalore, Karnataka' },
              { value: 'chennai', label: 'Chennai, Tamil Nadu' },
            ], required: true },
          ]}
          onSubmit={(data) => console.log('Create slot:', data)}
          submitLabel="Create Slot"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Slots"
          value={mockStats.totalSlots}
          change={8.5}
          changeLabel="vs last month"
          icon={MapPin}
        />
        <StatCard
          title="Active Buyers"
          value={mockStats.activeSlots}
          change={12.3}
          changeLabel="vs last month"
          icon={Users}
        />
        <StatCard
          title="Monthly Revenue"
          value={`₹${(mockStats.totalRevenue / 100000).toFixed(1)}L`}
          change={15.2}
          changeLabel="vs last month"
          icon={DollarSign}
        />
        <StatCard
          title="Monthly Orders"
          value={mockStats.monthlyOrders}
          change={-2.4}
          changeLabel="vs last month"
          icon={ShoppingBag}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4">
              <CardTitle className="text-lg">Recent Orders</CardTitle>
              <Button variant="outline" size="sm" data-testid="view-all-orders">
                View All
              </Button>
            </CardHeader>
            <CardContent>
              <DataTable
                data={mockRecentOrders}
                columns={[
                  { key: 'id', header: 'Order ID' },
                  { key: 'buyer', header: 'Buyer' },
                  { key: 'amount', header: 'Amount', render: (item) => `₹${item.amount.toLocaleString()}` },
                  { key: 'status', header: 'Status', render: (item) => <StatusBadge status={item.status} /> },
                  { key: 'date', header: 'Date' },
                ]}
                pageSize={5}
                onRowClick={(item) => console.log('View order:', item)}
              />
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <AnalyticsChart
              title="Monthly Revenue"
              data={mockRevenueData}
              type="line"
            />
            <AnalyticsChart
              title="Sales by Category"
              data={mockCategoryData}
              type="pie"
            />
          </div>
        </div>

        <div className="space-y-6">
          <QuickActions
            actions={[
              { id: 'new-slot', label: 'New Slot', icon: Plus, onClick: () => console.log('New slot') },
              { id: 'add-product', label: 'Add Product', icon: Package, onClick: () => console.log('Add product') },
              { id: 'add-buyer', label: 'Add Buyer', icon: UserPlus, onClick: () => console.log('Add buyer') },
              { id: 'view-orders', label: 'View Orders', icon: ShoppingCart, onClick: () => console.log('View orders') },
            ]}
          />

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-md">
                  <div>
                    <p className="font-medium">Slot Applications</p>
                    <p className="text-sm text-muted-foreground">Awaiting review</p>
                  </div>
                  <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">5</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-md">
                  <div>
                    <p className="font-medium">Order Requests</p>
                    <p className="text-sm text-muted-foreground">Need approval</p>
                  </div>
                  <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">7</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <AnalyticsChart
            title="City Performance"
            data={mockCityPerformance}
            type="bar"
          />
        </div>
      </div>
    </div>
  );
}
