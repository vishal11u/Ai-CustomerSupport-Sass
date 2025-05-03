"use client"

import { useState, useRef, useEffect } from "react"
import { Send, MessageSquare, X, Bot, User, ThumbsUp, AlertCircle, Wrench, CreditCard, Minimize2, Maximize2 } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { useToast } from "@/components/ui/use-toast"
import { GenerateAIContent } from "@/utils/AiModal"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { supabase } from "@/lib/supabase"

interface Message {
  role: "user" | "assistant"
  content: string
  type?: string
  type_name?: string
  type_color?: string
  type_icon?: string
  timestamp?: Date
}

interface MessageType {
  id: number
  code: string
  name: string
  description: string
  color: string
  icon: string
}

interface ChatWidgetProps {
  userId?: string;
}

// Helper function to get the appropriate icon component
const getIconComponent = (iconName: string) => {
  switch (iconName) {
    case 'message-square':
      return <MessageSquare className="h-4 w-4" />;
    case 'thumbs-up':
      return <ThumbsUp className="h-4 w-4" />;
    case 'alert-circle':
      return <AlertCircle className="h-4 w-4" />;
    case 'tool':
    case 'wrench':
      return <Wrench className="h-4 w-4" />;
    case 'credit-card':
      return <CreditCard className="h-4 w-4" />;
    default:
      return <MessageSquare className="h-4 w-4" />;
  }
};

export function ChatWidget({ userId }: ChatWidgetProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [messageType, setMessageType] = useState<string>("general")
  const [messageTypes, setMessageTypes] = useState<MessageType[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Load message types from database
  useEffect(() => {
    const loadMessageTypes = async () => {
      try {
        const { data, error } = await supabase
          .from('message_types')
          .select('*')
          .order('id', { ascending: true });
        
        if (error) throw error;
        
        if (data && data.length > 0) {
          setMessageTypes(data);
        } else {
          // Fallback to default message types if none found in database
          setMessageTypes([
            { id: 1, code: 'general', name: 'General', description: 'General inquiries', color: '#8b5cf6', icon: 'message-square' },
            { id: 2, code: 'feedback', name: 'Feedback', description: 'User feedback', color: '#ec4899', icon: 'thumbs-up' },
            { id: 3, code: 'complaint', name: 'Complaint', description: 'User complaints', color: '#3b82f6', icon: 'alert-circle' }
          ]);
        }
      } catch (error) {
        console.error('Error loading message types:', error);
        // Fallback to default message types
        setMessageTypes([
          { id: 1, code: 'general', name: 'General', description: 'General inquiries', color: '#8b5cf6', icon: 'message-square' },
          { id: 2, code: 'feedback', name: 'Feedback', description: 'User feedback', color: '#ec4899', icon: 'thumbs-up' },
          { id: 3, code: 'complaint', name: 'Complaint', description: 'User complaints', color: '#3b82f6', icon: 'alert-circle' }
        ]);
      }
    };

    loadMessageTypes();
  }, []);

  // Load existing messages for this user
  useEffect(() => {
    const loadMessages = async () => {
      if (!userId) {
        // For guest users, initialize with a welcome message
        setMessages([{
          role: "assistant",
          content: "Hello! I'm SupportGenie. How can I help you today?",
          type: "general",
          type_name: "General",
          type_color: "#8b5cf6",
          type_icon: "message-square",
          timestamp: new Date()
        }]);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('chat_messages')
          .select(`
            *,
            message_types (
              name,
              color,
              icon
            )
          `)
          .eq('user_id', userId)
          .order('created_at', { ascending: true });
        
        if (error) throw error;
        
        if (data) {
          setMessages(data.map(msg => ({
            role: msg.role,
            content: msg.content,
            type: msg.type,
            type_name: msg.message_types?.name,
            type_color: msg.message_types?.color,
            type_icon: msg.message_types?.icon,
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

    loadMessages();
  }, [userId, toast]);

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

    // Find selected message type information
    const selectedType = messageTypes.find(type => type.code === messageType) || 
                        { id: 0, code: messageType, name: messageType, description: '', color: '#8b5cf6', icon: 'message-square' };

    // Create new message
    const newUserMessage: Message = {
      role: "user",
      content: userMessage,
      type: selectedType.code,
      type_name: selectedType.name,
      type_color: selectedType.color,
      type_icon: selectedType.icon,
      timestamp: new Date()
    }

    // Immediately add user message to the chat
    setMessages(prev => [...prev, newUserMessage])

    try {
      // Save user message to Supabase only if user is logged in
      if (userId) {
        const { error: saveError } = await supabase
          .from('chat_messages')
          .insert({
            user_id: userId,
            role: 'user',
            content: userMessage,
            type: selectedType.code,
            message_type_id: selectedType.id || null,
            created_at: new Date().toISOString()
          });

        if (saveError) throw saveError;
      }

      // Generate AI response
      const aiResponse = await GenerateAIContent(
        { message: userMessage },
        { 
          aiPrompt: `You are a helpful AI assistant. Please respond to the user's ${selectedType.name} message.`,
          slug: "chat" 
        }
      )

      // Create AI message
      const newAiMessage: Message = {
        role: "assistant",
        content: aiResponse,
        type: selectedType.code,
        type_name: selectedType.name,
        type_color: selectedType.color,
        type_icon: selectedType.icon,
        timestamp: new Date()
      }

      // Save AI message to Supabase only if user is logged in
      if (userId) {
        const { error: aiSaveError } = await supabase
          .from('chat_messages')
          .insert({
            user_id: userId,
            role: 'assistant',
            content: aiResponse,
            type: selectedType.code,
            message_type_id: selectedType.id || null,
            created_at: new Date().toISOString()
          });

        if (aiSaveError) throw aiSaveError;
      }

      // Add AI response to the chat
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
            className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white shadow-lg hover:shadow-purple-500/20 transition-all duration-300"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MessageSquare className="h-6 w-6" />
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
            className={`w-full sm:w-[350px] md:w-[400px] rounded-2xl border border-purple-500/20 bg-background/95 backdrop-blur-sm shadow-xl overflow-hidden ${
              isMinimized ? "h-[60px]" : "h-[500px] sm:h-[600px]"
            }`}
            style={{ boxShadow: '0 10px 25px -5px rgba(139, 92, 246, 0.3)' }}
          >
            <div className="flex h-[60px] items-center justify-between border-b border-purple-500/10 px-4 bg-gradient-to-r from-purple-500/10 via-pink-500/5 to-indigo-500/10">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600">
                  <Bot className="h-4 w-4 text-white" />
                </div>
                <h3 className="font-semibold bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">SupportGenie</h3>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="rounded-full p-2 hover:bg-purple-500/10 transition-colors"
                >
                  {isMinimized ? <Maximize2 className="h-4 w-4 text-purple-600" /> : <Minimize2 className="h-4 w-4 text-purple-600" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="rounded-full p-2 hover:bg-purple-500/10 transition-colors"
                >
                  <X className="h-4 w-4 text-purple-600" />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                <div className="p-3 border-b border-purple-500/10">
                  <Tabs defaultValue="general" onValueChange={(value) => setMessageType(value)}>
                    <TabsList className="grid w-full grid-cols-3 bg-purple-500/5 p-1">
                      {messageTypes.slice(0, 3).map((type) => (
                        <TabsTrigger 
                          key={type.code} 
                          value={type.code} 
                          className="flex items-center gap-1.5 data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-600 data-[state=active]:to-indigo-600 data-[state=active]:text-white"
                        >
                          {getIconComponent(type.icon)}
                          <span className="text-xs sm:text-sm">{type.name}</span>
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </Tabs>
                </div>

                <div className="flex h-[calc(100%-14rem)] flex-col overflow-y-auto p-4 space-y-4">
                  {messages.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                      <div className="relative w-20 h-20 mb-4">
                        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-indigo-600/20 animate-pulse"></div>
                        <div className="absolute inset-2 rounded-full bg-background flex items-center justify-center">
                          <Bot className="h-8 w-8 text-purple-600" />
                        </div>
                      </div>
                      <p className="text-lg font-medium bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">How can I help you today?</p>
                      <p className="text-sm mt-1">Select a message type and ask me anything.</p>
                    </div>
                  )}
                  {messages.map((message, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                      className={`flex ${
                        message.role === "assistant" ? "justify-start" : "justify-end"
                      }`}
                    >
                      <div
                        className={`max-w-[85%] rounded-2xl px-4 py-3 ${
                          message.role === "assistant"
                            ? "bg-purple-500/10 border border-purple-500/10"
                            : message.type_color 
                              ? `text-white`
                              : "bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
                        }`}
                        style={message.role !== "assistant" && message.type_color ? {backgroundColor: message.type_color} : {}}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          {message.role === "assistant" ? (
                            <Bot className="h-4 w-4 text-purple-600" />
                          ) : (
                            <User className="h-4 w-4" />
                          )}
                          <span className="text-xs font-medium">
                            {message.role === "assistant" ? "SupportGenie" : "You"}
                          </span>
                          {message.type && message.role === "user" && (
                            <span className="text-xs px-2 py-0.5 rounded-full bg-white/20">
                              {message.type_name || message.type}
                            </span>
                          )}
                          {message.timestamp && (
                            <span className="text-xs text-muted-foreground ml-auto opacity-70">
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
                      <div className="max-w-[85%] rounded-2xl bg-purple-500/10 border border-purple-500/10 px-4 py-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Bot className="h-4 w-4 text-purple-600" />
                          <span className="text-xs font-medium">SupportGenie</span>
                        </div>
                        <div className="flex gap-1.5">
                          <div className="h-2 w-2 rounded-full bg-purple-600 animate-bounce" />
                          <div className="h-2 w-2 rounded-full bg-pink-600 animate-bounce [animation-delay:0.2s]" />
                          <div className="h-2 w-2 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.4s]" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                <form
                  onSubmit={handleSubmit}
                  className="flex items-center gap-2 p-3 border-t border-purple-500/10 bg-gradient-to-r from-purple-500/5 via-transparent to-indigo-500/5"
                >
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 rounded-full border border-purple-500/20 bg-background/80 backdrop-blur-sm px-4 py-2.5 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-purple-500 focus-visible:border-purple-500 disabled:cursor-not-allowed disabled:opacity-50"
                    disabled={isLoading}
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !input.trim()}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white shadow-sm hover:shadow-purple-500/20 transition-all duration-300 disabled:opacity-50"
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