"use client";

import { AvatarUpload } from "@/components/ui/avatar-upload";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useTranslations } from "next-intl";

export default function AvatarUploadShowcase() {
  const t = useTranslations();

  const handleAvatarChange = (file: File | null) => {
    console.log("Avatar file:", file);
  };

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-3xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Avatar Upload Component</h1>
          <p className="text-lg text-muted-foreground">
            A beautiful avatar upload component with drag and drop support and image preview.
          </p>
        </div>

        <div className="grid gap-6">
          {/* Different Sizes */}
          <Card>
            <CardHeader>
              <CardTitle>Different Sizes</CardTitle>
              <CardDescription>
                The avatar upload component supports different sizes.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Small</p>
                  <AvatarUpload size="sm" onChange={handleAvatarChange} />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Medium</p>
                  <AvatarUpload size="md" onChange={handleAvatarChange} />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Large</p>
                  <AvatarUpload size="lg" onChange={handleAvatarChange} />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Extra Large</p>
                  <AvatarUpload size="xl" onChange={handleAvatarChange} />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* States */}
          <Card>
            <CardHeader>
              <CardTitle>States</CardTitle>
              <CardDescription>
                Different states of the avatar upload component.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Default</p>
                  <AvatarUpload onChange={handleAvatarChange} />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">With Error</p>
                  <AvatarUpload
                    error="Invalid file type"
                    onChange={handleAvatarChange}
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Disabled</p>
                  <AvatarUpload disabled onChange={handleAvatarChange} />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">With Default Image</p>
                  <AvatarUpload
                    defaultValue="https://github.com/shadcn.png"
                    onChange={handleAvatarChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Size Restrictions */}
          <Card>
            <CardHeader>
              <CardTitle>Size Restrictions</CardTitle>
              <CardDescription>
                The avatar upload component supports file size restrictions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-end gap-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Max 1MB</p>
                  <AvatarUpload
                    maxSize={1 * 1024 * 1024}
                    onChange={handleAvatarChange}
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Max 2MB</p>
                  <AvatarUpload
                    maxSize={2 * 1024 * 1024}
                    onChange={handleAvatarChange}
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Max 5MB</p>
                  <AvatarUpload
                    maxSize={5 * 1024 * 1024}
                    onChange={handleAvatarChange}
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
