import { useState } from 'react';
import ProductCard from '@/components/ProductCard';
import DataTable from '@/components/DataTable';
import StatusBadge from '@/components/StatusBadge';
import SearchBar from '@/components/SearchBar';
import FormDialog from '@/components/FormDialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, LayoutGrid, List, Download } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// todo: remove mock functionality
const mockProducts = [
  {
    id: 'P001',
    name: 'Premium Electric Kettle',
    category: 'Kitchen Appliances',
    manufacturingCost: 450,
    distributorPrice: 650,
    mrp: 999,
    moq: 50,
    inStock: true,
  },
  {
    id: 'P002',
    name: 'Smart LED Bulb Set',
    category: 'Electronics',
    manufacturingCost: 120,
    distributorPrice: 180,
    mrp: 299,
    moq: 100,
    inStock: true,
  },
  {
    id: 'P003',
    name: 'Portable Blender',
    category: 'Kitchen Appliances',
    manufacturingCost: 580,
    distributorPrice: 890,
    mrp: 1499,
    moq: 25,
    inStock: true,
  },
  {
    id: 'P004',
    name: 'Wireless Earbuds',
    category: 'Electronics',
    manufacturingCost: 350,
    distributorPrice: 520,
    mrp: 899,
    moq: 50,
    inStock: false,
  },
  {
    id: 'P005',
    name: 'Non-Stick Cookware Set',
    category: 'Kitchen Appliances',
    manufacturingCost: 850,
    distributorPrice: 1200,
    mrp: 1999,
    moq: 20,
    inStock: true,
  },
  {
    id: 'P006',
    name: 'Smart Watch Basic',
    category: 'Electronics',
    manufacturingCost: 420,
    distributorPrice: 650,
    mrp: 1199,
    moq: 30,
    inStock: true,
  },
  {
    id: 'P007',
    name: 'Air Fryer Compact',
    category: 'Kitchen Appliances',
    manufacturingCost: 780,
    distributorPrice: 1100,
    mrp: 1799,
    moq: 15,
    inStock: true,
  },
  {
    id: 'P008',
    name: 'Bluetooth Speaker',
    category: 'Electronics',
    manufacturingCost: 280,
    distributorPrice: 420,
    mrp: 699,
    moq: 40,
    inStock: false,
  },
];

const categories = ['All', 'Electronics', 'Kitchen Appliances', 'Home Appliances', 'Fashion'];

export default function ProductsPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProducts = mockProducts.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Product Catalogue</h1>
          <p className="text-muted-foreground">
            {isAdmin ? 'Manage products and pricing' : 'Browse and order products'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" data-testid="download-catalog">
            <Download className="h-4 w-4 mr-2" />
            Download Catalog
          </Button>
          {isAdmin && (
            <FormDialog
              trigger={
                <Button data-testid="add-product-button">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Product
                </Button>
              }
              title="Add New Product"
              description="Add a new product to the catalogue."
              fields={[
                { name: 'name', label: 'Product Name', type: 'text', placeholder: 'Enter product name', required: true },
                { name: 'category', label: 'Category', type: 'select', options: [
                  { value: 'electronics', label: 'Electronics' },
                  { value: 'kitchen', label: 'Kitchen Appliances' },
                  { value: 'home', label: 'Home Appliances' },
                  { value: 'fashion', label: 'Fashion' },
                ], required: true },
                { name: 'manufacturingCost', label: 'Manufacturing Cost (₹)', type: 'number', placeholder: '0', required: true },
                { name: 'distributorPrice', label: 'Distributor Price (₹)', type: 'number', placeholder: '0', required: true },
                { name: 'mrp', label: 'MRP (₹)', type: 'number', placeholder: '0', required: true },
                { name: 'moq', label: 'MOQ', type: 'number', placeholder: '10', required: true },
              ]}
              onSubmit={(data) => console.log('Add product:', data)}
              submitLabel="Add Product"
            />
          )}
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 flex-wrap">
        <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
          <TabsList>
            {categories.map((cat) => (
              <TabsTrigger key={cat} value={cat} data-testid={`category-${cat.toLowerCase().replace(/\s+/g, '-')}`}>
                {cat}
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>

        <div className="flex items-center gap-2">
          <SearchBar
            placeholder="Search products..."
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              isAdmin={isAdmin}
              onView={() => console.log('View product:', product.id)}
              onAddToCart={() => console.log('Add to cart:', product.id)}
            />
          ))}
        </div>
      ) : (
        <DataTable
          data={filteredProducts}
          columns={[
            { key: 'id', header: 'SKU' },
            { key: 'name', header: 'Product Name' },
            { key: 'category', header: 'Category' },
            ...(isAdmin ? [{ key: 'manufacturingCost' as const, header: 'Mfg. Cost', render: (item: typeof mockProducts[0]) => `₹${item.manufacturingCost}` }] : []),
            { key: 'distributorPrice', header: 'Dist. Price', render: (item) => `₹${item.distributorPrice}` },
            { key: 'mrp', header: 'MRP', render: (item) => `₹${item.mrp}` },
            { key: 'moq', header: 'MOQ' },
            { key: 'inStock', header: 'Status', render: (item) => (
              <StatusBadge status={item.inStock ? 'active' : 'inactive'} label={item.inStock ? 'In Stock' : 'Out of Stock'} />
            )},
          ]}
          onRowClick={(item) => console.log('View product:', item)}
        />
      )}

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}
