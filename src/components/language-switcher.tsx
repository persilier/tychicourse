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
import { Globe } from "lucide-react"

const localeNames: Record<string, string> = {
  fr: "Français",
  en: "English",
  es: "Español",
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
          className="relative"
        >
          <Globe className="h-5 w-5" />
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
              className="w-full cursor-pointer"
            >
              {localeNames[loc]}
              {loc === locale && (
                <span className="ml-2 text-primary">✓</span>
              )}
            </Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
