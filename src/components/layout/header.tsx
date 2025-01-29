"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { LanguageSwitcher } from "@/components/language-switcher"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTheme } from "next-themes"
import { Icon } from "@iconify/react"
import { useLayoutStore } from "@/store/layout-store"
import { useTranslations } from "next-intl"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { useLocale } from "next-intl"
import { Link, usePathname } from "@/config/i18n"
import { Skeleton } from "@/components/ui/skeleton"
import { logout } from "@/lib/auth-utils"
import { CustomBreadcrumbs } from "@/components/ui/custom-breadcrumbs"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

export function Header() {
  const { theme } = useTheme()
  const [open, setOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const [userMenuOpen, setUserMenuOpen] = useState(false)
  const [commandOpen, setCommandOpen] = useState(false)
  const t = useTranslations("Layout.Header")
  const locale = useLocale()
  const pathname = usePathname()
  const { isVerticalLayout } = useLayoutStore()

  useEffect(() => {
    setOpen(false)
  }, [pathname])

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setCommandOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true)
      await logout()
    } catch (error) {
      console.error('Logout failed:', error)
    } finally {
      setIsLoggingOut(false)
    }
  }

  const navigation = [
    { name: t("dashboard"), href: "/dashboard", icon: "solar:home-2-bold-duotone" },
    { name: t("courses"), href: "/courses", icon: "solar:book-bold-duotone" },
    { name: t("user-management"), href: "/user-management", icon: "solar:users-group-rounded-bold-duotone" },
  ]

  const getBreadcrumbItems = () => {
    // Split the pathname into segments
    const segments = pathname.split('/').filter(Boolean)
    
    // Always start with home
    const items = [{
      label: t("dashboard"),
      href: "/dashboard",
      icon: <Icon icon="solar:home-2-bold-duotone" className="h-5 w-5 text-primary" />,
    }]

    // Build the breadcrumb path
    let currentPath = ""
    segments.forEach((segment) => {
      if (segment !== locale) { // Skip locale segment
        currentPath += `/${segment}`
        let icon;
        switch (segment) {
          case "courses":
            icon = <Icon icon="solar:book-bold-duotone" className="h-5 w-5 text-primary" />;
            break;
          case "user-management":
            icon = <Icon icon="solar:users-group-rounded-bold-duotone" className="h-5 w-5 text-primary" />;
            break;
          default:
            icon = undefined;
        }
        items.push({
          label: t(segment),
          href: currentPath,
          icon
        })
      }
    })

    return items
  }

  const userNavigation = [
    { name: t("profile"), href: "/profile", icon: "solar:user-bold-duotone" },
    { name: t("settings"), href: "/settings", icon: "solar:settings-bold-duotone" },
  ]

  return (
    <>
      <header className={cn(
        "z-40 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6",
        !isVerticalLayout && "sticky top-0 w-full"
      )}>
        <div className="flex flex-1 items-center gap-4">
          {/* Logo and Mobile Menu */}
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setOpen(!open)}
              className="lg:hidden rounded-xl"
            >
              <Icon icon="solar:hamburger-menu-bold-duotone" className="h-5 w-5" />
            </Button>
            
            <div className="hidden lg:block">
              <CustomBreadcrumbs
                items={getBreadcrumbItems()}
                variant="ghost"
                separator="chevron"
              />
            </div>
          </div>

          {/* Search Trigger */}
          <div className="flex-1 max-w-md mx-auto">
            <Button
              variant="outline"
              className="w-full justify-start rounded-xl border shadow-sm text-muted-foreground"
              onClick={() => setCommandOpen(true)}
            >
              <Icon icon="solar:magnifer-bold-duotone" className="mr-2 h-5 w-5" />
              {t("search")}
              <kbd className="pointer-events-none ml-auto inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-6">
          {/* Quick Actions */}
          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-xl"
                >
                  <Icon icon="solar:add-square-bold-duotone" className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-56 z-50"
                sideOffset={8}
                alignOffset={0}
                avoidCollisions={true}
                collisionPadding={16}
              >
                <DropdownMenuLabel>{t("quickActions")}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Icon icon="solar:book-add-bold-duotone" className="mr-2 h-5 w-5" />
                  {t("newCourse")}
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Icon icon="solar:chat-square-call-bold-duotone" className="mr-2 h-5 w-5" />
                  {t("newDiscussion")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Notifications */}
          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-xl relative group"
                >
                  <Icon icon="solar:bell-bold-duotone" className="h-6 w-6 text-muted-foreground group-hover:text-primary transition-colors" />
                  <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-500/50 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-full w-full bg-rose-500 items-center justify-center text-[10px] text-white font-medium">
                      2
                    </span>
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-[380px] rounded-2xl p-0 shadow-lg border bg-gradient-to-b from-background/95 to-background/98 backdrop-blur supports-[backdrop-filter]:bg-background/60 z-50"
                sideOffset={8}
                alignOffset={0}
                avoidCollisions={true}
                collisionPadding={16}
              >
                <div className="flex items-center justify-between p-4 border-b rounded-t-2xl bg-gradient-to-b from-background/95 to-background/98">
                  <div className="space-y-0.5">
                    <h4 className="font-medium text-sm">{t("notifications")}</h4>
                    <p className="text-xs text-muted-foreground">{t("latestUpdates")}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs gap-1.5 rounded-lg h-8 hover:bg-background hover:text-primary transition-colors"
                  >
                    <Icon icon="solar:check-read-bold-duotone" className="h-4 w-4" />
                    {t("markAllAsRead")}
                  </Button>
                </div>
                <div className="max-h-[450px] overflow-y-auto px-3">
                  {/* Today's notifications */}
                  <div className="py-3">
                    <h5 className="text-xs font-medium text-muted-foreground px-2 mb-2">{t("today")}</h5>
                    <div className="space-y-1">
                      <DropdownMenuItem className="p-3 rounded-xl focus:bg-accent data-[highlighted]:bg-accent cursor-pointer group">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500/20 to-orange-500/20 text-rose-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                              <Icon icon="solar:bell-bold-duotone" className="h-5 w-5" />
                            </div>
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none group-hover:text-rose-500 transition-colors">{t("newCourseAvailable")}</p>
                            <p className="text-xs text-muted-foreground line-clamp-2">{t("newCourseNotification")}</p>
                            <p className="text-xs text-muted-foreground/60">2 {t("hoursAgo")}</p>
                          </div>
                          <div className="flex-shrink-0">
                            <div className="h-2.5 w-2.5 rounded-full bg-rose-500 mt-1" />
                          </div>
                        </div>
                      </DropdownMenuItem>
                      <DropdownMenuItem className="p-3 rounded-xl focus:bg-accent data-[highlighted]:bg-accent cursor-pointer group">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20 text-blue-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                              <Icon icon="solar:chat-round-dots-bold-duotone" className="h-5 w-5" />
                            </div>
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none group-hover:text-blue-500 transition-colors">{t("newDiscussionReply")}</p>
                            <p className="text-xs text-muted-foreground line-clamp-2">{t("newReplyNotification")}</p>
                            <p className="text-xs text-muted-foreground/60">5 {t("hoursAgo")}</p>
                          </div>
                          <div className="flex-shrink-0">
                            <div className="h-2.5 w-2.5 rounded-full bg-blue-500 mt-1" />
                          </div>
                        </div>
                      </DropdownMenuItem>
                    </div>
                  </div>
                  {/* Yesterday's notifications */}
                  <div className="py-3">
                    <h5 className="text-xs font-medium text-muted-foreground px-2 mb-2">{t("yesterday")}</h5>
                    <div className="space-y-1">
                      <DropdownMenuItem className="p-3 rounded-xl focus:bg-accent data-[highlighted]:bg-accent cursor-pointer group">
                        <div className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-500 flex items-center justify-center group-hover:scale-105 transition-transform">
                              <Icon icon="solar:diploma-verified-bold-duotone" className="h-5 w-5" />
                            </div>
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none group-hover:text-emerald-500 transition-colors">{t("courseCompleted")}</p>
                            <p className="text-xs text-muted-foreground line-clamp-2">{t("courseCompletedNotification")}</p>
                            <p className="text-xs text-muted-foreground/60">{t("yesterday")}</p>
                          </div>
                        </div>
                      </DropdownMenuItem>
                    </div>
                  </div>
                </div>
                <div className="p-3 border-t rounded-b-2xl bg-gradient-to-b from-background/95 to-background/98">
                  <Button 
                    variant="outline" 
                    className="w-full justify-center rounded-xl gap-2 h-9 hover:bg-accent hover:text-primary transition-colors group"
                  >
                    <Icon icon="solar:bell-bold-duotone" className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    {t("viewAllNotifications")}
                  </Button>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <ThemeToggle />
          <LanguageSwitcher />

          {/* User menu */}
          <div className="relative">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  className="relative h-10 w-10 rounded-xl"
                >
                  <div className="relative">
                    <Avatar className="h-10 w-10 ring-2 ring-background transition-all duration-300 hover:scale-110 hover:ring-primary/50 hover:shadow-lg hover:shadow-primary/20">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt={t("userAvatar")}
                        className="object-cover"
                      />
                      <AvatarFallback>
                        <Skeleton className="h-10 w-10 rounded-full" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-background bg-green-500" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-[280px] p-0 rounded-2xl shadow-lg border bg-gradient-to-br from-background/95 via-background/98 to-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60 z-50"
                sideOffset={8}
                alignOffset={0}
                avoidCollisions={true}
                collisionPadding={16}
              >
                {/* User Info */}
                <div className="p-4 border-b relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/2 to-transparent" />
                  <div className="relative flex items-center gap-3">
                    <div className="relative">
                      <Avatar className="h-10 w-10 ring-2 ring-background transition-transform hover:scale-105 cursor-pointer">
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt={t("userAvatar")}
                          className="object-cover"
                        />
                        <AvatarFallback>
                          <Skeleton className="h-10 w-10 rounded-full" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full border-2 border-background bg-green-500" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-semibold">John Doe</p>
                      <p className="text-xs text-muted-foreground hover:text-primary transition-colors cursor-pointer">john@example.com</p>
                    </div>
                  </div>
                </div>

                {/* Status Selector */}
                <div className="p-1.5 border-b">
                  <DropdownMenuItem className="flex items-center gap-2 p-2 rounded-xl focus:bg-accent data-[highlighted]:bg-accent cursor-pointer group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-teal-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex-shrink-0 relative">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-500/20 to-teal-500/20 text-emerald-500 flex items-center justify-center group-hover:scale-105 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-emerald-500/20">
                        <Icon icon="solar:user-circle-bold-duotone" className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium group-hover:text-emerald-500 transition-colors">{t("online")}</p>
                    </div>
                    <Icon icon="solar:check-circle-bold-duotone" className="h-4 w-4 text-emerald-500 transition-transform group-hover:scale-110" />
                  </DropdownMenuItem>
                </div>

                {/* Navigation Items */}
                <div className="p-1.5 space-y-1">
                  <DropdownMenuItem className="flex items-center gap-2 p-2 rounded-xl focus:bg-accent data-[highlighted]:bg-accent cursor-pointer group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-indigo-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex-shrink-0 relative">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500/20 to-indigo-500/20 text-blue-500 flex items-center justify-center group-hover:scale-105 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/20">
                        <Icon icon="solar:user-id-bold-duotone" className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <p className="text-sm font-medium group-hover:text-blue-500 transition-colors">{t("profile")}</p>
                      <p className="text-xs text-muted-foreground group-hover:text-blue-500/70 transition-colors">{t("viewAndEditProfile")}</p>
                    </div>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="flex items-center gap-2 p-2 rounded-xl focus:bg-accent data-[highlighted]:bg-accent cursor-pointer group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-violet-500/5 via-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex-shrink-0 relative">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500/20 to-purple-500/20 text-violet-500 flex items-center justify-center group-hover:scale-105 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-violet-500/20">
                        <Icon icon="solar:settings-bold-duotone" className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <p className="text-sm font-medium group-hover:text-violet-500 transition-colors">{t("settings")}</p>
                      <p className="text-xs text-muted-foreground group-hover:text-violet-500/70 transition-colors">{t("customizeExperience")}</p>
                    </div>
                  </DropdownMenuItem>

                  <DropdownMenuItem className="flex items-center gap-2 p-2 rounded-xl focus:bg-accent data-[highlighted]:bg-accent cursor-pointer group relative overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-orange-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex-shrink-0 relative">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500/20 to-orange-500/20 text-amber-500 flex items-center justify-center group-hover:scale-105 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-amber-500/20">
                        <Icon icon="solar:shield-user-bold-duotone" className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <p className="text-sm font-medium group-hover:text-amber-500 transition-colors">{t("security")}</p>
                      <p className="text-xs text-muted-foreground group-hover:text-amber-500/70 transition-colors">{t("manageSecuritySettings")}</p>
                    </div>
                  </DropdownMenuItem>
                </div>

                {/* Logout */}
                <div className="p-1.5 border-t">
                  <DropdownMenuItem 
                    className="flex items-center gap-2 p-2 rounded-xl focus:bg-accent data-[highlighted]:bg-accent cursor-pointer group relative overflow-hidden"
                    onClick={handleLogout}
                    disabled={isLoggingOut}
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-rose-500/5 via-red-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="flex-shrink-0 relative">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500/20 to-red-500/20 text-rose-500 flex items-center justify-center group-hover:scale-105 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-rose-500/20">
                        <Icon icon="solar:logout-2-bold-duotone" className="h-5 w-5" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-0.5">
                      <p className="text-sm font-medium group-hover:text-rose-500 transition-colors">
                        {isLoggingOut ? t("loggingOut") : t("logout")}
                      </p>
                      <p className="text-xs text-muted-foreground group-hover:text-rose-500/70 transition-colors">{t("signOutOfAccount")}</p>
                    </div>
                    {isLoggingOut && (
                      <div className="animate-spin">
                        <Icon icon="solar:spinner-bold-duotone" className="h-4 w-4 text-rose-500" />
                      </div>
                    )}
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </header>

      <CommandDialog open={commandOpen} onOpenChange={setCommandOpen}>
        <CommandInput placeholder={t("search")} />
        <CommandList>
          <CommandEmpty>{t("noResults")}</CommandEmpty>
          <CommandGroup heading={t("pages")}>
            {navigation.map((item) => (
              <CommandItem
                key={item.href}
                value={item.name}
                onSelect={() => {
                  setCommandOpen(false)
                  window.location.href = item.href
                }}
              >
                <Icon icon={item.icon} className="mr-2 h-4 w-4" />
                {item.name}
              </CommandItem>
            ))}
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading={t("settings")}>
            {userNavigation.map((item) => (
              <CommandItem
                key={item.href}
                value={item.name}
                onSelect={() => {
                  setCommandOpen(false)
                  window.location.href = item.href
                }}
              >
                <Icon icon={item.icon} className="mr-2 h-4 w-4" />
                {item.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
