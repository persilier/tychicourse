"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCustomToast } from "@/hooks/use-custom-toast"
import { ToastAction } from "@/components/ui/toast"

export default function ToastShowcase() {
    const toast = useCustomToast()

    const examples = [
        {
            title: "Toast Primary",
            description: "Notification standard avec icône",
            action: () => {
                toast.primary({
                    title: "Nouvelle mise à jour",
                    description: "Une nouvelle version est disponible",
                    action: (
                        <ToastAction altText="Try again" onClick={() => console.log("Action clicked")}>
                            Mettre à jour
                        </ToastAction>
                    ),
                })
            },
        },
        {
            title: "Toast Success",
            description: "Confirmation avec animation",
            action: () => {
                toast.success({
                    title: "Enregistrement réussi",
                    description: "Vos modifications ont été enregistrées",
                })
            },
        },
        {
            title: "Toast Warning",
            description: "Avertissement avec icône animée",
            action: () => {
                toast.warning({
                    title: "Espace disque faible",
                    description: "Il ne reste que 10% d'espace disponible",
                    action: (
                        <ToastAction altText="Free up space" onClick={() => console.log("Free up space")}>
                            Libérer
                        </ToastAction>
                    ),
                })
            },
        },
        {
            title: "Toast Info",
            description: "Information avec action",
            action: () => {
                toast.info({
                    title: "Rappel",
                    description: "Vous avez une réunion dans 5 minutes",
                })
            },
        },
        {
            title: "Toast Error",
            description: "Erreur avec action de correction",
            action: () => {
                toast.error({
                    title: "Erreur de connexion",
                    description: "Impossible de se connecter au serveur",
                    action: (
                        <ToastAction altText="Try again" onClick={() => console.log("Retry connection")}>
                            Réessayer
                        </ToastAction>
                    ),
                })
            },
        },
        {
            title: "Toast Multiple",
            description: "Démo de plusieurs notifications",
            action: () => {
                toast.info({ title: "Premier message", duration: 4000 })
                setTimeout(() => {
                    toast.success({ title: "Deuxième message", duration: 4000 })
                }, 1000)
                setTimeout(() => {
                    toast.warning({ title: "Troisième message", duration: 4000 })
                }, 2000)
            },
        },
    ]

    return (
        <>
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Notifications Toast</h2>
                    <p className="text-muted-foreground">
                        Un système de notifications élégant avec différentes variantes et animations d&apos;icônes.
                    </p>
                </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {examples.map((example, index) => (
                    <Card key={index}>
                        <CardHeader>
                            <CardTitle className="text-lg">{example.title}</CardTitle>
                            <p className="text-sm text-muted-foreground">
                                {example.description}
                            </p>
                        </CardHeader>
                        <CardContent>
                            <Button onClick={example.action}>Afficher</Button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    )
}