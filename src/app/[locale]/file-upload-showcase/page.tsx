"use client";

import { FileUpload } from "@/components/ui/file-upload";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export default function FileUploadShowcase() {
  const t = useTranslations();

  const handleFilesChange = (files: File[]) => {
    console.log("Files uploaded:", files);
  };

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">File Upload Component</h1>
          <p className="text-lg text-muted-foreground">
            A beautiful and functional file upload component with multiple file drag and drop support.
          </p>
        </div>

        <div className="grid gap-6">
          {/* Default Example */}
          <Card>
            <CardHeader>
              <CardTitle>Multiple File Upload</CardTitle>
              <CardDescription>
                Upload up to 5 files of any supported type at once.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload
                onChange={handleFilesChange}
                maxFiles={5}
                maxSize={5 * 1024 * 1024} // 5MB
              />
            </CardContent>
          </Card>

          {/* Images Only */}
          <Card>
            <CardHeader>
              <CardTitle>Multiple Images</CardTitle>
              <CardDescription>
                Upload up to 3 images at once. Supports PNG, JPG, GIF, and WebP.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload
                accept={{
                  "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
                }}
                maxFiles={3}
                maxSize={2 * 1024 * 1024} // 2MB
                onChange={handleFilesChange}
              />
            </CardContent>
          </Card>

          {/* Documents Only */}
          <Card>
            <CardHeader>
              <CardTitle>Multiple Documents</CardTitle>
              <CardDescription>
                Upload up to 2 documents at once. Supports PDF and Office files.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FileUpload
                accept={{
                  "application/pdf": [".pdf"],
                  "application/msword": [".doc", ".docx"],
                  "application/vnd.ms-excel": [".xls", ".xlsx"],
                }}
                maxFiles={2}
                maxSize={10 * 1024 * 1024} // 10MB
                onChange={handleFilesChange}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
