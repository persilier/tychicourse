"use client"

import { ErrorPage } from "@/components/error-page"
import { useEffect } from "react"

export default function GlobalError({
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
        <html>
            <body>
                <div className="container">
                    <ErrorPage
                        code="500"
                        title="Erreur Critique"
                        description="Une erreur critique s'est produite. Veuillez rafraîchir la page ou réessayer plus tard."
                        showRetry={true}
                        showContact={true}
                        showHome={true}
                    >
                        <div className="text-sm text-muted-foreground mt-2">
                            Code erreur: {error.digest}
                        </div>
                    </ErrorPage>
                </div>
            </body>
        </html>
    )
}
