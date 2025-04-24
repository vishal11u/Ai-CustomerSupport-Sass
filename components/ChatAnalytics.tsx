"use client";

import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, AlertCircle, ThumbsUp } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface ChatMessage {
  id: string;
  user_id: string;
  content: string;
  role: 'user' | 'assistant';
  type: 'feedback' | 'complaint' | 'general';
  created_at: string;
}

interface ChatStats {
  feedback: number;
  complaints: number;
  general: number;
  total: number;
}

function ChatAnalytics() {
  const [messages, setMessages] = useState<{
    feedback: ChatMessage[];
    complaints: ChatMessage[];
    general: ChatMessage[];
  }>({
    feedback: [],
    complaints: [],
    general: []
  });
  
  const [stats, setStats] = useState<ChatStats>({
    feedback: 0,
    complaints: 0,
    general: 0,
    total: 0
  });
  
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchChatData() {
      try {
        // Fetch messages from Supabase
        const { data, error } = await supabase
          .from('chat_messages')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(50);
        
        if (error) throw error;
        
        // Categorize messages
        const categorizedMessages = {
          feedback: data?.filter(msg => msg.type === 'feedback') || [],
          complaints: data?.filter(msg => msg.type === 'complaint') || [],
          general: data?.filter(msg => msg.type === 'general') || []
        };
        
        // Calculate stats
        const chatStats = {
          feedback: categorizedMessages.feedback.length,
          complaints: categorizedMessages.complaints.length,
          general: categorizedMessages.general.length,
          total: data?.length || 0
        };
        
        setMessages(categorizedMessages);
        setStats(chatStats);
      } catch (error) {
        console.error('Error fetching chat data:', error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchChatData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Chat Analytics</h2>
      
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Feedback</CardTitle>
            <ThumbsUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.feedback}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Complaints</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.complaints}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">General</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.general}</div>
          </CardContent>
        </Card>
      </div>
      
      {/* Message Tabs */}
      <Tabs defaultValue="feedback" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="feedback" className="flex items-center gap-2">
            <ThumbsUp className="h-4 w-4" />
            Feedback
          </TabsTrigger>
          <TabsTrigger value="complaints" className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Complaints
          </TabsTrigger>
          <TabsTrigger value="general" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            General
          </TabsTrigger>
        </TabsList>

        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>User Feedback</CardTitle>
            </CardHeader>
            <CardContent>
              {messages.feedback.length === 0 ? (
                <p className="text-muted-foreground">No feedback messages yet.</p>
              ) : (
                <div className="space-y-4">
                  {messages.feedback.map((message) => (
                    <div key={message.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                          Feedback
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(message.created_at).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="complaints">
          <Card>
            <CardHeader>
              <CardTitle>User Complaints</CardTitle>
            </CardHeader>
            <CardContent>
              {messages.complaints.length === 0 ? (
                <p className="text-muted-foreground">No complaint messages yet.</p>
              ) : (
                <div className="space-y-4">
                  {messages.complaints.map((message) => (
                    <div key={message.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                          Complaint
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(message.created_at).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>General Messages</CardTitle>
            </CardHeader>
            <CardContent>
              {messages.general.length === 0 ? (
                <p className="text-muted-foreground">No general messages yet.</p>
              ) : (
                <div className="space-y-4">
                  {messages.general.map((message) => (
                    <div key={message.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                          General
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {new Date(message.created_at).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm">{message.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default ChatAnalytics;