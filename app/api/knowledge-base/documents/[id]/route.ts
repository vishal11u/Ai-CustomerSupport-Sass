import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/mongodb";
import { GridFSBucket, ObjectId } from "mongodb";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const db = await connectDB();
    const bucket = new GridFSBucket(db, { bucketName: "documents" });

    const file = await bucket.find({ _id: new ObjectId(params.id) }).next();
    if (!file) {
      return new NextResponse("Document not found", { status: 404 });
    }

    if (file.metadata.userId !== userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await bucket.delete(new ObjectId(params.id));

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[DOCUMENT_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
} 