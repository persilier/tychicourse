"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Icon } from "@iconify/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { UserRole, UserStatus } from "@/data/users";
import { useState } from "react";

const userSchema = z.object({
  firstName: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  lastName: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  email: z.string().email(),
  role: z.nativeEnum(UserRole),
  status: z.nativeEnum(UserStatus),
  avatar: z.string().optional(),
});

type UserFormValues = z.infer<typeof userSchema>;

interface UserFormProps {
  user?: Partial<UserFormValues>;
  onSubmit: (data: UserFormValues) => void;
  loading?: boolean;
}

export function UserForm({ user, onSubmit, loading }: UserFormProps) {
  const t = useTranslations("UserManagement");
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    user?.avatar || null
  );

  const form = useForm<UserFormValues>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      role: user?.role || UserRole.USER,
      status: user?.status || UserStatus.ACTIVE,
      avatar: user?.avatar || "",
    },
  });

  return (
    <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-black/[0.02] dark:bg-grid-white/[0.02]" />
      
      <div className="relative p-6 sm:p-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            {/* Avatar Section */}
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-24 w-24 ring-2 ring-white dark:ring-gray-800">
                <AvatarImage src={avatarPreview || ""} />
                <AvatarFallback className="bg-primary/10 text-2xl">
                  {user?.firstName?.[0]?.toUpperCase()}
                  {user?.lastName?.[0]?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <FormField
                control={form.control}
                name="avatar"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="flex items-center gap-2">
                        <Input
                          type="url"
                          placeholder={t("avatarUrlPlaceholder")}
                          {...field}
                          onChange={(e) => {
                            field.onChange(e);
                            setAvatarPreview(e.target.value);
                          }}
                          className="w-64"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* User Details Grid */}
            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("firstName")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("firstNamePlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("lastName")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("lastNamePlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("email")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("emailPlaceholder")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("role")}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("selectRole")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(UserRole).map((role) => (
                          <SelectItem key={role} value={role}>
                            {t(`roles.${role.toLowerCase()}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("status")}</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder={t("selectStatus")} />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {Object.values(UserStatus).map((status) => (
                          <SelectItem key={status} value={status}>
                            {t(`statuses.${status.toLowerCase()}`)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <Button type="submit" disabled={loading} className="min-w-[150px]">
                {loading ? (
                  <>
                    <Icon icon="eos-icons:loading" className="mr-2 h-4 w-4 animate-spin" />
                    {t("saving")}
                  </>
                ) : (
                  <>
                    <Icon icon="lucide:save" className="mr-2 h-4 w-4" />
                    {t("save")}
                  </>
                )}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
