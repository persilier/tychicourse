"use client";

import { NextIntlClientProvider } from "next-intl";
import { ReactNode } from "react";

export function Providers({
  locale,
  messages,
  children,
}: {
  locale: string;
  messages: any;
  children: ReactNode;
}) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}
