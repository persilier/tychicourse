"use client"

import Link from "next/link"
import { LucideProps } from "lucide-react"
import {
  AlertTriangle,
  Bell,
  FileStack,
  Image as ImageIcon,
  Upload,
  BadgeCheck,
  LayoutGrid,
  Terminal,
  AlertCircle,
  Info,
  SlidersHorizontal,
  GripHorizontal,
} from "lucide-react"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

interface NavItem {
  title: string
  href?: string
  label?: string
  icon?: React.ComponentType<LucideProps>
  variant?: "default" | "ghost"
}

interface NavSection {
  title: string
  items: NavItem[]
}

const sections: NavSection[] = [
  {
    title: "Showcase",
    items: [
      {
        title: "Alert",
        href: "/alert-showcase",
        icon: AlertCircle,
      },
      {
        title: "Avatar",
        href: "/avatar-showcase",
        icon: ImageIcon,
      },
      {
        title: "Avatar Upload",
        href: "/avatar-upload-showcase",
        icon: Upload,
      },
      {
        title: "Badge",
        href: "/badge-showcase",
        icon: BadgeCheck,
      },
      {
        title: "Breadcrumbs",
        href: "/breadcrumbs-showcase",
        icon: GripHorizontal,
      },
      {
        title: "Card",
        href: "/card-showcase",
        icon: LayoutGrid,
      },
      {
        title: "Confirm Dialog",
        href: "/confirm-dialog-showcase",
        icon: AlertTriangle,
      },
      {
        title: "Editor",
        href: "/editor-showcase",
        icon: Terminal,
      },
      {
        title: "File Upload",
        href: "/file-upload-showcase",
        icon: FileStack,
      },
      {
        title: "Rating",
        href: "/rating-showcase",
        icon: Info,
      },
      {
        title: "Select",
        href: "/select-showcase",
        icon: SlidersHorizontal,
      },
      {
        title: "Toast",
        href: "/toast-showcase",
        icon: Bell,
      },
    ],
  },
  {
    title: "Components",
    items: [
      {
        title: "Buttons",
        href: "/components/buttons",
        icon: "solar:buttons-bold-duotone",
      },
      {
        title: "Cards",
        href: "/components/cards",
        icon: "solar:card-bold-duotone",
      },
      {
        title: "Modals",
        href: "/modal-showcase",
        icon: "solar:popup-bold-duotone",
      },
      {
        title: "Toasts",
        href: "/toast-showcase",
        icon: "solar:bell-bing-bold-duotone",
      },
      {
        title: "File Upload",
        href: "/file-upload-showcase",
        icon: "solar:upload-square-bold-duotone",
      },
      {
        title: "Avatar Upload",
        href: "/avatar-upload-showcase",
        icon: "solar:user-circle-bold-duotone",
      },
    ],
  },
  {
    title: "Pages",
    items: [
      {
        title: "Pages d'Erreur",
        href: "/error-pages",
        icon: AlertTriangle,
      },
      {
        title: "User Management",
        href: "/user-management",
        icon: "solar:users-group-rounded-bold-duotone",
      },
    ],
  },
]

export function ComponentsNav() {
  const pathname = usePathname()

  return (
    <div className="space-y-4">
      {sections.map((section) => (
        <div key={section.title} className="space-y-2">
          <h4 className="px-2 text-sm font-semibold">{section.title}</h4>
          <div className="grid grid-flow-row auto-rows-max gap-1 text-sm">
            {section.items.map((item) =>
              !item.href ? (
                <span
                  key={item.title}
                  className={cn(
                    buttonVariants({ variant: item.variant ?? "ghost" }),
                    "justify-start"
                  )}
                >
                  {item.title}
                </span>
              ) : (
                <Link
                  key={item.title}
                  href={item.href}
                  className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "justify-start",
                    pathname?.startsWith(item.href)
                      ? "bg-muted font-medium text-foreground hover:bg-muted"
                      : "font-normal"
                  )}
                >
                  {item.icon && (
                    <item.icon className="mr-2 h-4 w-4" />
                  )}
                  {item.title}
                  {item.label && (
                    <span className="ml-2 rounded-md bg-[#ff0000] px-1.5 py-0.5 text-xs leading-none text-[#ffffff] no-underline group-hover:no-underline">
                      {item.label}
                    </span>
                  )}
                </Link>
              )
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
