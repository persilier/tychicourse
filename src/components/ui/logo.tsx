"use client"

import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { cva, type VariantProps } from "class-variance-authority"
import { Icon } from "@iconify/react"
import Link from "next/link"

const logoVariants = cva("flex items-center gap-3 transition-all duration-300", {
    variants: {
        size: {
            sm: "text-sm",
            md: "text-base",
            lg: "text-lg",
            xl: "text-xl",
            "2xl": "text-2xl",
        },
        variant: {
            default: "",
            link: "hover:underline",
        },
        mode: {
            full: "",
            minimal: "",
        }
    },
    defaultVariants: {
        size: "md",
        variant: "default",
        mode: "full",
    },
})

export interface LogoProps extends VariantProps<typeof logoVariants> {
    icon?: string
    name?: string
    slogan?: string
    showSlogan?: boolean
    href?: string
    className?: string
    mode?: "full" | "minimal"
}

export function Logo({
    icon = "fa6-brands:edge",
    name = "Tychi Course",
    slogan = "Votre plateforme d'apprentissage",
    showSlogan = true,
    href = "/",
    size,
    variant,
    mode = "full",
    className,
}: LogoProps) {
    const { theme } = useTheme()
    const Component = href ? Link : "div"
    const iconSize = {
        sm: "w-8 h-8",
        md: "w-9 h-9",
        lg: "w-10 h-10",
        xl: "w-11 h-11",
        "2xl": "w-12 h-12",
    }[size || "md"]

    const iconInnerSize = {
        sm: "w-5 h-5",
        md: "w-6 h-6",
        lg: "w-6 h-6",
        xl: "w-7 h-7",
        "2xl": "w-8 h-8",
    }[size || "md"]

    return (
        <Component
            {...(href ? { href } : {})}
            className={cn(logoVariants({ size, variant, mode }), "hover:opacity-80", className)}
        >
            <div className="relative flex items-center justify-center">
                <div className={cn(
                    "relative rounded-xl bg-gradient-to-br from-sky-500/20 via-blue-500/20 to-indigo-500/20 flex items-center justify-center",
                    iconSize
                )}>
                    <Icon 
                        icon={icon} 
                        className={cn(
                            "text-sky-500 transition-transform duration-300 group-hover:scale-110",
                            iconInnerSize
                        )} 
                    />
                </div>
            </div>
            {mode === "full" && (
                <div className="flex flex-col">
                    <span className="font-semibold leading-none">{name}</span>
                    {showSlogan && (
                        <span className="text-xs text-muted-foreground mt-1">{slogan}</span>
                    )}
                </div>
            )}
        </Component>
    )
}