import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { GridFSBucket } from "mongodb";

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

    const db = await connectDB();
    const bucket = new GridFSBucket(db);

    const uploadPromises = files.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      const uploadStream = bucket.openUploadStream(file.name, {
        metadata: {
          userId,
          originalName: file.name,
          contentType: file.type,
        },
      });

      return new Promise((resolve, reject) => {
        uploadStream.end(buffer);
        uploadStream.on("finish", resolve);
        uploadStream.on("error", reject);
      });
    });

    await Promise.all(uploadPromises);

    return new NextResponse("Files uploaded successfully", { status: 200 });
  } catch (error) {
    console.error("[UPLOAD_ERROR]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 