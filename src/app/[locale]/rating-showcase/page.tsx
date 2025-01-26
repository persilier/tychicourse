"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Rating } from "@/components/ui/rating"
import { Label } from "@/components/ui/label"

export default function RatingShowcase() {
    const [ratings, setRatings] = useState({
        basic: 3.5,
        hearts: 4,
        thumbs: 4,
        medals: 5,
        circles: 3,
        interactive: 0,
    })

    const handleRatingChange = (key: keyof typeof ratings) => (value: number) => {
        setRatings((prev) => ({ ...prev, [key]: value }))
    }

    const examples = [
        {
            title: "Notation Simple",
            description: "Étoiles avec support des demi-notes",
            content: (
                <Rating
                    value={ratings.basic}
                    onChange={handleRatingChange("basic")}
                    showHalf
                    size="md"
                />
            )
        },
        {
            title: "Cœurs",
            description: "Notation avec des cœurs et couleur primary",
            content: (
                <Rating
                    value={ratings.hearts}
                    onChange={handleRatingChange("hearts")}
                    icon="heart"
                    color="primary"
                    size="lg"
                />
            )
        },
        {
            title: "Pouces",
            description: "Notation avec des pouces et couleur success",
            content: (
                <Rating
                    value={ratings.thumbs}
                    onChange={handleRatingChange("thumbs")}
                    icon="thumb"
                    color="success"
                    maxValue={3}
                    size="lg"
                />
            )
        },
        {
            title: "Médailles",
            description: "Notation en lecture seule avec des médailles",
            content: (
                <Rating
                    value={ratings.medals}
                    icon="medal"
                    color="warning"
                    readOnly
                    size="lg"
                />
            )
        },
        {
            title: "Cercles",
            description: "Style minimal avec des cercles",
            content: (
                <Rating
                    value={ratings.circles}
                    onChange={handleRatingChange("circles")}
                    icon="circle"
                    color="default"
                    size="sm"
                />
            )
        },
        {
            title: "Interactive",
            description: "Notation interactive avec retour visuel",
            content: (
                <div className="space-y-2">
                    <Rating
                        value={ratings.interactive}
                        onChange={handleRatingChange("interactive")}
                        showHalf
                        size="md"
                        color="primary"
                    />
                    <p className="text-sm text-muted-foreground">
                        Note actuelle : {ratings.interactive} / 5
                    </p>
                </div>
            )
        }
    ]

    const sizes = [
        {
            title: "Tailles Disponibles",
            content: (
                <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                        <Label className="w-12">Small:</Label>
                        <Rating value={4} size="sm" readOnly />
                    </div>
                    <div className="flex items-center gap-4">
                        <Label className="w-12">Medium:</Label>
                        <Rating value={4} size="md" readOnly />
                    </div>
                    <div className="flex items-center gap-4">
                        <Label className="w-12">Large:</Label>
                        <Rating value={4} size="lg" readOnly />
                    </div>
                </div>
            )
        }
    ]

    return (
        <div className="container mx-auto p-6">
            <div className="grid gap-6 md:grid-cols-2">
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
                {sizes.map((size, index) => (
                    <Card key={`size-${index}`} className="md:col-span-2">
                        <CardHeader>
                            <CardTitle className="text-lg">{size.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {size.content}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}