"use client"

import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ShieldCheckIcon, TimerIcon, CheckCircle2Icon, XCircleIcon } from "lucide-react"
import { AuthForm } from "@/components/auth/auth-form"
import { AuthFooter } from "@/components/auth/auth-footer"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"

export default function TwoFactorPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [code, setCode] = useState("")
  const [error, setError] = useState<string>()
  const [timeLeft, setTimeLeft] = useState(30)
  const [isSuccess, setIsSuccess] = useState(false)
  const [focusedInput, setFocusedInput] = useState<number>(-1)

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          return 30
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Auto-submit when code is complete
  useEffect(() => {
    if (code.length === 6) {
      handleSubmit()
    }
  }, [code])

  const handleSubmit = async (event?: React.FormEvent) => {
    event?.preventDefault()
    if (code.length !== 6) {
      setError("Please enter all 6 digits")
      return
    }

    setIsSubmitting(true)
    setError(undefined)

    try {
      // Add verification logic here
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simulate success/error based on code
      if (code === "000000") {
        throw new Error("Invalid authentication code")
      }
      
      setIsSuccess(true)
      // Redirect after success
      setTimeout(() => {
        // Add redirect logic here
      }, 1500)
    } catch (error) {
      console.error("2FA verification failed:", error)
      setError(error instanceof Error ? error.message : "Verification failed. Please try again.")
      setCode("") // Clear code on error
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 flex flex-col justify-center">
        <AuthForm 
          title="Two-Factor Authentication"
          description="Secure your account with 2FA"
          submitText={isSubmitting ? "Verifying..." : "Verify Code"}
          onSubmit={handleSubmit}
          error={error}
        >
          <Alert variant={error ? "destructive" : isSuccess ? "success" : "default"}>
            <div className="flex items-start space-x-3">
              {error ? (
                <XCircleIcon className="h-5 w-5 mt-0.5 animate-in fade-in" />
              ) : isSuccess ? (
                <CheckCircle2Icon className="h-5 w-5 mt-0.5 animate-in fade-in" />
              ) : (
                <ShieldCheckIcon className="h-5 w-5 mt-0.5" />
              )}
              <div className="flex-1 space-y-2">
                <AlertTitle>
                  {error ? "Verification Failed" : 
                   isSuccess ? "Verification Successful" :
                   "Enter Authentication Code"}
                </AlertTitle>
                <AlertDescription>
                  {error ? error :
                   isSuccess ? "Redirecting you to your account..." :
                   "Open your authenticator app and enter the 6-digit code"}
                </AlertDescription>
              </div>
            </div>
          </Alert>

          <div className="space-y-4">
            <div className="flex justify-center">
              <InputOTP 
                maxLength={6} 
                value={code}
                onChange={(value) => {
                  setCode(value)
                  setError(undefined)
                }}
                onFocusInput={(index) => setFocusedInput(index)}
                disabled={isSubmitting || isSuccess}
                className="gap-2"
              >
                <InputOTPGroup>
                  {Array.from({ length: 6 }).map((_, i) => (
                    <InputOTPSlot 
                      key={i} 
                      index={i}
                      className={cn(
                        "transition-all duration-200",
                        focusedInput === i && "scale-110 border-primary",
                        error && "border-destructive",
                        isSuccess && "border-success"
                      )}
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>Code expires in</span>
                <span className="flex items-center">
                  <TimerIcon className="h-3 w-3 mr-1" />
                  {timeLeft}s
                </span>
              </div>
              <Progress 
                value={(timeLeft / 30) * 100} 
                className="h-1"
              />
            </div>
          </div>
        </AuthForm>
      </div>

      <AuthFooter
        links={[
          {
            label: "Lost access to your authenticator?",
            href: "../forgot-password",
            text: "Contact support"
          },
          {
            label: "",
            href: "../login",
            text: "Back to sign in"
          }
        ]}
      />
    </div>
  )
}
