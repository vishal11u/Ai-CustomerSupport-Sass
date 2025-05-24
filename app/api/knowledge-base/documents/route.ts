import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return new NextResponse("No file provided", { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const filePath = `${userId}/${Date.now()}_${file.name}`;

    const { error } = await supabase.storage
      .from("your-bucket-name") // 🔁 Replace with your actual Supabase bucket name
      .upload(filePath, buffer, {
        contentType: file.type,
        upsert: false,
      });

    if (error) {
      console.error("[SUPABASE_UPLOAD_ERROR]", error);
      return new NextResponse("Failed to upload file", { status: 500 });
    }

    return NextResponse.json({
      path: filePath,
      name: file.name,
      type: file.type,
      uploadDate: new Date().toISOString(),
    });
  } catch (error) {
    console.error("[DOCUMENTS_POST]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function GET() {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { data, error } = await supabase.storage
      .from("your-bucket-name") // 🔁 Replace with your actual Supabase bucket name
      .list(userId, { limit: 100 });

    if (error) {
      console.error("[SUPABASE_LIST_ERROR]", error);
      return new NextResponse("Failed to fetch documents", { status: 500 });
    }

    const documents = data.map((file) => {
      const publicUrl = supabase.storage
        .from("your-bucket-name")
        .getPublicUrl(`${userId}/${file.name}`).data.publicUrl;

      return {
        id: `${userId}/${file.name}`,
        name: file.name,
        type: file.metadata?.mimetype || "unknown",
        uploadDate: file.updated_at || new Date().toISOString(),
        url: publicUrl,
      };
    });

    return NextResponse.json(documents);
  } catch (error) {
    console.error("[DOCUMENTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
