"use client";

import { useLayoutStore } from "@/store/layout-store";
import { useEffect } from "react";

export function LayoutInit() {
  const { radius, setRadius } = useLayoutStore();

  useEffect(() => {
    // Apply the radius on mount
    setRadius(radius);
  }, [radius, setRadius]);

  return null;
}
