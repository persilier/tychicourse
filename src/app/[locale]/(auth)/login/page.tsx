"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { AuthForm } from "@/components/auth/auth-form"
import { AuthInput } from "@/components/auth/auth-input"
import { AuthFooter } from "@/components/auth/auth-footer"
import { useState } from "react"
import { useCustomToast } from "@/hooks/use-custom-toast"
import { useTranslations } from "next-intl"

interface FormData {
  email: string
  password: string
  rememberMe: boolean
}

interface FormErrors {
  email?: string
  password?: string
}

const validateEmail = (email: string) => {
  if (!email) return "Email is required"
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
    return "Invalid email address"
  }
  return undefined
}

const validatePassword = (password: string) => {
  if (!password) return "Password is required"
  if (password.length < 8) {
    return "Password must be at least 8 characters"
  }
  return undefined
}

export default function LoginPage() {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    rememberMe: false
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const customToast = useCustomToast()
  const t = useTranslations("Auth")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target
    const newValue = type === "checkbox" ? (e.target as HTMLInputElement).checked : value
    
    setFormData(prev => ({
      ...prev,
      [name]: newValue
    }))

    // Validate field on change
    if (name === "email") {
      const error = validateEmail(value)
      setErrors(prev => ({ ...prev, email: error }))
    } else if (name === "password") {
      const error = validatePassword(value)
      setErrors(prev => ({ ...prev, password: error }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    
    // Validate field on blur
    if (name === "email") {
      const error = validateEmail(value)
      setErrors(prev => ({ ...prev, email: error }))
    } else if (name === "password") {
      const error = validatePassword(value)
      setErrors(prev => ({ ...prev, password: error }))
    }
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()
    
    // Validate all fields
    const emailError = validateEmail(formData.email)
    const passwordError = validatePassword(formData.password)

    const newErrors: FormErrors = {
      email: emailError,
      password: passwordError
    }

    // Filter out undefined error messages
    const filteredErrors = Object.fromEntries(
      Object.entries(newErrors).filter(([_, value]) => value !== undefined)
    ) as FormErrors

    if (Object.keys(filteredErrors).length > 0) {
      setErrors(filteredErrors)
      return
    }

    setIsSubmitting(true)
    try {
      // Make the API call to your authentication endpoint
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
          remember: formData.rememberMe
        }),
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const data = await response.json();
      
      // Set the token in a cookie
      document.cookie = `token=${data.token}; path=/; ${formData.rememberMe ? 'max-age=2592000' : ''}`;
      
      // Show success toast
      customToast.lightSuccess({
        title: t("loginSuccess"),
        description: t("welcomeBack")
      });
      
      // Get the current locale from the URL
      const locale = window.location.pathname.split('/')[1];
      
      // Get the callback URL from the query parameters or default to dashboard
      const urlParams = new URLSearchParams(window.location.search);
      let callbackUrl = urlParams.get('callbackUrl') || '/dashboard';
      
      // If callbackUrl doesn't start with locale, add it
      if (!callbackUrl.startsWith(`/${locale}`)) {
        callbackUrl = `/${locale}${callbackUrl}`;
      }
      
      // Redirect to the callback URL
      window.location.href = callbackUrl;
      
    } catch (error) {
      console.error("Login failed:", error)
      // Show error toast
      customToast.lightError({
        title: t("loginError"),
        description: t("invalidCredentials")
      });
      setErrors({
        email: "Invalid email or password"
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 flex flex-col justify-center">
        <AuthForm 
          title="Welcome back"
          description="Enter your credentials to access your account"
          submitText={isSubmitting ? "Signing in..." : "Sign in"} 
          onSubmit={handleSubmit}
        >
          <AuthInput
            id="email"
            name="email"
            label="Email"
            type="email"
            placeholder="name@example.com"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off"
            required
            disabled={isSubmitting}
            error={errors.email}
            value={formData.email}
            onChange={handleChange}
            onBlur={handleBlur}
          />

          <AuthInput
            id="password"
            name="password"
            label="Password"
            type="password"
            autoCapitalize="none"
            autoComplete="current-password"
            required
            disabled={isSubmitting}
            error={errors.password}
            value={formData.password}
            onChange={handleChange}
            onBlur={handleBlur}
            showPasswordStrength
          />

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="remember" 
                name="rememberMe"
                checked={formData.rememberMe}
                onCheckedChange={(checked) => 
                  setFormData(prev => ({ ...prev, rememberMe: checked as boolean }))
                }
                disabled={isSubmitting}
              />
              <label
                htmlFor="remember"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Remember me
              </label>
            </div>
          </div>
        </AuthForm>
      </div>

      <AuthFooter
        links={[
          {
            label: "Forgot your password?",
            href: "../forgot-password",
            text: "Reset it here"
          },
          {
            label: "Don't have an account?",
            href: "../register",
            text: "Sign up"
          }
        ]}
      />
    </div>
  )
}
