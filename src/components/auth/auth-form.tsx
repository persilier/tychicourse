"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface AuthFormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  submitText?: string
  title?: string
  description?: string
  className?: string
  showSubmitButton?: boolean
}

export function AuthForm({ 
  submitText,
  title,
  description,
  className,
  showSubmitButton = true,
  children,
  ...props
}: AuthFormProps) {
  return (
    <div className={cn("space-y-6", className)}>
      {(title || description) && (
        <div className="space-y-2 text-center">
          {title && <h1 className="text-2xl font-semibold tracking-tight">{title}</h1>}
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
      )}
      
      <form {...props} className="space-y-4">
        {children}
        {showSubmitButton && submitText && (
          <Button type="submit" className="w-full">
            {submitText}
          </Button>
        )}
      </form>
    </div>
  )
}
