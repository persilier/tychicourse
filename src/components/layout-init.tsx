"use client"

import { useLayoutStore } from "@/store/layout-store"
import { useEffect } from "react"
import { PropsWithChildren } from "react"

export function LayoutInit({ children }: PropsWithChildren) {
  const { setSidebarCollapsed } = useLayoutStore()

  useEffect(() => {
    // Initialiser le layout en fonction de la taille de l'écran
    const handleResize = () => {
      setSidebarCollapsed(window.innerWidth < 1024)
    }

    handleResize()
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [setSidebarCollapsed])

  return children
}
