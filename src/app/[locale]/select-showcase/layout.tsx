import { Providers } from "@/components/providers"
import { Layout } from "@/components/layout/layout"

async function getMessages(locale: string) {
    try {
        return (await import(`../../../../messages/${locale}.json`)).default
    } catch (error) {
        return null
    }
}

export default async function SelectShowcaseLayout({
    children,
    params: { locale },
}: {
    children: React.ReactNode
    params: { locale: string }
}) {
    const messages = await getMessages(locale)

    return (
        <Providers messages={messages} locale={locale}>
            <Layout>{children}</Layout>
        </Providers>
    )
}