import DataTable from '../DataTable';
import StatusBadge from '../StatusBadge';

// todo: remove mock functionality
const mockSlots = [
  { id: '1', buyerName: 'Rajesh Kumar', territory: 'Mumbai', status: 'active' as const, fee: 'Paid' },
  { id: '2', buyerName: 'Priya Sharma', territory: 'Delhi', status: 'pending' as const, fee: 'Pending' },
  { id: '3', buyerName: 'Amit Patel', territory: 'Ahmedabad', status: 'active' as const, fee: 'Paid' },
];

export default function DataTableExample() {
  return (
    <DataTable
      data={mockSlots}
      columns={[
        { key: 'buyerName', header: 'Buyer Name' },
        { key: 'territory', header: 'Territory' },
        { key: 'status', header: 'Status', render: (item) => <StatusBadge status={item.status} /> },
        { key: 'fee', header: 'Slot Fee' },
      ]}
      onRowClick={(item) => console.log('Row clicked:', item)}
    />
  );
}
