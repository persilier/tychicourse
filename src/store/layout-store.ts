"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LayoutState {
  isVerticalLayout: boolean;
  toggleLayout: () => void;
  radius: "none" | "sm" | "md" | "lg" | "full";
  setRadius: (radius: "none" | "sm" | "md" | "lg" | "full") => void;
}

const getRadiusValue = (radius: "none" | "sm" | "md" | "lg" | "full") => {
  switch (radius) {
    case "none":
      return "0";
    case "sm":
      return "0.375rem";
    case "md":
      return "0.5rem";
    case "lg":
      return "0.75rem";
    case "full":
      return "9999px";
  }
};

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set) => ({
      isVerticalLayout: true,
      toggleLayout: () =>
        set((state) => ({ isVerticalLayout: !state.isVerticalLayout })),
      radius: "md",
      setRadius: (radius) => {
        document.documentElement.style.setProperty(
          "--radius",
          getRadiusValue(radius)
        );
        set({ radius });
      },
    }),
    {
      name: "layout-storage",
      skipHydration: true,
      onRehydrateStorage: () => (state) => {
        // Apply the stored radius when the store is rehydrated
        if (state) {
          document.documentElement.style.setProperty(
            "--radius",
            getRadiusValue(state.radius)
          );
        }
      },
    }
  )
);
