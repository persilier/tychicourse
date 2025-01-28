"use client";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useLayoutStore } from "@/store/layout-store";
import { themes, useThemeStore, sidebarColors } from "@/store/theme-store";
import { motion } from "framer-motion";
import { Check, Settings } from "lucide-react";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function Customizer() {
  const { theme, setTheme } = useTheme();
  const {
    isVerticalLayout,
    toggleLayout,
    radius,
    setRadius,
    sidebarVariant,
    setSidebarVariant,
  } = useLayoutStore();
  const { selectedColor, setSelectedColor, sidebarColor, setSidebarColor } =
    useThemeStore();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <motion.div 
          className="fixed bottom-6 right-6 z-50"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            variant="default"
            size="icon"
            className="h-12 w-12 rounded-full bg-gradient-to-br from-primary/90 to-primary shadow-lg shadow-primary/20 backdrop-blur-sm"
          >
            <motion.div
              className="relative h-5 w-5"
              animate={{ rotate: 180 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Icon icon="solar:settings-bold-duotone" className="h-5 w-5" />
            </motion.div>
            <span className="sr-only">Open Customizer</span>
          </Button>
        </motion.div>
      </SheetTrigger>
      <SheetContent 
        className="w-[320px] border-l bg-gradient-to-b from-background/95 to-background/98 backdrop-blur supports-[backdrop-filter]:bg-background/60 p-0"
        side="right"
      >
        <SheetHeader className="relative pb-4 overflow-hidden">
          <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary/30 via-violet-500/25 to-sky-500/30 animate-gradient-x" />
          <div className="absolute inset-0 w-full h-full bg-[radial-gradient(circle_at_30%_20%,white_0%,transparent_60%)] opacity-50" />
          <div className="absolute inset-0 w-full h-full">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(255,255,255,0.5)_0%,transparent_50%)]" />
            <div className="absolute inset-0" style={{ 
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.3'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' /%3E%3C/g%3E%3C/svg%3E")`,
              backgroundSize: '50px 50px',
              backgroundPosition: 'center',
              mixBlendMode: 'overlay',
            }} />
          </div>
          <div className="relative pt-8 pb-6 px-6">
            <div className="mb-4">
              <SheetTitle className="text-xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/80">
                Customize
              </SheetTitle>
              <SheetDescription className="text-sm font-medium text-foreground/70 mt-1">
                Personalize your experience
              </SheetDescription>
            </div>
            <div className="flex items-center gap-2 p-2 rounded-lg bg-muted/50 backdrop-blur-sm">
              <div className="p-1.5 rounded-md bg-background/50">
                <Icon icon="solar:magic-stick-3-bold-duotone" className="w-4 h-4 text-primary" />
              </div>
              <p className="text-xs text-muted-foreground">Changes are saved automatically</p>
            </div>
          </div>
        </SheetHeader>
        <div className="px-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-sm font-medium">Layout Settings</h3>
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full hover:bg-muted/50">
              <Icon icon="solar:restart-bold-duotone" className="w-4 h-4" />
              <span className="sr-only">Reset to defaults</span>
            </Button>
          </div>
          <ScrollArea className="h-[calc(100vh-14rem)] pr-4">
            <div className="space-y-6">
              {/* Layout Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Layout</h4>
                  <Icon icon="solar:layout-left-2-bold-duotone" className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={toggleLayout}
                          className={cn(
                            "group relative aspect-video overflow-hidden rounded-lg border-2 bg-gradient-to-br from-background to-muted/50 p-2 hover:border-primary/50",
                            isVerticalLayout ? "border-primary shadow-sm shadow-primary/20" : "border-muted"
                          )}
                        >
                          <div className="flex h-full">
                            <div className="h-full w-[30%] rounded-md bg-muted shadow-sm" />
                            <div className="flex-1 flex flex-col gap-1 p-1">
                              <div className="h-1.5 w-[80%] rounded-full bg-muted" />
                              <div className="h-1.5 w-[60%] rounded-full bg-muted" />
                            </div>
                          </div>
                          {isVerticalLayout && (
                            <div className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                              <Icon icon="solar:check-circle-bold-duotone" className="h-3 w-3" />
                            </div>
                          )}
                        </motion.button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="text-xs">Vertical Layout</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>

                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.button
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={toggleLayout}
                          className={cn(
                            "group relative aspect-video overflow-hidden rounded-lg border-2 bg-gradient-to-br from-background to-muted/50 p-2 hover:border-primary/50",
                            !isVerticalLayout ? "border-primary shadow-sm shadow-primary/20" : "border-muted"
                          )}
                        >
                          <div className="flex h-full flex-col">
                            <div className="h-[30%] w-full rounded-md bg-muted shadow-sm" />
                            <div className="flex-1 p-1">
                              <div className="h-1.5 w-[80%] rounded-full bg-muted" />
                            </div>
                          </div>
                          {!isVerticalLayout && (
                            <div className="absolute right-1 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm">
                              <Icon icon="solar:check-circle-bold-duotone" className="h-3 w-3" />
                            </div>
                          )}
                        </motion.button>
                      </TooltipTrigger>
                      <TooltipContent side="bottom" className="text-xs">Horizontal Layout</TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </div>

              {/* Theme Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Theme</h4>
                  <Icon icon="solar:sun-bold-duotone" className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: "light", icon: "solar:sun-bold-duotone", label: "Light" },
                    { value: "dark", icon: "solar:moon-bold-duotone", label: "Dark" },
                    { value: "system", icon: "solar:monitor-smartphone-bold-duotone", label: "System" },
                  ].map((item) => (
                    <TooltipProvider key={item.value}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant={theme === item.value ? "default" : "outline"}
                            onClick={() => setTheme(item.value)}
                            className="relative h-12 hover:border-primary/50 p-0"
                          >
                            <Icon icon={item.icon} className="h-5 w-5" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="text-xs">{item.label}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>

              {/* Radius Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Border Radius</h4>
                  <Icon icon="solar:shapes-bold-duotone" className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="grid grid-cols-5 gap-2">
                  {[
                    { value: "none", label: "Square", class: "rounded-none" },
                    { value: "sm", label: "Small", class: "rounded-sm" },
                    { value: "md", label: "Medium", class: "rounded-md" },
                    { value: "lg", label: "Large", class: "rounded-lg" },
                    { value: "full", label: "Full", class: "rounded-full" },
                  ].map((item) => (
                    <TooltipProvider key={item.value}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              variant={radius === item.value ? "default" : "outline"}
                              onClick={() => setRadius(item.value)}
                              className="h-8 w-8 p-0 hover:border-primary/50"
                            >
                              <div className={cn("h-4 w-4 border-2", item.class)} />
                            </Button>
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="text-xs">{item.label}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>

              {/* Color Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Accent Color</h4>
                  <Icon icon="solar:palette-bold-duotone" className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {themes.map((theme, index) => (
                    <TooltipProvider key={theme.name}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              variant="outline"
                              onClick={() => setSelectedColor(theme.name)}
                              className={cn(
                                "relative h-8 w-8 p-0 hover:border-primary/50",
                                selectedColor === theme.name && "border-primary"
                              )}
                            >
                              <motion.div
                                className="h-4 w-4 rounded-full"
                                style={{
                                  backgroundColor: `hsl(${theme.activeColor})`,
                                }}
                                whileHover={{ scale: 1.2 }}
                              />
                              {selectedColor === theme.name && (
                                <motion.div
                                  initial={{ scale: 0 }}
                                  animate={{ scale: 1 }}
                                  transition={{
                                    type: "spring",
                                    stiffness: 300,
                                    damping: 20,
                                  }}
                                  className="absolute inset-0 flex items-center justify-center text-white"
                                >
                                  <Icon icon="solar:check-circle-bold-duotone" className="h-3 w-3" />
                                </motion.div>
                              )}
                            </Button>
                          </motion.div>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="text-xs">{theme.label}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>

              {/* Sidebar Color Section */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium">Sidebar Theme</h4>
                  <Icon icon="solar:sidebar-minimalistic-bold-duotone" className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {sidebarColors.map((color) => (
                    <TooltipProvider key={color.name}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <motion.button
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSidebarColor(color.name)}
                            className={cn(
                              "group relative flex flex-col items-center rounded-lg border-2 p-1.5 hover:border-primary/50",
                              sidebarColor === color.name
                                ? "border-primary shadow-sm shadow-primary/20"
                                : "border-muted"
                            )}
                          >
                            <div
                              className={cn(
                                "h-8 w-full rounded-md",
                                color.background,
                                color.border
                              )}
                            />
                            {sidebarColor === color.name && (
                              <motion.div
                                layoutId="activeColor"
                                className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.2 }}
                              >
                                <Icon
                                  icon="solar:check-circle-bold-duotone"
                                  className="h-3 w-3"
                                />
                              </motion.div>
                            )}
                          </motion.button>
                        </TooltipTrigger>
                        <TooltipContent side="bottom" className="text-xs">{color.label}</TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ))}
                </div>
              </div>
            </div>
          </ScrollArea>
        </div>
      </SheetContent>
    </Sheet>
  );
}
