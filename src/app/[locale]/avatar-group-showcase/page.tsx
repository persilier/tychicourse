"use client"

import { AvatarGroup } from "@/components/ui/avatar-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const demoUsers = [
    { name: "Alice Johnson", image: "https://i.pravatar.cc/150?u=alice" },
    { name: "Bob Smith", image: "https://i.pravatar.cc/150?u=bob" },
    { name: "Carol White", image: "https://i.pravatar.cc/150?u=carol" },
    { name: "David Brown", image: "https://i.pravatar.cc/150?u=david" },
    { name: "Eva Green", image: "https://i.pravatar.cc/150?u=eva" },
    { name: "Frank Miller", fallback: "FM" },
    { name: "Grace Lee", fallback: "GL" },
    { name: "Henry Wilson", fallback: "HW" },
    { name: "Iris Clark", fallback: "IC" },
    { name: "John Doe", fallback: "JD" },
]

const teamGroups = {
    design: demoUsers.slice(0, 3),
    development: demoUsers.slice(3, 7),
    marketing: demoUsers.slice(7),
}

export default function AvatarGroupShowcase() {
    const examples = [
        {
            title: "Tailles Disponibles",
            description: "Trois tailles différentes d'avatars groupés",
            content: (
                <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-4">
                        <span className="w-16 text-sm text-muted-foreground">Small:</span>
                        <AvatarGroup users={demoUsers.slice(0, 4)} size="sm" />
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="w-16 text-sm text-muted-foreground">Medium:</span>
                        <AvatarGroup users={demoUsers.slice(0, 4)} size="md" />
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="w-16 text-sm text-muted-foreground">Large:</span>
                        <AvatarGroup users={demoUsers.slice(0, 4)} size="lg" />
                    </div>
                </div>
            ),
        },
        {
            title: "Formes",
            description: "Avatars circulaires et carrés",
            content: (
                <div className="flex flex-col gap-8">
                    <div className="flex items-center gap-4">
                        <span className="w-16 text-sm text-muted-foreground">Circle:</span>
                        <AvatarGroup users={demoUsers.slice(0, 5)} shape="circle" />
                    </div>
                    <div className="flex items-center gap-4">
                        <span className="w-16 text-sm text-muted-foreground">Square:</span>
                        <AvatarGroup users={demoUsers.slice(0, 5)} shape="square" />
                    </div>
                </div>
            ),
        },
        {
            title: "Équipe Design",
            description: "Petit groupe avec images",
            content: (
                <AvatarGroup
                    users={teamGroups.design}
                    size="md"
                />
            ),
        },
        {
            title: "Équipe Développement",
            description: "Groupe moyen avec limite d'affichage",
            content: (
                <AvatarGroup
                    users={teamGroups.development}
                    maxVisible={3}
                    size="md"
                />
            ),
        },
        {
            title: "Équipe Marketing",
            description: "Groupe avec fallbacks",
            content: (
                <AvatarGroup
                    users={teamGroups.marketing}
                    size="md"
                />
            ),
        },
        {
            title: "Grand Groupe",
            description: "Groupe avec beaucoup de membres",
            content: (
                <AvatarGroup
                    users={demoUsers}
                    maxVisible={4}
                    size="lg"
                />
            ),
        },
    ]

    return (
        <>
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Groupe d&apos;Avatars</h2>
                    <p className="text-muted-foreground">
                        Un composant élégant pour afficher des groupes d&apos;utilisateurs avec support de
                        différentes tailles, formes et limites d&apos;affichage.
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
                        <CardContent className="flex items-center justify-center">
                            {example.content}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    )
}