"use client"

import { Loader2 } from "lucide-react"

export default function Loading() {
    return (
        <div className="min-h-[80vh] flex items-center justify-center">
            <div className="flex flex-col items-center gap-4">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <p className="text-muted-foreground">Chargement en cours...</p>
            </div>
        </div>
    )
}
