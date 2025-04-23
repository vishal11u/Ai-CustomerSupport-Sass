import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://hqdlblmspxibcrnpdzcz.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxZGxibG1zcHhpYmNybnBkemN6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MDI5NTQsImV4cCI6MjA2MDM3ODk1NH0.3pGBUCfJTQqHp2h0ehhSkC3I6sRKxsd7nMEerm2bacU'
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

// Create admin client for server-side operations
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey || supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true
  }
})

// Create client for client-side operations
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true
  }
})

// Test function to verify Supabase connection
export async function testSupabaseConnection() {
  try {
    const { data, error } = await supabaseAdmin
      .from('chat_messages')
      .select('count')
      .limit(1)
    
    if (error) {
      console.error('Supabase connection test failed:', error)
      return false
    }
    
    console.log('Supabase connection test successful')
    return true
  } catch (error) {
    console.error('Supabase connection test failed:', error)
    return false
  }
}

// Function to fetch chat history for a user
export async function getChatHistory(userId: string) {
  try {
    const { data, error } = await supabaseAdmin
      .from('chat_messages')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: true })

    if (error) {
      console.error('Error fetching chat history:', error)
      throw error
    }

    return data
  } catch (error) {
    console.error('Error in getChatHistory:', error)
    throw error
  }
}

// Function to save a chat message
export async function saveChatMessage(userId: string, content: string, role: 'user' | 'assistant', metadata?: any) {
  try {
    const { data, error } = await supabaseAdmin
      .from('chat_messages')
      .insert({
        user_id: userId,
        content,
        role,
        metadata
      })
      .select()

    if (error) {
      console.error('Error saving chat message:', error)
      throw error
    }

    return data?.[0]
  } catch (error) {
    console.error('Error in saveChatMessage:', error)
    throw error
  }
} 