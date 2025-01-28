"use client"

import { Link } from "@/config/i18n"

interface AuthFooterProps {
  links?: {
    label: string
    href: string
    text: string
  }[]
  children?: React.ReactNode
}

export function AuthFooter({ links, children }: AuthFooterProps) {
  return (
    <div className="space-y-2 text-center text-sm">
      {links?.map((link, index) => (
        <p key={index}>
          {link.label}{" "}
          <Link href={link.href} className="font-medium text-primary hover:underline">
            {link.text}
          </Link>
        </p>
      ))}
      {children}
    </div>
  )
}
