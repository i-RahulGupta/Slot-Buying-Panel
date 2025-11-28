import CommissionCard from '../CommissionCard';

export default function CommissionCardExample() {
  return (
    <div className="max-w-md">
      <CommissionCard
        totalEarned={125000}
        pendingAmount={25000}
        paidAmount={100000}
        recentCommissions={[
          { orderId: 'ORD-001', amount: 5000, status: 'paid', date: 'Nov 25, 2024' },
          { orderId: 'ORD-002', amount: 7500, status: 'paid', date: 'Nov 23, 2024' },
          { orderId: 'ORD-003', amount: 4200, status: 'pending', date: 'Nov 20, 2024' },
        ]}
        onDownloadStatement={() => console.log('Download statement')}
      />
    </div>
  );
}
