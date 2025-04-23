import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "");

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    const { messages } = body;

    if (!messages || !Array.isArray(messages)) {
      return new NextResponse("Messages are required", { status: 400 });
    }

    if (!process.env.GEMINI_API_KEY) {
      console.error("[CHAT_ERROR] Gemini API key is missing");
      return new NextResponse("Gemini API key is missing", { status: 500 });
    }

    const model = genAI.getGenerativeModel({ model: "gemini-1.0-pro" });
    
    // Convert messages to Gemini format
    const history = messages.slice(0, -1).map(msg => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.content }]
    }));

    // Add system message at the start
    history.unshift({
      role: "user",
      parts: [{ text: "You are a helpful customer support assistant. Provide clear, concise, and accurate responses to customer queries." }]
    }, {
      role: "model",
      parts: [{ text: "I understand. I will act as a helpful customer support assistant, providing clear and accurate responses to customer queries." }]
    });

    const chat = model.startChat({
      history
    });

    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    const response = await result.response;
    const text = response.text();

    if (!text) {
      console.error("[CHAT_ERROR] No response from Gemini");
      return new NextResponse("No response from AI", { status: 500 });
    }

    return NextResponse.json({
      role: "assistant",
      content: text
    });
  } catch (error) {
    console.error("[CHAT_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 