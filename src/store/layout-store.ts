"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface LayoutState {
  isVerticalLayout: boolean;
  toggleLayout: () => void;
}

export const useLayoutStore = create<LayoutState>()(
  persist(
    (set) => ({
      isVerticalLayout: true,
      toggleLayout: () =>
        set((state) => ({ isVerticalLayout: !state.isVerticalLayout })),
    }),
    {
      name: "layout-storage",
    }
  )
);
