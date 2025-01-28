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
    ArrowLeft,
    Search,
    HelpCircle,
    Mail
} from "lucide-react"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

interface ErrorPageProps {
    code: "404" | "403" | "500" | "401" | string
    title: string
    description: string
    showRetry?: boolean
    showHome?: boolean
    showBack?: boolean
    showSearch?: boolean
    showHelp?: boolean
    showContact?: boolean
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
        gradient: "from-red-500/20 via-transparent to-transparent",
        pattern: "data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ef4444' fill-opacity='0.05'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
    },
    "403": {
        color: "rgb(234 179 8)", // yellow-500
        lightBg: "rgb(254 252 232)", // yellow-50
        darkBg: "rgb(161 98 7)", // yellow-800
        gradient: "from-yellow-500/20 via-transparent to-transparent",
        pattern: "data:image/svg+xml,%3Csvg width='52' height='26' viewBox='0 0 52 26' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23eab308' fill-opacity='0.05'%3E%3Cpath d='M10 10c0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6h2c0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4 3.314 0 6 2.686 6 6 0 2.21 1.79 4 4 4v2c-3.314 0-6-2.686-6-6 0-2.21-1.79-4-4-4-3.314 0-6-2.686-6-6zm25.464-1.95l8.486 8.486-1.414 1.414-8.486-8.486 1.414-1.414z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
    },
    "401": {
        color: "rgb(59 130 246)", // blue-500
        lightBg: "rgb(239 246 255)", // blue-50
        darkBg: "rgb(30 64 175)", // blue-800
        gradient: "from-blue-500/20 via-transparent to-transparent",
        pattern: "data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%233b82f6' fill-opacity='0.05'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
    },
    "500": {
        color: "rgb(99 102 241)", // indigo-500
        lightBg: "rgb(238 242 255)", // indigo-50
        darkBg: "rgb(55 48 163)", // indigo-800
        gradient: "from-indigo-500/20 via-transparent to-transparent",
        pattern: "data:image/svg+xml,%3Csvg width='80' height='80' viewBox='0 0 80 80' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='0.05'%3E%3Cpath d='M50 50c0-5.523 4.477-10 10-10s10 4.477 10 10-4.477 10-10 10c0 5.523-4.477 10-10 10S0 55.523 0 50s4.477-10 10-10zm10 8c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8zm40 40c4.418 0 8-3.582 8-8s-3.582-8-8-8-8 3.582-8 8 3.582 8 8 8z' /%3E%3C/g%3E%3C/g%3E%3C/svg%3E",
    }
}

export function ErrorPage({
    code,
    title,
    description,
    showRetry = false,
    showHome = true,
    showBack = true,
    showSearch = code === "404",
    showHelp = code === "403",
    showContact = code === "500",
    children,
}: ErrorPageProps) {
    const router = useRouter()
    const IconComponent = errorIcons[code as keyof typeof errorIcons] || AlertCircle
    const style = errorStyles[code as keyof typeof errorStyles] || errorStyles["500"]
    const [searchQuery, setSearchQuery] = React.useState("")
    const [isSearchOpen, setIsSearchOpen] = React.useState(false)

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault()
        router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }

    return (
        <div className="w-full min-h-screen relative overflow-hidden">
            {/* Background patterns and gradients */}
            <div className="absolute inset-0 dark:opacity-20">
                {/* Base pattern */}
                <div 
                    className="absolute inset-0 opacity-40"
                    style={{
                        backgroundImage: `url("${style.pattern}")`,
                        backgroundRepeat: 'repeat',
                    }}
                />
                
                {/* Radial gradients */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: `
                            radial-gradient(circle at top left, ${style.lightBg}, transparent 40%),
                            radial-gradient(circle at top right, ${style.lightBg}, transparent 40%),
                            radial-gradient(circle at bottom left, ${style.lightBg}, transparent 40%),
                            radial-gradient(circle at bottom right, ${style.lightBg}, transparent 40%)
                        `
                    }}
                />

                {/* Top gradient wave */}
                <div 
                    className="absolute top-0 inset-x-0 h-32 opacity-20"
                    style={{
                        background: `linear-gradient(to right, transparent, ${style.color}, transparent)`,
                        maskImage: 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0,32 C200,100 400,0 600,32 L600,0 L0,0 Z\' fill=\'%23000\'/%3E%3C/svg%3E")',
                        WebkitMaskImage: 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0,32 C200,100 400,0 600,32 L600,0 L0,0 Z\' fill=\'%23000\'/%3E%3C/svg%3E")',
                        maskSize: 'cover',
                        WebkitMaskSize: 'cover'
                    }}
                />

                {/* Bottom gradient wave */}
                <div 
                    className="absolute bottom-0 inset-x-0 h-32 opacity-20 transform rotate-180"
                    style={{
                        background: `linear-gradient(to right, transparent, ${style.color}, transparent)`,
                        maskImage: 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0,32 C200,100 400,0 600,32 L600,0 L0,0 Z\' fill=\'%23000\'/%3E%3C/svg%3E")',
                        WebkitMaskImage: 'url("data:image/svg+xml,%3Csvg width=\'100%25\' height=\'100%25\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0,32 C200,100 400,0 600,32 L600,0 L0,0 Z\' fill=\'%23000\'/%3E%3C/svg%3E")',
                        maskSize: 'cover',
                        WebkitMaskSize: 'cover'
                    }}
                />

                {/* Diagonal stripes */}
                <div 
                    className="absolute inset-0 opacity-5"
                    style={{
                        backgroundImage: `repeating-linear-gradient(
                            45deg,
                            ${style.color} 0,
                            ${style.color} 1px,
                            transparent 0,
                            transparent 50%
                        )`,
                        backgroundSize: '10px 10px'
                    }}
                />

                {/* Radial pulse animation */}
                <div className="absolute inset-0 overflow-hidden">
                    <div 
                        className="absolute inset-0 animate-pulse"
                        style={{
                            background: `radial-gradient(circle at 50% 50%, ${style.color}10, transparent 50%)`
                        }}
                    />
                </div>
            </div>

            {/* Content */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center p-4"
            >
                <motion.div 
                    className="mb-6"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ 
                        type: "spring",
                        stiffness: 260,
                        damping: 20 
                    }}
                >
                    <div
                        className="rounded-full p-4 relative group"
                        style={{
                            backgroundColor: `${style.lightBg}`,
                            boxShadow: `0 0 60px ${style.color}20`
                        }}
                    >
                        <IconComponent
                            style={{ color: style.color }}
                            className="h-12 w-12 transition-transform group-hover:scale-110"
                        />
                        <div 
                            className={cn(
                                "absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity",
                                `bg-gradient-to-t ${style.gradient}`
                            )}
                        />
                    </div>
                </motion.div>

                <motion.div 
                    className="space-y-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <h1
                        className="text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-b"
                        style={{ 
                            backgroundImage: `linear-gradient(to bottom, ${style.color}, ${style.darkBg})`
                        }}
                    >
                        {code}
                    </h1>
                    <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
                    <p className="text-muted-foreground max-w-[500px] mx-auto">{description}</p>
                </motion.div>

                {/* Custom actions */}
                {children}

                {/* Search functionality for 404 */}
                <AnimatePresence>
                    {showSearch && isSearchOpen && (
                        <motion.form
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="mt-6 w-full max-w-md"
                            onSubmit={handleSearch}
                        >
                            <div className="relative">
                                <input
                                    type="text"
                                    placeholder="Rechercher sur le site..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full px-4 py-2 rounded-full border border-input bg-background"
                                />
                                <Button 
                                    type="submit"
                                    size="sm"
                                    className="absolute right-1 top-1 rounded-full"
                                >
                                    <Search className="h-4 w-4" />
                                </Button>
                            </div>
                        </motion.form>
                    )}
                </AnimatePresence>

                {/* Default actions */}
                <motion.div 
                    className="mt-8 flex flex-wrap justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    {showBack && (
                        <Button
                            variant="outline"
                            onClick={() => router.back()}
                            className="group gap-2"
                        >
                            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
                            Retour
                        </Button>
                    )}
                    {showRetry && (
                        <Button
                            onClick={() => router.refresh()}
                            className="group gap-2"
                        >
                            <RefreshCw className="h-4 w-4 transition-transform group-hover:rotate-180" />
                            Réessayer
                        </Button>
                    )}
                    {showHome && (
                        <Button
                            onClick={() => router.push("/")}
                            variant="default"
                            className="group gap-2"
                        >
                            <Home className="h-4 w-4 transition-transform group-hover:scale-110" />
                            Accueil
                        </Button>
                    )}
                    {showSearch && (
                        <Button
                            variant="outline"
                            onClick={() => setIsSearchOpen(!isSearchOpen)}
                            className="group gap-2"
                        >
                            <Search className="h-4 w-4 transition-transform group-hover:scale-110" />
                            Rechercher
                        </Button>
                    )}
                    {showHelp && (
                        <Button
                            variant="outline"
                            onClick={() => router.push("/help")}
                            className="group gap-2"
                        >
                            <HelpCircle className="h-4 w-4 transition-transform group-hover:scale-110" />
                            Centre d&apos;aide
                        </Button>
                    )}
                    {showContact && (
                        <Button
                            variant="outline"
                            onClick={() => router.push("/contact")}
                            className="group gap-2"
                        >
                            <Mail className="h-4 w-4 transition-transform group-hover:scale-110" />
                            Nous contacter
                        </Button>
                    )}
                </motion.div>

                {/* Background particles */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ 
                                opacity: 0,
                                scale: 0,
                                x: Math.random() * 100 - 50,
                                y: Math.random() * 100 - 50
                            }}
                            animate={{ 
                                opacity: 0.1,
                                scale: 1,
                                x: Math.random() * 200 - 100,
                                y: Math.random() * 200 - 100
                            }}
                            transition={{
                                duration: Math.random() * 3 + 2,
                                repeat: Infinity,
                                repeatType: "reverse",
                                ease: "easeInOut",
                                delay: Math.random() * 2
                            }}
                            className="absolute rounded-full"
                            style={{
                                backgroundColor: style.color,
                                width: Math.random() * 4 + 2 + "px",
                                height: Math.random() * 4 + 2 + "px",
                                left: Math.random() * 100 + "%",
                                top: Math.random() * 100 + "%",
                            }}
                        />
                    ))}
                </div>
            </motion.div>
        </div>
    )
}