"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SettingsHeader } from "@/components/user/settings-header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AvatarUpload } from "@/components/ui/avatar-upload";
import { Badge } from "@/components/ui/badge";
import { useState, useCallback } from "react";
import { users } from "@/data/users";

// Using demo user data with avatar
const demoUser = {
  id: "1",
  firstName: "John",
  lastName: "Doe",
  email: "john@example.com",
  avatar: "/avatars/default-avatar.jpg",
  role: "user",
  status: "active",
  createdAt: new Date().toISOString(),
  lastLogin: new Date().toISOString(),
};

export default function UserSettings() {
  const [avatar, setAvatar] = useState<string | null>(demoUser.avatar);

  const handleAvatarChange = useCallback((file: File | null) => {
    if (!file) {
      setAvatar(null);
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result as string);
    };
    reader.readAsDataURL(file);
  }, []);

  const handleAvatarRemove = useCallback(() => {
    setAvatar(null);
  }, []);

  return (
    <div className="container space-y-8 py-8">
      <SettingsHeader />

      <Tabs defaultValue="profile" className="space-y-6">
        <TabsList className="inline-flex h-12 items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground">
          <TabsTrigger
            value="profile"
            className="inline-flex items-center justify-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
          >
            <Icon icon="solar:user-id-bold-duotone" className="h-4 w-4" />
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="inline-flex items-center justify-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
          >
            <Icon icon="solar:bell-bold-duotone" className="h-4 w-4" />
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="appearance"
            className="inline-flex items-center justify-center gap-2 rounded-md px-3 py-2.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow"
          >
            <Icon icon="solar:palette-bold-duotone" className="h-4 w-4" />
            Appearance
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-6">
          {/* Profile Settings */}
          <Card className="group overflow-hidden border-none bg-gradient-to-br from-purple-500/5 to-pink-500/5 shadow-xl transition-all hover:shadow-2xl">
            <CardHeader className="border-b border-border/5 bg-gradient-to-b from-muted/50 to-muted/0">
              <CardTitle className="flex items-center gap-2 text-xl">
                <div className="rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-2">
                  <Icon
                    icon="solar:user-id-bold-duotone"
                    className="h-5 w-5 text-white"
                  />
                </div>
                Profile Information
              </CardTitle>
              <CardDescription>
                Update your profile information and manage your account
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8 p-6">
              <div className="flex flex-col gap-8 md:flex-row">
                <div className="flex-1 space-y-4">
                  <div className="grid w-full gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        placeholder="Enter your first name"
                        defaultValue={demoUser.firstName}
                        className="w-full bg-muted/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Enter your last name"
                        defaultValue={demoUser.lastName}
                        className="w-full bg-muted/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Enter your email"
                      defaultValue={demoUser.email}
                      className="w-full bg-muted/50"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Write a short bio about yourself"
                      className="min-h-[100px] w-full bg-muted/50"
                    />
                  </div>
                </div>
                <div className="w-full space-y-4 md:w-80">
                  <Label>Profile Picture</Label>
                  <div className="flex justify-center">
                    <AvatarUpload
                      value={avatar}
                      size="xl"
                      onRemove={handleAvatarRemove}
                      onChange={handleAvatarChange}
                    />
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-end gap-4 border-t border-border/5 pt-6">
                <Button variant="outline" className="gap-2">
                  <Icon icon="solar:restart-bold-duotone" className="h-4 w-4" />
                  Reset Changes
                </Button>
                <Button className="gap-2">
                  <Icon icon="solar:disk-bold-duotone" className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          {/* Notification Settings */}
          <Card className="group overflow-hidden border-none bg-gradient-to-br from-emerald-500/5 to-blue-500/5 shadow-xl transition-all hover:shadow-2xl">
            <CardHeader className="border-b border-border/5 bg-gradient-to-b from-muted/50 to-muted/0">
              <CardTitle className="flex items-center gap-2 text-xl">
                <div className="rounded-lg bg-gradient-to-br from-emerald-500 to-blue-500 p-2">
                  <Icon
                    icon="solar:bell-bold-duotone"
                    className="h-5 w-5 text-white"
                  />
                </div>
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Choose what notifications you want to receive
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications on your device
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Marketing Emails</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive marketing and promotional emails
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
              <div className="flex items-center justify-end gap-4 border-t border-border/5 pt-6">
                <Button variant="outline" className="gap-2">
                  <Icon icon="solar:restart-bold-duotone" className="h-4 w-4" />
                  Reset Changes
                </Button>
                <Button className="gap-2">
                  <Icon icon="solar:disk-bold-duotone" className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance" className="space-y-6">
          {/* Appearance Settings */}
          <Card className="group overflow-hidden border-none bg-gradient-to-br from-orange-500/5 to-red-500/5 shadow-xl transition-all hover:shadow-2xl">
            <CardHeader className="border-b border-border/5 bg-gradient-to-b from-muted/50 to-muted/0">
              <CardTitle className="flex items-center gap-2 text-xl">
                <div className="rounded-lg bg-gradient-to-br from-orange-500 to-red-500 p-2">
                  <Icon
                    icon="solar:palette-bold-duotone"
                    className="h-5 w-5 text-white"
                  />
                </div>
                Appearance Settings
              </CardTitle>
              <CardDescription>
                Customize the appearance of your interface
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 p-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Dark Mode</Label>
                    <p className="text-sm text-muted-foreground">
                      Toggle between light and dark mode
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">Reduced Motion</Label>
                    <p className="text-sm text-muted-foreground">
                      Reduce the motion of animations
                    </p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
                  <div className="space-y-0.5">
                    <Label className="text-base">High Contrast</Label>
                    <p className="text-sm text-muted-foreground">
                      Increase contrast for better visibility
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
              <div className="flex items-center justify-end gap-4 border-t border-border/5 pt-6">
                <Button variant="outline" className="gap-2">
                  <Icon icon="solar:restart-bold-duotone" className="h-4 w-4" />
                  Reset Changes
                </Button>
                <Button className="gap-2">
                  <Icon icon="solar:disk-bold-duotone" className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
