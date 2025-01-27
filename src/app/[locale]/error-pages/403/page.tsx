"use client"

import { ErrorPage } from "@/components/error-page"

export default function ForbiddenPage() {
    return (
        <>
            <div className="container flex-1">
                <ErrorPage
                    code="403"
                    title="Accès Interdit"
                    description="Vous n'avez pas les droits nécessaires pour accéder à cette page. Contactez votre administrateur si vous pensez que c'est une erreur."
                    showRetry={false}
                />
            </div>
        </>
    )
}