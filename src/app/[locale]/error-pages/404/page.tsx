"use client"

import { ErrorPage } from "@/components/error-page"

export default function NotFoundPage() {
    return (
        <>
            <div className="container flex-1">
                <ErrorPage
                    code="404"
                    title="Page Non Trouvée"
                    description="Désolé, la page que vous recherchez n'existe pas ou a été déplacée. Vérifiez l'URL ou retournez à l'accueil."
                />
            </div>
        </>
    )
}