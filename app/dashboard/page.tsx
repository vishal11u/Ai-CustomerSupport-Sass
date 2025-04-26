import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
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

export default async function DashboardPage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  // Fetch dashboard data
  const dashboardData = await getDashboardData(userId);

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto p-4">
        {/* Header with greeting and user button */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Welcome back! Here's an overview of your support system.
            </p>
          </div>
          {/* <UserButton afterSignOutUrl="/" /> */}
        </div>

        {/* Quick Stats */}
        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Conversations</p>
                <p className="text-2xl font-bold">{dashboardData.analytics.totalConversations}</p>
              </div>
              <div className="rounded-full bg-primary/10 p-2">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Avg. Response Time</p>
                <p className="text-2xl font-bold">{dashboardData.analytics.averageResponseTime.toFixed(1)} min</p>
              </div>
              <div className="rounded-full bg-primary/10 p-2">
                <Clock className="h-5 w-5 text-primary" />
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Knowledge Base</p>
                <p className="text-2xl font-bold">{dashboardData.knowledgeBase.totalDocuments}</p>
              </div>
              <div className="rounded-full bg-primary/10 p-2">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
            </div>
          </div>
          
          <div className="rounded-lg border bg-card p-4 shadow-sm transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Feedback</p>
                <p className="text-2xl font-bold">{dashboardData.analytics.messagesByType.feedback}</p>
              </div>
              <div className="rounded-full bg-primary/10 p-2">
                <ThumbsUp className="h-5 w-5 text-primary" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Link
              href="/chat"
              className="flex items-center gap-3 rounded-lg border p-4 shadow-sm transition-all hover:bg-accent hover:shadow-md"
            >
              <div className="rounded-full bg-primary/10 p-2">
                <MessageSquare className="h-5 w-5 text-primary" />
              </div>
              <span>New Chat</span>
            </Link>
            <Link
              href="/knowledge-base"
              className="flex items-center gap-3 rounded-lg border p-4 shadow-sm transition-all hover:bg-accent hover:shadow-md"
            >
              <div className="rounded-full bg-primary/10 p-2">
                <BookOpen className="h-5 w-5 text-primary" />
              </div>
              <span>Knowledge Base</span>
            </Link>
            <Link
              href="/analytics"
              className="flex items-center gap-3 rounded-lg border p-4 shadow-sm transition-all hover:bg-accent hover:shadow-md"
            >
              <div className="rounded-full bg-primary/10 p-2">
                <BarChart3 className="h-5 w-5 text-primary" />
              </div>
              <span>Analytics</span>
            </Link>
            <Link
              href="/settings"
              className="flex items-center gap-3 rounded-lg border p-4 shadow-sm transition-all hover:bg-accent hover:shadow-md"
            >
              <div className="rounded-full bg-primary/10 p-2">
                <Plus className="h-5 w-5 text-primary" />
              </div>
              <span>Settings</span>
            </Link>
          </div>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Recent Conversations */}
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Recent Conversations</h2>
            <div className="space-y-3">
              {dashboardData.recentConversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                  <MessageSquare className="mb-2 h-10 w-10 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">
                    No recent conversations
                  </p>
                  <Link 
                    href="/chat" 
                    className="mt-4 inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
                  >
                    Start a chat
                  </Link>
                </div>
              ) : (
                dashboardData.recentConversations.map((conv, i) => (
                  <div key={i} className="rounded-lg border bg-card p-3 shadow-sm transition-all hover:shadow-md">
                    <p className="text-sm font-medium">{conv.content}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        conv.type === 'feedback' 
                          ? 'bg-green-100 text-green-800' 
                          : conv.type === 'complaint'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-blue-100 text-blue-800'
                      }`}>
                        {conv.type || "general"}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(conv.created_at).toRelativeTimeString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
            {dashboardData.recentConversations.length > 0 && (
              <div className="mt-4 text-center">
                <Link 
                  href="/chat" 
                  className="text-sm font-medium text-primary hover:underline"
                >
                  View all conversations
                </Link>
              </div>
            )}
          </div>

          {/* Analytics Overview */}
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Analytics Overview</h2>
            
            {/* Message Type Distribution */}
            <div className="mb-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-2">Message Distribution</h3>
              <div className="space-y-2">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs">Feedback</span>
                    <span className="text-xs font-medium">{dashboardData.analytics.messagesByType.feedback}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div 
                      className="h-full bg-green-500 rounded-full" 
                      style={{ 
                        width: `${calculatePercentage(
                          dashboardData.analytics.messagesByType.feedback,
                          getTotalMessages(dashboardData.analytics.messagesByType)
                        )}%` 
                      }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs">Complaints</span>
                    <span className="text-xs font-medium">{dashboardData.analytics.messagesByType.complaint}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div 
                      className="h-full bg-red-500 rounded-full" 
                      style={{ 
                        width: `${calculatePercentage(
                          dashboardData.analytics.messagesByType.complaint,
                          getTotalMessages(dashboardData.analytics.messagesByType)
                        )}%` 
                      }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs">General</span>
                    <span className="text-xs font-medium">{dashboardData.analytics.messagesByType.general}</span>
                  </div>
                  <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                    <div 
                      className="h-full bg-blue-500 rounded-full" 
                      style={{ 
                        width: `${calculatePercentage(
                          dashboardData.analytics.messagesByType.general,
                          getTotalMessages(dashboardData.analytics.messagesByType)
                        )}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 text-center">
              <Link 
                href="/analytics" 
                className="text-sm font-medium text-primary hover:underline"
              >
                View detailed analytics
              </Link>
            </div>
          </div>

          {/* Knowledge Base Summary */}
          <div className="rounded-lg border bg-card p-4 shadow-sm">
            <h2 className="mb-4 text-lg font-semibold">Knowledge Base</h2>
            
            {dashboardData.knowledgeBase.totalDocuments === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <BookOpen className="mb-2 h-10 w-10 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  No documents in knowledge base
                </p>
                <Link 
                  href="/knowledge-base" 
                  className="mt-4 inline-flex items-center rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground"
                >
                  Add documents
                </Link>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Total Documents</p>
                    <div className="flex items-center">
                      <span className="font-medium">{dashboardData.knowledgeBase.totalDocuments}</span>
                      <div className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-xs text-green-800">
                        Active
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm">Last Updated</p>
                    <span className="text-sm text-muted-foreground">
                      {dashboardData.knowledgeBase.lastUpdated
                        ? new Date(
                            dashboardData.knowledgeBase.lastUpdated
                          ).toRelativeTimeString()
                        : "Never"}
                    </span>
                  </div>
                </div>
                
                <div className="mt-6 rounded-lg border bg-accent/50 p-3">
                  <div className="flex items-start gap-3">
                    <div className="rounded-full bg-primary/10 p-2">
                      <AlertCircle className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-medium">Tip</h4>
                      <p className="text-xs text-muted-foreground">
                        Keep your knowledge base updated to improve response accuracy.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4 text-center">
                  <Link 
                    href="/knowledge-base" 
                    className="text-sm font-medium text-primary hover:underline"
                  >
                    Manage knowledge base
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
        
        {/* Chat Analytics Section */}
        <div className="mt-8">
          <ChatAnalytics />
        </div>
      </main>
    </div>
  );
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
