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
    const file = formData.get("file") as File;
    if (!file) {
      return new NextResponse("No file provided", { status: 400 });
    }

    const db = await connectDB();
    const bucket = new GridFSBucket(db, { bucketName: "documents" });

    const buffer = Buffer.from(await file.arrayBuffer());
    const uploadStream = bucket.openUploadStream(file.name, {
      metadata: {
        userId,
        contentType: file.type,
        originalName: file.name,
      },
    });

    await new Promise((resolve, reject) => {
      uploadStream.end(buffer);
      uploadStream.on("finish", resolve);
      uploadStream.on("error", reject);
    });

    return NextResponse.json({
      id: uploadStream.id.toString(),
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

    const db = await connectDB();
    const bucket = new GridFSBucket(db, { bucketName: "documents" });

    const files = await bucket.find({ "metadata.userId": userId }).toArray();

    const documents = files.map((file) => ({
      id: file._id.toString(),
      name: file.metadata.originalName,
      type: file.metadata.contentType,
      uploadDate: file.uploadDate.toISOString(),
    }));

    return NextResponse.json(documents);
  } catch (error) {
    console.error("[DOCUMENTS_GET]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 