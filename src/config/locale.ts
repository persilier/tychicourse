export const locales = ["en", "fr", "es"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale = "en" as const;

export const localeLabels: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  es: "Español",
};
