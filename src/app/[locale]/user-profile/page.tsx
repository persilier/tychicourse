"use client";

import { users } from "@/data/users";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Icon } from "@iconify/react";
import { format } from "date-fns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileHeader } from "@/components/user/profile-header";
import { Badge } from "@/components/ui/badge";

// Using the first user as an example
const user = users[0];

export default function UserProfile() {
  return (
    <div className="space-y-8">
      <ProfileHeader />

      <div className="container">
        <Tabs
          defaultValue="overview"
          className="space-y-6"
        >
          <div className="sticky top-0 z-10 -mx-6 mb-4 bg-background/95 px-6 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
              <TabsTrigger
                value="overview"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                <Icon icon="solar:user-id-bold-duotone" className="mr-2 h-4 w-4" />
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="activity"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                <Icon icon="solar:clock-circle-bold-duotone" className="mr-2 h-4 w-4" />
                Activity
              </TabsTrigger>
              <TabsTrigger
                value="security"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm"
              >
                <Icon icon="solar:shield-keyhole-bold-duotone" className="mr-2 h-4 w-4" />
                Security
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="overview" className="space-y-6">
            {/* Personal Information */}
            <Card className="group overflow-hidden border-none bg-gradient-to-br from-purple-500/5 to-pink-500/5 shadow-xl transition-all hover:shadow-2xl">
              <CardHeader className="border-b border-border/5 bg-gradient-to-b from-muted/50 to-muted/0">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <div className="rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-2">
                    <Icon icon="solar:user-id-bold-duotone" className="h-5 w-5 text-white" />
                  </div>
                  Personal Information
                </CardTitle>
                <CardDescription>
                  View and manage your personal information.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="group space-y-2 rounded-xl bg-muted/50 p-4 transition-all hover:bg-muted">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Icon icon="solar:user-bold-duotone" className="h-4 w-4 text-purple-500" />
                      First Name
                    </div>
                    <p className="text-base font-medium">{user.firstName}</p>
                  </div>
                  <div className="group space-y-2 rounded-xl bg-muted/50 p-4 transition-all hover:bg-muted">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Icon icon="solar:user-bold-duotone" className="h-4 w-4 text-pink-500" />
                      Last Name
                    </div>
                    <p className="text-base font-medium">{user.lastName}</p>
                  </div>
                  <div className="group space-y-2 rounded-xl bg-muted/50 p-4 transition-all hover:bg-muted">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Icon icon="solar:letter-bold-duotone" className="h-4 w-4 text-purple-500" />
                      Email
                    </div>
                    <p className="text-base font-medium">{user.email}</p>
                  </div>
                  <div className="group space-y-2 rounded-xl bg-muted/50 p-4 transition-all hover:bg-muted">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Icon icon="solar:crown-bold-duotone" className="h-4 w-4 text-pink-500" />
                      Role
                    </div>
                    <p className="text-base font-medium capitalize">{user.role}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Information */}
            <Card className="group overflow-hidden border-none bg-gradient-to-br from-blue-500/5 to-purple-500/5 shadow-xl transition-all hover:shadow-2xl">
              <CardHeader className="border-b border-border/5 bg-gradient-to-b from-muted/50 to-muted/0">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <div className="rounded-lg bg-gradient-to-br from-blue-500 to-purple-500 p-2">
                    <Icon icon="solar:user-circle-bold-duotone" className="h-5 w-5 text-white" />
                  </div>
                  Account Information
                </CardTitle>
                <CardDescription>
                  View your account status and activity.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="group space-y-2 rounded-xl bg-muted/50 p-4 transition-all hover:bg-muted">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Icon icon="solar:shield-check-bold-duotone" className="h-4 w-4 text-blue-500" />
                      Account Status
                    </div>
                    <div className="flex items-center gap-2">
                      <p className="text-base font-medium capitalize">{user.status}</p>
                      <Badge variant="secondary" className="bg-green-500/10 text-green-500">Active</Badge>
                    </div>
                  </div>
                  <div className="group space-y-2 rounded-xl bg-muted/50 p-4 transition-all hover:bg-muted">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Icon icon="solar:calendar-bold-duotone" className="h-4 w-4 text-purple-500" />
                      Member Since
                    </div>
                    <p className="text-base font-medium">
                      {format(new Date(user.createdAt), "MMMM d, yyyy")}
                    </p>
                  </div>
                  <div className="group space-y-2 rounded-xl bg-muted/50 p-4 transition-all hover:bg-muted">
                    <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                      <Icon icon="solar:clock-circle-bold-duotone" className="h-4 w-4 text-blue-500" />
                      Last Login
                    </div>
                    <p className="text-base font-medium">
                      {user.lastLogin
                        ? format(new Date(user.lastLogin), "MMMM d, yyyy")
                        : "Never"}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="activity" className="space-y-6">
            <Card className="group overflow-hidden border-none bg-gradient-to-br from-emerald-500/5 to-blue-500/5 shadow-xl transition-all hover:shadow-2xl">
              <CardHeader className="border-b border-border/5 bg-gradient-to-b from-muted/50 to-muted/0">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <div className="rounded-lg bg-gradient-to-br from-emerald-500 to-blue-500 p-2">
                    <Icon icon="solar:clock-circle-bold-duotone" className="h-5 w-5 text-white" />
                  </div>
                  Recent Activity
                </CardTitle>
                <CardDescription>
                  Your recent actions and system activity.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  {/* Example activities */}
                  <div className="group flex items-start gap-4 rounded-xl bg-muted/50 p-4 transition-all hover:bg-muted">
                    <div className="rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 p-2">
                      <Icon
                        icon="solar:login-2-bold-duotone"
                        className="h-5 w-5 text-white"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">Logged in successfully</p>
                        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500">Success</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {user.lastLogin
                          ? format(new Date(user.lastLogin), "MMMM d, yyyy 'at' h:mm a")
                          : "Never"}
                      </p>
                    </div>
                  </div>
                  <div className="group flex items-start gap-4 rounded-xl bg-muted/50 p-4 transition-all hover:bg-muted">
                    <div className="rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 p-2">
                      <Icon
                        icon="solar:shield-keyhole-bold-duotone"
                        className="h-5 w-5 text-white"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">Password changed</p>
                        <Badge variant="secondary" className="bg-blue-500/10 text-blue-500">Security</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {format(
                          new Date(user.createdAt),
                          "MMMM d, yyyy 'at' h:mm a"
                        )}
                      </p>
                    </div>
                  </div>
                  <div className="group flex items-start gap-4 rounded-xl bg-muted/50 p-4 transition-all hover:bg-muted">
                    <div className="rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-2">
                      <Icon
                        icon="solar:user-id-bold-duotone"
                        className="h-5 w-5 text-white"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">Account created</p>
                        <Badge variant="secondary" className="bg-purple-500/10 text-purple-500">New Account</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {format(
                          new Date(user.createdAt),
                          "MMMM d, yyyy 'at' h:mm a"
                        )}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="group overflow-hidden border-none bg-gradient-to-br from-orange-500/5 to-red-500/5 shadow-xl transition-all hover:shadow-2xl">
              <CardHeader className="border-b border-border/5 bg-gradient-to-b from-muted/50 to-muted/0">
                <CardTitle className="flex items-center gap-2 text-xl">
                  <div className="rounded-lg bg-gradient-to-br from-orange-500 to-red-500 p-2">
                    <Icon icon="solar:shield-keyhole-bold-duotone" className="h-5 w-5 text-white" />
                  </div>
                  Security Settings
                </CardTitle>
                <CardDescription>
                  Manage your account security settings.
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="space-y-6">
                  <div className="group rounded-xl bg-muted/50 p-4 transition-all hover:bg-muted">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <Icon icon="solar:lock-password-bold-duotone" className="h-5 w-5 text-orange-500" />
                          <p className="font-medium">Password</p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Last changed 3 months ago
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="group border-primary/20 hover:border-primary/40"
                      >
                        <Icon
                          icon="solar:pen-bold-duotone"
                          className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:scale-110"
                        />
                        Change Password
                      </Button>
                    </div>
                  </div>
                  <div className="group rounded-xl bg-muted/50 p-4 transition-all hover:bg-muted">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <Icon icon="solar:shield-check-bold-duotone" className="h-5 w-5 text-red-500" />
                          <p className="font-medium">Two-Factor Authentication</p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="group border-primary/20 hover:border-primary/40"
                      >
                        <Icon
                          icon="solar:shield-keyhole-bold-duotone"
                          className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:scale-110"
                        />
                        Enable 2FA
                      </Button>
                    </div>
                  </div>
                  <div className="group rounded-xl bg-muted/50 p-4 transition-all hover:bg-muted">
                    <div className="mb-4 flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <Icon icon="solar:devices-bold-duotone" className="h-5 w-5 text-orange-500" />
                          <p className="font-medium">Active Sessions</p>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Manage your active sessions
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="group border-primary/20 hover:border-primary/40"
                      >
                        <Icon
                          icon="solar:devices-bold-duotone"
                          className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:scale-110"
                        />
                        View Sessions
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
