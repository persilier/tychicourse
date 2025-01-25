"use client";

import * as React from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import Underline from "@tiptap/extension-underline";
import TextStyle from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Icon } from "@iconify/react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  readOnly?: boolean;
}

const colors = [
  "#000000",
  "#333333",
  "#666666",
  "#999999",
  "#cccccc",
  "#ffffff",
  "#ff0000",
  "#ff8000",
  "#ffff00",
  "#00ff00",
  "#00ffff",
  "#0000ff",
  "#8000ff",
  "#ff00ff",
];

export function Editor({
  value,
  onChange,
  placeholder = "Write something...",
  className,
  disabled = false,
  readOnly = false,
}: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class:
            "text-primary underline underline-offset-4 hover:text-primary/80",
        },
      }),
      Image.configure({
        HTMLAttributes: {
          class: "rounded-lg border border-border",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      Underline,
      TextStyle,
      Color,
    ],
    content: value,
    editable: !disabled && !readOnly,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "min-h-[150px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
      },
    },
  });

  const [linkUrl, setLinkUrl] = React.useState("");
  const [imageUrl, setImageUrl] = React.useState("");

  const ToolbarButton = React.useCallback(
    ({ onClick, icon, isActive = false, disabled = false }: any) => (
      <Button
        variant="ghost"
        size="sm"
        onClick={onClick}
        className={cn(
          "h-8 w-8 p-0",
          isActive && "bg-muted text-foreground",
          disabled && "cursor-not-allowed opacity-50"
        )}
        disabled={disabled}
      >
        <Icon icon={icon} className="h-4 w-4" />
      </Button>
    ),
    []
  );

  if (!editor) {
    return null;
  }

  const setLink = () => {
    if (linkUrl) {
      editor.chain().focus().setLink({ href: linkUrl }).run();
      setLinkUrl("");
    }
  };

  const addImage = () => {
    if (imageUrl) {
      editor.chain().focus().setImage({ src: imageUrl }).run();
      setImageUrl("");
    }
  };

  return (
    <div className={cn("space-y-2", className)}>
      {!readOnly && (
        <div className="flex flex-wrap items-center gap-1 rounded-md border bg-muted/50 p-1">
          {/* Text Style */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            icon="solar:bold-bold-duotone"
            isActive={editor.isActive("bold")}
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            icon="solar:italic-bold-duotone"
            isActive={editor.isActive("italic")}
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            icon="solar:underline-bold-duotone"
            isActive={editor.isActive("underline")}
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            icon="solar:strikethrough-bold-duotone"
            isActive={editor.isActive("strike")}
          />
          <div className="mx-1 w-px bg-border" />

          {/* Headings */}
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
            icon="solar:text-bold-duotone"
            isActive={editor.isActive("heading", { level: 1 })}
          />
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
            icon="solar:text-2-bold-duotone"
            isActive={editor.isActive("heading", { level: 2 })}
          />
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
            icon="solar:text-3-bold-duotone"
            isActive={editor.isActive("heading", { level: 3 })}
          />
          <div className="mx-1 w-px bg-border" />

          {/* Lists */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            icon="solar:list-bold-duotone"
            isActive={editor.isActive("bulletList")}
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            icon="solar:list-check-bold-duotone"
            isActive={editor.isActive("orderedList")}
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleTaskList().run()}
            icon="solar:checklist-bold-duotone"
            isActive={editor.isActive("taskList")}
          />
          <div className="mx-1 w-px bg-border" />

          {/* Alignment */}
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            icon="solar:align-left-bold-duotone"
            isActive={editor.isActive({ textAlign: "left" })}
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            icon="solar:align-center-bold-duotone"
            isActive={editor.isActive({ textAlign: "center" })}
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            icon="solar:align-right-bold-duotone"
            isActive={editor.isActive({ textAlign: "right" })}
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            icon="solar:align-justify-bold-duotone"
            isActive={editor.isActive({ textAlign: "justify" })}
          />
          <div className="mx-1 w-px bg-border" />

          {/* Special Formats */}
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            icon="solar:quote-bold-duotone"
            isActive={editor.isActive("blockquote")}
          />
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            icon="solar:code-square-bold-duotone"
            isActive={editor.isActive("codeBlock")}
          />
          <div className="mx-1 w-px bg-border" />

          {/* Links and Media */}
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-8 w-8 p-0",
                  editor.isActive("link") && "bg-muted text-foreground"
                )}
              >
                <Icon icon="solar:link-bold-duotone" className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-3">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Paste link"
                  value={linkUrl}
                  onChange={(e) => setLinkUrl(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={setLink} size="sm">
                  Add
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Icon icon="solar:gallery-bold-duotone" className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-3">
              <div className="flex items-center space-x-2">
                <Input
                  placeholder="Paste image URL"
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                  className="flex-1"
                />
                <Button onClick={addImage} size="sm">
                  Add
                </Button>
              </div>
            </PopoverContent>
          </Popover>
          <div className="mx-1 w-px bg-border" />

          {/* Text Color */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                <Icon icon="solar:pen-bold-duotone" className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-64 p-3">
              <div className="grid grid-cols-7 gap-1">
                {colors.map((color) => (
                  <Button
                    key={color}
                    variant="ghost"
                    className="h-6 w-6 p-0"
                    onClick={() => editor.chain().focus().setColor(color).run()}
                  >
                    <div
                      className="h-4 w-4 rounded-sm border border-border"
                      style={{ backgroundColor: color }}
                    />
                  </Button>
                ))}
              </div>
            </PopoverContent>
          </Popover>

          {/* Clear Format */}
          <ToolbarButton
            onClick={() =>
              editor.chain().focus().clearNodes().unsetAllMarks().run()
            }
            icon="solar:eraser-bold-duotone"
          />
        </div>
      )}
      <EditorContent editor={editor} />
    </div>
  );
}
