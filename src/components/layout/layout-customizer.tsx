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
            className="h-14 w-14 rounded-full bg-gradient-to-br from-primary/90 to-primary shadow-lg shadow-primary/20 backdrop-blur-sm"
          >
            <motion.div
              className="relative h-6 w-6"
              animate={{ rotate: 180 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Icon icon="solar:settings-bold-duotone" className="h-6 w-6" />
            </motion.div>
            <span className="sr-only">Open Customizer</span>
          </Button>
        </motion.div>
      </SheetTrigger>
      <SheetContent 
        className="w-[400px] border-l bg-gradient-to-b from-background/95 to-background/98 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        side="right"
      >
        <SheetHeader className="space-y-1 pb-6">
          <SheetTitle className="text-2xl font-semibold tracking-tight">Customize</SheetTitle>
          <SheetDescription className="text-sm text-muted-foreground">
            Personalize your experience with custom layout and styling options.
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-8">
          {/* Layout Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Layout Style</h4>
              <Icon icon="solar:layout-left-2-bold-duotone" className="h-5 w-5 text-muted-foreground" />
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-2 gap-4">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={toggleLayout}
                className={cn(
                  "group relative aspect-[1.2] overflow-hidden rounded-xl border-2 bg-gradient-to-br from-background to-muted/50 p-2 hover:border-primary/50",
                  isVerticalLayout ? "border-primary shadow-sm shadow-primary/20" : "border-muted"
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 left-2 text-xs font-medium">Vertical</div>
                <div className="flex h-full">
                  <div className="h-full w-[30%] rounded-lg bg-muted shadow-sm" />
                  <div className="flex-1 flex flex-col gap-1 p-1">
                    <div className="h-2 w-[80%] rounded-full bg-muted" />
                    <div className="h-2 w-[60%] rounded-full bg-muted" />
                  </div>
                </div>
                {isVerticalLayout && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm"
                  >
                    <Icon icon="solar:check-circle-bold-duotone" className="h-3 w-3" />
                  </motion.div>
                )}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={toggleLayout}
                className={cn(
                  "group relative aspect-[1.2] overflow-hidden rounded-xl border-2 bg-gradient-to-br from-background to-muted/50 p-2 hover:border-primary/50",
                  !isVerticalLayout ? "border-primary shadow-sm shadow-primary/20" : "border-muted"
                )}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="absolute bottom-2 left-2 text-xs font-medium">Horizontal</div>
                <div className="flex h-full flex-col">
                  <div className="h-[30%] w-full rounded-lg bg-muted shadow-sm" />
                  <div className="flex-1 p-1">
                    <div className="h-2 w-[80%] rounded-full bg-muted" />
                  </div>
                </div>
                {!isVerticalLayout && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-sm"
                  >
                    <Icon icon="solar:check-circle-bold-duotone" className="h-3 w-3" />
                  </motion.div>
                )}
              </motion.button>
            </div>
          </div>

          {/* Theme Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Theme Mode</h4>
              <Icon icon="solar:sun-bold-duotone" className="h-5 w-5 text-muted-foreground" />
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-3 gap-2">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                onClick={() => setTheme("light")}
                className="relative group h-20 hover:border-primary/50"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-md" />
                <div className="flex flex-col items-center gap-2">
                  <Icon icon="solar:sun-bold-duotone" className="h-6 w-6" />
                  <span className="text-xs">Light</span>
                </div>
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                onClick={() => setTheme("dark")}
                className="relative group h-20 hover:border-primary/50"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-md" />
                <div className="flex flex-col items-center gap-2">
                  <Icon icon="solar:moon-bold-duotone" className="h-6 w-6" />
                  <span className="text-xs">Dark</span>
                </div>
              </Button>
              <Button
                variant={theme === "system" ? "default" : "outline"}
                onClick={() => setTheme("system")}
                className="relative group h-20 hover:border-primary/50"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-md" />
                <div className="flex flex-col items-center gap-2">
                  <Icon icon="solar:monitor-smartphone-bold-duotone" className="h-6 w-6" />
                  <span className="text-xs">System</span>
                </div>
              </Button>
            </div>
          </div>

          {/* Radius Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Border Radius</h4>
              <Icon icon="solar:shapes-bold-duotone" className="h-5 w-5 text-muted-foreground" />
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-5 gap-3">
              {[
                { value: "none", label: "Square", class: "rounded-none" },
                { value: "sm", label: "Small", class: "rounded-sm" },
                { value: "md", label: "Medium", class: "rounded-md" },
                { value: "lg", label: "Large", class: "rounded-lg" },
                { value: "full", label: "Full", class: "rounded-full" },
              ].map((item) => (
                <motion.div
                  key={item.value}
                  className="flex flex-col items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant={radius === item.value ? "default" : "outline"}
                    onClick={() => setRadius(item.value)}
                    className="h-10 w-10 p-0 hover:border-primary/50"
                  >
                    <div className={cn("h-5 w-5 border-2", item.class)} />
                  </Button>
                  <span className="text-xs text-muted-foreground">{item.label}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Color Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Accent Color</h4>
              <Icon icon="solar:palette-bold-duotone" className="h-5 w-5 text-muted-foreground" />
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-2 gap-3">
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
                    onClick={() => setSelectedColor(theme.name)}
                    className={cn(
                      "relative w-full justify-start gap-2 hover:border-primary/50",
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
                    <span className="text-sm">{theme.label}</span>
                    {selectedColor === theme.name && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 300,
                          damping: 20,
                        }}
                        className="absolute right-2"
                      >
                        <Icon icon="solar:check-circle-bold-duotone" className="h-4 w-4 text-primary" />
                      </motion.div>
                    )}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar Color Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-sm font-medium">Sidebar Theme</h4>
              <Icon icon="solar:sidebar-minimalistic-bold-duotone" className="h-5 w-5 text-muted-foreground" />
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-3 gap-3">
              {sidebarColors.map((color) => (
                <motion.button
                  key={color.name}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSidebarColor(color.name)}
                  className={cn(
                    "group relative flex flex-col items-center rounded-xl border-2 p-2 hover:border-primary/50",
                    sidebarColor === color.name
                      ? "border-primary shadow-sm shadow-primary/20"
                      : "border-muted"
                  )}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                  <div
                    className={cn(
                      "mb-2 h-12 w-full rounded-lg",
                      color.background,
                      color.border
                    )}
                  />
                  <span className="text-xs font-medium">{color.label}</span>
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
