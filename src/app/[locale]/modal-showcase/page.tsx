"use client"

import { Button } from "@/components/ui/button"
import { Modal } from "@/components/ui/modal"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { useTranslations } from "next-intl"
import { Icon } from "@iconify/react"

export default function ModalShowcase() {
  const t = useTranslations("Showcase.Modal")
  const [openModals, setOpenModals] = useState<Record<string, boolean>>({})

  const toggleModal = (id: string) => {
    setOpenModals(prev => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div className="container py-8 space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">{t("title")}</h1>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Size Variants */}
        <Card>
          <CardHeader>
            <CardTitle>{t("sizeVariants.title")}</CardTitle>
            <CardDescription>{t("sizeVariants.description")}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            {["sm", "md", "lg", "xl", "2xl", "full"].map((size) => (
              <Button
                key={size}
                variant="outline"
                onClick={() => toggleModal(`size-${size}`)}
              >
                {size.toUpperCase()}
              </Button>
            ))}
            {["sm", "md", "lg", "xl", "2xl", "full"].map((size) => (
              <Modal
                key={size}
                size={size as any}
                open={openModals[`size-${size}`]}
                onOpenChange={(open) => setOpenModals(prev => ({ ...prev, [`size-${size}`]: open }))}
                title={t("sizeVariants.modalTitle", { size: size.toUpperCase() })}
              >
                <div className="space-y-4">
                  <p className="text-muted-foreground">{t("sizeVariants.modalContent")}</p>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label>{t("form.name")}</Label>
                      <Input placeholder={t("form.namePlaceholder")} />
                    </div>
                    <div className="grid gap-2">
                      <Label>{t("form.description")}</Label>
                      <Textarea placeholder={t("form.descriptionPlaceholder")} />
                    </div>
                  </div>
                </div>
              </Modal>
            ))}
          </CardContent>
        </Card>

        {/* Header Variants */}
        <Card>
          <CardHeader>
            <CardTitle>{t("headerVariants.title")}</CardTitle>
            <CardDescription>{t("headerVariants.description")}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            {[
              { variant: "default", icon: "solar:check-circle-bold-duotone", color: "primary" },
              { variant: "success", icon: "solar:check-circle-bold-duotone", color: "green-500" },
              { variant: "danger", icon: "solar:forbidden-circle-bold-duotone", color: "red-500" },
              { variant: "warning", icon: "solar:bell-bold-duotone", color: "yellow-500" },
              { variant: "info", icon: "solar:info-circle-bold-duotone", color: "blue-500" },
            ].map(({ variant, icon, color }) => (
              <Button
                key={variant}
                variant="outline"
                onClick={() => toggleModal(`variant-${variant}`)}
                className="gap-2"
              >
                <Icon icon={icon} className={`w-4 h-4 text-${color}`} />
                <span>{variant}</span>
              </Button>
            ))}
            {[
              { variant: "default", icon: "solar:check-circle-bold-duotone" },
              { variant: "success", icon: "solar:check-circle-bold-duotone" },
              { variant: "danger", icon: "solar:forbidden-circle-bold-duotone" },
              { variant: "warning", icon: "solar:bell-bold-duotone" },
              { variant: "info", icon: "solar:info-circle-bold-duotone" },
            ].map(({ variant, icon }) => (
              <Modal
                key={variant}
                variant={variant as any}
                open={openModals[`variant-${variant}`]}
                onOpenChange={(open) => setOpenModals(prev => ({ ...prev, [`variant-${variant}`]: open }))}
                title={t("headerVariants.modalTitle", { variant })}
              >
                <div className="space-y-4">
                  <p className="text-muted-foreground">{t("headerVariants.modalContent")}</p>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label>{t("form.name")}</Label>
                      <Input placeholder={t("form.namePlaceholder")} />
                    </div>
                    <div className="grid gap-2">
                      <Label>{t("form.description")}</Label>
                      <Textarea placeholder={t("form.descriptionPlaceholder")} />
                    </div>
                  </div>
                </div>
              </Modal>
            ))}
          </CardContent>
        </Card>

        {/* Operation Modes */}
        <Card>
          <CardHeader>
            <CardTitle>{t("operationModes.title")}</CardTitle>
            <CardDescription>{t("operationModes.description")}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            {[
              { operation: "create", icon: "solar:add-circle-bold-duotone", variant: "default" },
              { operation: "edit", icon: "solar:pen-bold-duotone", variant: "info" },
              { operation: "delete", icon: "solar:trash-bin-trash-bold-duotone", variant: "danger" },
              { operation: "view", icon: "solar:eye-bold-duotone", variant: "success" },
            ].map(({ operation, icon, variant }) => (
              <Button
                key={operation}
                variant="outline"
                onClick={() => toggleModal(`operation-${operation}`)}
                className="gap-2"
              >
                <Icon icon={icon} className="w-4 h-4" />
                <span>{operation}</span>
              </Button>
            ))}
            {[
              { operation: "create", variant: "default" },
              { operation: "edit", variant: "info" },
              { operation: "delete", variant: "danger" },
              { operation: "view", variant: "success" },
            ].map(({ operation, variant }) => (
              <Modal
                key={operation}
                operation={operation as any}
                variant={variant as any}
                open={openModals[`operation-${operation}`]}
                onOpenChange={(open) => setOpenModals(prev => ({ ...prev, [`operation-${operation}`]: open }))}
              >
                <div className="space-y-4">
                  {operation !== "delete" ? (
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <Label>{t("form.name")}</Label>
                        <Input placeholder={t("form.namePlaceholder")} disabled={operation === "view"} />
                      </div>
                      <div className="grid gap-2">
                        <Label>{t("form.description")}</Label>
                        <Textarea placeholder={t("form.descriptionPlaceholder")} disabled={operation === "view"} />
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center gap-4 py-4">
                      <div className="rounded-full bg-red-100 p-3">
                        <Icon icon="solar:trash-bin-trash-bold-duotone" className="w-6 h-6 text-red-600" />
                      </div>
                      <p className="text-center text-muted-foreground">{t("operationModes.deleteMessage")}</p>
                      <div className="flex gap-2">
                        <Button variant="outline" onClick={() => toggleModal(`operation-delete`)}>
                          {t("operationModes.cancel")}
                        </Button>
                        <Button variant="destructive">
                          {t("operationModes.confirm")}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </Modal>
            ))}
          </CardContent>
        </Card>

        {/* Pattern Toggle */}
        <Card>
          <CardHeader>
            <CardTitle>{t("patternToggle.title")}</CardTitle>
            <CardDescription>{t("patternToggle.description")}</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-4">
            {[true, false].map((showFloral) => (
              <Button
                key={String(showFloral)}
                variant="outline"
                onClick={() => toggleModal(`pattern-${showFloral}`)}
              >
                {showFloral ? t("patternToggle.withPattern") : t("patternToggle.withoutPattern")}
              </Button>
            ))}
            {[true, false].map((showFloral) => (
              <Modal
                key={String(showFloral)}
                showFloral={showFloral}
                open={openModals[`pattern-${showFloral}`]}
                onOpenChange={(open) => setOpenModals(prev => ({ ...prev, [`pattern-${showFloral}`]: open }))}
                title={t("patternToggle.modalTitle")}
              >
                <div className="space-y-4">
                  <p className="text-muted-foreground">
                    {showFloral ? t("patternToggle.withPatternContent") : t("patternToggle.withoutPatternContent")}
                  </p>
                </div>
              </Modal>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
