import createMiddleware from "next-intl/middleware";
import { locales, defaultLocale } from "./src/config/locale";

export default createMiddleware({
  // A list of all locales that are supported
  locales: locales,

  // Used when no locale matches
  defaultLocale: defaultLocale,
  localePrefix: "always",
});

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", "/(fr|en|es)/:path*"],
};
