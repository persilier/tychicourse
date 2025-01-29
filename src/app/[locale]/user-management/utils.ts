import { UserRole, UserStatus } from "@/data/users";
import { cn } from "@/lib/utils";

export function getRoleBadgeColor(role: UserRole) {
  switch (role) {
    case "admin":
      return cn(
        "bg-primary/10 text-primary hover:bg-primary/20",
        "dark:bg-primary/20 dark:hover:bg-primary/30"
      );
    case "instructor":
      return cn(
        "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20",
        "dark:bg-blue-500/20 dark:hover:bg-blue-500/30"
      );
    case "student":
      return cn(
        "bg-green-500/10 text-green-500 hover:bg-green-500/20",
        "dark:bg-green-500/20 dark:hover:bg-green-500/30"
      );
    default:
      return "";
  }
}

export function getStatusBadgeColor(status: UserStatus) {
  switch (status) {
    case "active":
      return cn(
        "bg-green-500/10 text-green-500 hover:bg-green-500/20",
        "dark:bg-green-500/20 dark:hover:bg-green-500/30"
      );
    case "inactive":
      return cn(
        "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20",
        "dark:bg-gray-500/20 dark:hover:bg-gray-500/30"
      );
    case "pending":
      return cn(
        "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20",
        "dark:bg-yellow-500/20 dark:hover:bg-yellow-500/30"
      );
    default:
      return "";
  }
}
