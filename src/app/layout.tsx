import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { ThemeInit } from "@/components/theme-init";
import { LayoutInit } from "@/components/layout-init";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Tychi Course",
  description: "Learn with Tychi",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ThemeInit />
          <LayoutInit />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
