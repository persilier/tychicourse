import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { InputColor, InputVariant, Radius, Shadow } from "@/lib/type";

//py-[10px]
const inputVariants = cva(
  "flex rounded-md border border-input w-full bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "",
        success: "border-success/50 focus-visible:ring-success",
        warning: "border-warning/50 focus-visible:ring-warning",
        destructive:
          "border-destructive/50 bg-destructive/5 focus-visible:ring-destructive",
        info: "border-info/50 focus-visible:ring-info",
      },
      size: {
        default: "h-10",
        sm: "h-8 px-2",
        lg: "h-12 px-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>,
    VariantProps<typeof inputVariants> {
  removeWrapper?: boolean;
  color?: InputColor;
  variant?: InputVariant;
  radius?: Radius;
  shadow?: Shadow;
  size?: any;
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, variant, size, error, type, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          type={type}
          className={cn(
            inputVariants({
              variant: error ? "destructive" : variant,
              size,
              className,
            })
          )}
          ref={ref}
          {...props}
        />
        {error && <p className="text-sm text-destructive mt-1">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input };
