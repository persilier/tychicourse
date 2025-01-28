"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useLocale } from "next-intl"
import { Link, usePathname } from "@/config/i18n"
import { locales } from "@/config/i18n"
import { Icon } from "@iconify/react"

const localeNames: Record<string, string> = {
  fr: "Français",
  en: "English",
  es: "Español",
}

const localeIcons: Record<string, string> = {
  fr: "solar:flag-france-bold-duotone",
  en: "solar:flag-united-states-bold-duotone",
  es: "solar:flag-spain-bold-duotone",
}

export function LanguageSwitcher() {
  const locale = useLocale()
  const pathname = usePathname()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-xl"
        >
          <Icon icon="solar:global-bold-duotone" className="h-6 w-6" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {locales.map((loc) => (
          <DropdownMenuItem
            key={loc}
            asChild
          >
            <Link
              href={pathname}
              locale={loc}
              className="w-full cursor-pointer flex items-center"
            >
              <Icon icon={localeIcons[loc]} className="mr-2 h-5 w-5" />
              {localeNames[loc]}
              {loc === locale && (
                <Icon icon="solar:check-circle-bold-duotone" className="ml-2 h-4 w-4 text-primary" />
              )}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
