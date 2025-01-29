"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { format } from "date-fns";
import { Icon } from "@iconify/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { users, User } from "@/data/users";
import { getRoleBadgeColor, getStatusBadgeColor } from "../utils";
import { Link } from "@/config/i18n";
import { cn } from "@/lib/utils";

// Simulated user activity log data
interface ActivityLog {
  id: string;
  action: string;
  timestamp: string;
  details: string;
  ip?: string;
}

// Simulated user session data
interface Session {
  id: string;
  browser: string;
  device: string;
  ip: string;
  location: string;
  lastActive: string;
  status: "active" | "expired";
}

const getActivityIcon = (action: string) => {
  switch (action) {
    case "login":
      return "solar:login-bold-duotone";
    case "course_access":
      return "solar:book-bold-duotone";
    default:
      return "solar:info-bold-duotone";
  }
};

const getActivityColor = (action: string) => {
  switch (action) {
    case "login":
      return "text-success";
    case "course_access":
      return "text-primary";
    default:
      return "text-muted-foreground";
  }
};

const getDeviceIcon = (device: string) => {
  switch (device) {
    case "Windows 11":
      return "solar:windows-bold-duotone";
    case "macOS 14.0":
      return "solar:apple-bold-duotone";
    default:
      return "solar:device-mobile-bold-duotone";
  }
};

export default function UserDetails() {
  const t = useTranslations("UserManagement");
  const params = useParams();
  const locale = useLocale();
  const [user, setUser] = useState<User | null>(null);
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);

  useEffect(() => {
    // Simulate fetching user data
    const userData = users.find((u) => u.id === params.id);
    setUser(userData || null);

    // Simulate fetching activity logs
    setActivityLogs([
      {
        id: "1",
        action: "login",
        timestamp: new Date().toISOString(),
        details: "Logged in successfully",
        ip: "192.168.1.1",
      },
      {
        id: "2",
        action: "course_access",
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        details: "Accessed Introduction to React course",
        ip: "192.168.1.1",
      },
    ]);

    // Simulate fetching sessions
    setSessions([
      {
        id: "1",
        browser: "Chrome 120.0.0",
        device: "Windows 11",
        ip: "192.168.1.1",
        location: "New York, US",
        lastActive: new Date().toISOString(),
        status: "active",
      },
      {
        id: "2",
        browser: "Safari 17.0",
        device: "macOS 14.0",
        ip: "192.168.1.2",
        location: "San Francisco, US",
        lastActive: new Date(Date.now() - 86400000).toISOString(),
        status: "expired",
      },
    ]);
  }, [params.id]);

  if (!user) {
    return (
      <div className="flex h-[200px] items-center justify-center">
        <p className="text-muted-foreground">{t("userNotFound")}</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* User Profile Card */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-grid-white/10" />
        
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/25 to-transparent" />

        {/* Animated Shapes */}
        <div className="absolute -left-4 -top-4 h-64 w-64 animate-blob rounded-full bg-purple-500 opacity-20 mix-blend-multiply blur-xl filter" />
        <div className="absolute -right-4 -top-4 h-64 w-64 animate-blob animation-delay-2000 rounded-full bg-yellow-500 opacity-20 mix-blend-multiply blur-xl filter" />
        <div className="absolute -bottom-8 left-20 h-64 w-64 animate-blob animation-delay-4000 rounded-full bg-pink-500 opacity-20 mix-blend-multiply blur-xl filter" />

        {/* Content */}
        <div className="relative px-6 py-16 sm:px-12">
          <div className="flex flex-col items-center gap-8 text-white md:flex-row md:justify-between">
            <div className="flex flex-col items-center gap-6 md:flex-row">
              {/* Avatar with Ring */}
              <div className="relative">
                <div className="absolute -inset-4 rounded-full bg-white/10 blur-sm" />
                <Avatar className="h-24 w-24 ring-4 ring-white/20">
                  <AvatarImage src={user.avatar || ""} alt={`${user.firstName} ${user.lastName}`} />
                  <AvatarFallback className="bg-white/10 text-2xl">
                    {user.firstName?.[0]?.toUpperCase()}
                    {user.lastName?.[0]?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              
              <div className="text-center md:text-left">
                <h1 className="text-3xl font-bold tracking-tight">
                  {user.firstName} {user.lastName}
                </h1>
                <p className="mt-2 text-lg text-white/80">{user.email}</p>
                <div className="mt-4 flex flex-wrap justify-center gap-2 md:justify-start">
                  <Badge variant="secondary" className={cn("bg-white/10 hover:bg-white/20", getRoleBadgeColor(user.role))}>
                    <Icon icon="solar:medal-ribbons-star-bold-duotone" className="mr-1 h-4 w-4" />
                    {t(`roles.${user.role}`)}
                  </Badge>
                  <Badge variant="secondary" className={cn("bg-white/10 hover:bg-white/20", getStatusBadgeColor(user.status))}>
                    <Icon icon="solar:user-id-bold-duotone" className="mr-1 h-4 w-4" />
                    {t(`statuses.${user.status}`)}
                  </Badge>
                </div>
              </div>
            </div>

            <Button variant="outline" className="bg-white/10 text-white hover:bg-white/20" asChild>
              <Link href="/user-management" locale={locale}>
                <Icon icon="solar:arrow-left-bold-duotone" className="mr-2 h-4 w-4" />
                {t("back")}
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Tabs for Activity and Sessions */}
      <Tabs defaultValue="activity" className="w-full">
        <div className="flex items-center justify-between border-b pb-4">
          <TabsList className="h-9 w-auto items-center justify-start rounded-lg bg-muted p-1">
            <TabsTrigger 
              value="activity" 
              className="relative h-7 rounded-md px-4 text-sm font-medium text-muted-foreground transition-all hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Icon icon="solar:clock-circle-bold-duotone" className="h-4 w-4" />
                <span>{t("activityLog")}</span>
                <Badge variant="secondary" className="ml-1 bg-muted-foreground/20">
                  {activityLogs.length}
                </Badge>
              </div>
            </TabsTrigger>
            <TabsTrigger 
              value="sessions" 
              className="relative h-7 rounded-md px-4 text-sm font-medium text-muted-foreground transition-all hover:text-foreground data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
            >
              <div className="flex items-center gap-2">
                <Icon icon="solar:devices-bold-duotone" className="h-4 w-4" />
                <span>{t("sessions")}</span>
                <Badge variant="secondary" className="ml-1 bg-muted-foreground/20">
                  {sessions.filter(s => s.status === "active").length}
                </Badge>
              </div>
            </TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8">
              <Icon icon="solar:calendar-bold-duotone" className="mr-2 h-4 w-4" />
              {t("timeRange")}
            </Button>
            <Button variant="outline" size="sm" className="h-8">
              <Icon icon="solar:sort-from-bottom-to-top-bold-duotone" className="mr-2 h-4 w-4" />
              {t("sortBy")}
            </Button>
          </div>
        </div>

        <div className="mt-4">
          {/* Activity Log */}
          <TabsContent value="activity">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Icon icon="solar:clock-circle-bold-duotone" className="h-5 w-5 text-primary" />
                      {t("activityLog")}
                    </CardTitle>
                    <CardDescription>{t("activityLogDescription")}</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Icon icon="solar:filter-bold-duotone" className="mr-2 h-4 w-4" />
                    {t("filter")}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t("action")}</TableHead>
                        <TableHead>{t("details")}</TableHead>
                        <TableHead>{t("ip")}</TableHead>
                        <TableHead>{t("timestamp")}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activityLogs.map((log) => (
                        <TableRow key={log.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Icon 
                                icon={getActivityIcon(log.action)} 
                                className={cn("h-4 w-4", getActivityColor(log.action))}
                              />
                              <span className="font-medium">{t(`activities.${log.action}`)}</span>
                            </div>
                          </TableCell>
                          <TableCell>{log.details}</TableCell>
                          <TableCell>
                            <code className="rounded bg-muted px-2 py-1">{log.ip}</code>
                          </TableCell>
                          <TableCell>
                            <time dateTime={log.timestamp} className="text-muted-foreground">
                              {format(new Date(log.timestamp), "PPpp")}
                            </time>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sessions */}
          <TabsContent value="sessions">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Icon icon="solar:devices-bold-duotone" className="h-5 w-5 text-primary" />
                      {t("sessions")}
                    </CardTitle>
                    <CardDescription>{t("sessionsDescription")}</CardDescription>
                  </div>
                  <Button variant="destructive" size="sm">
                    <Icon icon="solar:close-circle-bold-duotone" className="mr-2 h-4 w-4" />
                    {t("terminateAllSessions")}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="rounded-lg border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t("device")}</TableHead>
                        <TableHead>{t("browser")}</TableHead>
                        <TableHead>{t("ip")}</TableHead>
                        <TableHead>{t("location")}</TableHead>
                        <TableHead>{t("lastActive")}</TableHead>
                        <TableHead>{t("status")}</TableHead>
                        <TableHead className="w-[100px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sessions.map((session) => (
                        <TableRow key={session.id}>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Icon 
                                icon={getDeviceIcon(session.device)} 
                                className="h-4 w-4 text-muted-foreground"
                              />
                              <span className="font-medium">{session.device}</span>
                            </div>
                          </TableCell>
                          <TableCell>{session.browser}</TableCell>
                          <TableCell>
                            <code className="rounded bg-muted px-2 py-1">{session.ip}</code>
                          </TableCell>
                          <TableCell>{session.location}</TableCell>
                          <TableCell>
                            <time dateTime={session.lastActive} className="text-muted-foreground">
                              {format(new Date(session.lastActive), "PPpp")}
                            </time>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant={session.status === "active" ? "success" : "secondary"}
                              className="capitalize"
                            >
                              {t(`sessionStatus.${session.status}`)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {session.status === "active" && (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-8 w-8 p-0 hover:bg-destructive/10 hover:text-destructive"
                              >
                                <Icon
                                  icon="solar:close-circle-bold-duotone"
                                  className="h-4 w-4"
                                />
                                <span className="sr-only">{t("terminateSession")}</span>
                              </Button>
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
