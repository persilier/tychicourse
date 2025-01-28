"use client";

import { useCurrentBackground } from "@/store/auth-settings-store";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";

export function BackgroundSection() {
  const background = useCurrentBackground();
  const { resolvedTheme } = useTheme();

  return (
    <div
      className={cn(
        "hidden md:block relative h-screen bg-muted",
        background?.isEnabled && "overflow-hidden"
      )}
    >
      {background?.isEnabled && (
        <div className="absolute inset-0">
          <Image
            src={background.url}
            alt="Auth background"
            fill
            className={cn(
              "object-cover",
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
  );
}
