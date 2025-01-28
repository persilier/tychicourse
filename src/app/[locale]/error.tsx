"use client"

import { ErrorPage } from "@/components/error-page"
import { useEffect } from "react"

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string }
    reset: () => void
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error)
    }, [error])

    return (
        <div className="container">
            <ErrorPage
                code="500"
                title="Erreur Serveur"
                description="Une erreur inattendue s'est produite. Nos équipes ont été notifiées."
                showRetry={true}
                showContact={true}
                showHome={true}
                showBack={true}
            >
                <div className="text-sm text-muted-foreground mt-2">
                    Code erreur: {error.digest}
                </div>
            </ErrorPage>
        </div>
    )
}
