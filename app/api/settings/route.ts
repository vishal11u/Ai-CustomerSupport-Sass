import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import UserSettings from "@/models/UserSettings";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const settings = await req.json();
    await connectDB();

    // Update or create user settings
    await UserSettings.findOneAndUpdate(
      { userId },
      { $set: settings },
      { upsert: true, new: true }
    );

    return new NextResponse("Settings saved successfully", { status: 200 });
  } catch (error) {
    console.error("[SETTINGS_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await connectDB();
    const settings = await UserSettings.findOne({ userId });

    return NextResponse.json(settings || {
      notifications: true,
      darkMode: false,
      language: "en",
      timezone: "UTC",
    });
  } catch (error) {
    console.error("[SETTINGS_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 