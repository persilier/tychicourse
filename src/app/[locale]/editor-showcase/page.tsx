import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { EditorContent } from "./editor-content";

export default function EditorShowcase() {
  return (
    <main className="container py-10">
      <div className="mx-auto max-w-4xl space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Rich Text Editor</CardTitle>
            <CardDescription>
              A modern and customizable rich text editor built with React Quill.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <EditorContent />
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
