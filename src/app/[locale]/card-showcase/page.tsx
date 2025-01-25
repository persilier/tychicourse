"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Icon } from "@iconify/react";

export default function CardShowcase() {
  return (
    <div className="container py-10">
      <div className="space-y-6">
        {/* Introduction */}
        <div>
          <h1 className="text-3xl font-bold">Card</h1>
          <p className="text-muted-foreground">
            Cards are used to group and display content in a way that is easily
            readable.
          </p>
        </div>

        <Separator />

        {/* Basic Card */}
        <div className="grid gap-6 md:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Basic Card</CardTitle>
              <CardDescription>
                A simple card with header and content.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>
                This is the main content of the card. You can put any content
                here.
              </p>
            </CardContent>
          </Card>

          {/* With Footer */}
          <Card>
            <CardHeader>
              <CardTitle>Card with Footer</CardTitle>
              <CardDescription>
                A card with header, content, and footer.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>This card includes a footer with actions.</p>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline">Cancel</Button>
              <Button>Save</Button>
            </CardFooter>
          </Card>

          {/* With Image */}
          <Card>
            <img
              src="https://images.unsplash.com/photo-1635776062127-d379bfcba9f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2532&q=80"
              alt="Landscape"
              className="aspect-video object-cover"
            />
            <CardHeader>
              <CardTitle>Card with Image</CardTitle>
              <CardDescription>A card that includes an image.</CardDescription>
            </CardHeader>
            <CardContent>
              <p>Cards can include images, videos, and other media.</p>
            </CardContent>
          </Card>

          {/* Interactive Card */}
          <Card className="hover:border-primary/50 cursor-pointer transition-all">
            <CardHeader>
              <CardTitle>Interactive Card</CardTitle>
              <CardDescription>
                A card with hover and click states.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p>This card has hover and click interactions.</p>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Click me</Button>
            </CardFooter>
          </Card>

          {/* Card with Icon Header */}
          <Card>
            <CardHeader className="flex flex-row items-center gap-4">
              <div className="rounded-lg bg-primary/10 p-2">
                <Icon
                  icon="solar:star-bold-duotone"
                  className="h-6 w-6 text-primary"
                />
              </div>
              <div className="flex-1">
                <CardTitle>Card with Icon</CardTitle>
                <CardDescription>
                  A card with an icon in the header layout.
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <p>
                This card demonstrates how to include an icon in the header
                section.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
