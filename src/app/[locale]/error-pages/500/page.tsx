"use client"

import { ErrorPage } from "@/components/error-page"
import { Button } from "@/components/ui/button"
import { Mail } from "lucide-react"

export default function ServerErrorPage() {
    return (
        <>
            <div className="container flex-1">
                <ErrorPage
                    code="500"
                    title="Erreur Serveur"
                    description="Une erreur inattendue s'est produite sur nos serveurs. Notre équipe technique a été notifiée et travaille à résoudre le problème."
                    showRetry={true}
                >
                    <div className="mt-6">
                        <Button variant="outline" className="gap-2">
                            <Mail className="h-4 w-4" />
                            Contacter le support
                        </Button>
                    </div>
                </ErrorPage>
            </div>
        </>
    )
}