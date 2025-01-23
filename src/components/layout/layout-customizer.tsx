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

const radiusOptions = [
  { value: "none", label: "Square" },
  { value: "sm", label: "Small" },
  { value: "md", label: "Medium" },
  { value: "lg", label: "Large" },
  { value: "full", label: "Full" },
] as const;

export function Customizer() {
  const { theme, setTheme } = useTheme();
  const { isVerticalLayout, toggleLayout, radius, setRadius } =
    useLayoutStore();
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
            <div className="flex flex-wrap gap-2">
              {["light", "dark", "system"].map((t) => (
                <motion.div
                  key={t}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant={theme === t ? "default" : "outline"}
                    size="sm"
                    onClick={() => setTheme(t)}
                  >
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </Button>
                </motion.div>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium leading-none">Radius</h4>
            <div className="flex flex-wrap gap-2">
              {radiusOptions.map((option) => (
                <motion.div
                  key={option.value}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Button
                    variant={radius === option.value ? "default" : "outline"}
                    size="sm"
                    onClick={() => setRadius(option.value)}
                    className="flex items-center gap-2"
                  >
                    <div className="relative flex h-4 w-4 items-center justify-center">
                      <div
                        className={`absolute inset-0 border-2 border-primary bg-primary/20 ${
                          option.value === "none"
                            ? ""
                            : option.value === "sm"
                              ? "rounded"
                              : option.value === "md"
                                ? "rounded-md"
                                : option.value === "lg"
                                  ? "rounded-lg"
                                  : "rounded-full"
                        }`}
                      />
                    </div>
                    {option.label}
                    {radius === option.value && (
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
