"use client";

import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import { cn } from "@/lib/utils";
import { Icon } from "@iconify/react";
import { cva, type VariantProps } from "class-variance-authority";

const cardCheckboxVariants = cva(
  "group relative w-full rounded-lg border-2 p-4 transition-all hover:border-primary/50 hover:shadow-sm [&:has([data-state=checked])]:border-primary [&:has([data-state=checked])]:bg-primary/5 [&:has([data-state=checked])]:ring-1 [&:has([data-state=checked])]:ring-primary/50",
  {
    variants: {
      variant: {
        default: "",
        success:
          "hover:border-success/50 [&:has([data-state=checked])]:border-success [&:has([data-state=checked])]:bg-success/5 [&:has([data-state=checked])]:ring-success/50",
        warning:
          "hover:border-warning/50 [&:has([data-state=checked])]:border-warning [&:has([data-state=checked])]:bg-warning/5 [&:has([data-state=checked])]:ring-warning/50",
        destructive:
          "hover:border-destructive/50 [&:has([data-state=checked])]:border-destructive [&:has([data-state=checked])]:bg-destructive/5 [&:has([data-state=checked])]:ring-destructive/50",
        info: "hover:border-info/50 [&:has([data-state=checked])]:border-info [&:has([data-state=checked])]:bg-info/5 [&:has([data-state=checked])]:ring-info/50",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const iconContainerVariants = cva(
  "inline-flex h-10 w-10 items-center justify-center rounded-lg transition-colors",
  {
    variants: {
      variant: {
        default:
          "bg-primary/10 text-primary group-hover:bg-primary/20 [&:has([data-state=checked])]:bg-primary/20",
        success:
          "bg-success/10 text-success group-hover:bg-success/20 [&:has([data-state=checked])]:bg-success/20",
        warning:
          "bg-warning/10 text-warning group-hover:bg-warning/20 [&:has([data-state=checked])]:bg-warning/20",
        destructive:
          "bg-destructive/10 text-destructive group-hover:bg-destructive/20 [&:has([data-state=checked])]:bg-destructive/20",
        info: "bg-info/10 text-info group-hover:bg-info/20 [&:has([data-state=checked])]:bg-info/20",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface CardCheckboxProps
  extends React.ComponentPropsWithoutRef<typeof CheckboxPrimitive.Root>,
    VariantProps<typeof cardCheckboxVariants> {
  icon?: string;
  title: string;
  description?: string;
  iconClassName?: string;
}

const CardCheckbox = React.forwardRef<
  React.ElementRef<typeof CheckboxPrimitive.Root>,
  CardCheckboxProps
>(
  (
    { className, variant, icon, title, description, iconClassName, ...props },
    ref
  ) => (
    <div className={cn(cardCheckboxVariants({ variant }), className)}>
      <div className="flex items-center space-x-3">
        <CheckboxPrimitive.Root
          ref={ref}
          className="peer h-5 w-5 shrink-0 rounded border border-primary shadow focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground"
          {...props}
        >
          <CheckboxPrimitive.Indicator className="flex items-center justify-center text-current">
            <Icon icon="heroicons:check" className="h-4 w-4" />
          </CheckboxPrimitive.Indicator>
        </CheckboxPrimitive.Root>

        <div className="flex items-center gap-3 flex-1">
          {icon && (
            <div className={cn(iconContainerVariants({ variant }))}>
              <Icon icon={icon} className={cn("h-5 w-5", iconClassName)} />
            </div>
          )}
          <div>
            <h3 className="text-base font-medium leading-tight">{title}</h3>
            {description && (
              <p className="text-sm text-muted-foreground mt-0.5 leading-snug">
                {description}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
);
CardCheckbox.displayName = "CardCheckbox";

export { CardCheckbox };
