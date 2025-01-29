"use client"

import { cn } from "@/lib/utils"

interface PageHeaderProps {
  heading: string
  text?: string
  className?: string
}

export function PageHeader({ heading, text, className }: PageHeaderProps) {
  return (
    <div className={cn("space-y-2", className)}>
      <h1 className="text-3xl font-bold tracking-tight">{heading}</h1>
      {text && <p className="text-muted-foreground">{text}</p>}
    </div>
  )
}
