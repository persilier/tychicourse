"use client";

import { useState } from "react";
import { AvatarUpload } from "@/components/ui/avatar-upload";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function AvatarUploadShowcase() {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Avatar Upload Component</CardTitle>
            <CardDescription>
              A beautiful and modern avatar upload component with drag and drop
              support, image preview, and validation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Sizes */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Sizes</h3>
              <div className="flex items-end gap-8">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Small</p>
                  <AvatarUpload size="sm" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    Medium (Default)
                  </p>
                  <AvatarUpload size="md" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Large</p>
                  <AvatarUpload size="lg" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Extra Large</p>
                  <AvatarUpload size="xl" />
                </div>
              </div>
            </div>

            <Separator />

            {/* States */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">States</h3>
              <div className="flex items-end gap-8">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Default</p>
                  <AvatarUpload />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">
                    With Default Image
                  </p>
                  <AvatarUpload defaultValue="https://github.com/shadcn.png" />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Disabled</p>
                  <AvatarUpload disabled />
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">With Error</p>
                  <AvatarUpload error="Invalid file type" />
                </div>
              </div>
            </div>

            <Separator />

            {/* Interactive Demo */}
            <div className="space-y-4">
              <h3 className="text-lg font-medium">Interactive Demo</h3>
              <div className="flex items-start gap-8">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Try it out</p>
                  <AvatarUpload
                    size="xl"
                    onChange={setFile}
                    onPreviewChange={setPreview}
                    onError={setError}
                    error={error}
                  />
                </div>
                <div className="flex-1 space-y-4 rounded-lg border p-4">
                  <div>
                    <p className="text-sm font-medium">Selected File:</p>
                    <p className="text-sm text-muted-foreground">
                      {file ? file.name : "No file selected"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">File Size:</p>
                    <p className="text-sm text-muted-foreground">
                      {file ? `${Math.round(file.size / 1024)} KB` : "N/A"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium">File Type:</p>
                    <p className="text-sm text-muted-foreground">
                      {file ? file.type : "N/A"}
                    </p>
                  </div>
                  {error && (
                    <div>
                      <p className="text-sm font-medium">Error:</p>
                      <p className="text-sm text-destructive">{error}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
