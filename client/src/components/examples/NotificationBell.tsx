import NotificationBell from '../NotificationBell';

// todo: remove mock functionality
const mockNotifications = [
  {
    id: '1',
    type: 'order' as const,
    title: 'Order Approved',
    message: 'Your order #ORD-2024-156 has been approved and is being processed.',
    timestamp: '2 min ago',
    read: false,
  },
  {
    id: '2',
    type: 'payment' as const,
    title: 'Payment Reminder',
    message: 'Slot fee payment is due in 3 days. Please complete the payment.',
    timestamp: '1 hour ago',
    read: false,
  },
  {
    id: '3',
    type: 'target' as const,
    title: 'Target Achievement',
    message: 'Congratulations! You have reached 80% of your monthly target.',
    timestamp: 'Yesterday',
    read: true,
  },
];

export default function NotificationBellExample() {
  return (
    <NotificationBell
      notifications={mockNotifications}
      onMarkAsRead={(id) => console.log('Mark as read:', id)}
      onMarkAllAsRead={() => console.log('Mark all as read')}
    />
  );
}
