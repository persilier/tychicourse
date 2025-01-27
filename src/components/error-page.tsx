"use client"

import * as React from "react"
import { Button } from "@/components/ui/button"
import {
    Ban,
    FileWarning,
    Lock,
    AlertCircle,
    RefreshCw,
    Home,
    ArrowLeft
} from "lucide-react"
import { useRouter } from "next/navigation"

interface ErrorPageProps {
    code: "404" | "403" | "500" | "401" | string
    title: string
    description: string
    showRetry?: boolean
    showHome?: boolean
    showBack?: boolean
    children?: React.ReactNode
}

const errorIcons = {
    "404": FileWarning,
    "403": Ban,
    "401": Lock,
    "500": AlertCircle,
}

const errorStyles = {
    "404": {
        color: "rgb(239 68 68)", // red-500
        lightBg: "rgb(254 242 242)", // red-50
        darkBg: "rgb(153 27 27)", // red-800
    },
    "403": {
        color: "rgb(234 179 8)", // yellow-500
        lightBg: "rgb(254 252 232)", // yellow-50
        darkBg: "rgb(161 98 7)", // yellow-800
    },
    "401": {
        color: "rgb(59 130 246)", // blue-500
        lightBg: "rgb(239 246 255)", // blue-50
        darkBg: "rgb(30 64 175)", // blue-800
    },
    "500": {
        color: "rgb(99 102 241)", // indigo-500
        lightBg: "rgb(238 242 255)", // indigo-50
        darkBg: "rgb(55 48 163)", // indigo-800
    }
}

export function ErrorPage({
    code,
    title,
    description,
    showRetry = false,
    showHome = true,
    showBack = true,
    children,
}: ErrorPageProps) {
    const router = useRouter()
    const IconComponent = errorIcons[code as keyof typeof errorIcons] || AlertCircle
    const style = errorStyles[code as keyof typeof errorStyles] || errorStyles["500"]

    return (
        <div className="min-h-[80vh] relative overflow-hidden">
            {/* Fond avec dégradé */}
            <div
                className="absolute inset-0 dark:opacity-20"
                style={{
                    background: `
            radial-gradient(circle at top left, ${style.lightBg}, transparent 40%),
            radial-gradient(circle at top right, ${style.lightBg}, transparent 40%),
            radial-gradient(circle at bottom left, ${style.lightBg}, transparent 40%),
            radial-gradient(circle at bottom right, ${style.lightBg}, transparent 40%)
          `
                }}
            />

            {/* Contenu */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] text-center p-4">
                <div className="mb-6">
                    <div
                        className="rounded-full p-4 relative"
                        style={{
                            backgroundColor: `${style.lightBg}`,
                            boxShadow: `0 0 60px ${style.color}20`
                        }}
                    >
                        <IconComponent
                            style={{ color: style.color }}
                            className="h-12 w-12"
                        />
                    </div>
                </div>

                <div className="space-y-2">
                    <h1
                        className="text-8xl font-bold"
                        style={{ color: style.color }}
                    >
                        {code}
                    </h1>
                    <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
                    <p className="text-muted-foreground max-w-[500px]">{description}</p>
                </div>

                {/* Actions personnalisées */}
                {children}

                {/* Actions par défaut */}
                <div className="mt-8 flex gap-4">
                    {showBack && (
                        <Button
                            variant="outline"
                            onClick={() => router.back()}
                            className="gap-2"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Retour
                        </Button>
                    )}
                    {showRetry && (
                        <Button
                            onClick={() => router.refresh()}
                            className="gap-2"
                        >
                            <RefreshCw className="h-4 w-4" />
                            Réessayer
                        </Button>
                    )}
                    {showHome && (
                        <Button
                            onClick={() => router.push("/")}
                            variant="default"
                            className="gap-2"
                        >
                            <Home className="h-4 w-4" />
                            Accueil
                        </Button>
                    )}
                </div>

                {/* Particules de fond */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {Array.from({ length: 15 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full animate-float"
                            style={{
                                backgroundColor: style.color,
                                width: Math.random() * 4 + 2 + "px",
                                height: Math.random() * 4 + 2 + "px",
                                left: Math.random() * 100 + "%",
                                top: Math.random() * 100 + "%",
                                opacity: 0.1,
                                animationDuration: Math.random() * 3 + 2 + "s",
                                animationDelay: Math.random() * 2 + "s"
                            }}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}