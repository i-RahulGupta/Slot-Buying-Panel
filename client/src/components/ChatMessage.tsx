import { Avatar, AvatarFallback } from '@/components/ui/avatar';

interface ChatMessageProps {
  id: string;
  message: string;
  sender: string;
  timestamp: string;
  isCurrentUser: boolean;
}

export default function ChatMessage({ id, message, sender, timestamp, isCurrentUser }: ChatMessageProps) {
  return (
    <div 
      className={`flex gap-3 ${isCurrentUser ? 'flex-row-reverse' : ''}`}
      data-testid={`chat-message-${id}`}
    >
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback className={isCurrentUser ? 'bg-primary text-primary-foreground' : 'bg-muted'}>
          {sender.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase()}
        </AvatarFallback>
      </Avatar>
      <div className={`flex flex-col max-w-[70%] ${isCurrentUser ? 'items-end' : 'items-start'}`}>
        <span className="text-xs text-muted-foreground mb-1">{sender}</span>
        <div className={`px-4 py-2 rounded-lg ${
          isCurrentUser 
            ? 'bg-primary text-primary-foreground rounded-br-none' 
            : 'bg-muted rounded-bl-none'
        }`}>
          <p className="text-sm">{message}</p>
        </div>
        <span className="text-xs text-muted-foreground mt-1">{timestamp}</span>
      </div>
    </div>
  );
}
