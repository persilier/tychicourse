import { Layout } from "@/components/layout/layout";
import { Providers } from "@/components/providers";

async function getMessages(locale: string) {
  try {
    return (await import(`../../../../messages/${locale}.json`)).default;
  } catch (error) {
    return null;
  }
}

export default async function ComponentsLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const messages = await getMessages(locale);

  return (
    <Providers messages={messages} locale={locale}>
      <Layout>{children}</Layout>
    </Providers>
  );
} 