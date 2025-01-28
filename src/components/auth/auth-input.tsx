"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ComponentPropsWithoutRef } from "react"
import { cn } from "@/lib/utils"
import { PasswordInput } from "./password-input"

interface AuthInputProps extends Omit<ComponentPropsWithoutRef<"input">, "className"> {
  id: string
  label: string
  error?: string
  showPasswordStrength?: boolean
}

export function AuthInput({
  id,
  label,
  type = "text",
  error,
  disabled,
  required,
  showPasswordStrength,
  ...props
}: AuthInputProps) {
  const isPassword = type === "password"

  return (
    <div className="space-y-2">
      <Label 
        htmlFor={id}
        className={cn(
          "flex items-baseline justify-between",
          disabled && "opacity-70 cursor-not-allowed"
        )}
      >
        <div>
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </div>
        {error && (
          <span className="text-xs font-normal text-destructive">
            {error}
          </span>
        )}
      </Label>

      {isPassword ? (
        <PasswordInput
          id={id}
          disabled={disabled}
          required={required}
          error={error}
          showStrengthMeter={showPasswordStrength}
          aria-invalid={error ? "true" : undefined}
          aria-errormessage={error ? `${id}-error` : undefined}
          {...props}
        />
      ) : (
        <Input
          id={id}
          type={type}
          disabled={disabled}
          required={required}
          className={cn(
            "w-full",
            error && "border-destructive focus-visible:ring-destructive"
          )}
          aria-invalid={error ? "true" : undefined}
          aria-errormessage={error ? `${id}-error` : undefined}
          {...props}
        />
      )}
    </div>
  )
}
