import SlotCard from '../SlotCard';

export default function SlotCardExample() {
  return (
    <SlotCard
      id="SL001"
      buyerName="Rajesh Kumar"
      territory="Mumbai"
      state="Maharashtra"
      status="active"
      feePaid={true}
      expiryDate="Dec 31, 2025"
      categories={['Electronics', 'Home Appliances', 'Kitchen']}
      onView={() => console.log('View slot')}
      onEdit={() => console.log('Edit slot')}
    />
  );
}
