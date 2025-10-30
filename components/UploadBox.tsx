"use client";

import { useState, useCallback, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, Image as ImageIcon, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadBoxProps {
  onUpload: (file: File, preview: string) => void;
  className?: string;
}

export default function UploadBox({ onUpload, className }: UploadBoxProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFile = useCallback((file: File) => {
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onUpload(file, result);
      };
      reader.readAsDataURL(file);
    }
  }, [onUpload]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      processFile(files[0]);
    }
  }, [processFile]);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      processFile(files[0]);
    }
  }, [processFile]);

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const clearImage = () => {
    setPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-0">
        {preview ? (
          <div className="relative group">
            <img 
              src={preview} 
              alt="Preview" 
              className="w-full h-64 object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 flex items-center justify-center">
              <Button
                variant="destructive"
                size="icon"
                onClick={clearImage}
                className="opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        ) : (
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={handleClick}
            className={cn(
              "border-2 border-dashed rounded-lg p-12 text-center cursor-pointer transition-colors",
              isDragging 
                ? "border-green-600 bg-green-50" 
                : "border-gray-300 hover:border-green-400 hover:bg-green-50/50"
            )}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              aria-label="Upload plant image"
            />
            <div className="flex flex-col items-center space-y-4">
              <div className="p-4 bg-green-100 rounded-full">
                {isDragging ? (
                  <Upload className="h-8 w-8 text-green-600" />
                ) : (
                  <ImageIcon className="h-8 w-8 text-green-600" />
                )}
              </div>
              <div>
                <p className="text-lg font-medium text-gray-900 mb-1">
                  {isDragging ? "Drop image here" : "Upload Plant Image"}
                </p>
                <p className="text-sm text-gray-500">
                  Drag and drop or click to select
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Supported formats: JPG, PNG, WebP
                </p>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

