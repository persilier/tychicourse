"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "./button";
import { Icon } from "@iconify/react";

export interface WizardStep {
  title: string;
  description?: string;
  content: React.ReactNode;
  isValid?: boolean;
  validationErrors?: Record<string, string>;
}

export interface WizardFormProps {
  steps: WizardStep[];
  onComplete?: (data: any) => void;
  onStepChange?: (currentStep: number) => void;
  className?: string;
  variant?: "default" | "cards" | "numbered";
}

const WizardForm = React.forwardRef<HTMLDivElement, WizardFormProps>(
  (
    { steps, onComplete, onStepChange, className, variant = "default" },
    ref
  ) => {
    const [currentStep, setCurrentStep] = React.useState(0);

    const isLastStep = currentStep === steps.length - 1;
    const currentStepData = steps[currentStep];

    const handleNext = () => {
      if (isLastStep) {
        onComplete?.(steps);
      } else {
        setCurrentStep((prev) => {
          const nextStep = prev + 1;
          onStepChange?.(nextStep);
          return nextStep;
        });
      }
    };

    const handlePrevious = () => {
      setCurrentStep((prev) => {
        const nextStep = prev - 1;
        onStepChange?.(nextStep);
        return nextStep;
      });
    };

    const renderStepIndicator = () => {
      switch (variant) {
        case "cards":
          return (
            <div className="flex gap-4 mb-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className={cn(
                    "flex-1 p-4 rounded-lg border transition-colors",
                    index === currentStep
                      ? "border-primary bg-primary/5"
                      : "border-border",
                    index < currentStep && "border-success bg-success/5"
                  )}
                >
                  <h3 className="font-medium">{step.title}</h3>
                  {step.description && (
                    <p className="text-sm text-muted-foreground mt-1">
                      {step.description}
                    </p>
                  )}
                </div>
              ))}
            </div>
          );

        case "numbered":
          return (
            <div className="flex items-center gap-2 mb-8">
              {steps.map((step, index) => (
                <React.Fragment key={index}>
                  <div
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center border-2 font-medium transition-colors",
                      index === currentStep
                        ? "border-primary text-primary"
                        : "border-border",
                      index < currentStep &&
                        "border-success bg-success text-success-foreground"
                    )}
                  >
                    {index < currentStep ? (
                      <Icon icon="heroicons:check" className="w-4 h-4" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={cn(
                        "flex-1 h-0.5 transition-colors",
                        index < currentStep ? "bg-success" : "bg-border"
                      )}
                    />
                  )}
                </React.Fragment>
              ))}
            </div>
          );

        default:
          return (
            <div className="flex items-center gap-2 mb-8">
              {steps.map((step, index) => (
                <React.Fragment key={index}>
                  <div
                    className={cn(
                      "h-2 rounded-full transition-colors flex-1",
                      index === currentStep
                        ? "bg-primary"
                        : index < currentStep
                          ? "bg-success"
                          : "bg-border"
                    )}
                  />
                </React.Fragment>
              ))}
            </div>
          );
      }
    };

    return (
      <div ref={ref} className={cn("w-full", className)}>
        {renderStepIndicator()}

        <div className="mb-8">
          {currentStepData.validationErrors &&
            Object.entries(currentStepData.validationErrors).length > 0 && (
              <div className="mb-4 p-4 border border-destructive/50 bg-destructive/5 rounded-lg">
                <div className="font-medium text-destructive mb-2">
                  Please fix the following errors:
                </div>
                <ul className="list-disc list-inside text-sm text-destructive space-y-1">
                  {Object.entries(currentStepData.validationErrors).map(
                    ([field, error]) => (
                      <li key={field}>{error}</li>
                    )
                  )}
                </ul>
              </div>
            )}

          {currentStepData.content}
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handlePrevious}
            disabled={currentStep === 0}
          >
            <Icon icon="heroicons:arrow-left" className="w-4 h-4 mr-2" />
            Previous
          </Button>

          <Button
            onClick={handleNext}
            disabled={currentStepData.isValid === false}
          >
            {isLastStep ? (
              <>
                Complete
                <Icon icon="heroicons:check" className="w-4 h-4 ml-2" />
              </>
            ) : (
              <>
                Next
                <Icon icon="heroicons:arrow-right" className="w-4 h-4 ml-2" />
              </>
            )}
          </Button>
        </div>
      </div>
    );
  }
);

WizardForm.displayName = "WizardForm";

export { WizardForm };
