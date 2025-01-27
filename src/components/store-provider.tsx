"use client"

import { PropsWithChildren, useEffect, useState } from "react"

export function StoreProvider({ children }: PropsWithChildren) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return children
}
