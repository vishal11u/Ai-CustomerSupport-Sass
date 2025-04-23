"use client";

import { ChatWidget } from "@/components/ChatWidget";
import  ChatAnalytics  from "@/components/ChatAnalytics";

interface ClientChatPageProps {
  userId: string;
}

export function ClientChatPage({ userId }: ClientChatPageProps) {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Chat with SupportGenie</h1>
      
      {/* Analytics Section */}
      <ChatAnalytics />
      
      {/* Chat Widget */}
      <div className="max-w-4xl mx-auto">
        <ChatWidget userId={userId} />
      </div>
    </div>
  );
} 