"use client";

import { useState } from "react";
import { Upload, FileText, X } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function FileUpload() {
  const [files, setFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFiles([...files, ...Array.from(e.target.files)]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles(files.filter((_, i) => i !== index));
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });

      const response = await fetch("/api/knowledge-base/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) throw new Error("Upload failed");

      toast({
        title: "Success",
        description: "Files uploaded successfully",
      });
      setFiles([]);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to upload files",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="rounded-lg border p-6">
      <div className="mb-4">
        <label
          htmlFor="file-upload"
          className="flex cursor-pointer items-center justify-center rounded-lg border-2 border-dashed p-6 hover:bg-accent"
        >
          <div className="text-center">
            <Upload className="mx-auto h-12 w-12 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">
              Drag and drop files here, or click to select files
            </p>
            <p className="text-xs text-muted-foreground">
              Supported formats: PDF, DOCX, TXT
            </p>
          </div>
          <input
            id="file-upload"
            type="file"
            multiple
            accept=".pdf,.docx,.txt"
            className="hidden"
            onChange={handleFileChange}
          />
        </label>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between rounded-lg border p-2"
            >
              <div className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm">{file.name}</span>
              </div>
              <button
                onClick={() => handleRemoveFile(index)}
                className="rounded-full p-1 hover:bg-accent"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      {files.length > 0 && (
        <button
          onClick={handleUpload}
          disabled={isUploading}
          className="mt-4 w-full rounded-lg bg-primary px-4 py-2 text-primary-foreground hover:bg-primary/90 disabled:opacity-50"
        >
          {isUploading ? "Uploading..." : "Upload Files"}
        </button>
      )}
    </div>
  );
} 