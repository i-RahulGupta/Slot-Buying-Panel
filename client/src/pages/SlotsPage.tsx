import { useState } from 'react';
import SlotCard from '@/components/SlotCard';
import DataTable from '@/components/DataTable';
import StatusBadge from '@/components/StatusBadge';
import SearchBar from '@/components/SearchBar';
import FormDialog from '@/components/FormDialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, LayoutGrid, List } from 'lucide-react';

// todo: remove mock functionality
const mockSlots = [
  {
    id: 'SL001',
    buyerName: 'Rajesh Kumar',
    email: 'rajesh@example.com',
    territory: 'Mumbai',
    state: 'Maharashtra',
    status: 'active' as const,
    feePaid: true,
    expiryDate: 'Dec 31, 2025',
    categories: ['Electronics', 'Home Appliances', 'Kitchen'],
    minVolume: 50,
  },
  {
    id: 'SL002',
    buyerName: 'Priya Sharma',
    email: 'priya@example.com',
    territory: 'Delhi',
    state: 'Delhi NCR',
    status: 'pending' as const,
    feePaid: false,
    expiryDate: 'Jan 15, 2026',
    categories: ['Fashion', 'Accessories'],
    minVolume: 30,
  },
  {
    id: 'SL003',
    buyerName: 'Amit Patel',
    email: 'amit@example.com',
    territory: 'Ahmedabad',
    state: 'Gujarat',
    status: 'active' as const,
    feePaid: true,
    expiryDate: 'Nov 30, 2025',
    categories: ['Electronics', 'Kitchen'],
    minVolume: 40,
  },
  {
    id: 'SL004',
    buyerName: 'Sunita Reddy',
    email: 'sunita@example.com',
    territory: 'Hyderabad',
    state: 'Telangana',
    status: 'inactive' as const,
    feePaid: true,
    expiryDate: 'Oct 15, 2024',
    categories: ['Home Appliances'],
    minVolume: 25,
  },
  {
    id: 'SL005',
    buyerName: 'Vikram Singh',
    email: 'vikram@example.com',
    territory: 'Jaipur',
    state: 'Rajasthan',
    status: 'active' as const,
    feePaid: true,
    expiryDate: 'Mar 31, 2026',
    categories: ['Electronics', 'Fashion', 'Kitchen'],
    minVolume: 60,
  },
  {
    id: 'SL006',
    buyerName: 'Ananya Mehta',
    email: 'ananya@example.com',
    territory: 'Pune',
    state: 'Maharashtra',
    status: 'pending' as const,
    feePaid: false,
    expiryDate: 'Feb 28, 2026',
    categories: ['Fashion', 'Accessories', 'Home'],
    minVolume: 35,
  },
];

export default function SlotsPage() {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredSlots = mockSlots.filter((slot) => {
    const matchesSearch = 
      slot.buyerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      slot.territory.toLowerCase().includes(searchQuery.toLowerCase()) ||
      slot.id.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    return matchesSearch && slot.status === activeTab;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Slot Management</h1>
          <p className="text-muted-foreground">Manage all slot buyers and their territories</p>
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
              { value: 'kolkata', label: 'Kolkata, West Bengal' },
            ], required: true },
            { name: 'minVolume', label: 'Min. Monthly Volume', type: 'number', placeholder: '50', required: true },
          ]}
          onSubmit={(data) => console.log('Create slot:', data)}
          submitLabel="Create Slot"
        />
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all" data-testid="tab-all">All ({mockSlots.length})</TabsTrigger>
            <TabsTrigger value="active" data-testid="tab-active">Active ({mockSlots.filter(s => s.status === 'active').length})</TabsTrigger>
            <TabsTrigger value="pending" data-testid="tab-pending">Pending ({mockSlots.filter(s => s.status === 'pending').length})</TabsTrigger>
            <TabsTrigger value="inactive" data-testid="tab-inactive">Inactive ({mockSlots.filter(s => s.status === 'inactive').length})</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <SearchBar
            placeholder="Search slots..."
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
          {filteredSlots.map((slot) => (
            <SlotCard
              key={slot.id}
              {...slot}
              onView={() => console.log('View slot:', slot.id)}
              onEdit={() => console.log('Edit slot:', slot.id)}
            />
          ))}
        </div>
      ) : (
        <DataTable
          data={filteredSlots}
          columns={[
            { key: 'id', header: 'Slot ID' },
            { key: 'buyerName', header: 'Buyer Name' },
            { key: 'territory', header: 'Territory', render: (item) => `${item.territory}, ${item.state}` },
            { key: 'status', header: 'Status', render: (item) => <StatusBadge status={item.status} /> },
            { key: 'feePaid', header: 'Fee Status', render: (item) => (
              <StatusBadge status={item.feePaid ? 'paid' : 'pending'} label={item.feePaid ? 'Paid' : 'Pending'} />
            )},
            { key: 'expiryDate', header: 'Expiry Date' },
            { key: 'minVolume', header: 'Min. Volume', render: (item) => `${item.minVolume}/month` },
          ]}
          onRowClick={(item) => console.log('View slot:', item)}
        />
      )}

      {filteredSlots.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No slots found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
