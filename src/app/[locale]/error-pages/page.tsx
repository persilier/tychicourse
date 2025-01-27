"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { Ban, FileWarning, Lock, AlertCircle } from "lucide-react"

export default function ErrorPagesShowcase() {
    const router = useRouter()

    const errorPages = [
        {
            code: "404",
            title: "Page Non Trouvée",
            description: "La page demandée n'existe pas ou a été déplacée.",
            icon: FileWarning,
            path: "/error-pages/404"
        },
        {
            code: "403",
            title: "Accès Interdit",
            description: "Vous n'avez pas les permissions nécessaires pour accéder à cette ressource.",
            icon: Ban,
            path: "/error-pages/403"
        },
        {
            code: "401",
            title: "Non Authentifié",
            description: "Vous devez être connecté pour accéder à cette page.",
            icon: Lock,
            path: "/error-pages/401"
        },
        {
            code: "500",
            title: "Erreur Serveur",
            description: "Une erreur inattendue s'est produite sur nos serveurs.",
            icon: AlertCircle,
            path: "/error-pages/500"
        }
    ]

    return (
        <>
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Pages d&apos;Erreur</h2>
                    <p className="text-muted-foreground">
                        Collection de pages d&apos;erreur modernes et interactives avec animations.
                    </p>
                </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
                {errorPages.map((error) => {
                    const Icon = error.icon
                    return (
                        <Card key={error.code} className="relative overflow-hidden">
                            <CardHeader className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/20">
                                        <Icon className="h-4 w-4 text-red-600 dark:text-red-400" />
                                    </div>
                                    <CardTitle className="text-2xl">
                                        Erreur {error.code}
                                    </CardTitle>
                                </div>
                                <CardDescription className="text-base">
                                    {error.description}
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    onClick={() => router.push(error.path)}
                                    variant="outline"
                                    className="w-full"
                                >
                                    Voir la page
                                </Button>
                            </CardContent>

                            {/* Gradient de fond */}
                            <div
                                className="absolute inset-0 -z-10 opacity-[0.03]"
                                style={{
                                    background: `radial-gradient(circle at 50% 50%, rgba(255, 0, 0, 1) 0%, transparent 70%)`
                                }}
                            />
                        </Card>
                    )
                })}
            </div>
        </>
    )
}