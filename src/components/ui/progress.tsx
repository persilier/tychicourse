"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const progressVariants = cva(
  "relative w-full overflow-hidden rounded-full bg-secondary",
  {
    variants: {
      variant: {
        default: "",
        success: "bg-success/20",
        warning: "bg-warning/20",
        destructive: "bg-destructive/20",
        info: "bg-info/20",
      },
      size: {
        default: "h-4",
        sm: "h-2",
        lg: "h-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

const progressIndicatorVariants = cva("h-full w-full flex-1 transition-all", {
  variants: {
    variant: {
      default: "bg-primary",
      success: "bg-success",
      warning: "bg-warning",
      destructive: "bg-destructive",
      info: "bg-info",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

export interface ProgressProps
  extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>,
    VariantProps<typeof progressVariants> {
  indicatorVariant?: VariantProps<typeof progressIndicatorVariants>["variant"];
}

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  ProgressProps
>(({ className, value, variant, size, indicatorVariant, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(progressVariants({ variant, size }), className)}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn(
        progressIndicatorVariants({ variant: indicatorVariant || variant }),
        "transition-transform duration-500"
      )}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
));
Progress.displayName = ProgressPrimitive.Root.displayName;

// Circular Progress Component
interface CircularProgressProps {
  value: number;
  variant?: VariantProps<typeof progressIndicatorVariants>["variant"];
  size?: number;
  strokeWidth?: number;
  showValue?: boolean;
  className?: string;
}

const CircularProgress = React.forwardRef<
  HTMLDivElement,
  CircularProgressProps
>(
  (
    {
      value,
      variant = "default",
      size = 40,
      strokeWidth = 4,
      showValue = false,
      className,
    },
    ref
  ) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDashoffset = circumference - (value / 100) * circumference;

    const variantColors = {
      default: "stroke-primary",
      success: "stroke-success",
      warning: "stroke-warning",
      destructive: "stroke-destructive",
      info: "stroke-info",
    };

    return (
      <div ref={ref} className={cn("relative inline-flex", className)}>
        <svg
          className="transform -rotate-90"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          <circle
            className="stroke-secondary"
            fill="none"
            strokeWidth={strokeWidth}
            cx={size / 2}
            cy={size / 2}
            r={radius}
          />
          <circle
            className={cn(
              variantColors[variant || "default"],
              "transition-all duration-500"
            )}
            fill="none"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            cx={size / 2}
            cy={size / 2}
            r={radius}
          />
        </svg>
        {showValue && (
          <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
            {Math.round(value)}%
          </div>
        )}
      </div>
    );
  }
);
CircularProgress.displayName = "CircularProgress";

export { Progress, CircularProgress };
