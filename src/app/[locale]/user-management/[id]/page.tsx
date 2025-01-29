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
    <div className="flex flex-col gap-6">
      {/* User Profile Card */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex gap-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={user.avatar || ""} alt={`${user.firstName} ${user.lastName}`} />
                <AvatarFallback className="bg-primary/10">
                  <Icon icon="solar:user-bold-duotone" className="h-8 w-8 text-primary" />
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-2xl">
                  {user.firstName} {user.lastName}
                </CardTitle>
                <CardDescription className="mt-1">{user.email}</CardDescription>
                <div className="mt-2 flex gap-2">
                  <Badge variant="secondary" className={getRoleBadgeColor(user.role)}>
                    {t(`roles.${user.role}`)}
                  </Badge>
                  <Badge variant="secondary" className={getStatusBadgeColor(user.status)}>
                    {t(`statuses.${user.status}`)}
                  </Badge>
                </div>
              </div>
            </div>
            <Button variant="outline" asChild>
              <Link href="/user-management" locale={locale}>
                <Icon icon="solar:arrow-left-bold-duotone" className="mr-2 h-4 w-4" />
                {t("back")}
              </Link>
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Tabs for Activity and Sessions */}
      <Tabs defaultValue="activity" className="w-full">
        <TabsList>
          <TabsTrigger value="activity">
            <Icon icon="solar:clock-circle-bold-duotone" className="mr-2 h-4 w-4" />
            {t("activityLog")}
          </TabsTrigger>
          <TabsTrigger value="sessions">
            <Icon icon="solar:devices-bold-duotone" className="mr-2 h-4 w-4" />
            {t("sessions")}
          </TabsTrigger>
        </TabsList>

        {/* Activity Log */}
        <TabsContent value="activity">
          <Card>
            <CardHeader>
              <CardTitle>{t("activityLog")}</CardTitle>
              <CardDescription>{t("activityLogDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
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
                      <TableCell className="font-medium">
                        {t(`activities.${log.action}`)}
                      </TableCell>
                      <TableCell>{log.details}</TableCell>
                      <TableCell>{log.ip}</TableCell>
                      <TableCell>{format(new Date(log.timestamp), "yyyy-MM-dd HH:mm")}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sessions */}
        <TabsContent value="sessions">
          <Card>
            <CardHeader>
              <CardTitle>{t("sessions")}</CardTitle>
              <CardDescription>{t("sessionsDescription")}</CardDescription>
            </CardHeader>
            <CardContent>
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
                      <TableCell className="font-medium">{session.device}</TableCell>
                      <TableCell>{session.browser}</TableCell>
                      <TableCell>{session.ip}</TableCell>
                      <TableCell>{session.location}</TableCell>
                      <TableCell>{format(new Date(session.lastActive), "yyyy-MM-dd HH:mm")}</TableCell>
                      <TableCell>
                        <Badge
                          variant={session.status === "active" ? "success" : "secondary"}
                        >
                          {t(`sessionStatus.${session.status}`)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {session.status === "active" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-destructive"
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
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
