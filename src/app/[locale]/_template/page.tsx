"use client"

import { useTranslations } from "next-intl"
import { PageHeader } from "@/components/page-header"

export default function TemplatePage() {
  const t = useTranslations("Template") // Make sure to add this namespace to your messages files

  return (
    <div className="container space-y-8 py-8">
      <PageHeader 
        heading={t("pageTitle")}
        text={t("pageDescription")}
      />
      
      {/* Add your page content here */}
      <div className="rounded-lg border bg-card p-8">
        <h2 className="text-lg font-semibold">{t("content.title")}</h2>
        <p className="text-muted-foreground mt-2">{t("content.description")}</p>
      </div>
    </div>
  )
}
