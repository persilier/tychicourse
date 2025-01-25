import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AvatarUpload } from "@/components/ui/avatar-upload";

export default function AvatarUploadExample() {
  return (
    <div className="container py-10">
      <Card>
        <CardHeader>
          <CardTitle>Avatar Upload</CardTitle>
          <CardDescription>
            A modern avatar upload component with drag and drop support.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-8">
            {/* Different Sizes */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium">Sizes</h3>
              <div className="flex items-end gap-4">
                <AvatarUpload size="sm" />
                <AvatarUpload size="md" />
                <AvatarUpload size="lg" />
                <AvatarUpload size="xl" />
              </div>
            </div>

            {/* Different States */}
            <div className="space-y-6">
              <h3 className="text-lg font-medium">States</h3>
              <div className="flex items-end gap-4">
                <AvatarUpload defaultValue="https://github.com/shadcn.png" />
                <AvatarUpload disabled />
                <AvatarUpload error="Invalid file type" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
