"use client";

import { useLocale, useTranslations } from "next-intl";
import { Icon } from "@iconify/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter, usePathname } from "@/config/i18n";

const languages = [
  {
    code: "en",
    nameKey: "english",
    regionKey: "unitedKingdom",
    flag: "circle-flags:uk",
  },
  {
    code: "fr",
    nameKey: "french",
    regionKey: "france",
    flag: "circle-flags:fr",
  },
  {
    code: "es",
    nameKey: "spanish",
    regionKey: "spain",
    flag: "circle-flags:es",
  },
];

export function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("Layout.Header.language");

  const currentLanguage = languages.find((lang) => lang.code === locale);

  const handleSelect = (code: string) => {
    router.replace(pathname, { locale: code });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-xl relative group hover:bg-transparent"
        >
          <div className="relative">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-primary/10 to-primary/5 ring-1 ring-primary/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:ring-primary/50 group-hover:shadow-lg group-hover:shadow-primary/20">
              <Icon
                icon={currentLanguage?.flag || "circle-flags:un"}
                className="h-5 w-5"
              />
            </div>
            <span className="absolute inset-0 rounded-lg bg-primary/10 animate-ping-slow opacity-75" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="w-[280px] p-0 rounded-2xl shadow-lg border bg-gradient-to-br from-background/95 via-background/98 to-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
        sideOffset={8}
      >
        {/* Header */}
        <div className="p-4 border-b relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/2 to-transparent" />
          <div className="relative">
            <h4 className="text-sm font-semibold">{t("select")}</h4>
            <p className="text-xs text-muted-foreground">{t("choose")}</p>
          </div>
        </div>

        {/* Language Options */}
        <div className="p-1.5 space-y-1">
          {languages.map((language) => (
            <DropdownMenuItem
              key={language.code}
              className="flex items-center gap-3 p-2 rounded-xl focus:bg-accent data-[highlighted]:bg-accent cursor-pointer group relative overflow-hidden"
              onClick={() => handleSelect(language.code)}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-primary/2 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="flex-shrink-0 relative">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-105 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-primary/20 ${
                  locale === language.code ? "ring-2 ring-primary" : "ring-1 ring-primary/20"
                }`}>
                  <Icon
                    icon={language.flag}
                    className="h-5 w-5"
                  />
                </div>
              </div>
              <div className="flex-1 space-y-0.5">
                <p className="text-sm font-medium group-hover:text-primary transition-colors">
                  {t(language.nameKey)}
                </p>
                <p className="text-xs text-muted-foreground group-hover:text-primary/70 transition-colors">
                  {t(language.regionKey)}
                </p>
              </div>
              {locale === language.code && (
                <Icon
                  icon="solar:check-circle-bold-duotone"
                  className="h-4 w-4 text-primary transition-transform group-hover:scale-110"
                />
              )}
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
