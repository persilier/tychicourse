"use client";

import { useThemeStore } from "@/store/theme-store";
import { useEffect } from "react";

export function ThemeInit() {
  useEffect(() => {
    // This triggers the store to rehydrate from localStorage
    useThemeStore.persist.rehydrate();
  }, []);

  return null;
}
