"use client";

import * as React from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { Button } from "./button";
import { Progress } from "./progress";

interface FileUploadProps {
  value?: File[];
  onChange?: (files: File[]) => void;
  onRemove?: (file: File) => void;
  className?: string;
  disabled?: boolean;
  maxSize?: number;
  maxFiles?: number;
  accept?: Record<string, string[]>;
  error?: string;
  onError?: (error: string) => void;
  showPreview?: boolean;
}

interface FilePreview {
  file: File;
  preview: string;
  progress: number;
}

const DEFAULT_MAX_SIZE = 5 * 1024 * 1024; // 5MB
const DEFAULT_MAX_FILES = 5;

export function FileUpload({
  value = [],
  onChange,
  onRemove,
  className,
  disabled = false,
  maxSize = DEFAULT_MAX_SIZE,
  maxFiles = DEFAULT_MAX_FILES,
  accept = {
    "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
    "application/pdf": [".pdf"],
    "application/msword": [".doc", ".docx"],
    "application/vnd.ms-excel": [".xls", ".xlsx"],
  },
  error: externalError,
  onError,
  showPreview = true,
}: FileUploadProps) {
  const [files, setFiles] = React.useState<FilePreview[]>([]);
  const [error, setError] = React.useState<string | null>(
    externalError || null
  );
  const [isDragActive, setIsDragActive] = React.useState(false);

  const validateFile = (file: File): string | null => {
    if (file.size > maxSize) {
      return `File size must be less than ${Math.round(maxSize / 1024 / 1024)}MB`;
    }

    const fileType = file.type.split("/")[0];
    const fileExtension = `.${file.name.split(".").pop()}`;
    let isValidType = false;

    Object.entries(accept).forEach(([type, extensions]) => {
      if (type.includes(fileType) || extensions.includes(fileExtension)) {
        isValidType = true;
      }
    });

    if (!isValidType) {
      return "Invalid file type";
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

      if (files.length + acceptedFiles.length > maxFiles) {
        const errorMessage = `Maximum ${maxFiles} files allowed`;
        setError(errorMessage);
        onError?.(errorMessage);
        return;
      }

      const newFiles: FilePreview[] = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        progress: 100,
      }));

      setFiles((prev) => [...prev, ...newFiles]);
      onChange?.(acceptedFiles);
    },
    [files.length, maxFiles, onChange, onError]
  );

  const removeFile = (file: File) => {
    setFiles((prev) => prev.filter((f) => f.file !== file));
    onRemove?.(file);
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept,
    maxFiles,
    disabled,
    maxSize,
    onDragEnter: () => setIsDragActive(true),
    onDragLeave: () => setIsDragActive(false),
    onDropAccepted: () => setIsDragActive(false),
    onDropRejected: () => setIsDragActive(false),
  });

  React.useEffect(() => {
    return () => {
      files.forEach((file) => {
        URL.revokeObjectURL(file.preview);
      });
    };
  }, [files]);

  const renderPreview = (file: FilePreview) => {
    const isImage = file.file.type.startsWith("image/");

    return (
      <div
        key={file.file.name}
        className="group relative rounded-lg border bg-background p-2"
      >
        <div className="flex items-center gap-3">
          {isImage ? (
            <img
              src={file.preview}
              alt={file.file.name}
              className="h-14 w-14 rounded-md object-cover"
            />
          ) : (
            <div className="flex h-14 w-14 items-center justify-center rounded-md bg-muted">
              <Icon
                icon="solar:file-bold-duotone"
                className="h-6 w-6 text-primary"
              />
            </div>
          )}
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{file.file.name}</p>
            <p className="text-sm text-muted-foreground">
              {Math.round(file.file.size / 1024)} KB
            </p>
            <Progress
              value={file.progress}
              size="sm"
              className="max-w-[200px]"
            />
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            onClick={() => removeFile(file.file)}
          >
            <Icon
              icon="solar:trash-bin-trash-bold-duotone"
              className="h-4 w-4"
            />
          </Button>
        </div>
      </div>
    );
  };

  return (
    <div className={cn("w-full space-y-4", className)}>
      <div
        {...getRootProps()}
        className={cn(
          "relative cursor-pointer rounded-lg border-2 border-dashed border-muted-foreground/25 p-8 transition-colors hover:border-muted-foreground/50",
          isDragActive && "border-primary bg-primary/5",
          disabled && "cursor-not-allowed opacity-60",
          error && "border-destructive/50 hover:border-destructive"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-2 text-center">
          <div
            className={cn(
              "rounded-full bg-background p-2",
              isDragActive && "bg-primary/5"
            )}
          >
            <Icon
              icon="solar:upload-bold-duotone"
              className={cn(
                "h-6 w-6 text-primary transition-colors",
                isDragActive && "text-primary"
              )}
            />
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium">
              {isDragActive
                ? "Drop files here"
                : "Drop files or click to upload"}
            </p>
            <p className="text-sm text-muted-foreground">
              Maximum file size: {Math.round(maxSize / 1024 / 1024)}MB
            </p>
          </div>
        </div>
      </div>

      {error && <p className="text-sm font-medium text-destructive">{error}</p>}

      {showPreview && files.length > 0 && (
        <div className="space-y-2">
          {files.map((file) => renderPreview(file))}
        </div>
      )}
    </div>
  );
}
