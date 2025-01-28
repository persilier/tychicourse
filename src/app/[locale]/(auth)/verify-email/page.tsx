"use client";

import { AuthForm } from "@/components/auth/auth-form";
import { AuthFooter } from "@/components/auth/auth-footer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import {
  ArrowRightIcon,
  CheckCircle2Icon,
  XCircleIcon,
  MailIcon,
  TimerIcon,
  RefreshCwIcon,
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { Progress } from "@/components/ui/progress";

export default function VerifyEmailPage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState<string>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes in seconds
  const [isResending, setIsResending] = useState(false);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`;
  };

  const handleResendCode = async () => {
    setIsResending(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setTimeLeft(300); // Reset timer
      setError(undefined);
      setCode(""); // Clear previous code
    } catch (error) {
      console.error("Failed to resend code:", error);
      setError("Failed to resend code. Please try again.");
    } finally {
      setIsResending(false);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (code.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    if (timeLeft === 0) {
      setError("Code has expired. Please request a new one.");
      return;
    }

    setIsSubmitting(true);
    setError(undefined);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // For demo purposes, show error for specific code
      if (code === "000000") {
        throw new Error("Invalid verification code");
      }

      setIsSuccess(true);
    } catch (error) {
      console.error("Email verification failed:", error);
      setError(
        error instanceof Error
          ? error.message
          : "Verification failed. Please try again."
      );
      setCode(""); // Clear invalid code
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
                Email verified successfully
              </h1>
              <p className="text-sm text-muted-foreground">
                Your email has been verified.
                <br />
                You can now proceed with your account.
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
          title="Verify your email"
          description="We've sent a verification code to your email"
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
                <MailIcon className="h-5 w-5 mt-0.5" />
              )}
              <div className="flex-1">
                <AlertTitle>{error ? "Error" : "Check your email"}</AlertTitle>
                <AlertDescription className="space-y-2">
                  {error || (
                    <>
                      Enter the 6-digit code we sent to your email.
                      <br />
                      Don't forget to check your spam folder.
                    </>
                  )}
                </AlertDescription>
              </div>
            </div>
          </Alert>

          <div className="space-y-8">
            <div className="space-y-4">
              <div className="flex justify-center">
                <InputOTP
                  maxLength={6}
                  value={code}
                  onChange={(value) => {
                    setCode(value);
                    setError(undefined);
                  }}
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
                    {formatTime(timeLeft)}
                  </span>
                </div>
                <Progress
                  value={(timeLeft / 300) * 100}
                  className={cn(
                    "h-1",
                    timeLeft < 60 && "text-destructive"
                  )}
                />
              </div>
            </div>

            <div className="space-y-4">
              <button
                type="submit"
                disabled={isSubmitting || !code || timeLeft === 0}
                className={cn(
                  "group flex w-full items-center justify-center space-x-2 rounded-md bg-primary px-3 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                )}
              >
                <span>{isSubmitting ? "Verifying..." : "Verify email"}</span>
                <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                type="button"
                onClick={handleResendCode}
                disabled={isResending || timeLeft > 0}
                className={cn(
                  "group flex w-full items-center justify-center space-x-2 rounded-md border border-input bg-background px-3 py-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                )}
              >
                <RefreshCwIcon className={cn(
                  "h-4 w-4 mr-2",
                  isResending && "animate-spin"
                )} />
                <span>
                  {isResending
                    ? "Sending new code..."
                    : timeLeft > 0
                    ? "Wait before requesting new code"
                    : "Request new code"}
                </span>
              </button>
            </div>
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
