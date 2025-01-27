"use client"

import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { StoreProvider } from "@/components/store-provider"
import { LayoutInit } from "@/components/layout-init"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <StoreProvider>
        <LayoutInit>
          {children}
          <Toaster />
        </LayoutInit>
      </StoreProvider>
    </ThemeProvider>
  )
}
