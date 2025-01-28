"use client"

import { ErrorPage } from "@/components/error-page"

export default function NotFound() {
    return (
        <div className="container">
            <ErrorPage
                code="404"
                title="Page Non Trouvée"
                description="Désolé, la page que vous recherchez n'existe pas ou a été déplacée."
                showSearch={true}
                showHome={true}
                showBack={true}
            />
        </div>
    )
}
