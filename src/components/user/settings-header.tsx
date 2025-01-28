import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Badge } from "@/components/ui/badge";

export function SettingsHeader() {
  return (
    <div className="relative mb-8 overflow-hidden rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-white/10" />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/25 to-transparent" />

      {/* Animated Shapes */}
      <div className="absolute -left-4 -top-4 h-64 w-64 animate-blob rounded-full bg-purple-500 opacity-20 mix-blend-multiply blur-xl filter" />
      <div className="absolute -right-4 -top-4 h-64 w-64 animate-blob animation-delay-2000 rounded-full bg-yellow-500 opacity-20 mix-blend-multiply blur-xl filter" />
      <div className="absolute -bottom-8 left-20 h-64 w-64 animate-blob animation-delay-4000 rounded-full bg-pink-500 opacity-20 mix-blend-multiply blur-xl filter" />

      {/* Content */}
      <div className="relative px-6 py-16 sm:px-12">
        <div className="flex flex-col items-center gap-8 text-white md:flex-row md:items-start md:justify-between">
          <div className="flex flex-col items-center gap-4 md:items-start">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-white/10 p-2.5 backdrop-blur-sm">
                <Icon icon="solar:settings-bold-duotone" className="h-6 w-6 text-white" />
              </div>
              <h2 className="text-3xl font-bold tracking-tight">Account Settings</h2>
            </div>
            <p className="text-lg text-white/80">Manage your account settings and preferences</p>
            
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="group border-2 border-white/10 bg-white/10 px-4 py-1.5 text-white backdrop-blur-sm transition-all hover:bg-white/20">
                <Icon
                  icon="solar:user-id-bold-duotone"
                  className="mr-1.5 h-4 w-4 text-amber-300 transition-transform duration-200 group-hover:scale-110"
                />
                Profile Settings
              </Badge>
              <Badge className="group border-2 border-white/10 bg-emerald-500/20 px-4 py-1.5 text-emerald-100 backdrop-blur-sm transition-all hover:bg-emerald-500/30">
                <Icon
                  icon="solar:bell-bold-duotone"
                  className="mr-1.5 h-4 w-4 text-emerald-300 transition-transform duration-200 group-hover:scale-110"
                />
                Notifications
              </Badge>
              <Badge className="group border-2 border-white/10 bg-blue-500/20 px-4 py-1.5 text-blue-100 backdrop-blur-sm transition-all hover:bg-blue-500/30">
                <Icon
                  icon="solar:shield-keyhole-bold-duotone"
                  className="mr-1.5 h-4 w-4 text-blue-300 transition-transform duration-200 group-hover:scale-110"
                />
                Security
              </Badge>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="secondary"
              size="lg"
              className="group border border-white/10 bg-white/10 backdrop-blur-sm hover:bg-white/20"
            >
              <Icon
                icon="solar:restart-bold-duotone"
                className="mr-2 h-5 w-5 transition-transform duration-200 group-hover:scale-110"
              />
              Reset Settings
            </Button>
            <Button
              size="lg"
              className="group border border-white/10 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
            >
              <Icon
                icon="solar:disk-bold-duotone"
                className="mr-2 h-5 w-5 transition-transform duration-200 group-hover:scale-110"
              />
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
