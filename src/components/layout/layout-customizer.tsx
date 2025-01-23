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
import { themes, useThemeStore } from "@/store/theme-store";
import { motion } from "framer-motion";
import { Check, LayoutPanelLeft, Layout, Settings } from "lucide-react";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react";

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
  const { selectedColor, setSelectedColor } = useThemeStore();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            variant="outline"
            size="icon"
            className="fixed bottom-4 right-4 h-10 w-10 rounded-full"
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
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Customize</SheetTitle>
          <SheetDescription>
            Make changes to your dashboard appearance here.
          </SheetDescription>
        </SheetHeader>
        <motion.div
          className="grid gap-4 py-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="space-y-2">
            <h4 className="text-sm font-medium leading-none">Layout</h4>
            <div className="flex flex-wrap gap-2">
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant={isVerticalLayout ? "default" : "outline"}
                  size="sm"
                  onClick={toggleLayout}
                  className="flex items-center gap-2"
                >
                  <LayoutPanelLeft className="h-4 w-4" />
                  Vertical
                </Button>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button
                  variant={!isVerticalLayout ? "default" : "outline"}
                  size="sm"
                  onClick={toggleLayout}
                  className="flex items-center gap-2"
                >
                  <Layout className="h-4 w-4" />
                  Horizontal
                </Button>
              </motion.div>
            </div>
          </div>
          <div className="space-y-2">
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
          <div className="space-y-2">
            <h4 className="text-sm font-medium leading-none">Radius</h4>
            <div className="grid grid-cols-5 gap-2">
              <Button
                variant={radius === "none" ? "default" : "outline"}
                onClick={() => setRadius("none")}
                className="h-8 w-8 p-0"
              >
                <div className="h-4 w-4 rounded-none border-2" />
              </Button>
              <Button
                variant={radius === "sm" ? "default" : "outline"}
                onClick={() => setRadius("sm")}
                className="h-8 w-8 p-0"
              >
                <div className="h-4 w-4 rounded-sm border-2" />
              </Button>
              <Button
                variant={radius === "md" ? "default" : "outline"}
                onClick={() => setRadius("md")}
                className="h-8 w-8 p-0"
              >
                <div className="h-4 w-4 rounded-md border-2" />
              </Button>
              <Button
                variant={radius === "lg" ? "default" : "outline"}
                onClick={() => setRadius("lg")}
                className="h-8 w-8 p-0"
              >
                <div className="h-4 w-4 rounded-lg border-2" />
              </Button>
              <Button
                variant={radius === "full" ? "default" : "outline"}
                onClick={() => setRadius("full")}
                className="h-8 w-8 p-0"
              >
                <div className="h-4 w-4 rounded-full border-2" />
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium leading-none">Sidebar</h4>
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant={sidebarVariant === "default" ? "default" : "outline"}
                onClick={() => setSidebarVariant("default")}
                className="justify-start"
              >
                <Icon icon="heroicons:squares-2x2" className="mr-2 h-4 w-4" />
                Default
              </Button>
              <Button
                variant={sidebarVariant === "floating" ? "default" : "outline"}
                onClick={() => setSidebarVariant("floating")}
                className="justify-start"
              >
                <Icon icon="heroicons:window" className="mr-2 h-4 w-4" />
                Floating
              </Button>
            </div>
          </div>
          <div className="space-y-2">
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
        </motion.div>
      </SheetContent>
    </Sheet>
  );
}
