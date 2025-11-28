import { useState } from 'react';
import StatCard from '@/components/StatCard';
import DataTable from '@/components/DataTable';
import StatusBadge from '@/components/StatusBadge';
import SearchBar from '@/components/SearchBar';
import FormDialog from '@/components/FormDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { DollarSign, TrendingUp, CreditCard, AlertCircle, Plus, Download } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// todo: remove mock functionality
const mockPayments = [
  { id: 'PAY001', buyerName: 'Rajesh Kumar', type: 'Slot Fee', amount: 50000, status: 'paid' as const, date: 'Nov 25, 2024', method: 'Bank Transfer' },
  { id: 'PAY002', buyerName: 'Priya Sharma', type: 'Slot Fee', amount: 50000, status: 'pending' as const, date: 'Nov 28, 2024', method: 'Pending' },
  { id: 'PAY003', buyerName: 'Amit Patel', type: 'Order Payment', amount: 125000, status: 'paid' as const, date: 'Nov 24, 2024', method: 'NEFT' },
  { id: 'PAY004', buyerName: 'Sunita Reddy', type: 'Commission Payout', amount: 15000, status: 'completed' as const, date: 'Nov 23, 2024', method: 'Bank Transfer' },
  { id: 'PAY005', buyerName: 'Vikram Singh', type: 'Order Payment', amount: 89000, status: 'overdue' as const, date: 'Nov 15, 2024', method: 'Pending' },
  { id: 'PAY006', buyerName: 'Ananya Mehta', type: 'Slot Fee', amount: 50000, status: 'paid' as const, date: 'Nov 20, 2024', method: 'UPI' },
];

const mockCommissionStructures = [
  { id: '1', category: 'Electronics', rate: 8, minOrder: 25000 },
  { id: '2', category: 'Kitchen Appliances', rate: 10, minOrder: 20000 },
  { id: '3', category: 'Home Appliances', rate: 7, minOrder: 30000 },
  { id: '4', category: 'Fashion', rate: 12, minOrder: 15000 },
];

export default function PaymentsPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredPayments = mockPayments.filter((payment) => {
    const matchesSearch = 
      payment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.buyerName.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && payment.status === activeTab;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">
            {isAdmin ? 'Payments & Commissions' : 'My Payments'}
          </h1>
          <p className="text-muted-foreground">
            {isAdmin ? 'Manage payments and commission structures' : 'Track your payments and earnings'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" data-testid="export-payments">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
          {isAdmin && (
            <FormDialog
              trigger={
                <Button data-testid="record-payment">
                  <Plus className="h-4 w-4 mr-2" />
                  Record Payment
                </Button>
              }
              title="Record Payment"
              description="Record a payment received from a buyer."
              fields={[
                { name: 'buyer', label: 'Buyer', type: 'select', options: [
                  { value: 'rajesh', label: 'Rajesh Kumar' },
                  { value: 'priya', label: 'Priya Sharma' },
                  { value: 'amit', label: 'Amit Patel' },
                ], required: true },
                { name: 'type', label: 'Payment Type', type: 'select', options: [
                  { value: 'slot_fee', label: 'Slot Fee' },
                  { value: 'order_payment', label: 'Order Payment' },
                ], required: true },
                { name: 'amount', label: 'Amount (₹)', type: 'number', placeholder: '0', required: true },
                { name: 'method', label: 'Payment Method', type: 'select', options: [
                  { value: 'bank_transfer', label: 'Bank Transfer' },
                  { value: 'upi', label: 'UPI' },
                  { value: 'neft', label: 'NEFT' },
                  { value: 'cheque', label: 'Cheque' },
                ], required: true },
                { name: 'reference', label: 'Reference Number', type: 'text', placeholder: 'Transaction ID' },
              ]}
              onSubmit={(data) => console.log('Record payment:', data)}
              submitLabel="Record Payment"
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Collected"
          value="₹42.5L"
          change={15.2}
          changeLabel="this month"
          icon={DollarSign}
        />
        <StatCard
          title="Pending Payments"
          value="₹8.5L"
          icon={CreditCard}
        />
        <StatCard
          title="Commission Paid"
          value="₹3.2L"
          change={22.5}
          changeLabel="this month"
          icon={TrendingUp}
        />
        <StatCard
          title="Overdue"
          value="₹1.2L"
          icon={AlertCircle}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between gap-4 flex-wrap">
              <CardTitle className="text-lg">Payment History</CardTitle>
              <div className="flex items-center gap-2">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList>
                    <TabsTrigger value="all" data-testid="tab-all">All</TabsTrigger>
                    <TabsTrigger value="paid" data-testid="tab-paid">Paid</TabsTrigger>
                    <TabsTrigger value="pending" data-testid="tab-pending">Pending</TabsTrigger>
                    <TabsTrigger value="overdue" data-testid="tab-overdue">Overdue</TabsTrigger>
                  </TabsList>
                </Tabs>
                <SearchBar
                  placeholder="Search payments..."
                  onSearch={setSearchQuery}
                  className="w-48"
                />
              </div>
            </CardHeader>
            <CardContent>
              <DataTable
                data={filteredPayments}
                columns={[
                  { key: 'id', header: 'Payment ID' },
                  { key: 'buyerName', header: 'Buyer' },
                  { key: 'type', header: 'Type' },
                  { key: 'amount', header: 'Amount', render: (item) => `₹${item.amount.toLocaleString()}` },
                  { key: 'status', header: 'Status', render: (item) => <StatusBadge status={item.status} /> },
                  { key: 'date', header: 'Date' },
                  { key: 'method', header: 'Method' },
                ]}
                onRowClick={(item) => console.log('View payment:', item)}
              />
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between gap-4">
            <CardTitle className="text-lg">Commission Rates</CardTitle>
            {isAdmin && (
              <Button variant="ghost" size="sm" data-testid="edit-commission">
                Edit
              </Button>
            )}
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockCommissionStructures.map((struct) => (
                <div 
                  key={struct.id} 
                  className="flex items-center justify-between p-3 bg-muted/50 rounded-md"
                >
                  <div>
                    <p className="font-medium">{struct.category}</p>
                    <p className="text-xs text-muted-foreground">
                      Min. order: ₹{struct.minOrder.toLocaleString()}
                    </p>
                  </div>
                  <span className="text-xl font-bold text-primary">{struct.rate}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
