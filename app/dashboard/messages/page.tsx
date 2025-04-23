"use client";

import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, AlertCircle, ThumbsUp, Users, HelpCircle } from "lucide-react";
import { MessageList } from "@/components/MessageList";

interface Message {
  id: string;
  content: string;
  role: string;
  created_at: string;
}

interface CategorizedMessages {
  complaints: Message[];
  feedback: Message[];
  queries: Message[];
  user: Message[];
}

export default function MessagesDashboard() {
  const [messages, setMessages] = useState<CategorizedMessages>({
    complaints: [],
    feedback: [],
    queries: [],
    user: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      const response = await fetch("/api/messages");
      if (!response.ok) throw new Error("Failed to fetch messages");
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Messages Dashboard</h1>
      
      <Tabs defaultValue="queries" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="queries" className="flex items-center gap-2">
            <HelpCircle className="h-4 w-4" />
            Queries
          </TabsTrigger>
          <TabsTrigger value="feedback" className="flex items-center gap-2">
            <ThumbsUp className="h-4 w-4" />
            Feedback
          </TabsTrigger>
          <TabsTrigger value="complaints" className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Complaints
          </TabsTrigger>
          <TabsTrigger value="user" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            User Messages
          </TabsTrigger>
        </TabsList>

        <TabsContent value="queries">
          <Card>
            <CardHeader>
              <CardTitle>Customer Queries</CardTitle>
            </CardHeader>
            <CardContent>
              <MessageList messages={messages.queries} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>Feedback Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <MessageList messages={messages.feedback} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="complaints">
          <Card>
            <CardHeader>
              <CardTitle>Complaint Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <MessageList messages={messages.complaints} />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="user">
          <Card>
            <CardHeader>
              <CardTitle>User Related Messages</CardTitle>
            </CardHeader>
            <CardContent>
              <MessageList messages={messages.user} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
} 