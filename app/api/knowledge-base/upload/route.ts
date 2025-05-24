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
    const files = formData.getAll("files") as File[];

    if (!files || files.length === 0) {
      return new NextResponse("No files provided", { status: 400 });
    }

    const uploadPromises = files.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());

      const filePath = `${userId}/${Date.now()}_${file.name}`;

      const { error } = await supabase.storage
        .from("your-bucket-name") // ⬅️ Replace with your actual Supabase bucket name
        .upload(filePath, buffer, {
          contentType: file.type,
          upsert: false,
        });

      if (error) {
        throw error;
      }

      return filePath;
    });

    const uploadedFiles = await Promise.all(uploadPromises);

    return NextResponse.json(
      { message: "Files uploaded successfully", files: uploadedFiles },
      { status: 200 }
    );
  } catch (error) {
    console.error("[UPLOAD_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
