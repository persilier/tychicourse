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
} from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showEmailHint, setShowEmailHint] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (!email) return "Email is required";
    if (!emailRegex.test(email)) return "Please enter a valid email address";
    return undefined;
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    setIsSubmitting(true);
    setError(undefined);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo purposes, show error for specific email
      if (email === "error@example.com") {
        throw new Error("This email is not registered with us");
      }

      setIsSuccess(true);
    } catch (error) {
      console.error("Password reset request failed:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Failed to send reset link. Please try again."
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
                Check your email
              </h1>
              <p className="text-sm text-muted-foreground">
                We've sent a password reset link to
                <br />
                <span className="font-medium text-foreground">{email}</span>
              </p>
            </div>
          </motion.div>
        </div>

        <AuthFooter
          links={[
            {
              label: "Back to",
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
          title="Reset your password"
          description="Enter your email address and we'll send you a link to reset your password"
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
                <AlertTitle>{error ? "Error" : "Important"}</AlertTitle>
                <AlertDescription>
                  {error ||
                    "Make sure to check your spam folder if you don't see the email in your inbox"}
                </AlertDescription>
              </div>
            </div>
          </Alert>

          <div className="space-y-8">
            <div className="relative">
              <AuthInput
                id="email"
                name="email"
                label="Email address"
                type="email"
                placeholder="name@example.com"
                autoCapitalize="none"
                autoComplete="email"
                autoCorrect="off"
                required
                disabled={isSubmitting}
                error={error}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError(undefined);
                }}
                onFocus={() => setShowEmailHint(true)}
                onBlur={() => setShowEmailHint(false)}
              />
              <AnimatePresence>
                {showEmailHint && !error && email && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute left-0 right-0 mt-1.5 text-xs text-muted-foreground"
                  >
                    We'll send a password reset link to this email
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button
              type="submit"
              disabled={isSubmitting || !email}
              className={cn(
                "group flex w-full items-center justify-center space-x-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
              )}
            >
              <span>
                {isSubmitting ? "Sending link..." : "Send reset link"}
              </span>
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
            text: "Sign in",
          },
        ]}
      />
    </div>
  );
}
