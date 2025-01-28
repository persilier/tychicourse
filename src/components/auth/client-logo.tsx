/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client"

import { Logo, type LogoProps } from "@/components/ui/logo"
import { useAuthBranding } from "@/store/auth-settings-store"

interface ClientLogoProps extends Omit<LogoProps, 'name' | 'slogan'> {}

export function ClientLogo(props: ClientLogoProps) {
  const { name, slogan } = useAuthBranding()

  return (
    <Logo
      icon="fa6-brands:edge"
      name={name}
      slogan={slogan}
      {...props}
    />
  )
}
