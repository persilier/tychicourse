"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CustomSelect } from "@/components/ui/custom-select"
import { Label } from "@/components/ui/label"
import { ActionMeta, MultiValue, SingleValue } from "react-select"

interface Option {
    value: string
    label: string
    icon?: string
}

interface GroupedOption {
    label: string
    options: Option[]
}

const countries: Option[] = [
    { value: "fr", label: "France" },
    { value: "de", label: "Allemagne" },
    { value: "it", label: "Italie" },
    { value: "es", label: "Espagne" },
    { value: "uk", label: "Royaume-Uni" },
]

const programmingLanguages: GroupedOption[] = [
    {
        label: "Frontend",
        options: [
            { value: "react", label: "React" },
            { value: "vue", label: "Vue" },
            { value: "angular", label: "Angular" },
        ],
    },
    {
        label: "Backend",
        options: [
            { value: "node", label: "Node.js" },
            { value: "python", label: "Python" },
            { value: "java", label: "Java" },
        ],
    },
    {
        label: "Base de données",
        options: [
            { value: "mongodb", label: "MongoDB" },
            { value: "postgresql", label: "PostgreSQL" },
            { value: "mysql", label: "MySQL" },
        ],
    },
]

const frameworks: Option[] = [
    { value: "next", label: "Next.js", icon: "⚡" },
    { value: "nuxt", label: "Nuxt.js", icon: "💚" },
    { value: "svelte", label: "SvelteKit", icon: "🔥" },
    { value: "remix", label: "Remix", icon: "💿" },
    { value: "astro", label: "Astro", icon: "🚀" },
]

export default function SelectShowcase() {
    const [selectedCountry, setSelectedCountry] = useState<Option | null>(null)
    const [selectedLanguages, setSelectedLanguages] = useState<Option[]>([])
    const [selectedFramework, setSelectedFramework] = useState<Option | null>(null)
    const [selectedTech, setSelectedTech] = useState<Option | null>(null)

    const handleCountryChange = (
        newValue: SingleValue<Option>,
        actionMeta: ActionMeta<Option>
    ) => {
        setSelectedCountry(newValue)
    }

    const handleLanguagesChange = (
        newValue: MultiValue<Option>,
        actionMeta: ActionMeta<Option>
    ) => {
        setSelectedLanguages(newValue as Option[])
    }

    const handleFrameworkChange = (
        newValue: SingleValue<Option>,
        actionMeta: ActionMeta<Option>
    ) => {
        setSelectedFramework(newValue)
    }

    const handleTechChange = (
        newValue: SingleValue<Option>,
        actionMeta: ActionMeta<Option>
    ) => {
        setSelectedTech(newValue)
    }

    const examples = [
        {
            title: "Select Simple",
            description: "Sélection unique avec des options simples",
            content: (
                <div className="space-y-2">
                    <Label>Sélectionnez un pays</Label>
                    <CustomSelect<Option, false>
                        options={countries}
                        value={selectedCountry}
                        onChange={handleCountryChange}
                        isClearable
                        placeholder="Choisir un pays..."
                    />
                </div>
            ),
        },
        {
            title: "Select Multiple",
            description: "Sélection multiple avec des options groupées",
            content: (
                <div className="space-y-2">
                    <Label>Sélectionnez des technologies</Label>
                    <CustomSelect<Option, true>
                        options={programmingLanguages}
                        value={selectedLanguages}
                        onChange={handleLanguagesChange}
                        isMulti
                        placeholder="Choisir des technologies..."
                    />
                </div>
            ),
        },
        {
            title: "Options Personnalisées",
            description: "Options avec des icônes",
            content: (
                <div className="space-y-2">
                    <Label>Sélectionnez un framework</Label>
                    <CustomSelect<Option, false>
                        options={frameworks}
                        value={selectedFramework}
                        onChange={handleFrameworkChange}
                        formatOptionLabel={({ label, icon }) => (
                            <div className="flex items-center gap-2">
                                <span>{icon}</span>
                                <span>{label}</span>
                            </div>
                        )}
                        placeholder="Choisir un framework..."
                    />
                </div>
            ),
        },
        {
            title: "États Différents",
            description: "Exemples d'états disabled et loading",
            content: (
                <div className="flex flex-col gap-4">
                    <div className="space-y-2">
                        <Label>Désactivé</Label>
                        <CustomSelect<Option, false>
                            options={countries}
                            isDisabled
                            placeholder="Select désactivé"
                        />
                    </div>
                    <div className="space-y-2">
                        <Label>Chargement</Label>
                        <CustomSelect<Option, false>
                            options={[]}
                            isLoading
                            placeholder="Chargement..."
                        />
                    </div>
                </div>
            ),
        },
        {
            title: "Avec Recherche",
            description: "Recherche dans les options groupées",
            content: (
                <div className="space-y-2">
                    <Label>Rechercher une technologie</Label>
                    <CustomSelect<Option, false>
                        options={programmingLanguages}
                        value={selectedTech}
                        onChange={handleTechChange}
                        isSearchable
                        placeholder="Rechercher..."
                    />
                </div>
            ),
        },
    ]

    return (
        <>
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-3xl font-bold tracking-tight">Select Personnalisé</h2>
                    <p className="text-muted-foreground">
                        Un composant de sélection élégant basé sur react-select avec le style shadcn.
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
                            {example.content}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </>
    )
}