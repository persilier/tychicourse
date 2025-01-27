"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
    KeyRound,
    UserPlus,
    KeySquare,
    Mail,
    ShieldCheck,
    Smartphone,
} from "lucide-react"

export default function AuthShowcase() {
    const router = useRouter()

    const authPages = [
        {
            title: "Connexion",
            description: "Page de connexion avec support des réseaux sociaux",
            icon: KeyRound,
            path: "/auth/login",
            color: "bg-blue-500/10 text-blue-500",
        },
        {
            title: "Inscription",
            description: "Formulaire d'inscription avec validation complexe",
            icon: UserPlus,
            path: "/auth/register",
            color: "bg-green-500/10 text-green-500",
        },
        {
            title: "Mot de passe oublié",
            description: "Processus de récupération du mot de passe",
            icon: KeySquare,
            path: "/auth/forgot-password",
            color: "bg-yellow-500/10 text-yellow-500",
        },
        {
            title: "Réinitialisation",
            description: "Page de réinitialisation du mot de passe",
            icon: ShieldCheck,
            path: "/auth/reset-password",
            color: "bg-orange-500/10 text-orange-500",
        },
        {
            title: "Vérification Email",
            description: "Vérification de l'adresse email",
            icon: Mail,
            path: "/auth/email-verification",
            color: "bg-indigo-500/10 text-indigo-500",
        },
        {
            title: "2FA",
            description: "Authentification à deux facteurs",
            icon: Smartphone,
            path: "/auth/two-factor",
            color: "bg-purple-500/10 text-purple-500",
        },
    ]

    return (
        <>
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Pages d&apos;Authentification</h2>
                    <p className="text-muted-foreground">
                        Collection de pages d&apos;authentification avec des formulaires validés et des designs modernes.
                    </p>
                </div>
            </div>

            <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {authPages.map((page, index) => {
                    const Icon = page.icon
                    return (
                        <Card
                            key={index}
                            className="relative overflow-hidden transition-shadow hover:shadow-md"
                        >
                            <CardHeader className="space-y-1">
                                <div className="flex items-center gap-2">
                                    <div className={`flex h-10 w-10 items-center justify-center rounded-lg ${page.color}`}>
                                        <Icon className="h-6 w-6" />
                                    </div>
                                    <CardTitle className="text-xl">
                                        {page.title}
                                    </CardTitle>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                    {page.description}
                                </p>
                            </CardHeader>
                            <CardContent>
                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() => router.push(page.path)}
                                >
                                    Voir la page
                                </Button>
                            </CardContent>

                            {/* Gradient de fond */}
                            <div
                                className="absolute inset-0 -z-10 opacity-[0.03]"
                                style={{
                                    background: `radial-gradient(circle at 50% 50%, ${page.color.split(" ")[1]} 0%, transparent 70%)`
                                }}
                            />
                        </Card>
                    )
                })}
            </div>

            <div className="mt-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Fonctionnalités Incluses</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ul className="list-inside list-disc space-y-2 text-muted-foreground">
                            <li>Validation de formulaire avec Zod et React Hook Form</li>
                            <li>Support des thèmes clair/sombre</li>
                            <li>Animations et transitions fluides</li>
                            <li>Composants réutilisables</li>
                            <li>Responsive design</li>
                            <li>Messages d&apos;erreur intuitifs</li>
                            <li>Indicateurs de chargement</li>
                            <li>Support des réseaux sociaux</li>
                            <li>Gestion avancée des mots de passe</li>
                            <li>Authentification à deux facteurs (2FA)</li>
                        </ul>
                    </CardContent>
                </Card>
            </div>
        </>
    )
}