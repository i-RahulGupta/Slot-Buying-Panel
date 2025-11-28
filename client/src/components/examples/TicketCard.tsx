import TicketCard from '../TicketCard';

export default function TicketCardExample() {
  return (
    <div className="max-w-sm">
      <TicketCard
        id="T001"
        ticketNumber="TKT-2024-156"
        subject="Order delivery delayed - Need urgent help"
        category="Shipping"
        priority="high"
        status="in_progress"
        createdAt="Nov 27, 2024"
        messageCount={5}
        assignedTo="Support Team"
        onView={() => console.log('View ticket')}
      />
    </div>
  );
}
