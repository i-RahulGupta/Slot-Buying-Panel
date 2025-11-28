import StatCard from '@/components/StatCard';
import AnalyticsChart from '@/components/AnalyticsChart';
import DataTable from '@/components/DataTable';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Download, TrendingUp, Users, ShoppingBag, DollarSign, MapPin, Package } from 'lucide-react';
import { useState } from 'react';

// todo: remove mock functionality
const mockRevenueData = [
  { name: 'Jan', value: 320000, value2: 280000 },
  { name: 'Feb', value: 380000, value2: 320000 },
  { name: 'Mar', value: 420000, value2: 360000 },
  { name: 'Apr', value: 390000, value2: 350000 },
  { name: 'May', value: 480000, value2: 420000 },
  { name: 'Jun', value: 520000, value2: 480000 },
  { name: 'Jul', value: 550000, value2: 510000 },
  { name: 'Aug', value: 580000, value2: 540000 },
  { name: 'Sep', value: 620000, value2: 580000 },
  { name: 'Oct', value: 680000, value2: 620000 },
  { name: 'Nov', value: 720000, value2: 680000 },
];

const mockCategoryData = [
  { name: 'Electronics', value: 35 },
  { name: 'Kitchen', value: 28 },
  { name: 'Home', value: 22 },
  { name: 'Fashion', value: 15 },
];

const mockCityPerformance = [
  { name: 'Mumbai', value: 245 },
  { name: 'Delhi', value: 198 },
  { name: 'Bangalore', value: 165 },
  { name: 'Chennai', value: 142 },
  { name: 'Kolkata', value: 118 },
  { name: 'Hyderabad', value: 105 },
  { name: 'Pune', value: 92 },
  { name: 'Ahmedabad', value: 88 },
];

const mockTopBuyers = [
  { id: '1', name: 'Rajesh Kumar', territory: 'Mumbai', orders: 156, revenue: 1250000, growth: 15.2 },
  { id: '2', name: 'Priya Sharma', territory: 'Delhi', orders: 142, revenue: 1180000, growth: 12.8 },
  { id: '3', name: 'Amit Patel', territory: 'Ahmedabad', orders: 128, revenue: 980000, growth: 18.5 },
  { id: '4', name: 'Sunita Reddy', territory: 'Hyderabad', orders: 115, revenue: 890000, growth: 8.2 },
  { id: '5', name: 'Vikram Singh', territory: 'Jaipur', orders: 98, revenue: 780000, growth: 22.1 },
];

const mockOrderStats = [
  { name: 'Week 1', value: 245 },
  { name: 'Week 2', value: 312 },
  { name: 'Week 3', value: 289 },
  { name: 'Week 4', value: 356 },
];

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState('last30');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Business insights and performance metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-40" data-testid="date-range-select">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last7">Last 7 days</SelectItem>
              <SelectItem value="last30">Last 30 days</SelectItem>
              <SelectItem value="last90">Last 90 days</SelectItem>
              <SelectItem value="thisYear">This Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" data-testid="export-report">
            <Download className="h-4 w-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Revenue"
          value="₹72.5L"
          change={18.2}
          changeLabel="vs last month"
          icon={DollarSign}
        />
        <StatCard
          title="Total Orders"
          value="1,234"
          change={12.5}
          changeLabel="vs last month"
          icon={ShoppingBag}
        />
        <StatCard
          title="Active Slots"
          value="156"
          change={8.3}
          changeLabel="vs last month"
          icon={MapPin}
        />
        <StatCard
          title="Products Sold"
          value="4,567"
          change={15.8}
          changeLabel="vs last month"
          icon={Package}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AnalyticsChart
          title="Revenue Trend"
          data={mockRevenueData}
          type="line"
          dataKey="value"
          dataKey2="value2"
        />
        <AnalyticsChart
          title="Weekly Orders"
          data={mockOrderStats}
          type="bar"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <AnalyticsChart
          title="Sales by Category"
          data={mockCategoryData}
          type="pie"
        />
        <div className="lg:col-span-2">
          <AnalyticsChart
            title="City-wise Performance"
            data={mockCityPerformance}
            type="bar"
          />
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <CardTitle className="text-lg">Top Performing Buyers</CardTitle>
          <Button variant="outline" size="sm">View All</Button>
        </CardHeader>
        <CardContent>
          <DataTable
            data={mockTopBuyers}
            columns={[
              { key: 'name', header: 'Buyer Name' },
              { key: 'territory', header: 'Territory' },
              { key: 'orders', header: 'Orders' },
              { key: 'revenue', header: 'Revenue', render: (item) => `₹${(item.revenue / 100000).toFixed(1)}L` },
              { 
                key: 'growth', 
                header: 'Growth', 
                render: (item) => (
                  <span className={`flex items-center gap-1 ${item.growth > 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'}`}>
                    <TrendingUp className="h-3 w-3" />
                    {item.growth}%
                  </span>
                )
              },
            ]}
            pageSize={5}
          />
        </CardContent>
      </Card>
    </div>
  );
}
