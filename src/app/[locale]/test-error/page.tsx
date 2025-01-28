"use client"

import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function TestErrorPage() {
    const triggerError = () => {
        throw new Error("This is a test error")
    }

    return (
        <div className="container py-8 space-y-8">
            <div className="space-y-4">
                <h1 className="text-2xl font-bold">Test des Pages d&apos;Erreur</h1>
                <p className="text-muted-foreground">
                    Cette page permet de tester les différentes pages d&apos;erreur.
                </p>
            </div>

            <div className="flex flex-col gap-4 max-w-sm">
                <Button 
                    variant="outline"
                    onClick={() => notFound()}
                >
                    Tester Page 404 (Not Found)
                </Button>

                <Button 
                    variant="outline"
                    onClick={triggerError}
                >
                    Tester Page 500 (Error)
                </Button>

                <Button 
                    variant="outline"
                    onClick={() => window.location.href = "/non-existent-page"}
                >
                    Tester 404 (Navigation)
                </Button>
            </div>
        </div>
    )
}
