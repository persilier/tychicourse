"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { motion } from "framer-motion";

interface FormStatusProps {
  status: "success" | "error";
  title: string;
  message: string;
  onReset?: () => void;
  className?: string;
}

export function FormStatus({
  status,
  title,
  message,
  onReset,
  className,
}: FormStatusProps) {
  const SuccessIcon = () => (
    <div className="w-24 h-24 relative mx-auto mb-6">
      <motion.svg
        viewBox="0 0 100 100"
        className="w-full h-full stroke-success"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          strokeWidth="6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.path
          d="M30 50 L45 65 L70 35"
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
      </motion.svg>
      <motion.div
        className="absolute inset-0 bg-success/10 rounded-full"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );

  const ErrorIcon = () => (
    <div className="w-24 h-24 relative mx-auto mb-6">
      <motion.svg
        viewBox="0 0 100 100"
        className="w-full h-full stroke-destructive"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, ease: "easeInOut" }}
      >
        <motion.circle
          cx="50"
          cy="50"
          r="45"
          fill="none"
          strokeWidth="6"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.path
          d="M35 35 L65 65"
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
        <motion.path
          d="M65 35 L35 65"
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        />
      </motion.svg>
      <motion.div
        className="absolute inset-0 bg-destructive/10 rounded-full"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.3 }}
      />
    </div>
  );

  return (
    <motion.div
      className={cn(
        "text-center p-6 rounded-lg",
        status === "success" ? "bg-success/5" : "bg-destructive/5",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {status === "success" ? <SuccessIcon /> : <ErrorIcon />}

      <motion.h3
        className={cn(
          "text-2xl font-semibold mb-2",
          status === "success" ? "text-success" : "text-destructive"
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        {title}
      </motion.h3>

      <motion.p
        className="text-muted-foreground mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        {message}
      </motion.p>

      {onReset && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
        >
          <Button
            variant={status === "success" ? "success" : "destructive"}
            onClick={onReset}
            className="min-w-[200px]"
          >
            {status === "success" ? "Start Over" : "Try Again"}
          </Button>
        </motion.div>
      )}
    </motion.div>
  );
}
