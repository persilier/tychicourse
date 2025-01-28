"use client"

import { cn } from "@/lib/utils"
import { ClientLogo } from "./client-logo"

interface AuthHeaderProps {
  title?: string
  description?: string
  showBranding?: boolean
  children?: React.ReactNode
  className?: string
}

export function AuthHeader({ 
  title, 
  description, 
  showBranding = true,
  children,
  className
}: AuthHeaderProps) {
  return (
    <div className={cn("mb-8", className)}>
      {showBranding && (
        <div className="mb-8">
          <ClientLogo
            showSlogan
            size="xl"
            className="mx-auto"
          />
        </div>
      )}
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
        {children}
      </div>
    </div>
  )
}
