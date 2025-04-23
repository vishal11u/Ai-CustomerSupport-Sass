import { MessageSquare, User } from "lucide-react"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  created_at: string
}

interface MessageListProps {
  messages: Message[]
}

export function MessageList({ messages }: MessageListProps) {
  if (messages?.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <MessageSquare className="h-8 w-8 mx-auto mb-2 opacity-50" />
        <p>No messages yet</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {messages?.map((message) => (
        <div
          key={message.id}
          className={`flex ${
            message.role === "assistant" ? "justify-start" : "justify-end"
          }`}
        >
          <div
            className={`max-w-[80%] rounded-lg px-4 py-2 ${
              message.role === "assistant"
                ? "bg-accent/50"
                : "bg-primary text-primary-foreground"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              {message.role === "assistant" ? (
                <MessageSquare className="h-4 w-4 text-primary" />
              ) : (
                <User className="h-4 w-4" />
              )}
              <span className="text-xs font-medium">
                {message.role === "assistant" ? "SupportGenie" : "You"}
              </span>
              <span className="text-xs text-muted-foreground">
                {new Date(message.created_at).toLocaleString()}
              </span>
            </div>
            <p className="text-sm">{message.content}</p>
          </div>
        </div>
      ))}
    </div>
  )
} 