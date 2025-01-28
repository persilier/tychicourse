"use client";

import * as React from "react";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { Button } from "./button";
import { Progress } from "./progress";
import { motion, AnimatePresence } from "framer-motion";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip";

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

const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 Bytes";
  const k = 1024;
  const sizes = ["Bytes", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
};

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
  const [error, setError] = React.useState<string | null>(externalError || null);
  const [isDragActive, setIsDragActive] = React.useState(false);

  const validateFile = (file: File): string | null => {
    if (file.size > maxSize) {
      return `File size must be less than ${formatFileSize(maxSize)}`;
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

      // Simulate upload progress
      const newFiles: FilePreview[] = acceptedFiles.map((file) => ({
        file,
        preview: URL.createObjectURL(file),
        progress: 0,
      }));

      setFiles((prev) => [...prev, ...newFiles]);

      // Simulate upload progress
      newFiles.forEach((filePreview, index) => {
        let progress = 0;
        const interval = setInterval(() => {
          progress += Math.random() * 30;
          if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
          }
          setFiles((prev) =>
            prev.map((f) =>
              f.file === filePreview.file ? { ...f, progress } : f
            )
          );
        }, 200);
      });

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
    multiple: true,
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
      <motion.div
        key={file.file.name}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, x: -20 }}
        className="group relative overflow-hidden rounded-lg border bg-gradient-to-br from-background to-muted/30 p-3 shadow-sm transition-all hover:shadow-md"
      >
        <div className="flex items-center gap-4">
          {isImage ? (
            <div className="relative h-16 w-16 overflow-hidden rounded-md border bg-background/50">
              <img
                src={file.preview}
                alt={file.file.name}
                className="h-full w-full object-cover transition-transform group-hover:scale-110"
              />
            </div>
          ) : (
            <div className="flex h-16 w-16 items-center justify-center rounded-md bg-muted/50">
              <Icon
                icon="solar:file-bold-duotone"
                className="h-8 w-8 text-primary"
              />
            </div>
          )}
          <div className="flex-1 space-y-1">
            <div className="flex items-center gap-2">
              <p className="truncate text-sm font-medium leading-none">
                {file.file.name}
              </p>
              <span className="text-xs text-muted-foreground">
                {formatFileSize(file.file.size)}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Progress
                value={file.progress}
                size="sm"
                className="max-w-[200px]"
              />
              <span className="text-xs font-medium text-muted-foreground">
                {Math.round(file.progress)}%
              </span>
            </div>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => removeFile(file.file)}
                >
                  <Icon
                    icon="solar:trash-bin-trash-bold-duotone"
                    className="h-4 w-4"
                  />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="left">Remove file</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </motion.div>
    );
  };

  const acceptedFileTypes = Object.values(accept)
    .flat()
    .join(", ")
    .replace(/\./g, "")
    .toUpperCase();

  return (
    <div className={cn("w-full space-y-4", className)}>
      <motion.div
        {...getRootProps()}
        animate={{
          scale: isDragActive ? 1.02 : 1,
          borderColor: isDragActive ? "hsl(var(--primary))" : "currentColor",
        }}
        className={cn(
          "relative cursor-pointer overflow-hidden rounded-lg border-2 border-dashed border-muted-foreground/25 bg-gradient-to-br from-background to-muted/20 p-8 transition-colors hover:border-muted-foreground/50",
          isDragActive && "border-primary bg-primary/5",
          disabled && "cursor-not-allowed opacity-60",
          error && "border-destructive/50 hover:border-destructive"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-3 text-center">
          <motion.div
            animate={{
              scale: isDragActive ? 1.1 : 1,
              rotate: isDragActive ? 180 : 0,
            }}
            className={cn(
              "rounded-full bg-primary/10 p-3",
              isDragActive && "bg-primary/20"
            )}
          >
            <Icon
              icon="solar:upload-minimalistic-bold-duotone"
              className={cn(
                "h-6 w-6 text-primary transition-colors",
                isDragActive && "text-primary"
              )}
            />
          </motion.div>
          <div className="space-y-2">
            <p className="text-base font-medium">
              {isDragActive ? (
                <motion.span
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  Drop your files here
                </motion.span>
              ) : (
                <>
                  <span>Drag & drop your files or </span>
                  <span className="text-primary">browse</span>
                </>
              )}
            </p>
            <p className="text-sm text-muted-foreground">
              {acceptedFileTypes} up to {formatFileSize(maxSize)}
            </p>
            <p className="text-xs text-muted-foreground">
              You can upload up to {maxFiles} file{maxFiles > 1 ? "s" : ""} at once
            </p>
          </div>
        </div>
      </motion.div>

      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm font-medium text-destructive"
        >
          {error}
        </motion.p>
      )}

      {showPreview && (
        <AnimatePresence mode="popLayout">
          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-2"
            >
              {files.map((file) => renderPreview(file))}
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
