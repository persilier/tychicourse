/* eslint-disable @typescript-eslint/no-empty-object-type */
"use client"

import { Logo, type LogoProps } from "@/components/ui/logo"
import { useAuthBranding } from "@/store/auth-settings-store"

interface ClientLogoProps extends Omit<LogoProps, 'src' | 'darkSrc' | 'name' | 'slogan'> {}

export function ClientLogo(props: ClientLogoProps) {
  const { name, slogan, logo } = useAuthBranding()

  return (
    <Logo
      src={logo?.url}
      darkSrc={logo?.darkUrl}
      name={name}
      slogan={slogan}
      {...props}
    />
  )
}
