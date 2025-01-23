"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, ChevronDown } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLayoutStore } from "@/store/layout-store";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import React from "react";
import { Icon } from "@iconify/react";

interface SubMenuItem {
  title: string;
  href: string;
}

interface NavigationItem {
  title: string;
  href?: string;
  icon: string;
  submenu?: SubMenuItem[];
}

const navigationItems: NavigationItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "solar:home-2-bold-duotone",
  },
  {
    title: "Analytics",
    href: "/dashboard/analytics",
    icon: "solar:chart-2-bold-duotone",
  },
  {
    title: "Components",
    icon: "solar:widget-5-bold-duotone",
    submenu: [
      {
        title: "Buttons",
        href: "/dashboard/components/buttons",
      },
      {
        title: "Tables",
        href: "/dashboard/components/tables",
      },
      {
        title: "Forms",
        href: "/dashboard/components/forms",
      },
    ],
  },
  {
    title: "Users",
    href: "/dashboard/users",
    icon: "solar:users-group-rounded-bold-duotone",
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon: "solar:settings-bold-duotone",
  },
];

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname();
  const { isVerticalLayout, sidebarCollapsed, setSidebarCollapsed } =
    useLayoutStore();
  const [openSubmenu, setOpenSubmenu] = React.useState<string | null>(null);

  const toggleSubmenu = (title: string) => {
    if (sidebarCollapsed) {
      setSidebarCollapsed(false);
      setOpenSubmenu(title);
    } else {
      setOpenSubmenu(openSubmenu === title ? null : title);
    }
  };

  const isSubmenuActive = (item: NavigationItem) => {
    if (!item.submenu) return false;
    return item.submenu.some((subItem) => pathname === subItem.href);
  };

  // When collapsing the sidebar, close any open submenu
  React.useEffect(() => {
    if (sidebarCollapsed) {
      setOpenSubmenu(null);
    }
  }, [sidebarCollapsed]);

  return (
    <div
      className={cn(
        "relative h-full bg-card/50 backdrop-blur-sm text-card-foreground border-r",
        isVerticalLayout
          ? cn(
              "transition-all duration-300 ease-in-out",
              sidebarCollapsed ? "w-[80px]" : "w-[280px]"
            )
          : "w-full",
        className
      )}
    >
      <div
        className={cn(
          "flex",
          isVerticalLayout
            ? "flex-col py-6"
            : "h-16 items-center justify-between px-6",
          sidebarCollapsed && isVerticalLayout && "items-center"
        )}
      >
        <div
          className={cn(
            "flex items-center mb-6",
            isVerticalLayout &&
              cn("px-6", sidebarCollapsed ? "justify-center px-0" : "")
          )}
        >
          {sidebarCollapsed ? (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/"
                    className="flex items-center justify-center transition-all duration-200 hover:text-primary"
                  >
                    <Icon
                      icon={navigationItems[0].icon}
                      className="h-6 w-6 transition-all duration-200 group-hover:scale-110"
                    />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right" sideOffset={10}>
                  Tychi Course
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ) : (
            <Link
              href="/"
              className="flex items-center gap-3 transition-all duration-200 hover:text-primary"
            >
              <Icon
                icon={navigationItems[0].icon}
                className="h-6 w-6 transition-all duration-200 group-hover:scale-110"
              />
              <span className="font-semibold">Tychi Course</span>
            </Link>
          )}
        </div>
        <nav
          className={cn(
            "flex gap-1.5",
            isVerticalLayout ? "flex-col px-4" : "items-center"
          )}
        >
          {navigationItems.map((item, index) => {
            const isActive = item.href
              ? pathname === item.href
              : isSubmenuActive(item);
            const hasSubmenu = !!item.submenu;

            if (sidebarCollapsed && isVerticalLayout) {
              return (
                <TooltipProvider key={index}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      {hasSubmenu ? (
                        <button
                          onClick={() => toggleSubmenu(item.title)}
                          className={cn(
                            "group relative flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-200",
                            isActive
                              ? "bg-gradient-to-r from-primary/10 to-primary/5 text-primary font-medium"
                              : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                          )}
                        >
                          <Icon
                            icon={item.icon}
                            className="h-5 w-5 transition-all duration-200 group-hover:scale-110"
                          />
                          {isActive && (
                            <span className="absolute right-0 top-1/2 h-3 w-1 -translate-y-1/2 rounded-l-full bg-primary" />
                          )}
                        </button>
                      ) : (
                        <Link
                          href={item.href!}
                          className={cn(
                            "group relative flex h-10 w-10 items-center justify-center rounded-lg transition-all duration-200",
                            isActive
                              ? "bg-gradient-to-r from-primary/10 to-primary/5 text-primary font-medium"
                              : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                          )}
                        >
                          <Icon
                            icon={item.icon}
                            className="h-5 w-5 transition-all duration-200 group-hover:scale-110"
                          />
                          {isActive && (
                            <span className="absolute right-0 top-1/2 h-3 w-1 -translate-y-1/2 rounded-l-full bg-primary" />
                          )}
                        </Link>
                      )}
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={10}>
                      {item.title}
                      {hasSubmenu && " (Click to expand)"}
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              );
            }

            if (hasSubmenu) {
              return (
                <div key={index} className="w-full space-y-1">
                  <button
                    onClick={() => toggleSubmenu(item.title)}
                    className={cn(
                      "group relative flex w-full items-center justify-between gap-3 rounded-lg px-4 py-2 text-sm transition-all duration-200",
                      isActive
                        ? "bg-gradient-to-r from-primary/10 to-primary/5 text-primary font-medium"
                        : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        icon={item.icon}
                        className="h-5 w-5 transition-all duration-200 group-hover:scale-110"
                      />
                      <span>{item.title}</span>
                    </div>
                    <ChevronDown
                      className={cn(
                        "h-4 w-4 transition-transform duration-200",
                        openSubmenu === item.title && "rotate-180"
                      )}
                    />
                    {isActive && (
                      <span className="absolute right-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-l-full bg-primary" />
                    )}
                  </button>
                  {openSubmenu === item.title && (
                    <div className="ml-4 space-y-1 border-l pl-4">
                      {item.submenu?.map((subItem, subIndex) => {
                        const isSubActive = pathname === subItem.href;
                        return (
                          <Link
                            key={subIndex}
                            href={subItem.href}
                            className={cn(
                              "group relative flex w-full items-center gap-3 rounded-lg px-4 py-2 text-sm transition-all duration-200",
                              isSubActive
                                ? "bg-gradient-to-r from-primary/10 to-primary/5 text-primary font-medium"
                                : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                            )}
                          >
                            <div className="flex items-center gap-2">
                              <span
                                className={cn(
                                  "h-1.5 w-1.5 rounded-full transition-colors duration-200",
                                  isSubActive
                                    ? "bg-primary"
                                    : "bg-muted-foreground/40 group-hover:bg-foreground/40"
                                )}
                              />
                              <span>{subItem.title}</span>
                            </div>
                            {isSubActive && (
                              <span className="absolute right-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-l-full bg-primary" />
                            )}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={index}
                href={item.href!}
                className={cn(
                  "group relative flex items-center gap-3 rounded-lg px-4 py-2 text-sm transition-all duration-200",
                  isActive
                    ? "bg-gradient-to-r from-primary/10 to-primary/5 text-primary font-medium"
                    : "text-muted-foreground hover:bg-accent/50 hover:text-foreground"
                )}
              >
                <Icon
                  icon={item.icon}
                  className="h-5 w-5 transition-all duration-200 group-hover:scale-110"
                />
                <span>{item.title}</span>
                {isActive && (
                  <span className="absolute right-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-l-full bg-primary" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>
      {isVerticalLayout && (
        <Button
          variant="ghost"
          size="icon"
          className="absolute -right-3 top-6 h-6 w-6 rounded-full bg-background border shadow-sm hover:bg-accent/50"
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
