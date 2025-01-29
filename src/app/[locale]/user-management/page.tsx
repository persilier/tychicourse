"use client";

import { useState } from "react";
import { format } from "date-fns";
import { useTranslations, useLocale } from "next-intl";
import { Icon } from "@iconify/react";
import { 
  Card, 
  CardContent,
  CardDescription, 
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ConfirmDialog } from "@/components/ui/confirm-dialog";
import { Modal } from "@/components/ui/modal";
import { UserForm } from "./user-form";
import { useCustomToast } from "@/hooks/use-custom-toast";
import { generateUsersPDF, exportToExcel } from "@/lib/export-utils";
import { users as initialUsers, User, UserRole, UserStatus } from "@/data/users";
import { Link } from "@/config/i18n";
import { getRoleBadgeColor, getStatusBadgeColor } from "./utils";

const ITEMS_PER_PAGE = 10;

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<UserRole | "all">("all");
  const [statusFilter, setStatusFilter] = useState<UserStatus | "all">("all");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const t = useTranslations("UserManagement");
  const locale = useLocale();
  const toast = useCustomToast();

  // Filter users based on search query and filters
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      searchQuery === "" ||
      `${user.firstName} ${user.lastName}`
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  // Handle user selection
  const toggleSelectUser = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const toggleSelectAll = () => {
    setSelectedUsers((prev) =>
      prev.length === paginatedUsers.length
        ? []
        : paginatedUsers.map((user) => user.id)
    );
  };

  // Handle user creation/update
  const handleCreateUser = (userData: Omit<User, "id">) => {
    const newUser: User = {
      id: Math.random().toString(36).substring(7),
      createdAt: new Date().toISOString(),
      lastLogin: null,
      ...userData,
    };

    setUsers((prev) => [...prev, newUser]);
    setIsCreateModalOpen(false);
    toast.success(t("notifications.created"));
  };

  const handleUpdateUser = (userId: string, userData: Partial<User>) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId ? { ...user, ...userData } : user
      )
    );
    setEditingUser(null);
    toast.success(t("notifications.updated"));
  };

  // Handle user deletion
  const handleDeleteUsers = () => {
    setUsers((prev) =>
      prev.filter((user) => !selectedUsers.includes(user.id))
    );
    setSelectedUsers([]);
    setIsDeleting(false);
    toast.success(
      selectedUsers.length === 1
        ? t("notifications.deleted")
        : t("notifications.deletedMultiple", { count: selectedUsers.length })
    );
  };

  // Handle export
  const handleExportPDF = async () => {
    try {
      await generateUsersPDF(filteredUsers);
      toast.success(t("export.success.pdf.title"), {
        description: t("export.success.pdf.description"),
      });
    } catch (error) {
      toast.error(t("export.error.pdf.title"), {
        description: t("export.error.pdf.description"),
      });
    }
  };

  const handleExportExcel = async () => {
    try {
      await exportToExcel(filteredUsers);
      toast.success(t("export.success.excel.title"), {
        description: t("export.success.excel.description"),
      });
    } catch (error) {
      toast.error(t("export.error.excel.title"), {
        description: t("export.error.excel.description"),
      });
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">{t("title")}</h1>
          <p className="text-muted-foreground">{t("description")}</p>
        </div>
        <div className="flex items-center gap-2">
          {selectedUsers.length > 0 ? (
            <>
              <Button
                variant="destructive"
                onClick={() => setIsDeleting(true)}
              >
                <Icon
                  icon="solar:trash-bin-trash-bold-duotone"
                  className="mr-2 h-4 w-4"
                />
                {t("actions.delete")}
              </Button>
            </>
          ) : (
            <>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">
                    <Icon
                      icon="solar:export-bold-duotone"
                      className="mr-2 h-4 w-4"
                    />
                    {t("actions.export.label")}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={handleExportPDF}>
                    <Icon
                      icon="solar:file-pdf-bold-duotone"
                      className="mr-2 h-4 w-4"
                    />
                    {t("actions.export.pdf")}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleExportExcel}>
                    <Icon
                      icon="solar:file-xlsx-bold-duotone"
                      className="mr-2 h-4 w-4"
                    />
                    {t("actions.export.excel")}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button onClick={() => setIsCreateModalOpen(true)}>
                <Icon
                  icon="solar:user-plus-bold-duotone"
                  className="mr-2 h-4 w-4"
                />
                {t("actions.create")}
              </Button>
            </>
          )}
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="flex flex-col gap-4 p-6">
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <Input
                placeholder={t("filters.search")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full"
                icon="solar:magnifer-bold-duotone"
              />
            </div>
            <div className="flex items-center gap-4">
              <select
                value={roleFilter}
                onChange={(e) => setRoleFilter(e.target.value as UserRole | "all")}
                className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="all">{t("filters.role.all")}</option>
                <option value="admin">{t("filters.role.admin")}</option>
                <option value="instructor">{t("filters.role.instructor")}</option>
                <option value="student">{t("filters.role.student")}</option>
              </select>
              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value as UserStatus | "all")
                }
                className="h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="all">{t("filters.status.all")}</option>
                <option value="active">{t("filters.status.active")}</option>
                <option value="inactive">{t("filters.status.inactive")}</option>
                <option value="pending">{t("filters.status.pending")}</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={
                      paginatedUsers.length > 0 &&
                      paginatedUsers.every((user) =>
                        selectedUsers.includes(user.id)
                      )
                    }
                    onCheckedChange={toggleSelectAll}
                    aria-label={t("table.selectAll")}
                  />
                </TableHead>
                <TableHead>{t("table.name")}</TableHead>
                <TableHead>{t("table.role")}</TableHead>
                <TableHead>{t("table.status")}</TableHead>
                <TableHead>{t("table.createdAt")}</TableHead>
                <TableHead>{t("table.lastLogin")}</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Checkbox
                      checked={selectedUsers.includes(user.id)}
                      onCheckedChange={() => toggleSelectUser(user.id)}
                      aria-label={t("table.selectUser", {
                        name: `${user.firstName} ${user.lastName}`,
                      })}
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={user.avatar || ""} alt={`${user.firstName} ${user.lastName}`} />
                        <AvatarFallback className="bg-primary/10">
                          <Icon icon="solar:user-bold-duotone" className="h-4 w-4 text-primary" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <Link 
                          href={`/user-management/${user.id}`}
                          locale={locale}
                          className="font-medium hover:underline"
                        >
                          {user.firstName} {user.lastName}
                        </Link>
                        <div className="text-sm text-muted-foreground">
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={getRoleBadgeColor(user.role)}
                    >
                      {t(`filters.role.${user.role}`)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={getStatusBadgeColor(user.status)}
                    >
                      {t(`filters.status.${user.status}`)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {format(new Date(user.createdAt), "yyyy-MM-dd HH:mm")}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {user.lastLogin
                      ? format(new Date(user.lastLogin), "yyyy-MM-dd HH:mm")
                      : t("table.never")}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                        >
                          <Icon
                            icon="solar:menu-dots-bold-duotone"
                            className="h-4 w-4"
                          />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setEditingUser(user)}>
                          <Icon
                            icon="solar:pen-bold-duotone"
                            className="mr-2 h-4 w-4"
                          />
                          {t("actions.edit")}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => {
                            setSelectedUsers([user.id]);
                            setIsDeleting(true);
                          }}
                          className="text-destructive"
                        >
                          <Icon
                            icon="solar:trash-bin-trash-bold-duotone"
                            className="mr-2 h-4 w-4"
                          />
                          {t("actions.delete")}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Create User Modal */}
      <Modal
        open={isCreateModalOpen}
        onOpenChange={setIsCreateModalOpen}
        title={t("modal.createTitle")}
        description={t("modal.createDescription")}
      >
        <UserForm onSubmit={handleCreateUser} />
      </Modal>

      {/* Edit User Modal */}
      <Modal
        open={!!editingUser}
        onOpenChange={() => setEditingUser(null)}
        title={t("modal.editTitle")}
        description={t("modal.editDescription")}
      >
        {editingUser && (
          <UserForm
            user={editingUser}
            onSubmit={(data) => handleUpdateUser(editingUser.id, data)}
          />
        )}
      </Modal>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        open={isDeleting}
        onOpenChange={setIsDeleting}
        title={
          selectedUsers.length === 1
            ? t("deleteConfirm.title")
            : t("delete.multiple.title")
        }
        description={
          selectedUsers.length === 1
            ? t("deleteConfirm.description")
            : t("delete.multiple.description", {
                count: selectedUsers.length,
              })
        }
        onConfirm={handleDeleteUsers}
      />
    </div>
  );
}