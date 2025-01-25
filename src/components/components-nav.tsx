/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Icon } from "@iconify/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const components = [
  {
    title: "Basic",
    items: [
      {
        title: "Button",
        href: "#button",
        icon: "square-2-stack",
      },
      {
        title: "Badge",
        href: "#badge",
        icon: "bookmark",
      },
      {
        title: "Card",
        href: "#card",
        icon: "rectangle-stack",
      },
      {
        title: "Alert",
        href: "#alert",
        icon: "exclamation-triangle",
      },
    ],
  },
  {
    title: "Data Display",
    items: [
      {
        title: "Table",
        href: "#table",
        icon: "table-cells",
      },
      {
        title: "Avatar",
        href: "#avatar",
        icon: "user-circle",
      },
    ],
  },
  {
    title: "Form",
    items: [
      {
        title: "Input",
        href: "#input",
        icon: "square-3-stack-3d",
      },
      {
        title: "Checkbox",
        href: "#checkbox",
        icon: "check-circle",
      },
      {
        title: "Select",
        href: "#select",
        icon: "chevron-up-down",
      },
    ],
  },
];

interface ComponentsNavProps extends React.HTMLAttributes<HTMLDivElement> {}

export function ComponentsNav({ className, ...props }: ComponentsNavProps) {
  const pathname = usePathname();

  return (
    <div className={cn("relative", className)} {...props}>
      <ScrollArea className="h-[calc(100vh-3.5rem)] pb-10">
        <div className="space-y-4 py-4">
          {components.map((section) => (
            <div key={section.title} className="px-3 py-2">
              <h2 className="mb-2 px-4 text-lg font-semibold tracking-tight">
                {section.title}
              </h2>
              <div className="space-y-1">
                {section.items.map((item) => (
                  <Button
                    key={item.href}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start",
                      pathname === item.href && "bg-accent"
                    )}
                    asChild
                  >
                    <Link href={item.href}>
                      <Icon
                        icon={`heroicons:${item.icon}`}
                        className="mr-2 h-4 w-4"
                      />
                      {item.title}
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
