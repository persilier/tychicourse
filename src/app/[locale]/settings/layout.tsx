"use client"

import { useEffect, useState } from "react"

interface SettingsLayoutProps {
    children: React.ReactNode
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
    const [mounted, setMounted] = useState(false)

    // Éviter les problèmes d'hydratation
    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <div className="container py-6 space-y-8">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Paramètres</h2>
                    <p className="text-muted-foreground">
                        Gérez les paramètres de votre application
                    </p>
                </div>
            </div>
            {children}
        </div>
    )
}