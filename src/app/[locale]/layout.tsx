import { Inter } from "next/font/google";
import { notFound } from "next/navigation";
import "../globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Customizer } from "@/components/layout/layout-customizer";
import { ThemeInit } from "@/components/theme-init";
import { LayoutInit } from "@/components/layout-init";
import { locales } from "@/config/locale";
import { unstable_setRequestLocale } from "next-intl/server";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default function RootLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!locales.includes(locale as any)) notFound();

  unstable_setRequestLocale(locale);

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className="antialiased" suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeInit />
          <LayoutInit />
          {children}
          <Customizer />
          <div id="date-picker-portal" />
        </ThemeProvider>
      </body>
    </html>
  );
}
