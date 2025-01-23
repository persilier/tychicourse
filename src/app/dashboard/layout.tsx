"use client";

import { Sidebar } from "@/components/layout/sidebar";
import { Customizer } from "@/components/layout/customizer";
import { Header } from "@/components/layout/header";
import { useLayoutStore } from "@/store/layout-store";
import { cn } from "@/lib/utils";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isVerticalLayout } = useLayoutStore();

  return (
    <div
      className={cn(
        "min-h-screen bg-background",
        isVerticalLayout ? "flex" : "flex flex-col"
      )}
    >
      <Sidebar className="hidden md:block" />
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header />
        <main
          className={cn(
            "flex-1 overflow-y-auto",
            isVerticalLayout ? "p-8" : "px-8 pb-8"
          )}
        >
          {children}
        </main>
      </div>
      <Customizer />
    </div>
  );
}
