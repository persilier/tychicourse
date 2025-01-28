/* eslint-disable @next/next/no-img-element */
"use client";

import { useCurrentBackground } from "@/store/auth-settings-store";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { AuthHeader } from "@/components/auth/auth-header";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const background = useCurrentBackground();
  const { resolvedTheme } = useTheme();

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2">
      {/* Left side - Background */}
      <div
        className={cn(
          "hidden md:block relative h-screen bg-muted",
          background?.isEnabled && "overflow-hidden"
        )}
      >
        {background?.isEnabled && (
          <div className="absolute inset-0">
            <img
              src={background.url}
              alt="Auth background"
              className={cn(
                "w-full h-full object-cover",
                background.opacity !== 1 &&
                  "opacity-" + background.opacity * 100
              )}
              style={{
                filter:
                  background.blur > 0
                    ? `blur(${background.blur}px)`
                    : undefined,
              }}
            />
            {background.overlay && (
              <div
                className={cn(
                  "absolute inset-0 bg-gradient-to-t",
                  resolvedTheme === "dark"
                    ? "from-background/80 to-background/20"
                    : "from-background/80 to-background/20"
                )}
              />
            )}
          </div>
        )}
      </div>

      {/* Right side - Content */}
      <main className="container flex flex-col min-h-screen py-10">
        <div className="flex-1 flex flex-col max-w-md mx-auto w-full px-4 sm:px-0">
          <AuthHeader showBranding />
          {children}
        </div>
      </main>
    </div>
  );
}
