"use client"

import { ComponentPropsWithoutRef, useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Eye, EyeOff } from "lucide-react"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface PasswordStrength {
  score: number
  label: string
  color: string
}

function getPasswordStrength(password: string): PasswordStrength {
  if (!password) {
    return { score: 0, label: "", color: "" }
  }

  let score = 0
  const checks = [
    password.length >= 8,                    // Length >= 8
    /[a-z]/.test(password),                 // Has lowercase
    /[A-Z]/.test(password),                 // Has uppercase
    /\d/.test(password),                    // Has number
    /[^a-zA-Z0-9]/.test(password),          // Has special char
    password.length >= 12,                   // Length >= 12 (bonus)
  ]

  score = checks.filter(Boolean).length

  const strengths: PasswordStrength[] = [
    { score: 0, label: "Very weak", color: "bg-destructive" },
    { score: 2, label: "Weak", color: "bg-orange-500" },
    { score: 3, label: "Medium", color: "bg-yellow-500" },
    { score: 4, label: "Strong", color: "bg-green-500" },
    { score: 5, label: "Very strong", color: "bg-green-600" },
  ]

  return strengths.reduce((prev, curr) => (
    score >= curr.score ? curr : prev
  ))
}

interface PasswordInputProps extends Omit<ComponentPropsWithoutRef<"input">, "type" | "className"> {
  error?: string
  showStrengthMeter?: boolean
}

export function PasswordInput({ 
  error,
  showStrengthMeter,
  value = "",
  onChange,
  ...props 
}: PasswordInputProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [strength, setStrength] = useState<PasswordStrength>({ score: 0, label: "", color: "" })

  // Update strength whenever value changes
  useEffect(() => {
    if (showStrengthMeter && typeof value === 'string') {
      setStrength(getPasswordStrength(value))
    }
  }, [value, showStrengthMeter])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e)
  }

  return (
    <div className="space-y-2">
      <div className="relative">
        <Input
          type={showPassword ? "text" : "password"}
          className={cn(
            "pr-10 w-full",
            error && "border-destructive focus-visible:ring-destructive"
          )}
          value={value}
          onChange={handleChange}
          {...props}
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
          onClick={() => setShowPassword(!showPassword)}
          tabIndex={-1}
        >
          {showPassword ? (
            <EyeOff className="h-4 w-4 text-muted-foreground" />
          ) : (
            <Eye className="h-4 w-4 text-muted-foreground" />
          )}
        </Button>
      </div>
      
      {showStrengthMeter && value && strength.label && (
        <div className="space-y-1.5">
          <Progress 
            value={(strength.score / 5) * 100} 
            className={cn("h-1.5", strength.color)}
          />
          <p className="text-xs text-muted-foreground flex items-center gap-1">
            Password strength: <span className="font-medium">{strength.label}</span>
          </p>
        </div>
      )}
    </div>
  )
}
