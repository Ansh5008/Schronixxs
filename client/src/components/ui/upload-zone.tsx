import { useState } from "react";
import { Upload, Calendar, FileText, CheckCircle, AlertCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface UploadZoneProps {
  type: "calendar" | "timetable";
  title: string;
  description: string;
  icon: "calendar" | "table";
}

export default function UploadZone({ type, title, description, icon }: UploadZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<"idle" | "success" | "error">("idle");
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleFiles = async (files: File[]) => {
    const file = files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast({
        title: "Invalid file type",
        description: "Please upload a PDF file only.",
        variant: "destructive",
      });
      return;
    }

    if (file.size > 10 * 1024 * 1024) { // 10MB limit
      toast({
        title: "File too large",
        description: "Please upload a file smaller than 10MB.",
        variant: "destructive",
      });
      return;
    }

    setIsUploading(true);
    setUploadStatus("idle");

    try {
      const formData = new FormData();
      formData.append("pdf", file);
      formData.append("type", type);

      const response = await apiRequest("POST", "/api/upload", formData);
      const result = await response.json();

      setUploadStatus("success");
      toast({
        title: "Upload successful",
        description: `Your ${type} has been uploaded and processed successfully.`,
      });

      // Reset status after 3 seconds
      setTimeout(() => {
        setUploadStatus("idle");
      }, 3000);

    } catch (error) {
      setUploadStatus("error");
      toast({
        title: "Upload failed",
        description: "There was an error processing your file. Please try again.",
        variant: "destructive",
      });

      // Reset status after 3 seconds
      setTimeout(() => {
        setUploadStatus("idle");
      }, 3000);
    } finally {
      setIsUploading(false);
    }
  };

  const getIconComponent = () => {
    if (uploadStatus === "success") return <CheckCircle className="h-8 w-8 text-schronix-accent" />;
    if (uploadStatus === "error") return <AlertCircle className="h-8 w-8 text-schronix-warning" />;
    if (icon === "calendar") return <Calendar className="h-8 w-8 text-schronix-grey-400" />;
    return <FileText className="h-8 w-8 text-schronix-grey-400" />;
  };

  const getBorderColor = () => {
    if (isDragOver) return "border-schronix-primary bg-schronix-primary/5";
    if (uploadStatus === "success") return "border-schronix-accent bg-schronix-accent/5";
    if (uploadStatus === "error") return "border-schronix-warning bg-schronix-warning/5";
    return "border-schronix-grey-300 hover:border-schronix-primary hover:bg-schronix-primary/5";
  };

  return (
    <Card 
      className={`border-2 border-dashed transition-all ${getBorderColor()}`}
      data-testid={`upload-zone-${type}`}
    >
      <CardContent 
        className="p-8 text-center cursor-pointer"
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => document.getElementById(`file-input-${type}`)?.click()}
      >
        <div className="mb-4 flex justify-center">
          {getIconComponent()}
        </div>
        
        <h4 className="text-lg font-semibold text-schronix-grey-800 mb-2" data-testid={`text-upload-title-${type}`}>
          {title}
        </h4>
        
        <p className="text-schronix-grey-600 mb-4" data-testid={`text-upload-description-${type}`}>
          {description}
        </p>
        
        <Button 
          className={`${
            uploadStatus === "success" 
              ? "bg-schronix-accent hover:bg-schronix-accent/80" 
              : "bg-schronix-primary hover:bg-schronix-secondary"
          } transition-colors`}
          disabled={isUploading}
          data-testid={`button-upload-${type}`}
        >
          {isUploading ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
              Uploading...
            </>
          ) : uploadStatus === "success" ? (
            <>
              <CheckCircle className="h-4 w-4 mr-2" />
              Uploaded Successfully
            </>
          ) : (
            <>
              <Upload className="h-4 w-4 mr-2" />
              Choose PDF
            </>
          )}
        </Button>
        
        <input
          id={`file-input-${type}`}
          type="file"
          accept=".pdf"
          onChange={handleFileSelect}
          className="hidden"
          data-testid={`input-file-${type}`}
        />
        
        <p className="text-xs text-schronix-grey-500 mt-2">
          Drag and drop or click to upload • PDF files only • Max 10MB
        </p>
      </CardContent>
    </Card>
  );
}
