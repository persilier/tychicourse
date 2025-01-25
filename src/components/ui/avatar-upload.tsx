"use client";

import * as React from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { Button } from "./button";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";

interface AvatarUploadProps {
  value?: string;
  defaultValue?: string;
  onChange?: (file: File | null) => void;
  onPreviewChange?: (preview: string | null) => void;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl";
  disabled?: boolean;
  maxSize?: number;
  error?: string;
  onError?: (error: string) => void;
}

const sizeClasses = {
  sm: "h-16 w-16",
  md: "h-20 w-20",
  lg: "h-24 w-24",
  xl: "h-32 w-32",
};

const DEFAULT_MAX_SIZE = 5 * 1024 * 1024; // 5MB

export function AvatarUpload({
  value,
  defaultValue,
  onChange,
  onPreviewChange,
  className,
  size = "md",
  disabled = false,
  maxSize = DEFAULT_MAX_SIZE,
  error: externalError,
  onError,
}: AvatarUploadProps) {
  const [preview, setPreview] = React.useState<string | null>(
    value || defaultValue || null
  );
  const [isHovered, setIsHovered] = React.useState(false);
  const [error, setError] = React.useState<string | null>(
    externalError || null
  );

  const validateFile = (file: File): string | null => {
    if (file.size > maxSize) {
      return `File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`;
    }

    const validTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!validTypes.includes(file.type)) {
      return "File must be an image (JPG, PNG, GIF, or WebP)";
    }

    return null;
  };

  const onDrop = React.useCallback(
    (acceptedFiles: File[], rejectedFiles: any[]) => {
      setError(null);

      if (rejectedFiles.length > 0) {
        const errorMessage = "Invalid file. Please check file type and size.";
        setError(errorMessage);
        onError?.(errorMessage);
        return;
      }

      if (acceptedFiles.length === 0) return;

      const file = acceptedFiles[0];
      const validationError = validateFile(file);

      if (validationError) {
        setError(validationError);
        onError?.(validationError);
        return;
      }

      onChange?.(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        const previewUrl = reader.result as string;
        setPreview(previewUrl);
        onPreviewChange?.(previewUrl);
      };
      reader.readAsDataURL(file);
    },
    [onChange, onPreviewChange, maxSize, onError]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/jpeg": [".jpg", ".jpeg"],
      "image/png": [".png"],
      "image/gif": [".gif"],
      "image/webp": [".webp"],
    },
    maxFiles: 1,
    disabled,
    maxSize,
  });

  const removeImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPreview(null);
    setError(null);
    onChange?.(null);
    onPreviewChange?.(null);
  };

  return (
    <div
      {...getRootProps()}
      className={cn(
        "group relative cursor-pointer",
        disabled && "cursor-not-allowed opacity-60",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <input {...getInputProps()} />
      <Avatar
        className={cn(
          sizeClasses[size],
          "border-2 border-dashed transition-all duration-300",
          isDragActive
            ? "border-primary/50 bg-primary/5"
            : error
              ? "border-destructive border-solid"
              : "border-border hover:border-primary/50 hover:bg-primary/5",
          preview && !error && "border-solid"
        )}
      >
        {preview ? (
          <AvatarImage src={preview} alt="Avatar" className="object-cover" />
        ) : (
          <AvatarFallback className="bg-transparent">
            <div className="flex flex-col items-center gap-1">
              <Icon
                icon="solar:gallery-add-bold-duotone"
                className={cn(
                  "transition-all duration-300",
                  size === "sm" && "h-5 w-5",
                  size === "md" && "h-6 w-6",
                  size === "lg" && "h-7 w-7",
                  size === "xl" && "h-8 w-8",
                  isDragActive && "scale-110 text-primary",
                  error && "text-destructive"
                )}
              />
              {size === "xl" && (
                <span
                  className={cn(
                    "text-xs font-medium",
                    error && "text-destructive"
                  )}
                >
                  Upload Image
                </span>
              )}
            </div>
          </AvatarFallback>
        )}
      </Avatar>

      {/* Hover Overlay */}
      {preview && isHovered && !disabled && (
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/60 transition-all">
          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/20 hover:text-white"
              onClick={removeImage}
            >
              <Icon
                icon="solar:trash-bin-trash-bold-duotone"
                className="h-4 w-4"
              />
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-white hover:bg-white/20 hover:text-white"
            >
              <Icon icon="solar:pen-bold-duotone" className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      {/* Drag Overlay */}
      {isDragActive && (
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-primary/10 backdrop-blur-sm">
          <div className="flex flex-col items-center gap-1">
            <Icon
              icon="solar:upload-bold-duotone"
              className={cn(
                "text-primary transition-all duration-300",
                size === "sm" && "h-5 w-5",
                size === "md" && "h-6 w-6",
                size === "lg" && "h-7 w-7",
                size === "xl" && "h-8 w-8"
              )}
            />
            {size === "xl" && (
              <span className="text-xs font-medium text-primary">
                Drop to Upload
              </span>
            )}
          </div>
        </div>
      )}

      {error && (
        <div className="absolute -bottom-6 left-0 right-0 text-center">
          <span className="text-xs text-destructive">{error}</span>
        </div>
      )}
    </div>
  );
}
