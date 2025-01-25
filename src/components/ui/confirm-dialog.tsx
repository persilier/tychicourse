"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { Button } from "./button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./dialog";

interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  variant?: "danger" | "warning" | "info" | "success";
  icon?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  loading?: boolean;
  children?: React.ReactNode;
}

const variants = {
  danger: {
    icon: "solar:danger-triangle-bold-duotone",
    iconClass: "text-destructive",
    confirmVariant: "destructive" as const,
  },
  warning: {
    icon: "solar:bell-warning-bold-duotone",
    iconClass: "text-warning",
    confirmVariant: "warning" as const,
  },
  info: {
    icon: "solar:info-circle-bold-duotone",
    iconClass: "text-info",
    confirmVariant: "info" as const,
  },
  success: {
    icon: "solar:check-circle-bold-duotone",
    iconClass: "text-success",
    confirmVariant: "success" as const,
  },
};

export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  variant = "danger",
  icon,
  confirmText = "Confirm",
  cancelText = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
  children,
}: ConfirmDialogProps) {
  const variantConfig = variants[variant];

  const handleConfirm = () => {
    onConfirm?.();
  };

  const handleCancel = () => {
    onCancel?.();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[550px]">
        <DialogHeader>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-background">
            <Icon
              icon={icon || variantConfig.icon}
              className={cn("h-8 w-8", variantConfig.iconClass)}
            />
          </div>
          <DialogTitle className="text-center">{title}</DialogTitle>
          {description && (
            <DialogDescription className="text-center">
              {description}
            </DialogDescription>
          )}
        </DialogHeader>

        {children}

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            variant="outline"
            onClick={handleCancel}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            {cancelText}
          </Button>
          <Button
            variant={variantConfig.confirmVariant}
            onClick={handleConfirm}
            disabled={loading}
            className="w-full sm:w-auto"
          >
            {loading && (
              <Icon
                icon="solar:spinner-bold-duotone"
                className="mr-2 h-4 w-4 animate-spin"
              />
            )}
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
