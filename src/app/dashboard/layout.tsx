"use client";

import { Layout } from "@/components/layout/layout";
import { ThemeProvider } from "@/components/theme-provider";
import { Customizer } from "@/components/layout/layout-customizer";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Layout>{children}</Layout>
      <Customizer />
    </ThemeProvider>
  );
}
