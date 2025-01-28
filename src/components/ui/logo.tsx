"use client"

import { cn } from "@/lib/utils"
import { useTheme } from "next-themes"
import { cva, type VariantProps } from "class-variance-authority"
import Image from "next/image"
import Link from "next/link"

const logoVariants = cva("flex items-center gap-2 transition-opacity hover:opacity-80", {
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
    },
    defaultVariants: {
        size: "md",
        variant: "default",
    },
})

export interface LogoProps extends VariantProps<typeof logoVariants> {
    src?: string
    darkSrc?: string
    name?: string
    slogan?: string
    showSlogan?: boolean
    href?: string
    className?: string
}

export function Logo({
    src = "/logo.svg",
    darkSrc,
    name = "Tychi Course",
    slogan = "Votre plateforme d'apprentissage",
    showSlogan = true,
    href = "/",
    size,
    variant,
    className,
}: LogoProps) {
    const { theme } = useTheme()
    const logoSrc = theme === "dark" && darkSrc ? darkSrc : src

    const WithLink = ({ children }: { children: React.ReactNode }) => {
        if (href) {
            return <Link href={href}>{children}</Link>
        }
        return <>{children}</>
    }

    return (
        <WithLink>
            <div className={cn(logoVariants({ size, variant }), className)}>
                {/* Logo */}
                {logoSrc && (
                    <div className="relative h-8 w-8 shrink-0">
                        <Image
                            src={logoSrc}
                            alt={name}
                            fill
                            className="object-contain"
                            unoptimized={logoSrc.startsWith('data:')}
                        />
                    </div>
                )}

                {/* Text Content */}
                <div className="flex flex-col">
                    <span className={cn(
                        "font-semibold leading-none tracking-tight",
                        size === "2xl" && "text-3xl",
                        size === "xl" && "text-2xl",
                        size === "lg" && "text-xl",
                        size === "md" && "text-lg",
                        size === "sm" && "text-base",
                    )}>
                        {name}
                    </span>
                    {showSlogan && (
                        <span className={cn(
                            "text-muted-foreground font-normal",
                            size === "2xl" && "text-lg",
                            size === "xl" && "text-base",
                            size === "lg" && "text-sm",
                            size === "md" && "text-xs",
                            size === "sm" && "text-[0.7rem]",
                        )}>
                            {slogan}
                        </span>
                    )}
                </div>
            </div>
        </WithLink>
    )
}