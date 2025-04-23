import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { formData, templateSlug, aiResponse } = await req.json();

    if (!formData || !aiResponse) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save user message
    const { data: userData, error: userError } = await supabaseAdmin
      .from('chat_messages')
      .insert({
        user_id: userId,
        content: formData,
        role: 'user',
        metadata: {
          template_slug: templateSlug,
        },
      })
      .select();

    if (userError) {
      console.error("[CHAT_SAVE_USER_ERROR]", userError);
      return NextResponse.json(
        { error: "Failed to save user message", details: userError.message },
        { status: 500 }
      );
    }

    // Save AI response
    const { data: assistantData, error: assistantError } = await supabaseAdmin
      .from('chat_messages')
      .insert({
        user_id: userId,
        content: aiResponse,
        role: 'assistant',
        metadata: {
          template_slug: templateSlug,
        },
      })
      .select();

    if (assistantError) {
      console.error("[CHAT_SAVE_ASSISTANT_ERROR]", assistantError);
      return NextResponse.json(
        { error: "Failed to save AI response", details: assistantError.message },
        { status: 500 }
      );
    }

    return NextResponse.json({ 
      success: true,
      userMessage: userData?.[0],
      assistantMessage: assistantData?.[0]
    });
  } catch (error) {
    console.error("[CHAT_SAVE_ERROR]", error);
    return NextResponse.json(
      { error: "Failed to save chat messages", details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
} 