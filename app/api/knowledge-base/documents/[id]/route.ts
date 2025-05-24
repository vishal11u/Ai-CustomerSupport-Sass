import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();
    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const filePath = decodeURIComponent(params.id);  

     if (!filePath.startsWith(`${userId}/`)) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { error } = await supabase.storage
      .from("your-bucket-name")  
      .remove([filePath]);

    if (error) {
      return new NextResponse("Failed to delete file", { status: 500 });
    }

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error("[DOCUMENT_DELETE]", error);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
