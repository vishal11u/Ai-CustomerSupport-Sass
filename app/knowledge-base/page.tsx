"use client";

import { useState, useEffect } from "react";
import { Upload, FileText, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface Document {
  id: string;
  name: string;
  type: string;
  uploadDate: string;
}

export default function KnowledgeBasePage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [isUploading, setIsUploading] = useState(false);

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
      toast.error("Failed to load documents");
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await fetch("/api/knowledge-base/documents", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");
      
      toast.success("Document uploaded successfully");
      fetchDocuments();
    } catch (error) {
      toast.error("Failed to upload document");
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/knowledge-base/documents/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Delete failed");
      
      toast.success("Document deleted successfully");
      fetchDocuments();
    } catch (error) {
      toast.error("Failed to delete document");
    }
  };

  return (
    <div className="container mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Knowledge Base</h1>
        <p className="text-muted-foreground">
          Upload and manage documents for your AI assistant to reference.
        </p>
      </div>

      <div className="mb-8">
        <label
          htmlFor="file-upload"
          className="flex items-center gap-2 p-4 border-2 border-dashed rounded-lg cursor-pointer hover:bg-accent/50"
        >
          <Upload className="h-5 w-5" />
          <span>{isUploading ? "Uploading..." : "Upload Document"}</span>
          <input
            id="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileUpload}
            disabled={isUploading}
          />
        </label>
      </div>

      <div className="grid gap-4">
        {documents.map((doc) => (
          <div
            key={doc.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="flex items-center gap-3">
              <FileText className="h-5 w-5 text-muted-foreground" />
              <div>
                <p className="font-medium">{doc.name}</p>
                <p className="text-sm text-muted-foreground">
                  {doc.type} • Uploaded {new Date(doc.uploadDate).toLocaleDateString()}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleDelete(doc.id)}
              className="p-2 hover:bg-destructive/10 rounded-full"
            >
              <Trash2 className="h-4 w-4 text-destructive" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 