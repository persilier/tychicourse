export default function RatingShowcaseLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="space-y-6">
            <div className="border-b pb-4">
                <div className="container mx-auto px-6">
                    <h1 className="text-3xl font-bold tracking-tight">Notation</h1>
                    <p className="text-muted-foreground mt-2">
                        Un composant de notation flexible et personnalisable avec support pour différentes icônes,
                        tailles et styles. Idéal pour les avis, évaluations et systèmes de notation.
                    </p>
                </div>
            </div>
            {children}
        </div>
    )
}