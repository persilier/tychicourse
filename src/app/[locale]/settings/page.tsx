"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import {
    Settings,
    UserCircle2,
    BellRing,
    Lock,
    Globe2,
    Palette,
    KeyRound,
} from "lucide-react"

const settingsCategories = [
    {
        title: "Profil",
        description: "Gérez vos informations personnelles",
        href: "/settings/profile",
        icon: UserCircle2,
    },
    {
        title: "Authentication",
        description: "Personnalisez les pages de connexion",
        href: "/settings/auth",
        icon: KeyRound,
    },
    {
        title: "Notifications",
        description: "Configurez vos préférences de notifications",
        href: "/settings/notifications",
        icon: BellRing,
    },
    {
        title: "Sécurité",
        description: "Gérez la sécurité de votre compte",
        href: "/settings/security",
        icon: Lock,
    },
    {
        title: "Apparence",
        description: "Personnalisez l'interface utilisateur",
        href: "/settings/appearance",
        icon: Palette,
    },
    {
        title: "Langue & Région",
        description: "Définissez vos préférences régionales",
        href: "/settings/localization",
        icon: Globe2,
    },
]

export default function SettingsPage() {
    const router = useRouter()

    return (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {settingsCategories.map((category, index) => {
                const Icon = category.icon
                return (
                    <Card
                        key={index}
                        className="relative overflow-hidden transition-all hover:shadow-md"
                    >
                        <CardHeader>
                            <div className="flex items-center gap-2">
                                <div className="rounded-lg bg-primary/10 p-2">
                                    <Icon className="h-5 w-5 text-primary" />
                                </div>
                                <CardTitle className="text-xl">{category.title}</CardTitle>
                            </div>
                            <CardDescription>{category.description}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="h-[60px]" />
                        </CardContent>
                        <CardFooter className="absolute bottom-0 w-full border-t bg-card/50 backdrop-blur-sm">
                            <Button
                                variant="ghost"
                                className="w-full"
                                onClick={() => router.push(category.href)}
                            >
                                Configurer
                            </Button>
                        </CardFooter>

                        {/* Background gradient */}
                        <div
                            className="absolute inset-0 -z-10 opacity-[0.03]"
                            style={{
                                backgroundImage: "radial-gradient(circle at 50% 50%, currentColor, transparent 70%)",
                            }}
                        />
                    </Card>
                )
            })}
        </div>
    )
}