"use client";

import { AuthForm } from "@/components/auth/auth-form";
import { AuthInput } from "@/components/auth/auth-input";
import { AuthFooter } from "@/components/auth/auth-footer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  ArrowRightIcon,
  CheckCircle2Icon,
  XCircleIcon,
  InfoIcon,
  EyeIcon,
  EyeOffIcon,
  UserIcon,
  MailIcon,
  ShieldIcon,
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface PasswordRequirement {
  text: string;
  met: boolean;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState<keyof FormData | null>(null);

  const validateEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return undefined;
  };

  const getPasswordStrength = (pass: string): number => {
    if (!pass) return 0;
    let strength = 0;
    if (pass.length >= 8) strength += 25;
    if (/[A-Z]/.test(pass)) strength += 25;
    if (/[a-z]/.test(pass)) strength += 25;
    if (/[0-9!@#$%^&*]/.test(pass)) strength += 25;
    return strength;
  };

  const getPasswordRequirements = (pass: string): PasswordRequirement[] => {
    return [
      { text: "At least 8 characters", met: pass.length >= 8 },
      { text: "At least one uppercase letter", met: /[A-Z]/.test(pass) },
      { text: "At least one lowercase letter", met: /[a-z]/.test(pass) },
      { text: "At least one number or special character", met: /[0-9!@#$%^&*]/.test(pass) },
    ];
  };

  const handleInputChange = (field: keyof FormData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));
    setError(undefined);
  };

  const validateForm = () => {
    if (!formData.firstName) return "First name is required";
    if (!formData.lastName) return "Last name is required";
    
    const emailError = validateEmail(formData.email);
    if (emailError) return emailError;

    if (getPasswordStrength(formData.password) < 100) {
      return "Please meet all password requirements";
    }

    if (formData.password !== formData.confirmPassword) {
      return "Passwords do not match";
    }

    return undefined;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);
    setError(undefined);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo purposes, show error for specific email
      if (formData.email === "error@example.com") {
        throw new Error("This email is already registered");
      }

      setIsSuccess(true);
    } catch (error) {
      console.error("Registration failed:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Registration failed. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <h1 className="text-2xl font-semibold tracking-tight">
                Registration successful
              </h1>
              <p className="text-sm text-muted-foreground">
                Welcome {formData.firstName}!<br />
                Please check your email to verify your account.
              </p>
            </div>
          </motion.div>
        </div>

        <AuthFooter
          links={[
            {
              label: "Continue to",
              href: "../login",
              text: "Sign in",
            },
          ]}
        />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="flex-1 flex flex-col justify-center">
        <AuthForm
          title="Create an account"
          description="Enter your information below to create your account"
          onSubmit={handleSubmit}
          error={error}
          showSubmitButton={false}
          className="space-y-6"
        >
          <Alert
            variant={error ? "destructive" : "default"}
            className="transition-colors"
          >
            <div className="flex items-start space-x-3">
              {error ? (
                <XCircleIcon className="h-5 w-5 mt-0.5 animate-in fade-in" />
              ) : (
                <InfoIcon className="h-5 w-5 mt-0.5" />
              )}
              <div className="flex-1">
                <AlertTitle>
                  {error ? "Error" : "Welcome"}
                </AlertTitle>
                <AlertDescription>
                  {error || "Fill out the form below to create your account"}
                </AlertDescription>
              </div>
            </div>
          </Alert>

          <div className="space-y-8">
            <div className="grid gap-4 md:grid-cols-2">
              <AuthInput
                id="firstName"
                name="firstName"
                label="First name"
                autoComplete="given-name"
                required
                disabled={isSubmitting}
                error={error}
                value={formData.firstName}
                onChange={handleInputChange("firstName")}
                onFocus={() => setFocusedField("firstName")}
                onBlur={() => setFocusedField(null)}
                leftIcon={<UserIcon className="h-4 w-4" />}
              />

              <AuthInput
                id="lastName"
                name="lastName"
                label="Last name"
                autoComplete="family-name"
                required
                disabled={isSubmitting}
                error={error}
                value={formData.lastName}
                onChange={handleInputChange("lastName")}
                onFocus={() => setFocusedField("lastName")}
                onBlur={() => setFocusedField(null)}
                leftIcon={<UserIcon className="h-4 w-4" />}
              />
            </div>

            <AuthInput
              id="email"
              name="email"
              label="Email address"
              type="email"
              autoComplete="email"
              required
              disabled={isSubmitting}
              error={error}
              value={formData.email}
              onChange={handleInputChange("email")}
              onFocus={() => setFocusedField("email")}
              onBlur={() => setFocusedField(null)}
              leftIcon={<MailIcon className="h-4 w-4" />}
            />

            <div className="space-y-2">
              <AuthInput
                id="password"
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                disabled={isSubmitting}
                error={error}
                value={formData.password}
                onChange={handleInputChange("password")}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                leftIcon={<ShieldIcon className="h-4 w-4" />}
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

              <AuthInput
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                required
                disabled={isSubmitting}
                error={error}
                value={formData.confirmPassword}
                onChange={handleInputChange("confirmPassword")}
                onFocus={() => setFocusedField("confirmPassword")}
                onBlur={() => setFocusedField(null)}
                leftIcon={<ShieldIcon className="h-4 w-4" />}
                rightElement={
                  formData.password && formData.confirmPassword && (
                    <div className="text-sm">
                      {formData.password === formData.confirmPassword ? (
                        <CheckCircle2Icon className="h-4 w-4 text-primary animate-in fade-in" />
                      ) : (
                        <XCircleIcon className="h-4 w-4 text-destructive animate-in fade-in" />
                      )}
                    </div>
                  )
                }
              />

              <AnimatePresence>
                {(focusedField === "password" || focusedField === "confirmPassword") && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3 overflow-hidden"
                  >
                    <Progress
                      value={getPasswordStrength(formData.password)}
                      className="h-1"
                    />
                    
                    <ul className="text-sm space-y-1">
                      {getPasswordRequirements(formData.password).map((req, index) => (
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
                      <li
                        className={cn(
                          "flex items-center space-x-2",
                          formData.password && formData.confirmPassword && formData.password === formData.confirmPassword
                            ? "text-primary"
                            : "text-muted-foreground"
                        )}
                      >
                        <div className="h-1.5 w-1.5 rounded-full bg-current" />
                        <span>Passwords match</span>
                      </li>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !formData.email || !formData.password}
              className={cn(
                "group flex w-full items-center justify-center space-x-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              )}
            >
              <span>
                {isSubmitting ? "Creating account..." : "Create account"}
              </span>
              <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </AuthForm>
      </div>

      <AuthFooter
        links={[
          {
            label: "Already have an account?",
            href: "../login",
            text: "Sign in",
          },
        ]}
      />
    </div>
  );
}
