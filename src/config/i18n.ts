import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

export const locales = ['fr', 'en', 'es'] as const;
export const defaultLocale = 'fr' as const;

export type Locale = (typeof locales)[number];

export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });

export async function getMessages(locale: string) {
  try {
    return (await import(`../messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }
}

export default getRequestConfig(async ({ locale }) => {
  const messages = await getMessages(locale);

  return {
    messages,
    timeZone: 'Africa/Porto-Novo',
    now: new Date(),
  };
});
