"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuthActions } from "@/store/auth-settings-store"
import { Link } from "@/config/i18n"
import { useEffect } from "react"

// Import auth pages
import LoginPage from "@/app/[locale]/(auth)/login/page"
import RegisterPage from "@/app/[locale]/(auth)/register/page"
import ForgotPasswordPage from "@/app/[locale]/(auth)/forgot-password/page"
import ResetPasswordPage from "@/app/[locale]/(auth)/reset-password/page"
import VerifyEmailPage from "@/app/[locale]/(auth)/verify-email/page"
import TwoFactorPage from "@/app/[locale]/(auth)/two-factor/page"

export default function AuthShowcase() {
  const { updateBranding, addBackground, setCurrentBackground } = useAuthActions()

  // Set up demo content when the component mounts
  useEffect(() => {
    // Update branding
    updateBranding({
      name: "Demo Company",
      slogan: "Your trusted platform",
      logo: {
        url: "https://via.placeholder.com/150x50",
        darkUrl: "https://via.placeholder.com/150x50"
      }
    })

    // Add and set demo backgrounds
    const demoBackgrounds = [
      {
        id: "mountains",
        url: "https://images.unsplash.com/photo-1519681393784-d120267933ba",
        blur: 0,
        opacity: 0.5,
        isEnabled: true,
        overlay: true
      },
      {
        id: "office",
        url: "https://images.unsplash.com/photo-1497366216548-37526070297c",
        blur: 2,
        opacity: 0.7,
        isEnabled: true,
        overlay: true
      },
      {
        id: "abstract",
        url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe",
        blur: 0,
        opacity: 0.3,
        isEnabled: true,
        overlay: true
      }
    ]

    demoBackgrounds.forEach(bg => {
      addBackground(bg)
    })
    setCurrentBackground("mountains")
  }, [updateBranding, addBackground, setCurrentBackground])

  return (
    <div className="container py-10">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold">Authentication Pages</h1>
          <p className="text-muted-foreground">
            Preview all authentication pages with different backgrounds and branding options
          </p>
        </div>

        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="login" className="space-y-6">
              <TabsList className="grid grid-cols-3 lg:grid-cols-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
                <TabsTrigger value="forgot-password">Forgot</TabsTrigger>
                <TabsTrigger value="reset-password">Reset</TabsTrigger>
                <TabsTrigger value="verify-email">Verify</TabsTrigger>
                <TabsTrigger value="two-factor">2FA</TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="space-y-4">
                <div className="rounded-lg border">
                  <LoginPage />
                </div>
              </TabsContent>

              <TabsContent value="register" className="space-y-4">
                <div className="rounded-lg border">
                  <RegisterPage />
                </div>
              </TabsContent>

              <TabsContent value="forgot-password" className="space-y-4">
                <div className="rounded-lg border">
                  <ForgotPasswordPage />
                </div>
              </TabsContent>

              <TabsContent value="reset-password" className="space-y-4">
                <div className="rounded-lg border">
                  <ResetPasswordPage />
                </div>
              </TabsContent>

              <TabsContent value="verify-email" className="space-y-4">
                <div className="rounded-lg border">
                  <VerifyEmailPage />
                </div>
              </TabsContent>

              <TabsContent value="two-factor" className="space-y-4">
                <div className="rounded-lg border">
                  <TwoFactorPage />
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Quick Links</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Button asChild variant="outline">
              <Link href="../login">Login Page</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="../register">Register Page</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="../forgot-password">Forgot Password Page</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="../reset-password">Reset Password Page</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="../verify-email">Email Verification Page</Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="../two-factor">Two-Factor Auth Page</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
