import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./avatar";
import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./tooltip";

export interface AvatarGroupProps {
  users: {
    name: string;
    image?: string;
    fallback?: string;
  }[];
  maxVisible?: number;
  size?: "sm" | "md" | "lg";
  shape?: "circle" | "square";
  remainingCount?: number;
}

export function AvatarGroup({
  users,
  maxVisible = 5,
  size = "md",
  shape = "circle",
  remainingCount,
}: AvatarGroupProps) {
  const visibleUsers = users.slice(0, maxVisible);
  const totalRemainingCount =
    remainingCount !== undefined
      ? remainingCount
      : Math.max(0, users.length - maxVisible);

  const sizeClasses = {
    sm: "w-8 h-8 text-xs border-2",
    md: "w-10 h-10 text-sm border-2",
    lg: "w-12 h-12 text-base border-2",
  };

  const shapeClasses = {
    circle: "rounded-full",
    square: "rounded-md",
  };

  return (
    <div className="flex items-center -space-x-3">
      <TooltipProvider>
        {visibleUsers.map((user, index) => (
          <Tooltip key={index}>
            <TooltipTrigger>
              <Avatar
                className={cn(
                  "border-success transition-all duration-300",
                  "hover:z-10 hover:scale-110",
                  sizeClasses[size],
                  shapeClasses[shape],
                  "ring-2 ring-background"
                )}
              >
                <AvatarImage
                  src={user.image}
                  alt={user.name}
                  className="object-cover"
                />
                <AvatarFallback>
                  {user.fallback || user.name.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
            </TooltipTrigger>
            <TooltipContent>
              <p>{user.name}</p>
            </TooltipContent>
          </Tooltip>
        ))}

        {totalRemainingCount > 0 && (
          <Avatar
            className={cn(
              "bg-muted text-muted-foreground",
              sizeClasses[size],
              shapeClasses[shape],
              "ring-2 ring-background"
            )}
          >
            <AvatarFallback>+{totalRemainingCount}</AvatarFallback>
          </Avatar>
        )}
      </TooltipProvider>
    </div>
  );
}
