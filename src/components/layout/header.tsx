"use client";

import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import {
  Bell,
  Search,
  Menu,
  MessageSquare,
  User,
  Settings,
  ChevronDown,
} from "lucide-react";

export function Header() {
  const { theme, setTheme } = useTheme();

  return (
    <header className="sticky top-0 z-50 flex h-[64px] w-full items-center border-b bg-background px-4">
      <div className="flex flex-1 items-center justify-between">
        {/* Left section */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-5 w-5" />
          </Button>
          <div className="relative hidden md:flex">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              className="h-9 w-[200px] rounded-md border bg-background pl-8 text-sm focus:w-[280px] focus:border-ring focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-2">
          <motion.div className="flex items-center gap-2" initial={false}>
            {/* Notifications */}
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
            </Button>

            {/* Messages */}
            <Button variant="ghost" size="icon" className="relative">
              <MessageSquare className="h-5 w-5" />
              <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
            </Button>

            {/* User profile */}
            <Button variant="ghost" className="gap-2">
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-full bg-primary/10">
                  <User className="h-8 w-8 p-2" />
                </div>
                <div className="hidden flex-col items-start text-left md:flex">
                  <span className="text-sm font-medium">Admin</span>
                  <span className="text-xs text-muted-foreground">
                    admin@example.com
                  </span>
                </div>
                <ChevronDown className="h-4 w-4" />
              </div>
            </Button>

            {/* Settings */}
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </motion.div>
        </div>
      </div>
    </header>
  );
}
