"use client"

import { useEffect, useState } from "react"
import { 
  MessageSquare, 
  Users, 
  Clock, 
  ThumbsUp 
} from "lucide-react"
import { supabase } from "@/lib/supabase"
import { auth } from "@clerk/nextjs"

interface Stats {
  totalConversations: number
  totalUsers: number
  averageResponseTime: number
  satisfactionRate: number
}

export function DashboardStats() {
  const [stats, setStats] = useState<Stats>({
    totalConversations: 0,
    totalUsers: 0,
    averageResponseTime: 0,
    satisfactionRate: 0
  })

  useEffect(() => {
    const fetchStats = async () => {
      const { userId } = auth()
      if (!userId) return

      try {
        // Get total conversations
        const { count: conversationCount } = await supabase
          .from('chat_messages')
          .select('*', { count: 'exact', head: true })
          .eq('user_id', userId)

        // Get total users
        const { count: userCount } = await supabase
          .from('users')
          .select('*', { count: 'exact', head: true })

        // Get average response time
        const { data: responseTimes } = await supabase
          .from('chat_messages')
          .select('created_at')
          .eq('user_id', userId)
          .order('created_at', { ascending: true })

        // Calculate average response time
        let totalResponseTime = 0
        let responseCount = 0
        if (responseTimes && responseTimes.length > 1) {
          for (let i = 0; i < responseTimes.length - 1; i += 2) {
            const userMessageTime = new Date(responseTimes[i].created_at).getTime()
            const aiResponseTime = new Date(responseTimes[i + 1].created_at).getTime()
            totalResponseTime += aiResponseTime - userMessageTime
            responseCount++
          }
        }

        const averageResponseTime = responseCount > 0 
          ? Math.round(totalResponseTime / responseCount / 1000) // Convert to seconds
          : 0

        // Get satisfaction rate (placeholder - you'll need to implement actual feedback tracking)
        const satisfactionRate = 85 // This should come from your feedback system

        setStats({
          totalConversations: conversationCount || 0,
          totalUsers: userCount || 0,
          averageResponseTime,
          satisfactionRate
        })
      } catch (error) {
        console.error('Error fetching stats:', error)
      }
    }

    fetchStats()
  }, [])

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-card p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-primary/10">
            <MessageSquare className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Conversations</p>
            <p className="text-2xl font-semibold">{stats.totalConversations}</p>
          </div>
        </div>
      </div>

      <div className="bg-card p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-primary/10">
            <Users className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Total Users</p>
            <p className="text-2xl font-semibold">{stats.totalUsers}</p>
          </div>
        </div>
      </div>

      <div className="bg-card p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-primary/10">
            <Clock className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Avg. Response Time</p>
            <p className="text-2xl font-semibold">{stats.averageResponseTime}s</p>
          </div>
        </div>
      </div>

      <div className="bg-card p-6 rounded-lg shadow-sm">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-full bg-primary/10">
            <ThumbsUp className="h-6 w-6 text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Satisfaction Rate</p>
            <p className="text-2xl font-semibold">{stats.satisfactionRate}%</p>
          </div>
        </div>
      </div>
    </div>
  )
} 