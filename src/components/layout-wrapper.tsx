import { Header } from "./layout/header";
import { Providers } from "./providers";

async function getMessages(locale: string) {
  try {
    return (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    return null;
  }
}

export async function LayoutWrapper({
  children,
  locale,
}: {
  children: React.ReactNode;
  locale: string;
}) {
  const messages = await getMessages(locale);

  return (
    <Providers messages={messages} locale={locale}>
      <div className="relative min-h-screen">
        <Header />
        <main>{children}</main>
      </div>
    </Providers>
  );
}
