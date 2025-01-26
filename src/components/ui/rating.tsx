"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Heart, Star, ThumbsUp, Medal, Circle } from "lucide-react"

type IconType = "star" | "heart" | "thumb" | "medal" | "circle"

interface RatingProps {
    value: number
    maxValue?: number
    onChange?: (value: number) => void
    readOnly?: boolean
    icon?: IconType
    size?: "sm" | "md" | "lg"
    color?: "default" | "primary" | "warning" | "success"
    showHalf?: boolean
    className?: string
}

const iconComponents = {
    star: Star,
    heart: Heart,
    thumb: ThumbsUp,
    medal: Medal,
    circle: Circle,
}

const iconSizes = {
    sm: "h-4 w-4",
    md: "h-6 w-6",
    lg: "h-8 w-8",
}

const iconColors = {
    default: {
        filled: "text-gray-900 dark:text-gray-100",
        empty: "text-gray-300 dark:text-gray-700",
    },
    primary: {
        filled: "text-blue-500 dark:text-blue-400",
        empty: "text-blue-200 dark:text-blue-900",
    },
    warning: {
        filled: "text-yellow-400 dark:text-yellow-500",
        empty: "text-yellow-200 dark:text-yellow-900",
    },
    success: {
        filled: "text-green-500 dark:text-green-400",
        empty: "text-green-200 dark:text-green-900",
    },
}

export function Rating({
    value,
    maxValue = 5,
    onChange,
    readOnly = false,
    icon = "star",
    size = "md",
    color = "warning",
    showHalf = false,
    className,
}: RatingProps) {
    const [hoverValue, setHoverValue] = React.useState<number | null>(null)
    const IconComponent = iconComponents[icon]

    const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>, index: number) => {
        if (readOnly) return
        const rect = event.currentTarget.getBoundingClientRect()
        const x = event.clientX - rect.left
        const halfPoint = rect.width / 2
        setHoverValue(index + (x < halfPoint && showHalf ? 0.5 : 1))
    }

    const handleMouseLeave = () => {
        if (readOnly) return
        setHoverValue(null)
    }

    const handleClick = (index: number, event: React.MouseEvent<HTMLDivElement>) => {
        if (readOnly) return
        const rect = event.currentTarget.getBoundingClientRect()
        const x = event.clientX - rect.left
        const halfPoint = rect.width / 2
        const newValue = index + (x < halfPoint && showHalf ? 0.5 : 1)
        onChange?.(newValue)
    }

    const renderIcon = (index: number) => {
        const filled = (hoverValue ?? value) >= index + 1
        const halfFilled = showHalf && (hoverValue ?? value) === index + 0.5

        return (
            <div
                key={index}
                className={cn(
                    "relative cursor-pointer",
                    readOnly && "cursor-default",
                    iconSizes[size]
                )}
                onMouseMove={(e) => handleMouseMove(e, index)}
                onClick={(e) => handleClick(index, e)}
            >
                <IconComponent
                    className={cn(
                        "transition-colors",
                        filled ? iconColors[color].filled : iconColors[color].empty
                    )}
                />
                {halfFilled && (
                    <IconComponent
                        className={cn(
                            "absolute inset-0 w-[50%] overflow-hidden transition-colors",
                            iconColors[color].filled
                        )}
                    />
                )}
            </div>
        )
    }

    return (
        <div
            className={cn("flex gap-1", className)}
            onMouseLeave={handleMouseLeave}
            role="radiogroup"
            aria-label="Rating"
        >
            {Array.from({ length: maxValue }, (_, i) => renderIcon(i))}
        </div>
    )
}