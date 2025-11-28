import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import ChatMessage from './ChatMessage';
import { Send, Paperclip } from 'lucide-react';

interface Message {
  id: string;
  message: string;
  sender: string;
  timestamp: string;
  isCurrentUser: boolean;
}

interface ChatContact {
  id: string;
  name: string;
  lastMessage: string;
  timestamp: string;
  unread: number;
  online: boolean;
}

interface ChatPanelProps {
  contacts: ChatContact[];
  messages: Message[];
  currentContact?: ChatContact;
  onSelectContact?: (contact: ChatContact) => void;
  onSendMessage?: (message: string) => void;
}

export default function ChatPanel({
  contacts,
  messages,
  currentContact,
  onSelectContact,
  onSendMessage,
}: ChatPanelProps) {
  const [newMessage, setNewMessage] = useState('');

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage?.(newMessage);
      setNewMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="h-[600px] flex overflow-hidden">
      <div className="w-1/3 border-r flex flex-col">
        <CardHeader className="pb-3 border-b shrink-0">
          <CardTitle className="text-lg">Conversations</CardTitle>
        </CardHeader>
        <ScrollArea className="flex-1">
          {contacts.map((contact) => (
            <div
              key={contact.id}
              className={`p-3 cursor-pointer hover-elevate ${currentContact?.id === contact.id ? 'bg-muted' : ''}`}
              onClick={() => onSelectContact?.(contact)}
              data-testid={`chat-contact-${contact.id}`}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <Avatar className="h-10 w-10">
                    <AvatarFallback>
                      {contact.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span className={`absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-background ${
                    contact.online ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-medium text-sm truncate">{contact.name}</p>
                    <span className="text-xs text-muted-foreground shrink-0">{contact.timestamp}</span>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">{contact.lastMessage}</p>
                </div>
                {contact.unread > 0 && (
                  <span className="bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center shrink-0">
                    {contact.unread}
                  </span>
                )}
              </div>
            </div>
          ))}
        </ScrollArea>
      </div>

      <div className="flex-1 flex flex-col">
        {currentContact ? (
          <>
            <CardHeader className="pb-3 border-b shrink-0">
              <div className="flex items-center gap-3">
                <Avatar className="h-9 w-9">
                  <AvatarFallback>
                    {currentContact.name.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{currentContact.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {currentContact.online ? 'Online' : 'Offline'}
                  </p>
                </div>
              </div>
            </CardHeader>

            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((msg) => (
                  <ChatMessage key={msg.id} {...msg} />
                ))}
              </div>
            </ScrollArea>

            <div className="p-4 border-t">
              <div className="flex gap-2">
                <Button variant="ghost" size="icon" data-testid="attach-file">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="flex-1"
                  data-testid="chat-input"
                />
                <Button onClick={handleSend} data-testid="send-message">
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            Select a conversation to start chatting
          </div>
        )}
      </div>
    </Card>
  );
}
