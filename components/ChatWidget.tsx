"use client"

import { useState, useRef, useEffect } from "react"
import { Send, MessageSquare, X, Bot, User, ThumbsUp, AlertCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"
import { GenerateAIContent } from "@/utils/AiModal"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { supabase } from "@/lib/supabase"

interface Message {
  role: "user" | "assistant"
  content: string
  type?: "feedback" | "complaint" | "general"
  timestamp?: Date
}

interface ChatWidgetProps {
  userId: string;
}

export function ChatWidget({ userId }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messageType, setMessageType] = useState<"feedback" | "complaint" | "general">("general")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Load existing messages for this user
  useEffect(() => {
    const loadMessages = async () => {
      try {
        const { data, error } = await supabase
          .from('chat_messages')
          .select('*')
          .eq('user_id', userId)
          .order('created_at', { ascending: true });
        
        if (error) throw error;
        
        if (data) {
          setMessages(data.map(msg => ({
            role: msg.role,
            content: msg.content,
            type: msg.type,
            timestamp: new Date(msg.created_at)
          })));
        }
      } catch (error) {
        console.error('Error loading messages:', error);
        toast({
          title: "Error",
          description: "Failed to load chat history.",
          variant: "destructive",
        });
      }
    };

    if (userId) {
      loadMessages();
    }
  }, [userId]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = input.trim()
    setInput("")
    setIsLoading(true)

    // Create new message
    const newUserMessage: Message = {
      role: "user",
      content: userMessage,
      type: messageType,
      timestamp: new Date()
    }

    try {
      // Save user message to Supabase
      const { error: saveError } = await supabase
        .from('chat_messages')
        .insert({
          user_id: userId,
          role: 'user',
          content: userMessage,
          type: messageType,
          created_at: new Date().toISOString()
        });

      if (saveError) throw saveError;

      setMessages(prev => [...prev, newUserMessage])

      // Generate AI response
      const aiResponse = await GenerateAIContent(
        { message: userMessage },
        { 
          aiPrompt: `You are a helpful AI assistant. Please respond to the user's ${messageType} message.`,
          slug: "chat" 
        }
      )

      // Create AI message
      const newAiMessage: Message = {
        role: "assistant",
        content: aiResponse,
        type: messageType,
        timestamp: new Date()
      }

      // Save AI message to Supabase
      const { error: aiSaveError } = await supabase
        .from('chat_messages')
        .insert({
          user_id: userId,
          role: 'assistant',
          content: aiResponse,
          type: messageType,
          created_at: new Date().toISOString()
        });

      if (aiSaveError) throw aiSaveError;

      setMessages(prev => [...prev, newAiMessage])
    } catch (error) {
      console.error("Error in chat interaction:", error)
      toast({
        title: "Error",
        description: "Failed to process message. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <AnimatePresence>
        {!isOpen ? (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary/80 text-primary-foreground shadow-lg hover:from-primary/90 hover:to-primary/70 transition-all duration-300"
          >
            <MessageSquare className="h-6 w-6" />
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className={`h-[600px] w-[400px] rounded-lg border bg-background shadow-lg overflow-hidden ${
              isMinimized ? "h-[60px]" : ""
            }`}
          >
            <div className="flex h-14 items-center justify-between border-b px-4 bg-gradient-to-r from-primary/10 to-transparent">
              <div className="flex items-center gap-2">
                <Bot className="h-5 w-5 text-primary" />
                <h3 className="font-semibold">SupportGenie</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="rounded-full p-1 hover:bg-accent transition-colors"
                >
                  <X className="h-4 w-4 rotate-45" />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-1 hover:bg-accent transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                <div className="p-4 border-b">
                  <Tabs defaultValue="general" onValueChange={(value) => setMessageType(value as "feedback" | "complaint" | "general")}>
                    <TabsList className="grid w-full grid-cols-3">
                      <TabsTrigger value="feedback" className="flex items-center gap-2">
                        <ThumbsUp className="h-4 w-4" />
                        Feedback
                      </TabsTrigger>
                      <TabsTrigger value="complaint" className="flex items-center gap-2">
                        <AlertCircle className="h-4 w-4" />
                        Complaint
                      </TabsTrigger>
                      <TabsTrigger value="general" className="flex items-center gap-2">
                        <MessageSquare className="h-4 w-4" />
                        General
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>

                <div className="flex h-[calc(100%-14rem)] flex-col overflow-y-auto p-4 space-y-4">
                  {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                      <Bot className="h-12 w-12 mb-4 text-primary/50" />
                      <p className="text-lg font-medium">How can I help you today?</p>
                      <p className="text-sm">Select a message type and ask me anything.</p>
                    </div>
                  )}
                  {messages.map((message, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${
                        message.role === "assistant" ? "justify-start" : "justify-end"
                      }`}
                    >
                      <div
                        className={`max-w-[80%] rounded-lg px-4 py-2 ${
                          message.role === "assistant"
                            ? "bg-accent/50"
                            : message.type === "feedback"
                            ? "bg-green-600 text-white"
                            : message.type === "complaint"
                            ? "bg-red-600 text-white"
                            : "bg-primary text-primary-foreground"
                        }`}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {message.role === "assistant" ? (
                            <Bot className="h-4 w-4 text-primary" />
                          ) : (
                            <User className="h-4 w-4" />
                          )}
                          <span className="text-xs font-medium">
                            {message.role === "assistant" ? "SupportGenie" : "You"}
                          </span>
                          {message.type && (
                            <span className={`text-xs px-2 py-0.5 rounded-full ${
                              message.type === "feedback"
                                ? "bg-green-200 text-green-800"
                                : message.type === "complaint"
                                ? "bg-red-200 text-red-800"
                                : "bg-gray-200 text-gray-800"
                            }`}>
                              {message.type}
                            </span>
                          )}
                          {message.timestamp && (
                            <span className="text-xs text-muted-foreground ml-auto">
                              {new Date(message.timestamp).toLocaleTimeString([], { 
                                hour: '2-digit', 
                                minute: '2-digit' 
                              })}
                            </span>
                          )}
                        </div>
                        <p className="text-sm whitespace-pre-wrap break-words">{message.content}</p>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="flex justify-start"
                    >
                      <div className="max-w-[80%] rounded-lg bg-accent/50 px-4 py-2">
                        <div className="flex items-center gap-2 mb-1">
                          <Bot className="h-4 w-4 text-primary" />
                          <span className="text-xs font-medium">SupportGenie</span>
                        </div>
                        <div className="flex gap-1">
                          <div className="h-2 w-2 rounded-full bg-primary animate-bounce" />
                          <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:0.2s]" />
                          <div className="h-2 w-2 rounded-full bg-primary animate-bounce [animation-delay:0.4s]" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="flex items-center gap-2 border-t p-4 bg-background"
                >
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-gradient-to-r from-primary to-primary/80 text-primary-foreground hover:from-primary/90 hover:to-primary/70 transition-all duration-300 disabled:opacity-50"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 