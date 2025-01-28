"use client";

import { cn } from "@/lib/utils";
import { useCallback, useRef, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Icon } from "@iconify/react";

interface AvatarUploadProps {
  className?: string;
  value?: string | null;
  onChange?: (file: File | null) => void;
  onRemove?: () => void;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
}

const sizeClasses = {
  sm: "h-16 w-16",
  md: "h-24 w-24",
  lg: "h-32 w-32",
  xl: "h-40 w-40",
  "2xl": "h-48 w-48",
};

const iconSizes = {
  sm: "h-6 w-6",
  md: "h-8 w-8",
  lg: "h-10 w-10",
  xl: "h-12 w-12",
  "2xl": "h-14 w-14",
};

export function AvatarUpload({
  className,
  value,
  onChange,
  onRemove,
  size = "xl",
}: AvatarUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(value || null);
  const [isDragActive, setIsDragActive] = useState(false);

  const handleFileChange = useCallback(
    (file: File | null) => {
      if (!file) {
        setPreview(null);
        onChange?.(null);
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPreview(result);
        onChange?.(file);
      };
      reader.readAsDataURL(file);
    },
    [onChange]
  );

  const handleDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        handleFileChange(acceptedFiles[0]);
      }
    },
    [handleFileChange]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: handleDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
      "image/webp": [".webp"],
    },
    maxFiles: 1,
    multiple: false,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
  });

  return (
    <div
      className={cn(
        "group relative inline-flex cursor-pointer items-center justify-center overflow-hidden rounded-full bg-muted/50 transition-all hover:bg-muted/70",
        sizeClasses[size],
        {
          "ring-2 ring-primary ring-offset-2": isDragActive,
        },
        className
      )}
      {...getRootProps()}
    >
      <input {...getInputProps()} ref={inputRef} />
      {preview ? (
        <>
          <img src={preview} alt="Avatar" className="h-full w-full object-cover" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
            <p className="text-sm font-medium text-white">Change Photo</p>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center gap-1">
          <Icon icon="solar:camera-add-bold" className={cn("text-muted-foreground", iconSizes[size])} />
          <p className="text-xs font-medium text-muted-foreground">Upload</p>
        </div>
      )}
    </div>
  );
}
