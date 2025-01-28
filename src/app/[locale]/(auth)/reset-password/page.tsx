"use client"

import { AuthForm } from "@/components/auth/auth-form"
import { AuthInput } from "@/components/auth/auth-input"
import { AuthFooter } from "@/components/auth/auth-footer"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { 
  ShieldCheckIcon, 
  ArrowRightIcon, 
  CheckCircle2Icon, 
  XCircleIcon,
  EyeIcon,
  EyeOffIcon,
  InfoIcon
} from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { Progress } from "@/components/ui/progress"
import { motion, AnimatePresence } from "framer-motion"

interface PasswordRequirement {
  text: string
  met: boolean
}

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string>()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const getPasswordStrength = (pass: string): number => {
    if (!pass) return 0
    let strength = 0
    if (pass.length >= 8) strength += 25
    if (/[A-Z]/.test(pass)) strength += 25
    if (/[a-z]/.test(pass)) strength += 25
    if (/[0-9!@#$%^&*]/.test(pass)) strength += 25
    return strength
  }

  const getPasswordRequirements = (pass: string): PasswordRequirement[] => {
    return [
      { text: "At least 8 characters", met: pass.length >= 8 },
      { text: "At least one uppercase letter", met: /[A-Z]/.test(pass) },
      { text: "At least one lowercase letter", met: /[a-z]/.test(pass) },
      { text: "At least one number or special character", met: /[0-9!@#$%^&*]/.test(pass) }
    ]
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    
    if (getPasswordStrength(password) < 100) {
      setError("Please meet all password requirements")
      return
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match")
      return
    }

    setIsSubmitting(true)
    setError(undefined)

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500))
      setIsSuccess(true)
      
      // Redirect after success
      setTimeout(() => {
        // Add redirect logic here
      }, 1500)
    } catch (error) {
      console.error("Password reset failed:", error)
      setError(error instanceof Error ? error.message : "Failed to reset password. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-6"
          >
            <div className="flex justify-center">
              <div className="rounded-full bg-primary/10 p-3">
                <CheckCircle2Icon className="h-12 w-12 text-primary" />
              </div>
            </div>
            <div className="space-y-2">
              <h1 className="text-2xl font-semibold tracking-tight">Password reset successful</h1>
              <p className="text-sm text-muted-foreground">
                Your password has been reset successfully.<br />
                You can now sign in with your new password.
              </p>
            </div>
          </motion.div>
        </div>

        <AuthFooter
          links={[
            {
              label: "Back to",
              href: "../login",
              text: "Sign in"
            }
          ]}
        />
      </div>
    )
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 flex flex-col justify-center">
        <AuthForm 
          title="Reset your password"
          description="Choose a strong password for your account"
          onSubmit={handleSubmit}
          error={error}
          showSubmitButton={false}
          className="space-y-6"
        >
          <Alert variant={error ? "destructive" : "default"} className="transition-colors">
            <div className="flex items-start space-x-3">
              {error ? (
                <XCircleIcon className="h-5 w-5 mt-0.5 animate-in fade-in" />
              ) : (
                <InfoIcon className="h-5 w-5 mt-0.5" />
              )}
              <div className="flex-1">
                <AlertTitle>
                  {error ? "Error" : "Password Requirements"}
                </AlertTitle>
                <AlertDescription className="space-y-2">
                  {error || (
                    <ul className="text-sm space-y-1">
                      {getPasswordRequirements(password).map((req, index) => (
                        <li 
                          key={index}
                          className={cn(
                            "flex items-center space-x-2",
                            req.met ? "text-primary" : "text-muted-foreground"
                          )}
                        >
                          <div className="h-1.5 w-1.5 rounded-full bg-current" />
                          <span>{req.text}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </AlertDescription>
              </div>
            </div>
          </Alert>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="space-y-2">
                <AuthInput
                  id="password"
                  name="password"
                  label="New Password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="new-password"
                  required
                  disabled={isSubmitting}
                  error={error}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value)
                    setError(undefined)
                  }}
                  rightElement={
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? (
                        <EyeOffIcon className="h-4 w-4" />
                      ) : (
                        <EyeIcon className="h-4 w-4" />
                      )}
                    </button>
                  }
                />
                
                {password && (
                  <div className="space-y-1">
                    <Progress value={getPasswordStrength(password)} className="h-1" />
                    <p className="text-xs text-muted-foreground">
                      Password strength: {getPasswordStrength(password) === 100 ? "Strong" : "Weak"}
                    </p>
                  </div>
                )}
              </div>

              <AuthInput
                id="confirm-password"
                name="confirm-password"
                label="Confirm Password"
                type={showConfirmPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                disabled={isSubmitting}
                error={error}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value)
                  setError(undefined)
                }}
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? (
                      <EyeOffIcon className="h-4 w-4" />
                    ) : (
                      <EyeIcon className="h-4 w-4" />
                    )}
                  </button>
                }
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !password || !confirmPassword}
              className={cn(
                "group flex w-full items-center justify-center space-x-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
              )}
            >
              <span>{isSubmitting ? "Resetting password..." : "Reset password"}</span>
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </AuthForm>
      </div>

      <AuthFooter
        links={[
          {
            label: "Back to",
            href: "../login",
            text: "Sign in"
          }
        ]}
      />
    </div>
  )
}
