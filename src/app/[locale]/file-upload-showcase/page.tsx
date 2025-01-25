"use client";

import { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function FileUploadShowcase() {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>File Upload Component</CardTitle>
            <CardDescription>
              A beautiful and modern file upload component with drag and drop
              support, file preview, and progress indicators.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Default Configuration */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Default Configuration</h3>
              <FileUpload
                onChange={(files) => console.log("Files:", files)}
                onError={(error) => console.log("Error:", error)}
              />
            </div>

            <Separator />

            {/* Images Only */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Images Only</h3>
              <FileUpload
                accept={{
                  "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
                }}
                maxFiles={3}
                onChange={(files) => console.log("Image files:", files)}
              />
            </div>

            <Separator />

            {/* Documents Only */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Documents Only</h3>
              <FileUpload
                accept={{
                  "application/pdf": [".pdf"],
                  "application/msword": [".doc", ".docx"],
                  "application/vnd.ms-excel": [".xls", ".xlsx"],
                }}
                maxFiles={2}
                maxSize={10 * 1024 * 1024} // 10MB
                onChange={(files) => console.log("Document files:", files)}
              />
            </div>

            <Separator />

            {/* Error State */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Error State</h3>
              <FileUpload
                error="Invalid file type selected"
                onChange={(files) => console.log("Files:", files)}
              />
            </div>

            <Separator />

            {/* Disabled State */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Disabled State</h3>
              <FileUpload disabled />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
