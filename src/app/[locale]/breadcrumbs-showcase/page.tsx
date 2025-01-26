"use client"

import { CustomBreadcrumbs } from "@/components/ui/custom-breadcrumbs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AlertTriangle, FileIcon, FolderIcon, HomeIcon, Settings, Shield, Users } from "lucide-react"

export default function BreadcrumbsShowcase() {
    const examples = [
        {
            title: "Style Par Défaut",
            items: [
                { label: "Accueil", href: "/", icon: <HomeIcon className="h-4 w-4" /> },
                { label: "Composants", href: "/components" },
                { label: "Fil d'Ariane" }
            ]
        },
        {
            title: "Style Primary",
            variant: "outline" as const,
            color: "primary" as const,
            items: [
                { label: "Dashboard", href: "/", icon: <HomeIcon className="h-4 w-4" /> },
                { label: "Utilisateurs", href: "/users", icon: <Users className="h-4 w-4" /> },
                { label: "Paramètres", icon: <Settings className="h-4 w-4" /> }
            ]
        },
        {
            title: "Style Success",
            variant: "outline" as const,
            color: "success" as const,
            items: [
                { label: "Documents", href: "/", icon: <FolderIcon className="h-4 w-4" /> },
                { label: "Projets", href: "/projects", icon: <FolderIcon className="h-4 w-4" /> },
                { label: "Rapport 2024.pdf", icon: <FileIcon className="h-4 w-4" /> }
            ]
        },
        {
            title: "Style Warning",
            variant: "outline" as const,
            color: "warning" as const,
            separator: "slash" as const,
            items: [
                { label: "Sécurité", href: "/", icon: <Shield className="h-4 w-4" /> },
                { label: "Alertes", href: "/alerts" },
                { label: "Avertissements", icon: <AlertTriangle className="h-4 w-4" /> }
            ]
        },
        {
            title: "Style Danger",
            variant: "outline" as const,
            color: "danger" as const,
            items: [
                { label: "Maintenance", href: "/" },
                { label: "Erreurs", href: "/errors" },
                { label: "Erreur Critique" }
            ]
        },
        {
            title: "Style Ghost Coloré",
            variant: "ghost" as const,
            color: "primary" as const,
            items: [
                { label: "Accueil", href: "/" },
                { label: "Blog", href: "/blog" },
                { label: "Technologie", href: "/blog/tech" },
                { label: "Article" }
            ]
        }
    ]

    return (
        <div className="container mx-auto p-6">
            <div className="grid gap-6 md:grid-cols-2">
                {examples.map((example, index) => (
                    <Card key={index} className="overflow-hidden">
                        <CardHeader className="bg-muted/50">
                            <CardTitle className="text-lg font-medium">{example.title}</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <CustomBreadcrumbs
                                items={example.items}
                                variant={example.variant}
                                color={example.color}
                                separator={example.separator}
                            />
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}