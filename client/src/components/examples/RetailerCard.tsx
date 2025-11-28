import RetailerCard from '../RetailerCard';

export default function RetailerCardExample() {
  return (
    <div className="max-w-md">
      <RetailerCard
        id="R001"
        name="Sharma Electronics"
        location="Andheri West, Mumbai"
        phone="+91 98765 43210"
        totalOrders={45}
        lastOrderDate="Nov 25, 2024"
        kycVerified={true}
        onViewDetails={() => console.log('View details')}
        onAddOrder={() => console.log('Add order')}
        onSetReminder={() => console.log('Set reminder')}
      />
    </div>
  );
}
