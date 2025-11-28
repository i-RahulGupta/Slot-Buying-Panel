import { useState } from 'react';
import RetailerCard from '@/components/RetailerCard';
import DataTable from '@/components/DataTable';
import StatusBadge from '@/components/StatusBadge';
import SearchBar from '@/components/SearchBar';
import FormDialog from '@/components/FormDialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, LayoutGrid, List } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// todo: remove mock functionality
const mockRetailers = [
  {
    id: 'R001',
    name: 'Sharma Electronics',
    location: 'Andheri West, Mumbai',
    phone: '+91 98765 43210',
    totalOrders: 45,
    lastOrderDate: 'Nov 25, 2024',
    kycVerified: true,
    distributorId: 'SL001',
    distributorName: 'Rajesh Kumar',
  },
  {
    id: 'R002',
    name: 'City Home Appliances',
    location: 'Bandra East, Mumbai',
    phone: '+91 98765 43211',
    totalOrders: 32,
    lastOrderDate: 'Nov 24, 2024',
    kycVerified: true,
    distributorId: 'SL001',
    distributorName: 'Rajesh Kumar',
  },
  {
    id: 'R003',
    name: 'Tech World Store',
    location: 'Connaught Place, Delhi',
    phone: '+91 98765 43212',
    totalOrders: 28,
    lastOrderDate: 'Nov 23, 2024',
    kycVerified: false,
    distributorId: 'SL002',
    distributorName: 'Priya Sharma',
  },
  {
    id: 'R004',
    name: 'Kitchen Essentials',
    location: 'Lajpat Nagar, Delhi',
    phone: '+91 98765 43213',
    totalOrders: 19,
    lastOrderDate: 'Nov 22, 2024',
    kycVerified: true,
    distributorId: 'SL002',
    distributorName: 'Priya Sharma',
  },
  {
    id: 'R005',
    name: 'Gujarat Electronics Hub',
    location: 'CG Road, Ahmedabad',
    phone: '+91 98765 43214',
    totalOrders: 56,
    lastOrderDate: 'Nov 26, 2024',
    kycVerified: true,
    distributorId: 'SL003',
    distributorName: 'Amit Patel',
  },
  {
    id: 'R006',
    name: 'Home Solutions',
    location: 'Navrangpura, Ahmedabad',
    phone: '+91 98765 43215',
    totalOrders: 15,
    lastOrderDate: 'Nov 20, 2024',
    kycVerified: false,
    distributorId: 'SL003',
    distributorName: 'Amit Patel',
  },
];

export default function RetailersPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  const filteredRetailers = mockRetailers.filter((retailer) => {
    const matchesSearch = 
      retailer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      retailer.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'verified') return matchesSearch && retailer.kycVerified;
    if (activeTab === 'pending') return matchesSearch && !retailer.kycVerified;
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">
            {isAdmin ? 'All Retailers' : 'My Retailers'}
          </h1>
          <p className="text-muted-foreground">
            {isAdmin ? 'View retailers across all distributors' : 'Manage your onboarded retailers'}
          </p>
        </div>
        {!isAdmin && (
          <FormDialog
            trigger={
              <Button data-testid="add-retailer-button">
                <Plus className="h-4 w-4 mr-2" />
                Add Retailer
              </Button>
            }
            title="Add New Retailer"
            description="Onboard a new retailer to your network."
            fields={[
              { name: 'name', label: 'Retailer Name', type: 'text', placeholder: 'Enter retailer name', required: true },
              { name: 'phone', label: 'Phone Number', type: 'text', placeholder: '+91 98765 43210', required: true },
              { name: 'location', label: 'Location', type: 'text', placeholder: 'Area, City', required: true },
              { name: 'gst', label: 'GST Number', type: 'text', placeholder: 'GSTIN' },
              { name: 'notes', label: 'Notes', type: 'textarea', placeholder: 'Additional notes...' },
            ]}
            onSubmit={(data) => console.log('Add retailer:', data)}
            submitLabel="Add Retailer"
          />
        )}
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all" data-testid="tab-all">
              All ({mockRetailers.length})
            </TabsTrigger>
            <TabsTrigger value="verified" data-testid="tab-verified">
              KYC Verified ({mockRetailers.filter(r => r.kycVerified).length})
            </TabsTrigger>
            <TabsTrigger value="pending" data-testid="tab-pending">
              KYC Pending ({mockRetailers.filter(r => !r.kycVerified).length})
            </TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <SearchBar
            placeholder="Search retailers..."
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
          {filteredRetailers.map((retailer) => (
            <RetailerCard
              key={retailer.id}
              {...retailer}
              onViewDetails={() => console.log('View retailer:', retailer.id)}
              onAddOrder={() => console.log('Add order for:', retailer.id)}
              onSetReminder={() => console.log('Set reminder for:', retailer.id)}
            />
          ))}
        </div>
      ) : (
        <DataTable
          data={filteredRetailers}
          columns={[
            { key: 'id', header: 'ID' },
            { key: 'name', header: 'Retailer Name' },
            { key: 'location', header: 'Location' },
            { key: 'phone', header: 'Phone' },
            ...(isAdmin ? [{ key: 'distributorName' as const, header: 'Distributor' }] : []),
            { key: 'totalOrders', header: 'Total Orders' },
            { key: 'lastOrderDate', header: 'Last Order' },
            { key: 'kycVerified', header: 'KYC Status', render: (item) => (
              <StatusBadge 
                status={item.kycVerified ? 'approved' : 'pending'} 
                label={item.kycVerified ? 'Verified' : 'Pending'} 
              />
            )},
          ]}
          onRowClick={(item) => console.log('View retailer:', item)}
        />
      )}

      {filteredRetailers.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No retailers found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
