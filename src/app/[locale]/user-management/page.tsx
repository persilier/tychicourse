"use client";

import { users, User, UserRole, UserStatus } from "@/data/users";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Icon } from "@iconify/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

const ITEMS_PER_PAGE = 10;

export default function UserManagement() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "all">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());

  // Filter users based on search query and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      searchQuery === "" ||
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Selection handlers
  const toggleSelectAll = () => {
    if (selectedUsers.size === paginatedUsers.length) {
      // Deselect all visible users
      const newSelected = new Set(selectedUsers);
      paginatedUsers.forEach((user) => newSelected.delete(user.id));
      setSelectedUsers(newSelected);
    } else {
      // Select all visible users
      const newSelected = new Set(selectedUsers);
      paginatedUsers.forEach((user) => newSelected.add(user.id));
      setSelectedUsers(newSelected);
    }
  };

  const toggleSelectUser = (userId: string) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedUsers(newSelected);
  };

  // Reset to first page when filters change
  const handleFilterChange = (
    type: "search" | "role" | "status",
    value: string
  ) => {
    setCurrentPage(1);
    setSelectedUsers(new Set()); // Clear selection when filters change
    switch (type) {
      case "search":
        setSearchQuery(value);
        break;
      case "role":
        setRoleFilter(value as UserRole | "all");
        break;
      case "status":
        setStatusFilter(value as UserStatus | "all");
        break;
    }
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case "admin":
        return "bg-primary/10 text-primary hover:bg-primary/20";
      case "instructor":
        return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20";
      case "student":
        return "bg-green-500/10 text-green-500 hover:bg-green-500/20";
    }
  };

  const getStatusColor = (status: UserStatus) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-500";
      case "inactive":
        return "bg-gray-500/10 text-gray-500";
      case "pending":
        return "bg-yellow-500/10 text-yellow-500";
    }
  };

  return (
    <div className="container space-y-8 py-10">
      {/* Header Card */}
      <Card className="border-none bg-gradient-to-br from-purple-500/5 to-pink-500/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-2">
                  <Icon icon="solar:users-group-rounded-bold-duotone" className="h-5 w-5 text-white" />
                </div>
                <CardTitle className="text-xl">User Management</CardTitle>
              </div>
              <CardDescription>
                Manage your users, their roles, and permissions.
              </CardDescription>
            </div>
            <Button className="gap-2">
              <Icon icon="solar:add-circle-bold-duotone" className="h-5 w-5" />
              Add User
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Main Content Card */}
      <Card>
        <CardContent className="p-6">
          {/* Filters */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Icon
                icon="solar:magnifer-linear"
                className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => handleFilterChange("search", e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Icon icon="solar:users-group-rounded-bold-duotone" className="h-4 w-4" />
                    {roleFilter === "all" ? "All Roles" : roleFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuItem
                    onClick={() => handleFilterChange("role", "all")}
                    className="gap-2"
                  >
                    <Icon icon="solar:users-group-rounded-bold-duotone" className="h-4 w-4" />
                    All Roles
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleFilterChange("role", "admin")}
                    className="gap-2"
                  >
                    <Icon icon="solar:shield-user-bold-duotone" className="h-4 w-4" />
                    Admin
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleFilterChange("role", "instructor")}
                    className="gap-2"
                  >
                    <Icon icon="solar:user-hand-up-bold-duotone" className="h-4 w-4" />
                    Instructor
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleFilterChange("role", "student")}
                    className="gap-2"
                  >
                    <Icon icon="solar:user-rounded-bold-duotone" className="h-4 w-4" />
                    Student
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="gap-2">
                    <Icon icon="solar:user-dots-rounded-bold-duotone" className="h-4 w-4" />
                    {statusFilter === "all" ? "All Status" : statusFilter}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-[200px]">
                  <DropdownMenuItem
                    onClick={() => handleFilterChange("status", "all")}
                    className="gap-2"
                  >
                    <Icon icon="solar:user-dots-rounded-bold-duotone" className="h-4 w-4" />
                    All Status
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => handleFilterChange("status", "active")}
                    className="gap-2"
                  >
                    <Icon icon="solar:user-check-rounded-bold-duotone" className="h-4 w-4 text-green-500" />
                    Active
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleFilterChange("status", "inactive")}
                    className="gap-2"
                  >
                    <Icon icon="solar:user-cross-rounded-bold-duotone" className="h-4 w-4 text-gray-500" />
                    Inactive
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleFilterChange("status", "pending")}
                    className="gap-2"
                  >
                    <Icon icon="solar:user-clock-rounded-bold-duotone" className="h-4 w-4 text-yellow-500" />
                    Pending
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Users Table */}
          <div className="relative overflow-x-auto rounded-lg border bg-card">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]">
                    <Checkbox
                      checked={
                        paginatedUsers.length > 0 &&
                        paginatedUsers.every((user) => selectedUsers.has(user.id))
                      }
                      onCheckedChange={toggleSelectAll}
                      aria-label="Select all"
                    />
                  </TableHead>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead className="w-[50px]">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-muted/50">
                    <TableCell>
                      <Checkbox
                        checked={selectedUsers.has(user.id)}
                        onCheckedChange={() => toggleSelectUser(user.id)}
                        aria-label={`Select ${user.firstName} ${user.lastName}`}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={user.avatar} />
                          <AvatarFallback className="bg-primary/10">
                            {user.firstName[0]}
                            {user.lastName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">
                            {user.firstName} {user.lastName}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {user.email}
                          </div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getRoleColor(user.role)}>
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getStatusColor(user.status)}>
                        {user.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {format(new Date(user.createdAt), "MMM d, yyyy")}
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {user.lastLogin
                        ? format(new Date(user.lastLogin), "MMM d, yyyy")
                        : "Never"}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-foreground"
                          >
                            <Icon icon="solar:menu-dots-bold-duotone" className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[160px]">
                          <DropdownMenuItem className="gap-2">
                            <Icon icon="solar:pen-bold-duotone" className="h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem className="gap-2">
                            <Icon icon="solar:shield-keyhole-bold-duotone" className="h-4 w-4" />
                            Permissions
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="gap-2 text-destructive">
                            <Icon icon="solar:trash-bin-trash-bold-duotone" className="h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="mt-4 flex items-center justify-between border-t pt-4">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredUsers.length)} of{" "}
              {filteredUsers.length} users
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="gap-1"
              >
                <Icon icon="solar:arrow-left-linear" className="h-4 w-4" />
                Previous
              </Button>
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="h-8 w-8 p-0"
                  >
                    {page}
                  </Button>
                ))}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="gap-1"
              >
                Next
                <Icon icon="solar:arrow-right-linear" className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
