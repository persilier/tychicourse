"use client"

import { useState } from "react"
import {
    Background,
    useAuthState,
    useAuthActions,
    useAuthBranding,
} from "@/store/auth-settings-store"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useTranslations } from "next-intl"

export default function AuthSettingsPage() {
    const t = useTranslations("Settings.auth")
    const [newBackgroundUrl, setNewBackgroundUrl] = useState("")

    const { backgrounds, currentBackgroundIndex } = useAuthState()
    const {
        addBackground,
        setCurrentBackgroundIndex,
        updateBackground,
        toggleBackground,
        updateBranding
    } = useAuthActions()
    const branding = useAuthBranding()

    const handleAddBackground = () => {
        if (!newBackgroundUrl) return

        const background: Background = {
            id: crypto.randomUUID(),
            url: newBackgroundUrl,
            blur: 0,
            opacity: 0.5,
            isEnabled: true,
            overlay: false
        }

        addBackground(background)
        setNewBackgroundUrl("")
    }

    return (
        <div className="space-y-8">
            <div>
                <h2 className="text-2xl font-semibold mb-4">{t("branding.title")}</h2>
                <p className="text-muted-foreground mb-6">{t("branding.description")}</p>

                <div className="grid gap-4 max-w-xl">
                    <div className="space-y-2">
                        <Label>{t("branding.name")}</Label>
                        <Input
                            value={branding.name}
                            onChange={(e) => updateBranding({ name: e.target.value })}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>{t("branding.slogan")}</Label>
                        <Input
                            value={branding.slogan}
                            onChange={(e) => updateBranding({ slogan: e.target.value })}
                        />
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-2xl font-semibold mb-4">{t("backgrounds.title")}</h2>
                <p className="text-muted-foreground mb-6">{t("backgrounds.description")}</p>

                <div className="grid gap-6">
                    {backgrounds.map((background, index) => (
                        <div
                            key={background.id}
                            className="flex items-start gap-4 p-4 border rounded-lg"
                        >
                            <div className="relative aspect-video w-40 rounded-md overflow-hidden">
                                <img
                                    src={background.url}
                                    alt="Background preview"
                                    className="object-cover"
                                />
                            </div>

                            <div className="flex-1 space-y-4">
                                <div className="flex items-center justify-between">
                                    <Switch
                                        checked={background.isEnabled}
                                        onCheckedChange={() => toggleBackground(background.id)}
                                    />
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-destructive"
                                        onClick={() => toggleBackground(background.id)}
                                    >
                                        {t("backgrounds.delete")}
                                    </Button>
                                </div>

                                <div className="space-y-2">
                                    <Label>{t("backgrounds.blur")}</Label>
                                    <Slider
                                        min={0}
                                        max={20}
                                        step={1}
                                        value={[background.blur]}
                                        onValueChange={([value]) =>
                                            updateBackground(background.id, { blur: value })
                                        }
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>{t("backgrounds.opacity")}</Label>
                                    <Slider
                                        min={0}
                                        max={1}
                                        step={0.1}
                                        value={[background.opacity]}
                                        onValueChange={([value]) =>
                                            updateBackground(background.id, { opacity: value })
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="flex gap-2">
                        <Input
                            placeholder="https://..."
                            value={newBackgroundUrl}
                            onChange={(e) => setNewBackgroundUrl(e.target.value)}
                        />
                        <Button onClick={handleAddBackground}>{t("backgrounds.add")}</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}