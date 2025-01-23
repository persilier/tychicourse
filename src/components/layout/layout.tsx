"use client";

import { useLayoutStore } from "@/store/layout-store";
import { Header } from "./header";
import { Sidebar } from "./sidebar";
import { cn } from "@/lib/utils";

export function Layout({ children }: { children: React.ReactNode }) {
  const { sidebarCollapsed, sidebarVariant } = useLayoutStore();

  return (
    <div className="relative flex min-h-screen">
      {/* Sidebar */}
      <div
        className={cn(
          "z-50 h-screen",
          // Default variant
          sidebarVariant === "default" && [
            "w-[280px] border-r bg-background transition-all duration-300 ease-in-out",
            sidebarCollapsed && "w-[80px]",
          ],
          // Floating variant
          sidebarVariant === "floating" && [
            "absolute left-4 top-4 h-[calc(100vh-32px)] w-[280px] rounded-xl border bg-background/80 backdrop-blur-xl transition-all duration-300 ease-in-out",
            sidebarCollapsed && "w-[80px]",
          ]
        )}
      >
        <Sidebar />
      </div>

      {/* Main content */}
      <div
        className={cn(
          "flex flex-1 flex-col",
          // Default variant
          sidebarVariant === "default" && [
            "ml-[280px] transition-all duration-300 ease-in-out",
            sidebarCollapsed && "ml-[80px]",
          ],
          // Floating variant
          sidebarVariant === "floating" && "ml-0"
        )}
      >
        <Header />
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
    </div>
  );
}
