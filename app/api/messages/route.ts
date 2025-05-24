import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { Message } from "@/types/message";

export async function GET() {
  try {
    const { data: messages, error } = await supabase
      .from("chat_messages")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching messages:", error);
      return NextResponse.json(
        { error: "Failed to fetch messages" },
        { status: 500 }
      );
    }

    const normalizeMessage = (msg: any): Message => ({
      id: msg.id,
      content: msg.content,
      role: msg.role === "assistant" ? "assistant" : "user",
      created_at: msg.created_at,
    });

    const categorizedMessages = {
      feedback: [] as Message[],
      complaints: [] as Message[],
      general: [] as Message[],
      user: [] as Message[],
    };

    messages.forEach((msg: any) => {
      const message = normalizeMessage(msg);
      const content = message.content.toLowerCase();

      if (content.includes("feedback") || content.includes("suggestion")) {
        categorizedMessages.feedback.push(message);
      } else if (
        content.includes("complaint") ||
        content.includes("issue") ||
        content.includes("problem")
      ) {
        categorizedMessages.complaints.push(message);
      } else if (
        content.includes("user") ||
        content.includes("account") ||
        content.includes("profile") ||
        content.includes("login") ||
        content.includes("signup") ||
        content.includes("password")
      ) {
        categorizedMessages.user.push(message);
      } else {
        categorizedMessages.general.push(message);
      }
    });

    return NextResponse.json(categorizedMessages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}
