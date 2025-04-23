import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { FileUpload } from "@/components/file-upload";
import { KnowledgeBaseList } from "@/components/knowledge-base-list";

export default async function KnowledgeBasePage() {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="container flex h-16 items-center justify-between px-4">
          <h1 className="text-2xl font-bold">Knowledge Base</h1>
        </div>
      </header>
      <main className="container mx-auto p-4">
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Upload Documents</h2>
          <FileUpload />
        </div>
        <div>
          <h2 className="mb-4 text-xl font-semibold">Your Documents</h2>
          <KnowledgeBaseList />
        </div>
      </main>
    </div>
  );
} 