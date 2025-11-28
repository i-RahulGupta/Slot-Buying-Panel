import OrderCard from '../OrderCard';

export default function OrderCardExample() {
  return (
    <div className="max-w-md">
      <OrderCard
        id="ORD-2024-001"
        date="Nov 28, 2024"
        status="pending"
        buyerName="Rajesh Kumar"
        items={[
          { name: 'Premium Electric Kettle', quantity: 50, price: 650 },
          { name: 'Smart LED Bulb Set', quantity: 100, price: 180 },
          { name: 'Portable Blender', quantity: 25, price: 890 },
        ]}
        totalAmount={72750}
        isAdmin={true}
        onViewDetails={() => console.log('View details')}
        onApprove={() => console.log('Approve order')}
        onReject={() => console.log('Reject order')}
      />
    </div>
  );
}
