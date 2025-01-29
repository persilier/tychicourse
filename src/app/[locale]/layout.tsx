import { Providers } from "@/components/providers"
import { unstable_setRequestLocale } from "next-intl/server"
import { getMessages } from "@/config/i18n"
import { NextIntlClientProvider, createTranslator } from "next-intl"

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string }
}) {
  const messages = await getMessages(locale)
  const t = await createTranslator({ locale, messages })

  return {
    title: t("Metadata.title"),
    description: t("Metadata.description"),
  }
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  await unstable_setRequestLocale(locale)
  const messages = await getMessages(locale)

  return (
    <html lang={locale} suppressHydrationWarning>
      <body suppressHydrationWarning>
        <NextIntlClientProvider messages={messages} locale={locale}>
          <Providers>{children}</Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}

export function generateStaticParams() {
  return [{ locale: "en" }, { locale: "fr" }]
}
