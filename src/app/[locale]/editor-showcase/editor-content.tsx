"use client";

import { useState } from "react";
import { Editor } from "@/components/ui/editor";
import { Separator } from "@/components/ui/separator";

export function EditorContent() {
  const [content, setContent] = useState("");
  const [readOnlyContent, setReadOnlyContent] = useState(
    "<h2>Welcome to the Editor!</h2><p>This is a <strong>read-only</strong> example with some formatted content.</p><ul><li>Support for rich text editing</li><li>Customizable toolbar</li><li>Modern styling</li></ul>"
  );

  const simpleModules = {
    toolbar: [
      ["bold", "italic", "underline"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link"],
      ["clean"],
    ],
  };

  return (
    <div className="space-y-8">
      {/* Default Configuration */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Default Configuration</h3>
        <p className="text-sm text-muted-foreground">
          Full-featured editor with all available formatting options.
        </p>
        <Editor
          value={content}
          onChange={setContent}
          placeholder="Start writing your content..."
        />
      </div>

      <Separator />

      {/* Simple Configuration */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Simple Configuration</h3>
        <p className="text-sm text-muted-foreground">
          Basic editor with essential formatting options.
        </p>
        <Editor
          value={content}
          onChange={setContent}
          modules={simpleModules}
          placeholder="Write something simple..."
        />
      </div>

      <Separator />

      {/* Read Only Mode */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Read Only Mode</h3>
        <p className="text-sm text-muted-foreground">
          Display formatted content in read-only mode.
        </p>
        <Editor
          value={readOnlyContent}
          onChange={setReadOnlyContent}
          readOnly
        />
      </div>

      <Separator />

      {/* Disabled State */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Disabled State</h3>
        <p className="text-sm text-muted-foreground">
          Editor in disabled state.
        </p>
        <Editor
          value={content}
          onChange={setContent}
          disabled
          placeholder="This editor is disabled"
        />
      </div>
    </div>
  );
}
