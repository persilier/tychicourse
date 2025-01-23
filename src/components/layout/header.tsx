"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Icon } from "@iconify/react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface UserNavProps {
  user?: {
    name: string;
    email: string;
    image: string;
  };
}

function UserNav({
  user = {
    name: "John Doe",
    email: "john@example.com",
    image: "https://github.com/shadcn.png",
  },
}: UserNavProps) {
  const router = useRouter();
  const { theme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-9 w-9 rounded-full border border-border/40 transition-all hover:scale-105 hover:border-border/80"
          aria-label="User menu"
        >
          <Avatar className="h-9 w-9">
            <AvatarImage src={user.image} alt={user.name} />
            <AvatarFallback>
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <motion.div
            className="absolute -bottom-1 -right-1 flex h-3 w-3 items-center justify-center"
            initial={false}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <motion.div
              className="absolute inline-flex h-full w-full rounded-full bg-green-500 opacity-75"
              animate={{
                scale: [1, 2],
                opacity: [0.5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeOut",
              }}
            />
            <motion.div className="inline-flex h-full w-full rounded-full bg-green-500 border-2 border-background" />
          </motion.div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[280px] p-2" sideOffset={8}>
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{
            type: "spring",
            stiffness: 350,
            damping: 25,
          }}
        >
          <DropdownMenuLabel className="font-normal">
            <div className="flex items-start gap-3 pb-2">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Avatar className="h-12 w-12 border-2 border-border transition-all duration-300 hover:border-primary">
                  <AvatarImage src={user.image} alt={user.name} />
                  <AvatarFallback>
                    {user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
              </motion.div>
              <div className="flex flex-col space-y-1">
                <motion.div layout>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-medium leading-none">
                      {user.name}
                    </p>
                    <Badge variant="secondary" className="font-normal">
                      Pro
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                  <div className="flex items-center gap-2">
                    <motion.div
                      className="h-2 w-2 rounded-full bg-green-500"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                    />
                    <span className="text-xs text-muted-foreground">
                      Online
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="-mx-2 my-2" />
          <motion.div layout>
            {[
              { icon: "heroicons:users", label: "Public Profile" },
              { icon: "heroicons:user", label: "My Profile" },
              { icon: "heroicons:cog-6-tooth", label: "My Account" },
              { icon: "heroicons:code-bracket-square", label: "Dev Forum" },
            ].map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  delay: index * 0.05,
                  type: "spring",
                  stiffness: 350,
                  damping: 25,
                }}
              >
                <DropdownMenuItem className="group relative cursor-pointer">
                  <div className="absolute right-0 h-full w-1 origin-right scale-y-0 bg-primary transition-transform group-hover:scale-y-100" />
                  <motion.div
                    className="flex items-center gap-2 pr-2"
                    whileHover={{ x: -4 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  >
                    <Icon
                      icon={item.icon}
                      className="h-4 w-4 transition-transform group-hover:scale-110"
                    />
                    <span>{item.label}</span>
                  </motion.div>
                </DropdownMenuItem>
              </motion.div>
            ))}
          </motion.div>
          <DropdownMenuSeparator className="-mx-2 my-2" />
          <motion.div layout>
            <DropdownMenuItem className="group relative cursor-pointer">
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ x: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Icon
                  icon="heroicons:globe-alt"
                  className="mr-2 h-4 w-4 transition-transform group-hover:scale-110"
                />
                Language
                <div className="ml-auto flex items-center gap-2 text-muted-foreground">
                  <span className="text-xs">English</span>
                  <Icon
                    icon="heroicons:flag-united-states"
                    className="h-4 w-4 transition-transform group-hover:scale-110"
                  />
                </div>
              </motion.div>
            </DropdownMenuItem>
            <DropdownMenuItem className="group relative cursor-pointer">
              <motion.div
                className="flex items-center gap-2"
                whileHover={{ x: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
              >
                <Icon
                  icon={theme === "light" ? "heroicons:moon" : "heroicons:sun"}
                  className="mr-2 h-4 w-4 transition-transform group-hover:scale-110"
                />
                Dark Mode
                <div
                  className="ml-auto flex h-4 w-8 items-center rounded-full bg-muted p-1 transition-colors group-hover:bg-muted/80"
                  role="switch"
                >
                  <motion.div
                    className={cn(
                      "h-3 w-3 rounded-full bg-foreground",
                      theme === "dark" && "translate-x-[100%]"
                    )}
                    layout
                    transition={{ type: "spring", stiffness: 200, damping: 10 }}
                  />
                </div>
              </motion.div>
            </DropdownMenuItem>
          </motion.div>
          <DropdownMenuSeparator className="-mx-2 my-2" />
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.2,
              type: "spring",
              stiffness: 350,
              damping: 25,
            }}
          >
            <DropdownMenuItem className="group relative cursor-pointer text-red-600 focus:bg-red-50 focus:text-red-600 dark:focus:bg-red-950">
              <div className="absolute right-0 h-full w-1 origin-right scale-y-0 bg-red-600 transition-transform group-hover:scale-y-100" />
              <motion.div
                whileHover={{ x: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 20 }}
                className="flex items-center gap-2 pr-2"
              >
                <Icon
                  icon="heroicons:power"
                  className="h-4 w-4 transition-transform group-hover:scale-110"
                />
                Logout
              </motion.div>
            </DropdownMenuItem>
          </motion.div>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface NotificationItem {
  id: string;
  avatar: string;
  author: string;
  action: string;
  target: string;
  time: string;
  project?: string;
  tags?: string[];
  unread?: boolean;
}

function NotificationDropdown() {
  const [activeTab, setActiveTab] = useState("all");
  const [notifications, setNotifications] = useState<NotificationItem[]>([
    {
      id: "1",
      avatar: "https://github.com/shadcn.png",
      author: "Joe Lincoln",
      action: "mentioned you in",
      target: "Latest Trends",
      time: "18 mins ago",
      project: "Web Design 2024",
      unread: true,
    },
    {
      id: "2",
      avatar: "https://github.com/shadcn.png",
      author: "Leslie Alexander",
      action: "added new tags to",
      target: "Web Redesign 2024",
      time: "53 mins ago",
      project: "ACME",
      tags: ["Client-Request", "Figma", "Redesign"],
      unread: true,
    },
    {
      id: "3",
      avatar: "https://github.com/shadcn.png",
      author: "Guy Hawkins",
      action: "requested access to",
      target: "AirSpace",
      time: "14 hours ago",
      project: "Dev Team",
      unread: true,
    },
  ]);

  const unreadCount = notifications.filter((n) => n.unread).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, unread: false } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="relative"
          aria-label="Notifications"
        >
          <motion.div
            initial={false}
            animate={unreadCount > 0 ? { scale: [1, 1.2, 1] } : {}}
            transition={{ duration: 0.2 }}
          >
            <Icon icon="heroicons:bell" className="h-5 w-5" />
          </motion.div>
          {unreadCount > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 400,
                damping: 15,
              }}
            >
              <Badge
                variant="secondary"
                className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs font-normal"
              >
                {unreadCount}
              </Badge>
            </motion.div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[440px] p-0">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="flex items-center justify-between border-b px-4 py-3">
            <h4 className="font-semibold">Notifications</h4>
            <div className="flex items-center gap-2">
              <HoverCard openDelay={200}>
                <HoverCardTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={markAllAsRead}
                  >
                    <Icon icon="heroicons:check-circle" className="h-4 w-4" />
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent side="bottom" align="end" className="w-40">
                  <p className="text-xs">Mark all as read</p>
                </HoverCardContent>
              </HoverCard>
              <HoverCard openDelay={200}>
                <HoverCardTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Icon icon="heroicons:cog-6-tooth" className="h-4 w-4" />
                  </Button>
                </HoverCardTrigger>
                <HoverCardContent side="bottom" align="end" className="w-40">
                  <p className="text-xs">Notification settings</p>
                </HoverCardContent>
              </HoverCard>
            </div>
          </div>
          <Tabs
            defaultValue="all"
            className="w-full"
            onValueChange={setActiveTab}
          >
            <motion.div layout className="border-b px-4 py-2">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="all" className="text-xs">
                  All
                </TabsTrigger>
                <TabsTrigger value="inbox" className="text-xs">
                  Inbox
                </TabsTrigger>
                <TabsTrigger value="team" className="text-xs">
                  Team
                </TabsTrigger>
                <TabsTrigger value="following" className="text-xs">
                  Following
                </TabsTrigger>
              </TabsList>
            </motion.div>
            <TabsContent value="all" className="py-2">
              <motion.div layout>
                {notifications.length > 0 ? (
                  <>
                    {notifications.map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className={cn(
                          "group relative flex items-start gap-3 px-4 py-3 hover:bg-muted/50",
                          notification.unread && "bg-muted/30"
                        )}
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={notification.avatar} />
                          <AvatarFallback>
                            {notification.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-1">
                          <p className="text-sm">
                            <span className="font-medium">
                              {notification.author}
                            </span>{" "}
                            {notification.action}{" "}
                            <span className="font-medium text-primary">
                              {notification.target}
                            </span>{" "}
                            {notification.project && (
                              <span className="text-muted-foreground">
                                • {notification.project}
                              </span>
                            )}
                          </p>
                          {notification.tags && (
                            <div className="flex flex-wrap gap-1">
                              {notification.tags.map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="secondary"
                                  className="font-normal"
                                >
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                          )}
                          <p className="text-xs text-muted-foreground">
                            {notification.time}
                          </p>
                        </div>
                        <motion.div
                          initial={{ opacity: 0 }}
                          whileHover={{ opacity: 1 }}
                          className="absolute right-4 top-3 flex items-center gap-1"
                        >
                          {notification.unread && (
                            <motion.div
                              layoutId={`unread-${notification.id}`}
                              className="h-2 w-2 rounded-full bg-primary"
                            />
                          )}
                          <div className="flex opacity-0 group-hover:opacity-100 transition-opacity">
                            <HoverCard openDelay={200}>
                              <HoverCardTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6"
                                  onClick={() => markAsRead(notification.id)}
                                >
                                  <Icon
                                    icon="heroicons:check"
                                    className="h-3 w-3"
                                  />
                                  <span className="sr-only">Mark as read</span>
                                </Button>
                              </HoverCardTrigger>
                              <HoverCardContent
                                side="left"
                                align="center"
                                className="w-32 p-2 text-center"
                              >
                                <p className="text-xs font-medium">
                                  Mark as read
                                </p>
                                <p className="text-[10px] text-muted-foreground">
                                  Click to mark this notification as read
                                </p>
                              </HoverCardContent>
                            </HoverCard>
                            <HoverCard openDelay={200}>
                              <HoverCardTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  className="h-6 w-6 text-red-600 hover:text-red-700"
                                  onClick={() =>
                                    removeNotification(notification.id)
                                  }
                                >
                                  <Icon
                                    icon="heroicons:x-mark"
                                    className="h-3 w-3"
                                  />
                                  <span className="sr-only">
                                    Remove notification
                                  </span>
                                </Button>
                              </HoverCardTrigger>
                              <HoverCardContent
                                side="left"
                                align="center"
                                className="w-32 p-2 text-center"
                              >
                                <p className="text-xs font-medium">Remove</p>
                                <p className="text-[10px] text-muted-foreground">
                                  Remove this notification
                                </p>
                              </HoverCardContent>
                            </HoverCard>
                          </div>
                        </motion.div>
                      </motion.div>
                    ))}
                    <div className="mt-2 border-t px-4 py-3">
                      <div className="flex items-center justify-between gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={markAllAsRead}
                        >
                          <Icon
                            icon="heroicons:check"
                            className="mr-2 h-4 w-4"
                          />
                          Mark all as read
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="w-full"
                          onClick={() => setNotifications([])}
                        >
                          <Icon
                            icon="heroicons:archive-box"
                            className="mr-2 h-4 w-4"
                          />
                          Archive all
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
                    No notifications
                  </div>
                )}
              </motion.div>
            </TabsContent>
            <TabsContent value="inbox" className="p-4">
              <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
                No inbox notifications
              </div>
            </TabsContent>
            <TabsContent value="team" className="p-4">
              <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
                No team notifications
              </div>
            </TabsContent>
            <TabsContent value="following" className="p-4">
              <div className="flex h-32 items-center justify-center text-sm text-muted-foreground">
                No following notifications
              </div>
            </TabsContent>
          </Tabs>
        </motion.div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function Header() {
  const router = useRouter();
  const { theme, setTheme } = useTheme();
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
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center gap-4">
          <div className="flex flex-1 items-center gap-4">
            <Button
              variant="outline"
              className="relative h-9 w-9 md:w-64 lg:w-96 justify-start text-sm text-muted-foreground"
              onClick={() => setOpen(true)}
            >
              <Icon
                icon="heroicons:magnifying-glass"
                className="mr-2 h-4 w-4 shrink-0"
              />
              <span className="hidden md:inline-flex">Search anything...</span>
              <kbd className="pointer-events-none absolute right-1.5 top-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 md:flex">
                <span className="text-xs">⌘</span>K
              </kbd>
            </Button>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <NotificationDropdown />

              <Button
                variant="ghost"
                size="icon"
                className="relative"
                aria-label="Messages"
              >
                <Icon
                  icon="heroicons:chat-bubble-left-right"
                  className="h-5 w-5"
                />
                <Badge
                  variant="secondary"
                  className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 text-xs font-normal"
                >
                  5
                </Badge>
              </Button>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                className="hover:bg-accent/50"
                aria-label="Toggle theme"
              >
                <Icon
                  icon={theme === "light" ? "heroicons:moon" : "heroicons:sun"}
                  className="h-5 w-5"
                />
              </Button>
            </div>

            <UserNav />
          </div>
        </div>
      </header>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            <CommandItem
              onSelect={() => runCommand(() => router.push("/dashboard"))}
            >
              <Icon icon="heroicons:home" className="mr-2 h-4 w-4" />
              <span>Dashboard</span>
              <CommandShortcut>⌘H</CommandShortcut>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                runCommand(() => router.push("/dashboard/analytics"))
              }
            >
              <Icon icon="heroicons:chart-bar" className="mr-2 h-4 w-4" />
              <span>Analytics</span>
              <CommandShortcut>⌘A</CommandShortcut>
            </CommandItem>
            <CommandItem
              onSelect={() => runCommand(() => router.push("/dashboard/users"))}
            >
              <Icon icon="heroicons:users" className="mr-2 h-4 w-4" />
              <span>Users</span>
              <CommandShortcut>⌘U</CommandShortcut>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem
              onSelect={() =>
                runCommand(() => router.push("/dashboard/settings"))
              }
            >
              <Icon icon="heroicons:cog-6-tooth" className="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
            <CommandItem
              onSelect={() =>
                runCommand(() => setTheme(theme === "light" ? "dark" : "light"))
              }
            >
              <Icon
                icon={theme === "light" ? "heroicons:moon" : "heroicons:sun"}
                className="mr-2 h-4 w-4"
              />
              <span>Toggle Theme</span>
              <CommandShortcut>⌘T</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
