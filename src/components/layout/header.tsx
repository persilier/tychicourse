"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Icon } from "@iconify/react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function Header() {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = (command: () => void) => {
    setOpen(false);
    command();
  };

  return (
    <>
      <header className="sticky top-0 z-50 flex h-[64px] w-full items-center border-b bg-background px-4">
        <div className="flex flex-1 items-center justify-between">
          {/* Left section */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="md:hidden">
              <Icon icon="heroicons:bars-3" className="h-5 w-5" />
            </Button>
            <Button
              variant="outline"
              className="relative hidden h-9 w-9 md:flex md:w-64 lg:w-96"
              onClick={() => setOpen(true)}
            >
              <Icon
                icon="heroicons:magnifying-glass"
                className="mr-2 h-4 w-4 shrink-0 opacity-50"
              />
              <span className="hidden lg:inline-flex">Search...</span>
              <span className="inline-flex lg:hidden">Search</span>
              <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 md:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-2">
            <motion.div className="flex items-center gap-2" initial={false}>
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative">
                <Icon icon="heroicons:bell" className="h-5 w-5" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
              </Button>

              {/* Messages */}
              <Button variant="ghost" size="icon" className="relative">
                <Icon
                  icon="heroicons:chat-bubble-left-right"
                  className="h-5 w-5"
                />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-destructive" />
              </Button>

              {/* User profile */}
              <Button variant="ghost" className="gap-2">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                    <Icon icon="heroicons:user" className="h-5 w-5" />
                  </div>
                  <div className="hidden flex-col items-start text-left md:flex">
                    <span className="text-sm font-medium">Admin</span>
                    <span className="text-xs text-muted-foreground">
                      admin@example.com
                    </span>
                  </div>
                  <Icon icon="heroicons:chevron-down" className="h-4 w-4" />
                </div>
              </Button>

              {/* Settings */}
              <Button variant="ghost" size="icon">
                <Icon icon="heroicons:cog-6-tooth" className="h-5 w-5" />
              </Button>
            </motion.div>
          </div>
        </div>
      </header>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem
              onSelect={() => runCommand(() => router.push("/dashboard"))}
            >
              <Icon icon="heroicons:home" className="mr-2 h-4 w-4" />
              Dashboard
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/dashboard/users"))}
            >
              <Icon icon="heroicons:users" className="mr-2 h-4 w-4" />
              Users
            </CommandItem>
            <CommandItem
              onSelect={() =>
                runCommand(() => router.push("/dashboard/settings"))
              }
            >
              <Icon icon="heroicons:cog-6-tooth" className="mr-2 h-4 w-4" />
              Settings
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
