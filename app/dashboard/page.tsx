import { UserButton } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs";
import { MessageSquare, BarChart3, BookOpen, Plus } from "lucide-react";
import Link from "next/link";
import "@/lib/utils"  // Import for Date prototype extension
import { supabase } from "@/lib/supabase";

interface DashboardData {
  recentConversations: {
    content: string;
    created_at: string;
    type?: string;
  }[];
  analytics: {
    totalConversations: number;
    averageResponseTime: number;
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
        {/* Quick Actions */}
        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Link
            href="/chat"
            className="flex items-center gap-3 rounded-lg border p-4 hover:bg-accent"
          >
            <MessageSquare className="h-5 w-5" />
            <span>New Chat</span>
          </Link>
          <Link
            href="/knowledge-base"
            className="flex items-center gap-3 rounded-lg border p-4 hover:bg-accent"
          >
            <BookOpen className="h-5 w-5" />
            <span>Knowledge Base</span>
          </Link>
          <Link
            href="/analytics"
            className="flex items-center gap-3 rounded-lg border p-4 hover:bg-accent"
          >
            <BarChart3 className="h-5 w-5" />
            <span>Analytics</span>
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-3 rounded-lg border p-4 hover:bg-accent"
          >
            <Plus className="h-5 w-5" />
            <span>Settings</span>
          </Link>
        </div>

        {/* Main Dashboard Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Recent Conversations */}
          <div className="rounded-lg border p-4">
            <h2 className="mb-4 text-lg font-semibold">Recent Conversations</h2>
            <div className="space-y-2">
              {dashboardData.recentConversations.length === 0 ? (
                <p className="text-sm text-muted-foreground">No recent conversations</p>
              ) : (
                dashboardData.recentConversations.map((conv, i) => (
                  <div key={i} className="rounded-lg bg-accent p-3">
                    <p className="text-sm font-medium">{conv.content}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        {conv.type || 'general'}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(conv.created_at).toRelativeTimeString()}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Analytics Overview */}
          <div className="rounded-lg border p-4">
            <h2 className="mb-4 text-lg font-semibold">Analytics Overview</h2>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Total Conversations</p>
                <p className="text-2xl font-bold">{dashboardData.analytics.totalConversations}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Average Response Time</p>
                <p className="text-2xl font-bold">{dashboardData.analytics.averageResponseTime.toFixed(1)} min</p>
              </div>
            </div>
          </div>

          {/* Knowledge Base Summary */}
          <div className="rounded-lg border p-4">
            <h2 className="mb-4 text-lg font-semibold">Knowledge Base</h2>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <p className="text-sm">Total Documents</p>
                <span className="font-medium">{dashboardData.knowledgeBase.totalDocuments}</span>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm">Last Updated</p>
                <span className="text-sm text-muted-foreground">
                  {dashboardData.knowledgeBase.lastUpdated
                    ? new Date(dashboardData.knowledgeBase.lastUpdated).toRelativeTimeString()
                    : 'Never'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

async function getDashboardData(userId: string): Promise<DashboardData> {
  try {
    // Get recent messages
    const { data: messages, error: messagesError } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(5);

    if (messagesError) throw messagesError;

    // Get analytics data
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: analyticsMessages, error: analyticsError } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('user_id', userId)
      .gte('created_at', thirtyDaysAgo.toISOString());

    if (analyticsError) throw analyticsError;

    // Calculate analytics
    const totalConversations = analyticsMessages.filter(m => m.role === 'user').length;
    let totalResponseTime = 0;
    let responseCount = 0;

    analyticsMessages.forEach((message, index) => {
      if (message.role === 'assistant' && index > 0) {
        const prevMessage = analyticsMessages[index - 1];
        if (prevMessage.role === 'user') {
          const responseTime = 
            (new Date(message.created_at).getTime() - new Date(prevMessage.created_at).getTime()) / 60000; // Convert to minutes
          totalResponseTime += responseTime;
          responseCount++;
        }
      }
    });

    // Get knowledge base documents
    const { data: documents, error: documentsError } = await supabase
      .from('documents')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (documentsError) throw documentsError;

    return {
      recentConversations: messages || [],
      analytics: {
        totalConversations,
        averageResponseTime: responseCount > 0 ? totalResponseTime / responseCount : 0
      },
      knowledgeBase: {
        totalDocuments: documents?.length || 0,
        lastUpdated: documents?.[0]?.created_at || null
      }
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return {
      recentConversations: [],
      analytics: {
        totalConversations: 0,
        averageResponseTime: 0
      },
      knowledgeBase: {
        totalDocuments: 0,
        lastUpdated: null
      }
    };
  }
} 