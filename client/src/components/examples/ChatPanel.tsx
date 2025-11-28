import { useState } from 'react';
import ChatPanel from '../ChatPanel';

// todo: remove mock functionality
const mockContacts = [
  { id: '1', name: 'Rajesh Kumar', lastMessage: 'Thanks for the update!', timestamp: '10:30 AM', unread: 2, online: true },
  { id: '2', name: 'Priya Sharma', lastMessage: 'Order has been shipped', timestamp: 'Yesterday', unread: 0, online: false },
  { id: '3', name: 'Amit Patel', lastMessage: 'When will the stock arrive?', timestamp: 'Yesterday', unread: 1, online: true },
];

const mockMessages = [
  { id: '1', message: 'Hi, I have a question about my order.', sender: 'Rajesh Kumar', timestamp: '10:25 AM', isCurrentUser: false },
  { id: '2', message: 'Sure, I\'d be happy to help! What\'s the order number?', sender: 'Admin', timestamp: '10:27 AM', isCurrentUser: true },
  { id: '3', message: 'It\'s ORD-2024-156. The delivery seems delayed.', sender: 'Rajesh Kumar', timestamp: '10:28 AM', isCurrentUser: false },
  { id: '4', message: 'Let me check that for you. One moment please.', sender: 'Admin', timestamp: '10:29 AM', isCurrentUser: true },
  { id: '5', message: 'Thanks for the update!', sender: 'Rajesh Kumar', timestamp: '10:30 AM', isCurrentUser: false },
];

export default function ChatPanelExample() {
  const [currentContact, setCurrentContact] = useState(mockContacts[0]);
  
  return (
    <ChatPanel
      contacts={mockContacts}
      messages={mockMessages}
      currentContact={currentContact}
      onSelectContact={(c) => setCurrentContact(c)}
      onSendMessage={(msg) => console.log('Send:', msg)}
    />
  );
}
