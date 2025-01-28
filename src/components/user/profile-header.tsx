import { users } from "@/data/users";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

// Using the first user as an example
const user = users[0];

export function ProfileHeader() {
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
        <div className="flex flex-col items-center gap-8 text-white md:flex-row">
          {/* Avatar with Ring */}
          <div className="relative">
            <div className="absolute -inset-0.5 animate-tilt rounded-full bg-gradient-to-r from-fuchsia-500 via-purple-500 to-pink-500 opacity-75 blur" />
            <Avatar className="relative h-32 w-32 border-4 border-white/20 shadow-2xl">
              <AvatarImage src={user.avatar} />
              <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-600 text-2xl">
                {user.firstName[0]}
                {user.lastName[0]}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* User Info */}
          <div className="flex flex-1 flex-col items-center gap-4 text-center md:items-start md:text-left">
            <div className="space-y-1">
              <h2 className="text-3xl font-bold tracking-tight">
                {user.firstName} {user.lastName}
              </h2>
              <p className="text-lg text-white/80">{user.email}</p>
            </div>

            {/* Badges */}
            <div className="flex flex-wrap items-center gap-2">
              <Badge className="group border-2 border-white/10 bg-white/10 px-4 py-1.5 text-white backdrop-blur-sm transition-all hover:bg-white/20">
                <Icon
                  icon="solar:crown-bold-duotone"
                  className="mr-1.5 h-4 w-4 text-amber-300 transition-transform duration-200 group-hover:scale-110"
                />
                {user.role}
              </Badge>
              <Badge className="group border-2 border-white/10 bg-emerald-500/20 px-4 py-1.5 text-emerald-100 backdrop-blur-sm transition-all hover:bg-emerald-500/30">
                <Icon
                  icon="solar:shield-check-bold-duotone"
                  className="mr-1.5 h-4 w-4 text-emerald-300 transition-transform duration-200 group-hover:scale-110"
                />
                {user.status}
              </Badge>
              <Badge className="group border-2 border-white/10 bg-blue-500/20 px-4 py-1.5 text-blue-100 backdrop-blur-sm transition-all hover:bg-blue-500/30">
                <Icon
                  icon="solar:medal-ribbon-bold-duotone"
                  className="mr-1.5 h-4 w-4 text-blue-300 transition-transform duration-200 group-hover:scale-110"
                />
                Pro Member
              </Badge>
              <Badge className="group border-2 border-white/10 bg-purple-500/20 px-4 py-1.5 text-purple-100 backdrop-blur-sm transition-all hover:bg-purple-500/30">
                <Icon
                  icon="solar:stars-bold-duotone"
                  className="mr-1.5 h-4 w-4 text-purple-300 transition-transform duration-200 group-hover:scale-110"
                />
                Top Contributor
              </Badge>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <Button
              variant="secondary"
              className="group border border-white/10 bg-white/10 backdrop-blur-sm hover:bg-white/20"
            >
              <Icon
                icon="solar:pen-bold-duotone"
                className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:scale-110"
              />
              Edit Profile
            </Button>
            <Button className="group border border-white/10 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600">
              <Icon
                icon="solar:shield-keyhole-bold-duotone"
                className="mr-2 h-4 w-4 transition-transform duration-200 group-hover:scale-110"
              />
              Permissions
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 gap-4 border-t border-white/10 pt-8 text-white/80 md:grid-cols-4">
          <div className="group flex items-center gap-3 rounded-xl bg-white/5 p-4 transition-all hover:bg-white/10">
            <div className="rounded-lg bg-gradient-to-br from-purple-500 to-pink-500 p-2.5">
              <Icon icon="solar:folder-bold-duotone" className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">152</div>
              <div className="text-sm">Projects</div>
            </div>
          </div>
          <div className="group flex items-center gap-3 rounded-xl bg-white/5 p-4 transition-all hover:bg-white/10">
            <div className="rounded-lg bg-gradient-to-br from-blue-500 to-cyan-500 p-2.5">
              <Icon icon="solar:graph-new-up-bold-duotone" className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">4.8k</div>
              <div className="text-sm">Contributions</div>
            </div>
          </div>
          <div className="group flex items-center gap-3 rounded-xl bg-white/5 p-4 transition-all hover:bg-white/10">
            <div className="rounded-lg bg-gradient-to-br from-emerald-500 to-teal-500 p-2.5">
              <Icon icon="solar:users-group-rounded-bold-duotone" className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">89</div>
              <div className="text-sm">Teams</div>
            </div>
          </div>
          <div className="group flex items-center gap-3 rounded-xl bg-white/5 p-4 transition-all hover:bg-white/10">
            <div className="rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 p-2.5">
              <Icon icon="solar:medal-ribbons-star-bold-duotone" className="h-5 w-5 text-white" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">12</div>
              <div className="text-sm">Awards</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
