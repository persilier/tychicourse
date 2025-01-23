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
import { Check, LayoutPanelLeft, Layout, Settings } from "lucide-react";
import { useTheme } from "next-themes";

export function Customizer() {
  const { theme, setTheme } = useTheme();
  const { isVerticalLayout, toggleLayout } = useLayoutStore();
  const { selectedColor, setSelectedColor } = useThemeStore();

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="fixed bottom-4 right-4 h-10 w-10 rounded-full"
        >
          <Settings className="h-5 w-5" />
          <span className="sr-only">Open Customizer</span>
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Customize</SheetTitle>
          <SheetDescription>
            Make changes to your dashboard appearance here.
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <h4 className="text-sm font-medium leading-none">Layout</h4>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={isVerticalLayout ? "default" : "outline"}
                size="sm"
                onClick={toggleLayout}
                className="flex items-center gap-2"
              >
                <LayoutPanelLeft className="h-4 w-4" />
                Vertical
              </Button>
              <Button
                variant={!isVerticalLayout ? "default" : "outline"}
                size="sm"
                onClick={toggleLayout}
                className="flex items-center gap-2"
              >
                <Layout className="h-4 w-4" />
                Horizontal
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium leading-none">Theme</h4>
            <div className="flex flex-wrap gap-2">
              <Button
                variant={theme === "light" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("light")}
              >
                Light
              </Button>
              <Button
                variant={theme === "dark" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("dark")}
              >
                Dark
              </Button>
              <Button
                variant={theme === "system" ? "default" : "outline"}
                size="sm"
                onClick={() => setTheme("system")}
              >
                System
              </Button>
            </div>
          </div>
          <div className="space-y-2">
            <h4 className="text-sm font-medium leading-none">Color</h4>
            <div className="flex flex-wrap gap-2">
              {themes.map((theme) => (
                <Button
                  key={theme.name}
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedColor(theme.name)}
                  className="flex items-center gap-2 pr-2"
                >
                  <div
                    className="h-4 w-4 rounded-full"
                    style={{
                      backgroundColor: `hsl(${theme.activeColor})`,
                    }}
                  />
                  {theme.label}
                  {selectedColor === theme.name && (
                    <Check className="ml-auto h-4 w-4 shrink-0" />
                  )}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
