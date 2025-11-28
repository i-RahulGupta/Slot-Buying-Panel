import { useState } from 'react';
import ChatPanel from '@/components/ChatPanel';
import TicketCard from '@/components/TicketCard';
import FormDialog from '@/components/FormDialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Plus, MessageSquare, Ticket } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

// todo: remove mock functionality
const mockContacts = [
  { id: '1', name: 'Rajesh Kumar', lastMessage: 'Thanks for the update!', timestamp: '10:30 AM', unread: 2, online: true },
  { id: '2', name: 'Priya Sharma', lastMessage: 'Order has been shipped', timestamp: 'Yesterday', unread: 0, online: false },
  { id: '3', name: 'Amit Patel', lastMessage: 'When will the stock arrive?', timestamp: 'Yesterday', unread: 1, online: true },
  { id: '4', name: 'Sunita Reddy', lastMessage: 'Please check my commission', timestamp: '2 days ago', unread: 0, online: false },
];

const mockMessages = [
  { id: '1', message: 'Hi, I have a question about my order.', sender: 'Rajesh Kumar', timestamp: '10:25 AM', isCurrentUser: false },
  { id: '2', message: 'Sure, I\'d be happy to help! What\'s the order number?', sender: 'Admin', timestamp: '10:27 AM', isCurrentUser: true },
  { id: '3', message: 'It\'s ORD-2024-156. The delivery seems delayed.', sender: 'Rajesh Kumar', timestamp: '10:28 AM', isCurrentUser: false },
  { id: '4', message: 'Let me check that for you. One moment please.', sender: 'Admin', timestamp: '10:29 AM', isCurrentUser: true },
  { id: '5', message: 'Thanks for the update!', sender: 'Rajesh Kumar', timestamp: '10:30 AM', isCurrentUser: false },
];

const mockTickets = [
  {
    id: 'T001',
    ticketNumber: 'TKT-2024-156',
    subject: 'Order delivery delayed - Need urgent help',
    category: 'Shipping',
    priority: 'high' as const,
    status: 'in_progress' as const,
    createdAt: 'Nov 27, 2024',
    messageCount: 5,
    assignedTo: 'Support Team',
  },
  {
    id: 'T002',
    ticketNumber: 'TKT-2024-155',
    subject: 'Commission calculation query',
    category: 'Billing',
    priority: 'medium' as const,
    status: 'pending' as const,
    createdAt: 'Nov 26, 2024',
    messageCount: 2,
    assignedTo: undefined,
  },
  {
    id: 'T003',
    ticketNumber: 'TKT-2024-152',
    subject: 'Product quality issue with batch #456',
    category: 'Quality',
    priority: 'high' as const,
    status: 'completed' as const,
    createdAt: 'Nov 24, 2024',
    messageCount: 8,
    assignedTo: 'Quality Team',
  },
  {
    id: 'T004',
    ticketNumber: 'TKT-2024-150',
    subject: 'Request for new product category',
    category: 'General',
    priority: 'low' as const,
    status: 'pending' as const,
    createdAt: 'Nov 23, 2024',
    messageCount: 1,
    assignedTo: undefined,
  },
];

export default function SupportPage() {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [activeTab, setActiveTab] = useState('chat');
  const [currentContact, setCurrentContact] = useState(mockContacts[0]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <div>
          <h1 className="text-2xl font-bold">Support & Communication</h1>
          <p className="text-muted-foreground">
            {isAdmin ? 'Manage buyer communications and tickets' : 'Get help and track your issues'}
          </p>
        </div>
        <FormDialog
          trigger={
            <Button data-testid="create-ticket-button">
              <Plus className="h-4 w-4 mr-2" />
              New Ticket
            </Button>
          }
          title="Create Support Ticket"
          description="Describe your issue and we'll get back to you soon."
          fields={[
            { name: 'subject', label: 'Subject', type: 'text', placeholder: 'Brief description of the issue', required: true },
            { name: 'category', label: 'Category', type: 'select', options: [
              { value: 'shipping', label: 'Shipping & Delivery' },
              { value: 'billing', label: 'Billing & Payments' },
              { value: 'quality', label: 'Product Quality' },
              { value: 'general', label: 'General Inquiry' },
            ], required: true },
            { name: 'priority', label: 'Priority', type: 'select', options: [
              { value: 'low', label: 'Low' },
              { value: 'medium', label: 'Medium' },
              { value: 'high', label: 'High' },
            ], required: true },
            { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Provide details about your issue...', required: true },
          ]}
          onSubmit={(data) => console.log('Create ticket:', data)}
          submitLabel="Create Ticket"
        />
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="chat" data-testid="tab-chat">
            <MessageSquare className="h-4 w-4 mr-2" />
            Chat
          </TabsTrigger>
          <TabsTrigger value="tickets" data-testid="tab-tickets">
            <Ticket className="h-4 w-4 mr-2" />
            Tickets
          </TabsTrigger>
        </TabsList>

        <TabsContent value="chat" className="mt-4">
          <ChatPanel
            contacts={mockContacts}
            messages={mockMessages}
            currentContact={currentContact}
            onSelectContact={setCurrentContact}
            onSendMessage={(msg) => console.log('Send message:', msg)}
          />
        </TabsContent>

        <TabsContent value="tickets" className="mt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockTickets.map((ticket) => (
              <TicketCard
                key={ticket.id}
                {...ticket}
                onView={() => console.log('View ticket:', ticket.id)}
              />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
