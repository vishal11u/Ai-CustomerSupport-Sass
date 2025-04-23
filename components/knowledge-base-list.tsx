"use client";

import { useEffect, useState } from "react";
import { FileText, Trash2 } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface Document {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
}

export function KnowledgeBaseList() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetch("/api/knowledge-base/documents");
      if (!response.ok) throw new Error("Failed to fetch documents");
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load documents",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/knowledge-base/documents/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete document");

      toast({
        title: "Success",
        description: "Document deleted successfully",
      });
      setDocuments(documents.filter((doc) => doc.id !== id));
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete document",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return <div className="text-center">Loading documents...</div>;
  }

  if (documents.length === 0) {
    return (
      <div className="rounded-lg border p-6 text-center text-muted-foreground">
        No documents uploaded yet
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {documents.map((doc) => (
        <div
          key={doc.id}
          className="flex items-center justify-between rounded-lg border p-4"
        >
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-muted-foreground" />
            <div>
              <p className="font-medium">{doc.name}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(doc.uploadedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <button
            onClick={() => handleDelete(doc.id)}
            className="rounded-full p-2 text-destructive hover:bg-destructive/10"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      ))}
    </div>
  );
} 