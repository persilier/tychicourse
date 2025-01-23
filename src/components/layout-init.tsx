"use client";

import { useLayoutStore } from "@/store/layout-store";
import { useEffect } from "react";

export function LayoutInit() {
  const { isVerticalLayout } = useLayoutStore();

  useEffect(() => {
    // This triggers the store to rehydrate from localStorage
    useLayoutStore.persist.rehydrate();
  }, []);

  return null;
}
