"use client";

import { useThemeStore } from "@/store/theme-store";
import { useTheme } from "next-themes";
import { useEffect } from "react";

export function ThemeInit() {
  const { selectedColor, setSelectedColor } = useThemeStore();
  const { resolvedTheme, setTheme } = useTheme();

  // Apply initial theme color
  useEffect(() => {
    if (selectedColor) {
      setSelectedColor(selectedColor);
    }
  }, [selectedColor, setSelectedColor]);

  // Reapply theme color when theme changes
  useEffect(() => {
    if (selectedColor) {
      // Ensure we don't interfere with the theme mode
      requestAnimationFrame(() => {
        setSelectedColor(selectedColor);
      });
    }
  }, [resolvedTheme, selectedColor, setSelectedColor]);

  return null;
}
