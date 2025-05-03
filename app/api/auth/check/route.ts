import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

export async function GET() {
  try {
    const { userId } = auth();
    
    return NextResponse.json({ 
      userId: userId || null,
      isAuthenticated: !!userId 
    });
  } catch (error) {
    console.error("Error checking auth status:", error);
    return NextResponse.json({ 
      userId: null,
      isAuthenticated: false 
    }, { status: 500 });
  }
} 