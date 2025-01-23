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
import { useLayoutStore } from "@/store/layout-store";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const { isVerticalLayout, sidebarCollapsed, setSidebarCollapsed } =
    useLayoutStore();

  return (
    <div
      className={cn(
        "relative h-full bg-card text-card-foreground",
        isVerticalLayout
          ? cn(
              "transition-all duration-300",
              sidebarCollapsed ? "w-[80px]" : "w-[280px]"
            )
          : "w-full",
        className
      )}
    >
      <div
        className={cn(
          "flex gap-4",
          isVerticalLayout
            ? "flex-col py-4"
            : "h-16 items-center justify-between px-4",
          sidebarCollapsed && isVerticalLayout && "items-center"
        )}
      >
        <div
          className={cn(
            "flex items-center",
            isVerticalLayout &&
              cn("h-16", sidebarCollapsed ? "justify-center" : "px-6")
          )}
        >
          {sidebarCollapsed ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link href="/" className="flex items-center justify-center">
                    <LayoutDashboard className="h-6 w-6" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={10}>
                  Tychi Course
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <LayoutDashboard className="h-6 w-6" />
              <span>Tychi Course</span>
            </Link>
          )}
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

            if (sidebarCollapsed && isVerticalLayout) {
              return (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={item.href}
                        className={cn(
                          "flex h-10 w-10 items-center justify-center rounded-lg transition-colors hover:bg-accent hover:text-accent-foreground",
                          isActive
                            ? "bg-accent text-accent-foreground"
                            : "text-muted-foreground"
                        )}
                      >
                        <Icon className="h-4 w-4 shrink-0" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={10}>
                      {item.title}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            }

            return (
              <Link
                key={index}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground"
                )}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.title}</span>
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
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
        >
          {sidebarCollapsed ? (
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
