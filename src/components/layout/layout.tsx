"use client";

import { useLayoutStore } from "@/store/layout-store";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { Customizer } from "./layout-customizer";
import { cn } from "@/lib/utils";

export function Layout({ children }: { children: React.ReactNode }) {
  const { isVerticalLayout, sidebarCollapsed, sidebarVariant } =
    useLayoutStore();

  return (
    <div className="relative min-h-screen bg-background">
      <div
        className={cn("relative", isVerticalLayout ? "flex" : "flex flex-col")}
      >
        {/* Sidebar */}
        {isVerticalLayout ? (
          <aside
            className={cn(
              "z-50 hidden md:block transition-all duration-300 ease-in-out",
              // Default variant
              sidebarVariant === "default" && [
                "fixed left-0 top-0 h-screen border-r bg-background",
                sidebarCollapsed ? "w-[80px]" : "w-[280px]",
              ],
              // Floating variant
              sidebarVariant === "floating" && [
                "fixed h-[calc(100vh-2rem)] rounded-xl border shadow-sm bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60",
                sidebarCollapsed
                  ? "left-4 top-4 w-[80px]"
                  : "left-4 top-4 w-[280px]",
              ]
            )}
          >
            <Sidebar />
          </aside>
        ) : (
          <div className="w-full border-b">
            <Sidebar />
          </div>
        )}

        {/* Main content */}
        <main
          className={cn(
            "flex min-h-screen flex-1 flex-col transition-all duration-300 ease-in-out",
            isVerticalLayout && [
              // Default variant padding
              sidebarVariant === "default" && [
                sidebarCollapsed ? "md:pl-[80px]" : "md:pl-[280px]",
              ],
              // Floating variant padding
              sidebarVariant === "floating" && [
                sidebarCollapsed ? "md:pl-[96px]" : "md:pl-[296px]",
              ],
            ]
          )}
        >
          <Header />
          <div className="flex-1 overflow-y-auto p-4 md:p-8">{children}</div>
        </main>
      </div>
      <Customizer />
    </div>
  );
}
