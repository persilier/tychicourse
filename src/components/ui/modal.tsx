"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { cva, type VariantProps } from "class-variance-authority"
import { useTranslations } from "next-intl"
import { Icon } from "@iconify/react"

const modalVariants = cva("", {
  variants: {
    size: {
      sm: "sm:max-w-[440px]",
      md: "sm:max-w-[540px]",
      lg: "sm:max-w-[720px]",
      xl: "sm:max-w-[920px]",
      "2xl": "sm:max-w-[1120px]",
      full: "sm:max-w-[calc(100vw-40px)]",
    },
  },
  defaultVariants: {
    size: "md",
  },
})

const headerVariants = cva("relative overflow-hidden", {
  variants: {
    variant: {
      default: "bg-gradient-to-br from-primary/20 via-violet-500/15 to-sky-500/20",
      success: "bg-gradient-to-br from-green-500/20 via-emerald-500/15 to-teal-500/20",
      danger: "bg-gradient-to-br from-red-500/20 via-rose-500/15 to-orange-500/20",
      warning: "bg-gradient-to-br from-yellow-500/20 via-amber-500/15 to-orange-500/20",
      info: "bg-gradient-to-br from-blue-500/20 via-sky-500/15 to-cyan-500/20",
    },
  },
  defaultVariants: {
    variant: "default",
  },
})

interface ModalProps extends VariantProps<typeof modalVariants>, VariantProps<typeof headerVariants> {
  open?: boolean
  onOpenChange?: (open: boolean) => void
  title?: string
  description?: string
  children?: React.ReactNode
  className?: string
  headerClassName?: string
  contentClassName?: string
  showFloral?: boolean
  operation?: "create" | "edit" | "delete" | "view"
}

export function Modal({
  open,
  onOpenChange,
  title,
  description,
  children,
  className,
  headerClassName,
  contentClassName,
  size,
  variant,
  showFloral = true,
  operation = "view",
}: ModalProps) {
  const t = useTranslations("Common.Modal")

  const getTitle = () => {
    if (title) return title
    return operation === "create"
      ? t("createTitle")
      : operation === "edit"
      ? t("editTitle")
      : operation === "delete"
      ? t("deleteTitle")
      : t("viewTitle")
  }

  const getDescription = () => {
    if (description) return description
    return operation === "create"
      ? t("createDescription")
      : operation === "edit"
      ? t("editDescription")
      : operation === "delete"
      ? t("deleteDescription")
      : t("viewDescription")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={cn(modalVariants({ size }), "bg-gradient-to-b from-background to-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 p-0", className)}>
        <DialogHeader className={cn(headerVariants({ variant }), headerClassName)}>
          {/* Close Button */}
          <div className="absolute right-6 top-6 z-50">
            <DialogClose className="group relative rounded-full h-9 w-9 p-0 flex items-center justify-center bg-background/40 hover:bg-background/60 backdrop-blur-md border border-white/20 shadow-sm transition-all hover:scale-105 hover:shadow-lg hover:border-white/30 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-white/10 via-white/0 to-white/5" />
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-black/0 via-black/5 to-black/10" />
              <Icon 
                icon="ph:x-circle-bold" 
                className="h-[18px] w-[18px] text-white/70 transition-transform group-hover:scale-110 group-hover:text-white/90" 
              />
              <span className="sr-only">Close</span>
            </DialogClose>
          </div>

          {/* Gradient Overlay */}
          <div className="absolute inset-0 w-full h-full animate-gradient-x" />
          
          {/* Radial Gradient Overlays */}
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,white_0%,transparent_60%)] opacity-70" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.7)_0%,transparent_50%)]" />
          </div>

          {/* Floral Pattern */}
          {showFloral && (
            <div className="absolute inset-0" style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm63 31c1.657 0 3-1.343 3-3s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM34 90c1.657 0 3-1.343 3-3s-.895-2-2-2-2 .895-2 2 .895 2 2 2zm56-76c1.657 0 3-1.343 3-3s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' /%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '50px 50px',
              backgroundPosition: 'center',
              mixBlendMode: 'overlay',
            }} />
          )}

          {/* Content */}
          <div className="relative pt-8 pb-6 px-6">
            <DialogTitle className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
              {getTitle()}
            </DialogTitle>
            <DialogDescription className="text-sm font-medium text-foreground/70 mt-1">
              {getDescription()}
            </DialogDescription>
          </div>
        </DialogHeader>

        <div className={cn("p-6", contentClassName)}>
          {children}
        </div>
      </DialogContent>
    </Dialog>
  )
}
