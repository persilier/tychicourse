import * as React from "react"
import Link from "next/link"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { cn } from "@/lib/utils"
import { ChevronRight, HomeIcon, Slash } from "lucide-react"

export interface BreadcrumbItem {
    label: string
    href?: string
    icon?: React.ReactNode
}

interface CustomBreadcrumbsProps {
    items: BreadcrumbItem[]
    className?: string
    variant?: "default" | "outline" | "secondary" | "ghost"
    color?: "default" | "primary" | "success" | "warning" | "danger"
    separator?: "chevron" | "slash"
}

export function CustomBreadcrumbs({
    items,
    className,
    variant = "default",
    color = "default",
    separator = "chevron"
}: CustomBreadcrumbsProps) {
    const variants = {
        default: "bg-background",
        outline: "border rounded-lg px-3 py-1",
        secondary: "bg-secondary rounded-lg px-3 py-1",
        ghost: "hover:bg-accent rounded-lg px-3 py-1"
    }

    const colors = {
        default: "",
        primary: "bg-blue-50 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800",
        success: "bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-300 border-green-200 dark:border-green-800",
        warning: "bg-yellow-50 dark:bg-yellow-950 text-yellow-700 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800",
        danger: "bg-red-50 dark:bg-red-950 text-red-700 dark:text-red-300 border-red-200 dark:border-red-800"
    }

    const linkColors = {
        default: "hover:text-foreground",
        primary: "text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200",
        success: "text-green-600 dark:text-green-400 hover:text-green-800 dark:hover:text-green-200",
        warning: "text-yellow-600 dark:text-yellow-400 hover:text-yellow-800 dark:hover:text-yellow-200",
        danger: "text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-200"
    }

    const separators = {
        chevron: <ChevronRight className="h-4 w-4" />,
        slash: <Slash className="h-4 w-4" />
    }

    return (
        <Breadcrumb className={cn(variants[variant], colors[color], className)}>
            <BreadcrumbList>
                {items.map((item, index) => (
                    <React.Fragment key={index}>
                        <BreadcrumbItem>
                            {index === items.length - 1 ? (
                                <BreadcrumbPage className="flex items-center gap-2">
                                    {item.icon}
                                    {item.label}
                                </BreadcrumbPage>
                            ) : (
                                <BreadcrumbLink asChild>
                                    <Link
                                        href={item.href ?? "#"}
                                        className={cn(
                                            "flex items-center gap-2",
                                            linkColors[color]
                                        )}
                                    >
                                        {item.icon}
                                        {item.label}
                                    </Link>
                                </BreadcrumbLink>
                            )}
                        </BreadcrumbItem>
                        {index < items.length - 1 && (
                            <BreadcrumbSeparator>
                                {separators[separator]}
                            </BreadcrumbSeparator>
                        )}
                    </React.Fragment>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    )
}
