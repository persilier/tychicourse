"use client";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Icon } from "@iconify/react";

export default function AlertShowcase() {
  return (
    <div className="container py-10">
      <div className="space-y-6">
        {/* Introduction */}
        <div>
          <h1 className="text-3xl font-bold">Alert</h1>
          <p className="text-muted-foreground">
            Alerts are used to display important messages to the user.
          </p>
        </div>

        <Separator />

        {/* Default Variants */}
        <Card>
          <CardHeader>
            <CardTitle>Default Variants</CardTitle>
            <CardDescription>
              Different styles of alerts for various contexts.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Icon icon="solar:info-circle-bold-duotone" className="h-4 w-4" />
              <AlertTitle>Default Alert</AlertTitle>
              <AlertDescription>
                This is a default alert — check it out!
              </AlertDescription>
            </Alert>

            <Alert variant="destructive">
              <Icon
                icon="solar:danger-triangle-bold-duotone"
                className="h-4 w-4"
              />
              <AlertTitle>Error Alert</AlertTitle>
              <AlertDescription>
                Something went wrong! Please try again.
              </AlertDescription>
            </Alert>

            <Alert variant="success">
              <Icon
                icon="solar:check-circle-bold-duotone"
                className="h-4 w-4"
              />
              <AlertTitle>Success Alert</AlertTitle>
              <AlertDescription>
                Your changes have been saved successfully.
              </AlertDescription>
            </Alert>

            <Alert variant="warning">
              <Icon icon="solar:bell-bold-duotone" className="h-4 w-4" />
              <AlertTitle>Warning Alert</AlertTitle>
              <AlertDescription>
                Please backup your data before continuing.
              </AlertDescription>
            </Alert>

            <Alert variant="info">
              <Icon icon="solar:info-circle-bold-duotone" className="h-4 w-4" />
              <AlertTitle>Info Alert</AlertTitle>
              <AlertDescription>
                A new software update is available.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Soft Variants */}
        <Card>
          <CardHeader>
            <CardTitle>Soft Variants</CardTitle>
            <CardDescription>
              Softer, more subtle alert styles for less emphasis.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert variant="softPrimary">
              <Icon icon="solar:info-circle-bold-duotone" className="h-4 w-4" />
              <AlertTitle>Soft Primary Alert</AlertTitle>
              <AlertDescription>
                This is a soft primary alert — check it out!
              </AlertDescription>
            </Alert>

            <Alert variant="softDestructive">
              <Icon
                icon="solar:danger-triangle-bold-duotone"
                className="h-4 w-4"
              />
              <AlertTitle>Soft Destructive Alert</AlertTitle>
              <AlertDescription>This action cannot be undone.</AlertDescription>
            </Alert>

            <Alert variant="softSuccess">
              <Icon
                icon="solar:check-circle-bold-duotone"
                className="h-4 w-4"
              />
              <AlertTitle>Soft Success Alert</AlertTitle>
              <AlertDescription>Everything looks good!</AlertDescription>
            </Alert>

            <Alert variant="softWarning">
              <Icon icon="solar:bell-bold-duotone" className="h-4 w-4" />
              <AlertTitle>Soft Warning Alert</AlertTitle>
              <AlertDescription>
                Your subscription will expire soon.
              </AlertDescription>
            </Alert>

            <Alert variant="softInfo">
              <Icon icon="solar:info-circle-bold-duotone" className="h-4 w-4" />
              <AlertTitle>Soft Info Alert</AlertTitle>
              <AlertDescription>
                Here&apos;s something you might want to know.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Without Icons */}
        <Card>
          <CardHeader>
            <CardTitle>Without Icons</CardTitle>
            <CardDescription>
              Alerts can be displayed without icons for a simpler look.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <AlertTitle>Default Alert</AlertTitle>
              <AlertDescription>
                This is a default alert without an icon.
              </AlertDescription>
            </Alert>

            <Alert variant="destructive">
              <AlertTitle>Error Alert</AlertTitle>
              <AlertDescription>
                This is an error alert without an icon.
              </AlertDescription>
            </Alert>
          </CardContent>
        </Card>

        {/* Without Description */}
        <Card>
          <CardHeader>
            <CardTitle>Without Description</CardTitle>
            <CardDescription>
              Alerts can be displayed with just a title for brief messages.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Alert>
              <Icon icon="solar:info-circle-bold-duotone" className="h-4 w-4" />
              <AlertTitle>Your trial is about to expire</AlertTitle>
            </Alert>

            <Alert variant="success">
              <Icon
                icon="solar:check-circle-bold-duotone"
                className="h-4 w-4"
              />
              <AlertTitle>Payment successful</AlertTitle>
            </Alert>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
