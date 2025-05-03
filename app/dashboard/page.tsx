"use client"

import { useEffect, useState } from "react"
import { DeveloperOptions } from "@/components/DeveloperOptions"
import { EmailConfiguration } from "@/components/EmailConfiguration"
import { DashboardHeader } from "@/components/DashboardHeader"
import { DashboardStats } from "@/components/DashboardStats"
import { auth } from "@clerk/nextjs"
import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { 
  MessageSquare, 
  BarChart3, 
  BookOpen, 
  Plus, 
  TrendingUp, 
  Users, 
  Clock, 
  AlertCircle,
  ThumbsUp
} from "lucide-react";
import Link from "next/link";
import "@/lib/utils"; // Import for Date prototype extension
import { supabase } from "@/lib/supabase";
import ChatAnalytics from "@/components/ChatAnalytics";

interface DashboardData {
  recentConversations: {
    content: string;
    created_at: string;
    type?: string;
  }[];
  analytics: {
    totalConversations: number;
    averageResponseTime: number;
    messagesByType: {
      feedback: number;
      complaint: number;
      general: number;
    };
  };
  knowledgeBase: {
    totalDocuments: number;
    lastUpdated: string | null;
  };
}

export default function DashboardPage() {
  const [isDeveloper, setIsDeveloper] = useState(false)
  const [activeTab, setActiveTab] = useState("overview")

  useEffect(() => {
    // Check if user is a developer
    const checkDeveloperStatus = async () => {
      const { userId } = auth()
      if (userId) {
        // Here you would check the user's role in your database
        // For now, we'll just set it to true for demonstration
        setIsDeveloper(true)
      }
    }

    checkDeveloperStatus()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <DashboardHeader />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Dashboard</h1>
          {isDeveloper && <DeveloperOptions />}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <DashboardStats />
        </div>

        <div className="bg-card rounded-lg shadow">
          <div className="border-b">
            <div className="flex space-x-4 p-4">
              <button
                onClick={() => setActiveTab("overview")}
                className={`px-4 py-2 rounded-md ${
                  activeTab === "overview"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("email")}
                className={`px-4 py-2 rounded-md ${
                  activeTab === "email"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                Email Configuration
              </button>
              {isDeveloper && (
                <button
                  onClick={() => setActiveTab("workflow")}
                  className={`px-4 py-2 rounded-md ${
                    activeTab === "workflow"
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Workflow
                </button>
              )}
            </div>
          </div>

          <div className="p-6">
            {activeTab === "overview" && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">Welcome to SupportGenie</h2>
                <p className="text-muted-foreground">
                  Your AI-powered customer support platform. Get started by configuring your email settings
                  and setting up your knowledge base.
                </p>
              </div>
            )}

            {activeTab === "email" && <EmailConfiguration />}

            {activeTab === "workflow" && isDeveloper && (
              <div className="space-y-6">
                <h2 className="text-2xl font-semibold">System Workflow</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-muted p-6 rounded-lg">
                    <h3 className="text-lg font-medium mb-4">Chat Flow</h3>
                    <ol className="space-y-4">
                      <li className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-3">
                          1
                        </span>
                        <div>
                          <p className="font-medium">Customer Query</p>
                          <p className="text-sm text-muted-foreground">
                            Customer sends a message through the chat widget
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-3">
                          2
                        </span>
                        <div>
                          <p className="font-medium">AI Processing</p>
                          <p className="text-sm text-muted-foreground">
                            AI analyzes the query and generates a response
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-3">
                          3
                        </span>
                        <div>
                          <p className="font-medium">Response Delivery</p>
                          <p className="text-sm text-muted-foreground">
                            Response is sent to the customer
                          </p>
                        </div>
                      </li>
                    </ol>
                  </div>

                  <div className="bg-muted p-6 rounded-lg">
                    <h3 className="text-lg font-medium mb-4">Email Flow</h3>
                    <ol className="space-y-4">
                      <li className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-3">
                          1
                        </span>
                        <div>
                          <p className="font-medium">Contact Collection</p>
                          <p className="text-sm text-muted-foreground">
                            Collect contacts through chat or manual import
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-3">
                          2
                        </span>
                        <div>
                          <p className="font-medium">Template Creation</p>
                          <p className="text-sm text-muted-foreground">
                            Create and manage email templates
                          </p>
                        </div>
                      </li>
                      <li className="flex items-start">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary text-primary-foreground flex items-center justify-center mr-3">
                          3
                        </span>
                        <div>
                          <p className="font-medium">Email Automation</p>
                          <p className="text-sm text-muted-foreground">
                            Set up automated email sequences
                          </p>
                        </div>
                      </li>
                    </ol>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper function to calculate percentage
function calculatePercentage(value: number, total: number): number {
  if (total === 0) return 0;
  return Math.round((value / total) * 100);
}

// Helper function to get total messages
function getTotalMessages(messagesByType: { feedback: number; complaint: number; general: number }): number {
  return messagesByType.feedback + messagesByType.complaint + messagesByType.general;
}

async function getDashboardData(userId: string): Promise<DashboardData> {
  try {
    // Get recent messages
    const { data: messages, error: messagesError } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(5);

    if (messagesError) throw messagesError;

    // Get analytics data
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: analyticsMessages, error: analyticsError } = await supabase
      .from("chat_messages")
      .select("*")
      .eq("user_id", userId)
      .gte("created_at", thirtyDaysAgo.toISOString());

    if (analyticsError) throw analyticsError;

    // Calculate analytics
    const totalConversations = analyticsMessages.filter(
      (m) => m.role === "user"
    ).length;
    
    let totalResponseTime = 0;
    let responseCount = 0;

    analyticsMessages.forEach((message, index) => {
      if (message.role === "assistant" && index > 0) {
        const prevMessage = analyticsMessages[index - 1];
        if (prevMessage.role === "user") {
          const responseTime =
            (new Date(message.created_at).getTime() -
              new Date(prevMessage.created_at).getTime()) /
            60000; // Convert to minutes
          totalResponseTime += responseTime;
          responseCount++;
        }
      }
    });
    
    // Count messages by type
    const messagesByType = {
      feedback: analyticsMessages.filter(m => m.type === 'feedback').length,
      complaint: analyticsMessages.filter(m => m.type === 'complaint').length,
      general: analyticsMessages.filter(m => m.type === 'general' || !m.type).length
    };

    // Get knowledge base documents
    const { data: documents, error: documentsError } = await supabase
      .from("documents")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });

    if (documentsError) throw documentsError;

    return {
      recentConversations: messages || [],
      analytics: {
        totalConversations,
        averageResponseTime:
          responseCount > 0 ? totalResponseTime / responseCount : 0,
        messagesByType
      },
      knowledgeBase: {
        totalDocuments: documents?.length || 0,
        lastUpdated: documents?.[0]?.created_at || null,
      },
    };
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return {
      recentConversations: [],
      analytics: {
        totalConversations: 0,
        averageResponseTime: 0,
        messagesByType: {
          feedback: 0,
          complaint: 0,
          general: 0
        }
      },
      knowledgeBase: {
        totalDocuments: 0,
        lastUpdated: null,
      },
    };
  }
}
