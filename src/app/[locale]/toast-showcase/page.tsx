"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useCustomToast } from "@/hooks/use-custom-toast"
import { ToastAction } from "@/components/ui/toast"

export default function ToastShowcase() {
    const toast = useCustomToast()

    const commonAction = (
        <ToastAction altText="Try again" onClick={() => console.log("Action clicked")}>
            Action
        </ToastAction>
    )

    const richExamples = [
        {
            title: "Primary Toast",
            description: "Fond coloré",
            action: () => {
                toast.primary({
                    title: "Nouvelle mise à jour",
                    description: "Une nouvelle version est disponible",
                    action: commonAction,
                })
            }
        },
        {
            title: "Success Toast",
            description: "Fond vert",
            action: () => {
                toast.success({
                    title: "Enregistrement réussi",
                    description: "Vos modifications ont été enregistrées",
                    action: commonAction,
                })
            }
        },
        {
            title: "Warning Toast",
            description: "Fond orange",
            action: () => {
                toast.warning({
                    title: "Attention requise",
                    description: "Veuillez vérifier vos paramètres",
                    action: commonAction,
                })
            }
        },
        {
            title: "Info Toast",
            description: "Fond bleu",
            action: () => {
                toast.info({
                    title: "Information",
                    description: "Voici une information importante",
                    action: commonAction,
                })
            }
        },
        {
            title: "Error Toast",
            description: "Fond rouge",
            action: () => {
                toast.error({
                    title: "Erreur",
                    description: "Une erreur est survenue",
                    action: commonAction,
                })
            }
        }
    ]

    const softExamples = [
        {
            title: "Soft Primary Toast",
            description: "Fond clair",
            action: () => {
                toast.softPrimary({
                    title: "Nouvelle mise à jour",
                    description: "Une nouvelle version est disponible",
                    action: commonAction,
                })
            }
        },
        {
            title: "Soft Success Toast",
            description: "Fond vert clair",
            action: () => {
                toast.softSuccess({
                    title: "Enregistrement réussi",
                    description: "Vos modifications ont été enregistrées",
                    action: commonAction,
                })
            }
        },
        {
            title: "Soft Warning Toast",
            description: "Fond orange clair",
            action: () => {
                toast.softWarning({
                    title: "Attention requise",
                    description: "Veuillez vérifier vos paramètres",
                    action: commonAction,
                })
            }
        },
        {
            title: "Soft Info Toast",
            description: "Fond bleu clair",
            action: () => {
                toast.softInfo({
                    title: "Information",
                    description: "Voici une information importante",
                    action: commonAction,
                })
            }
        },
        {
            title: "Soft Error Toast",
            description: "Fond rouge clair",
            action: () => {
                toast.softError({
                    title: "Erreur",
                    description: "Une erreur est survenue",
                    action: commonAction,
                })
            }
        }
    ]

    const lightExamples = [
        {
            title: "Light Primary Toast",
            description: "Fond blanc, bordure primaire",
            action: () => {
                toast.lightPrimary({
                    title: "Nouvelle mise à jour",
                    description: "Une nouvelle version est disponible",
                    action: commonAction,
                })
            }
        },
        {
            title: "Light Success Toast",
            description: "Fond blanc, bordure verte",
            action: () => {
                toast.lightSuccess({
                    title: "Enregistrement réussi",
                    description: "Vos modifications ont été enregistrées",
                    action: commonAction,
                })
            }
        },
        {
            title: "Light Warning Toast",
            description: "Fond blanc, bordure orange",
            action: () => {
                toast.lightWarning({
                    title: "Attention requise",
                    description: "Veuillez vérifier vos paramètres",
                    action: commonAction,
                })
            }
        },
        {
            title: "Light Info Toast",
            description: "Fond blanc, bordure bleue",
            action: () => {
                toast.lightInfo({
                    title: "Information",
                    description: "Voici une information importante",
                    action: commonAction,
                })
            }
        },
        {
            title: "Light Error Toast",
            description: "Fond blanc, bordure rouge",
            action: () => {
                toast.lightError({
                    title: "Erreur",
                    description: "Une erreur est survenue",
                    action: commonAction,
                })
            }
        }
    ]

    const specialExamples = [
        {
            title: "Sans Description",
            description: "Toast minimaliste",
            action: () => {
                toast.lightPrimary({
                    title: "Message court"
                })
            }
        },
        {
            title: "Sans Action",
            description: "Toast informatif",
            action: () => {
                toast.lightInfo({
                    title: "Information",
                    description: "Ce message disparaîtra automatiquement"
                })
            }
        },
        {
            title: "Toasts Multiples",
            description: "Séquence de notifications",
            action: () => {
                toast.lightInfo({
                    title: "Premier message",
                    duration: 4000
                })
                setTimeout(() => {
                    toast.lightSuccess({
                        title: "Deuxième message",
                        duration: 4000
                    })
                }, 1000)
                setTimeout(() => {
                    toast.lightWarning({
                        title: "Troisième message",
                        duration: 4000
                    })
                }, 2000)
            }
        }
    ]

    return (
        <>
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Notifications Toast</h2>
                    <p className="text-muted-foreground">
                        Un système de notifications avec trois styles : riche (fond coloré), soft (fond clair) et light (fond blanc).
                    </p>
                </div>
            </div>
            <div className="grid gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Toasts Rich Color</CardTitle>
                        <p className="text-sm text-muted-foreground">Fond entièrement coloré avec texte blanc</p>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {richExamples.map((example, index) => (
                                <Card key={index} className="relative overflow-hidden">
                                    <CardHeader className="space-y-1">
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
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Toasts Soft Color</CardTitle>
                        <p className="text-sm text-muted-foreground">Fond légèrement coloré avec texte de la même couleur</p>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {softExamples.map((example, index) => (
                                <Card key={index} className="relative overflow-hidden">
                                    <CardHeader className="space-y-1">
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
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Toasts Light</CardTitle>
                        <p className="text-sm text-muted-foreground">Fond blanc avec bordure et texte colorés</p>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {lightExamples.map((example, index) => (
                                <Card key={index} className="relative overflow-hidden">
                                    <CardHeader className="space-y-1">
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
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Exemples Spéciaux</CardTitle>
                        <p className="text-sm text-muted-foreground">Variations et cas d&apos;utilisation particuliers</p>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {specialExamples.map((example, index) => (
                                <Card key={index} className="relative overflow-hidden">
                                    <CardHeader className="space-y-1">
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
                    </CardContent>
                </Card>
            </div>
        </>
    )
}