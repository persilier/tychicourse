"use client"

import { ErrorPage } from "@/components/error-page"
import { Button } from "@/components/ui/button"
import { LogIn } from "lucide-react"

export default function UnauthorizedPage() {
    return (
        <>
            <div className="container flex-1">
                <ErrorPage
                    code="401"
                    title="Non Authentifié"
                    description="Vous devez être connecté pour accéder à cette page. Veuillez vous connecter ou créer un compte."
                    showRetry={false}
                >
                    <div className="mt-6">
                        <Button className="gap-2">
                            <LogIn className="h-4 w-4" />
                            Se connecter
                        </Button>
                    </div>
                </ErrorPage>
            </div>
        </>
    )
}