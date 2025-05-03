import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { supabase } from "@/lib/supabase";
import { GenerateAIContent } from "@/utils/AiModal";

export async function POST(req: Request) {
  try {
    const { messages, userId: clientUserId } = await req.json();
    const { userId: authUserId } = auth();
    
    // Use authenticated userId if available, otherwise use client-provided userId
    const userId = authUserId || clientUserId;

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: "Invalid messages format" },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Referrer-Policy': 'no-referrer-when-downgrade'
          }
        }
      );
    }

    const lastMessage = messages[messages.length - 1];
    if (!lastMessage || lastMessage.role !== "user") {
      return NextResponse.json(
        { error: "No user message found" },
        { 
          status: 400,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Referrer-Policy': 'no-referrer-when-downgrade'
          }
        }
      );
    }

    // Generate AI response
    const aiResponse = await GenerateAIContent(
      { message: lastMessage.content },
      { 
        aiPrompt: "You are a helpful AI assistant. Please respond to the user's message.",
        slug: "chat" 
      }
    );

    // Save conversation to database only if user is authenticated
    if (authUserId) {
      try {
        // Save user message
        await supabase
          .from('chat_messages')
          .insert({
            user_id: authUserId,
            role: 'user',
            content: lastMessage.content,
            created_at: new Date().toISOString()
          });

        // Save AI response
        await supabase
          .from('chat_messages')
          .insert({
            user_id: authUserId,
            role: 'assistant',
            content: aiResponse,
            created_at: new Date().toISOString()
          });
      } catch (dbError) {
        console.error("Error saving to database:", dbError);
        // Continue with response even if database save fails
      }
    }

    // Return AI response with proper headers
    return new NextResponse(aiResponse, {
      headers: {
        'Content-Type': 'text/plain',
        'Access-Control-Allow-Origin': '*',
        'Referrer-Policy': 'no-referrer-when-downgrade'
      },
    });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { 
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Referrer-Policy': 'no-referrer-when-downgrade'
        }
      }
    );
  }
}

// Handle OPTIONS requests for CORS
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Max-Age': '86400',
      'Referrer-Policy': 'no-referrer-when-downgrade'
    }
  });
} 