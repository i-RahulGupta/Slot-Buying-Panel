import ChatMessage from '../ChatMessage';

export default function ChatMessageExample() {
  return (
    <div className="space-y-4 max-w-lg">
      <ChatMessage
        id="1"
        message="Hi, I have a question about my recent order."
        sender="Rajesh Kumar"
        timestamp="10:30 AM"
        isCurrentUser={false}
      />
      <ChatMessage
        id="2"
        message="Sure, I'd be happy to help! What's your order number?"
        sender="Admin"
        timestamp="10:32 AM"
        isCurrentUser={true}
      />
    </div>
  );
}
