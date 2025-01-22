"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  LayoutDashboard,
  BarChart2,
  Users,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useLayoutStore } from "@/store/layout-store";

const navigationItems = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: BarChart2,
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: Users,
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: Settings,
  },
];

interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className }: SidebarProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();
  const { isVerticalLayout } = useLayoutStore();

  return (
    <div
      className={cn(
        "relative bg-card text-card-foreground",
        isVerticalLayout
          ? cn(
              "border-r transition-all duration-300",
              isCollapsed ? "w-16" : "w-64"
            )
          : "w-full border-b",
        className
      )}
    >
      <div
        className={cn(
          "flex gap-4",
          isVerticalLayout
            ? "flex-col py-4"
            : "h-16 items-center justify-between px-4",
          isCollapsed && isVerticalLayout && "items-center"
        )}
      >
        <div
          className={cn(
            "flex items-center",
            isVerticalLayout &&
              cn("h-16", isCollapsed ? "justify-center" : "px-6")
          )}
        >
          <Link
            href="/"
            className={cn(
              "flex items-center gap-2 font-semibold",
              isCollapsed && isVerticalLayout && "flex-col gap-1"
            )}
          >
            <LayoutDashboard className="h-6 w-6" />
            {(!isCollapsed || !isVerticalLayout) && <span>Tychi Course</span>}
          </Link>
        </div>
        <nav
          className={cn(
            "flex gap-2",
            isVerticalLayout ? "flex-col px-2" : "items-center"
          )}
        >
          {navigationItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground",
                  isCollapsed && isVerticalLayout && "justify-center"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                {(!isCollapsed || !isVerticalLayout) && (
                  <span>{item.title}</span>
                )}
              </Link>
            );
          })}
        </nav>
      </div>
      {isVerticalLayout && (
        <Button
          variant="outline"
          size="icon"
          className="absolute -right-3 top-4 h-6 w-6 rounded-full bg-background"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
          <span className="sr-only">Toggle Sidebar</span>
        </Button>
      )}
    </div>
  );
}
