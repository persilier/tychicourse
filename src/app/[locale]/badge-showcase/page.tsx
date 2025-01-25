"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export default function BadgeShowcase() {
  return (
    <div className="container py-10">
      <div className="space-y-6">
        {/* Introduction */}
        <div>
          <h1 className="text-3xl font-bold">Badge</h1>
          <p className="text-muted-foreground">
            Badges are used to highlight an item&apos;s status or for quick
            labeling.
          </p>
        </div>

        <Separator />

        {/* Default Variants */}
        <Card>
          <CardHeader>
            <CardTitle>Default Variants</CardTitle>
            <CardDescription>
              Different styles of badges for various contexts.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
            </div>
            <div className="flex flex-wrap gap-4">
              <Badge variant="success">Success</Badge>
              <Badge variant="warning">Warning</Badge>
              <Badge variant="info">Info</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Soft Variants */}
        <Card>
          <CardHeader>
            <CardTitle>Soft Variants</CardTitle>
            <CardDescription>
              Softer, more subtle badge styles for less emphasis.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Badge variant="softPrimary">Soft Primary</Badge>
              <Badge variant="softDestructive">Soft Destructive</Badge>
              <Badge variant="softSuccess">Soft Success</Badge>
              <Badge variant="softWarning">Soft Warning</Badge>
              <Badge variant="softInfo">Soft Info</Badge>
            </div>
          </CardContent>
        </Card>

        {/* Sizes */}
        <Card>
          <CardHeader>
            <CardTitle>Sizes</CardTitle>
            <CardDescription>
              Different sizes to match various use cases.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              <Badge className="text-xs px-2 py-0.5">Small</Badge>
              <Badge>Default</Badge>
              <Badge className="text-lg px-3 py-1">Large</Badge>
            </div>
          </CardContent>
        </Card>

        {/* With Icons */}
        <Card>
          <CardHeader>
            <CardTitle>With Icons</CardTitle>
            <CardDescription>
              Badges can include icons for better visual context.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-wrap gap-4">
              <Badge className="gap-1">
                <div className="i-solar-check-circle-bold-duotone w-4 h-4" />
                Complete
              </Badge>
              <Badge variant="destructive" className="gap-1">
                <div className="i-solar-close-circle-bold-duotone w-4 h-4" />
                Failed
              </Badge>
              <Badge variant="warning" className="gap-1">
                <div className="i-solar-bell-bold-duotone w-4 h-4" />
                Pending
              </Badge>
              <Badge variant="info" className="gap-1">
                <div className="i-solar-info-circle-bold-duotone w-4 h-4" />
                Info
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
