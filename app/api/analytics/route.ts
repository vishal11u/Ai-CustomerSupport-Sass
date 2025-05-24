import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

type DateStats = {
  conversations: number;
  totalResponseTime: number;
  responseCount: number;
};

export async function GET() {
  try {
    // Get the last 30 days of data
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const { data: messages, error } = await supabase
      .from("chat_messages")
      .select("*")
      .gte("created_at", thirtyDaysAgo.toISOString())
      .order("created_at", { ascending: true });

    if (error) {
      throw error;
    }

    // Group messages by date
    const messagesByDate: Record<string, DateStats> = messages.reduce(
      (acc, message) => {
        const date = new Date(message.created_at).toISOString().split("T")[0];
        if (!acc[date]) {
          acc[date] = {
            conversations: 0,
            totalResponseTime: 0,
            responseCount: 0,
          };
        }

        if (message.role === "user") {
          acc[date].conversations++;
        }

        if (message.role === "assistant") {
          const userMessage = messages.find(
            (m) =>
              m.role === "user" &&
              new Date(m.created_at) < new Date(message.created_at)
          );
          if (userMessage) {
            const responseTime =
              (new Date(message.created_at).getTime() -
                new Date(userMessage.created_at).getTime()) /
              60000; // minutes
            acc[date].totalResponseTime += responseTime;
            acc[date].responseCount++;
          }
        }

        return acc;
      },
      {} as Record<string, DateStats>
    );

    // Format data for the frontend
    const analyticsData = Object.entries(messagesByDate).map(
      ([date, stats]) => ({
        date,
        conversations: stats.conversations,
        responseTime:
          stats.responseCount > 0
            ? stats.totalResponseTime / stats.responseCount
            : 0,
      })
    );

    // Calculate summary statistics
    const totalConversations = analyticsData.reduce(
      (sum, day) => sum + day.conversations,
      0
    );
    const averageResponseTime =
      analyticsData.reduce((sum, day) => sum + day.responseTime, 0) /
      analyticsData.length;
    const busiestDay = analyticsData.reduce(
      (max, curr) => (curr.conversations > max.conversations ? curr : max),
      analyticsData[0]
    );

    return NextResponse.json({
      dailyData: analyticsData,
      summary: {
        totalConversations,
        averageResponseTime,
        busiestDay: busiestDay?.date || null,
        totalDays: analyticsData.length,
      },
    });
  } catch (error) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
