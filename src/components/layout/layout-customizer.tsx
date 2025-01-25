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
        <div className="fixed bottom-4 right-4">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              variant="default"
              size="icon"
              className="h-12 w-12 rounded-full"
            >
              <motion.div
                animate={{ rotate: 180 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
              >
                <Settings className="h-5 w-5" />
              </motion.div>
              <span className="sr-only">Open Customizer</span>
            </Button>
          </motion.div>
        </div>
      </SheetTrigger>
      <SheetContent className="w-[600px] border-l">
        <SheetHeader className="mb-4">
          <SheetTitle>Customize</SheetTitle>
          <SheetDescription>
            Make the dashboard yours by customizing the layout and style.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-8">
          <div className="space-y-4">
            <h4 className="text-sm font-medium leading-none">Layout</h4>
            <div className="grid grid-cols-2 gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={toggleLayout}
                className={cn(
                  "relative aspect-[1.5] overflow-hidden rounded-lg border-2 bg-popover p-1",
                  isVerticalLayout && "border-primary"
                )}
              >
                <div className="absolute bottom-2 left-2 text-xs font-medium">
                  Vertical
                </div>
                <div className="flex h-full">
                  <div className="h-full w-[30%] rounded bg-muted" />
                  <div className="flex-1 flex flex-col gap-1 p-1">
                    <div className="h-2 w-[80%] rounded-sm bg-muted" />
                    <div className="h-2 w-[60%] rounded-sm bg-muted" />
                  </div>
                </div>
                {isVerticalLayout && (
                  <div className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-3 w-3" />
                  </div>
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={toggleLayout}
                className={cn(
                  "relative aspect-[1.5] overflow-hidden rounded-lg border-2 bg-popover p-1",
                  !isVerticalLayout && "border-primary"
                )}
              >
                <div className="absolute bottom-2 left-2 text-xs font-medium">
                  Horizontal
                </div>
                <div className="flex h-full flex-col">
                  <div className="h-[30%] w-full rounded bg-muted" />
                  <div className="flex-1 p-1">
                    <div className="h-2 w-[80%] rounded-sm bg-muted" />
                  </div>
                </div>
                {!isVerticalLayout && (
                  <div className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-3 w-3" />
                  </div>
                )}
              </motion.button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium leading-none">Sidebar Style</h4>
            <div className="grid grid-cols-2 gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSidebarVariant("default")}
                className={cn(
                  "relative aspect-[1.5] overflow-hidden rounded-lg border-2 bg-popover p-1",
                  sidebarVariant === "default" && "border-primary"
                )}
              >
                <div className="absolute bottom-2 left-2 text-xs font-medium">
                  Default
                </div>
                <div className="flex h-full">
                  <div className="h-full w-[30%] rounded bg-muted" />
                  <div className="flex-1 p-1">
                    <div className="h-2 w-[80%] rounded-sm bg-muted" />
                  </div>
                </div>
                {sidebarVariant === "default" && (
                  <div className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-3 w-3" />
                  </div>
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setSidebarVariant("floating")}
                className={cn(
                  "relative aspect-[1.5] overflow-hidden rounded-lg border-2 bg-popover p-1",
                  sidebarVariant === "floating" && "border-primary"
                )}
              >
                <div className="absolute bottom-2 left-2 text-xs font-medium">
                  Floating
                </div>
                <div className="flex h-full">
                  <div className="h-full w-[30%] translate-x-1 rounded-lg bg-muted/80 shadow-lg backdrop-blur" />
                  <div className="flex-1 p-1">
                    <div className="h-2 w-[80%] rounded-sm bg-muted" />
                  </div>
                </div>
                {sidebarVariant === "floating" && (
                  <div className="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-3 w-3" />
                  </div>
                )}
              </motion.button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium leading-none">Theme</h4>
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                onClick={() => setTheme("light")}
                className="justify-start"
              >
                <Icon icon="heroicons:sun" className="mr-2 h-4 w-4" />
                Light
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                onClick={() => setTheme("dark")}
                className="justify-start"
              >
                <Icon icon="heroicons:moon" className="mr-2 h-4 w-4" />
                Dark
              </Button>
              <Button
                variant={theme === "system" ? "default" : "outline"}
                onClick={() => setTheme("system")}
                className="justify-start"
              >
                <Icon
                  icon="heroicons:computer-desktop"
                  className="mr-2 h-4 w-4"
                />
                System
              </Button>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium leading-none">Radius</h4>
            <div className="grid grid-cols-5 gap-4">
              <div className="flex flex-col items-center gap-1.5">
                <Button
                  variant={radius === "none" ? "default" : "outline"}
                  onClick={() => setRadius("none")}
                  className="h-8 w-8 p-0"
                >
                  <div className="h-4 w-4 rounded-none border-2" />
                </Button>
                <span className="text-xs text-muted-foreground">Square</span>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <Button
                  variant={radius === "sm" ? "default" : "outline"}
                  onClick={() => setRadius("sm")}
                  className="h-8 w-8 p-0"
                >
                  <div className="h-4 w-4 rounded-sm border-2" />
                </Button>
                <span className="text-xs text-muted-foreground">Small</span>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <Button
                  variant={radius === "md" ? "default" : "outline"}
                  onClick={() => setRadius("md")}
                  className="h-8 w-8 p-0"
                >
                  <div className="h-4 w-4 rounded-md border-2" />
                </Button>
                <span className="text-xs text-muted-foreground">Medium</span>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <Button
                  variant={radius === "lg" ? "default" : "outline"}
                  onClick={() => setRadius("lg")}
                  className="h-8 w-8 p-0"
                >
                  <div className="h-4 w-4 rounded-lg border-2" />
                </Button>
                <span className="text-xs text-muted-foreground">Large</span>
              </div>

              <div className="flex flex-col items-center gap-1.5">
                <Button
                  variant={radius === "full" ? "default" : "outline"}
                  onClick={() => setRadius("full")}
                  className="h-8 w-8 p-0"
                >
                  <div className="h-4 w-4 rounded-full border-2" />
                </Button>
                <span className="text-xs text-muted-foreground">Full</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h4 className="text-sm font-medium leading-none">Color</h4>
            <div className="flex flex-wrap gap-2">
              {themes.map((theme, index) => (
                <motion.div
                  key={theme.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedColor(theme.name)}
                    className="flex items-center gap-2 pr-2"
                  >
                    <motion.div
                      className="h-4 w-4 rounded-full"
                      style={{
                        backgroundColor: `hsl(${theme.activeColor})`,
                      }}
                      whileHover={{ scale: 1.2 }}
                    />
                    {theme.label}
                    {selectedColor === theme.name && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                      >
                        <Check className="ml-auto h-4 w-4 shrink-0" />
                      </motion.div>
                    )}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium">Sidebar Color</h3>
            </div>
            <div className="grid grid-cols-6 gap-2">
              {sidebarColors.map((color) => (
                <motion.button
                  key={color.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSidebarColor(color.name)}
                  className={cn(
                    "group relative flex flex-col items-center rounded-lg border-2 p-2 hover:border-primary",
                    sidebarColor === color.name
                      ? "border-primary"
                      : "border-transparent"
                  )}
                >
                  <div
                    className={cn(
                      "mb-1.5 h-8 w-full rounded-md",
                      color.background,
                      color.border
                    )}
                  />
                  <span className="text-[10px] font-medium">{color.label}</span>
                  {sidebarColor === color.name && (
                    <motion.div
                      layoutId="activeColor"
                      className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm"
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
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
