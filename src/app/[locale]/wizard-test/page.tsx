"use client";

import { WizardForm } from "@/components/ui/wizard-form";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CircularProgress } from "@/components/ui/progress";
import { Icon } from "@iconify/react";
import { FormStatus } from "@/components/ui/form-status";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { CardCheckbox } from "@/components/ui/card-checkbox";
import { CardRadioGroup } from "@/components/ui/card-radio";
import { DatePicker } from "@/components/ui/date-picker";

export default function WizardTestPage() {
  const [selectedVariant, setSelectedVariant] = useState<
    "default" | "cards" | "numbered"
  >("default");
  const [formStatus, setFormStatus] = useState<"success" | "error" | null>(
    null
  );
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    phone: "",
    dob: "",
    notifications: {
      email: false,
      sms: false,
      marketing: false,
    },
    preferences: {
      darkMode: false,
      highContrast: false,
    },
    subscriptionPlan: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    fullName: "",
    phone: "",
    dob: "",
  });

  const validateField = (name: string, value: string) => {
    switch (name) {
      case "username":
        return value.length < 3 ? "Username must be at least 3 characters" : "";
      case "email":
        return !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
          ? "Please enter a valid email address"
          : "";
      case "password":
        return value.length < 8 ? "Password must be at least 8 characters" : "";
      case "fullName":
        return value.length < 2 ? "Full name is required" : "";
      case "phone":
        return !/^\+?[\d\s-]{10,}$/.test(value)
          ? "Please enter a valid phone number"
          : "";
      case "dob":
        return !value ? "Date of birth is required" : "";
      default:
        return "";
    }
  };

  const handleInputChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleCheckboxChange = (
    section: "notifications" | "preferences",
    name: string,
    checked: boolean
  ) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: checked,
      },
    }));
  };

  const handlePlanChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      subscriptionPlan: value,
    }));
  };

  const handleComplete = (data: any) => {
    setTimeout(() => {
      setFormStatus(Math.random() > 0.5 ? "success" : "error");
    }, 1500);
  };

  const handleReset = () => {
    setFormStatus(null);
    setFormData({
      username: "",
      email: "",
      password: "",
      fullName: "",
      phone: "",
      dob: "",
      notifications: {
        email: false,
        sms: false,
        marketing: false,
      },
      preferences: {
        darkMode: false,
        highContrast: false,
      },
      subscriptionPlan: "",
    });
    setErrors({
      username: "",
      email: "",
      password: "",
      fullName: "",
      phone: "",
      dob: "",
    });
  };

  const isStepValid = (step: number) => {
    switch (step) {
      case 0: // Account Details
        return (
          formData.username &&
          formData.email &&
          formData.password &&
          !errors.username &&
          !errors.email &&
          !errors.password
        );
      case 1: // Personal Information
        return (
          formData.fullName &&
          formData.phone &&
          formData.dob &&
          !errors.fullName &&
          !errors.phone &&
          !errors.dob
        );
      case 2: // Choose Plan
        return Boolean(formData.subscriptionPlan);
      default:
        return true;
    }
  };

  const steps = [
    {
      title: "Account Details",
      description: "Set up your account information",
      content: (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">
              Username <span className="text-destructive">*</span>
            </label>
            <Input
              placeholder="Enter your username"
              value={formData.username}
              onChange={(e) => handleInputChange("username", e.target.value)}
              variant={errors.username ? "destructive" : undefined}
              error={errors.username}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">
              Email <span className="text-destructive">*</span>
            </label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              variant={errors.email ? "destructive" : undefined}
              error={errors.email}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">
              Password <span className="text-destructive">*</span>
            </label>
            <Input
              type="password"
              placeholder="Choose a password"
              value={formData.password}
              onChange={(e) => handleInputChange("password", e.target.value)}
              variant={errors.password ? "destructive" : undefined}
              error={errors.password}
            />
          </div>
        </div>
      ),
      isValid: isStepValid(0),
    },
    {
      title: "Personal Information",
      description: "Tell us about yourself",
      content: (
        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-1 block">
              Full Name <span className="text-destructive">*</span>
            </label>
            <Input
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              variant={errors.fullName ? "destructive" : undefined}
              error={errors.fullName}
            />
          </div>
          <div>
            <label className="text-sm font-medium mb-1 block">
              Phone Number <span className="text-destructive">*</span>
            </label>
            <Input
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              variant={errors.phone ? "destructive" : undefined}
              error={errors.phone}
            />
          </div>
          <div>
            <DatePicker
              label="Date of Birth"
              required
              value={formData.dob ? new Date(formData.dob) : null}
              onChange={(date) =>
                handleInputChange("dob", date ? date.toISOString() : "")
              }
              variant={errors.dob ? "destructive" : undefined}
              error={errors.dob}
              placeholder="Select your birth date"
              isClearable={false}
              showTimeSelect
              timeFormat="HH:mm"
              dateFormat="MM/dd/yyyy HH:mm"
              timeIntervals={15}
              timeCaption="Time"
            />
          </div>
        </div>
      ),
      isValid: isStepValid(1),
    },
    {
      title: "Preferences",
      description: "Customize your experience",
      content: (
        <div className="space-y-8">
          <div className="space-y-6">
            <h3 className="text-lg font-medium">Notification Preferences</h3>
            <div className="space-y-3">
              <CardCheckbox
                icon="heroicons:envelope"
                title="Email Notifications"
                description="Receive updates and alerts via email about your account activity and important announcements."
                checked={formData.notifications.email}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(
                    "notifications",
                    "email",
                    checked as boolean
                  )
                }
                variant="info"
              />

              <CardCheckbox
                icon="heroicons:device-phone-mobile"
                title="SMS Notifications"
                description="Get instant text message alerts for time-sensitive updates and security notifications."
                checked={formData.notifications.sms}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(
                    "notifications",
                    "sms",
                    checked as boolean
                  )
                }
                variant="success"
              />

              <CardCheckbox
                icon="heroicons:megaphone"
                title="Marketing Communications"
                description="Stay updated with our latest offers, product updates, and promotional content."
                checked={formData.notifications.marketing}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(
                    "notifications",
                    "marketing",
                    checked as boolean
                  )
                }
                variant="warning"
              />
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-lg font-medium">Theme Settings</h3>
            <div className="space-y-3">
              <CardCheckbox
                icon="heroicons:moon"
                title="Dark Mode"
                description="Switch to a darker color scheme that's easier on your eyes in low-light conditions."
                checked={formData.preferences.darkMode}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(
                    "preferences",
                    "darkMode",
                    checked as boolean
                  )
                }
                variant="default"
              />

              <CardCheckbox
                icon="heroicons:eye"
                title="High Contrast"
                description="Enhance visibility with increased contrast between elements for better accessibility."
                checked={formData.preferences.highContrast}
                onCheckedChange={(checked) =>
                  handleCheckboxChange(
                    "preferences",
                    "highContrast",
                    checked as boolean
                  )
                }
                variant="destructive"
              />
            </div>
          </div>
        </div>
      ),
      isValid: true,
    },
    {
      title: "Choose Plan",
      description: "Select your subscription plan",
      content: (
        <div className="space-y-6">
          <h3 className="text-lg font-medium mb-4">Subscription Plans</h3>
          <CardRadioGroup
            value={formData.subscriptionPlan}
            onValueChange={handlePlanChange}
            options={[
              {
                value: "free",
                icon: "heroicons:sparkles",
                title: "Free Plan",
                description:
                  "Perfect for trying out our services. Basic features included.",
                variant: "default",
              },
              {
                value: "pro",
                icon: "heroicons:rocket-launch",
                title: "Pro Plan",
                description:
                  "For professionals who need advanced features and priority support.",
                variant: "info",
              },
              {
                value: "enterprise",
                icon: "heroicons:building-office-2",
                title: "Enterprise Plan",
                description:
                  "Custom solutions for large organizations with dedicated support.",
                variant: "success",
              },
              {
                value: "custom",
                icon: "heroicons:adjustments-horizontal",
                title: "Custom Plan",
                description:
                  "Contact us to create a plan that fits your specific needs.",
                variant: "warning",
              },
            ]}
          />
        </div>
      ),
      isValid: Boolean(formData.subscriptionPlan),
    },
    {
      title: "Review",
      description: "Review your information",
      content: (
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon
                  icon="heroicons:user-circle"
                  className="w-6 h-6 text-primary"
                />
              </div>
              <h3 className="font-semibold text-lg">Account Summary</h3>
            </div>
            <div className="space-y-4 pl-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                  <Icon
                    icon="heroicons:user"
                    className="w-4 h-4 text-blue-600"
                  />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Username</p>
                  <p className="font-medium">{formData.username}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
                  <Icon
                    icon="heroicons:envelope"
                    className="w-4 h-4 text-purple-600"
                  />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium">{formData.email}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                  <Icon
                    icon="heroicons:identification"
                    className="w-4 h-4 text-green-600"
                  />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">{formData.fullName}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <Icon
                    icon="heroicons:phone"
                    className="w-4 h-4 text-orange-600"
                  />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{formData.phone}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-pink-100 flex items-center justify-center">
                  <Icon
                    icon="heroicons:calendar"
                    className="w-4 h-4 text-pink-600"
                  />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Date of Birth</p>
                  <p className="font-medium">{formData.dob}</p>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon
                  icon="heroicons:cog-6-tooth"
                  className="w-6 h-6 text-primary"
                />
              </div>
              <h3 className="font-semibold text-lg">Selected Preferences</h3>
            </div>

            <div className="grid gap-4 pl-2">
              <div className="space-y-3">
                <p className="font-medium text-sm text-muted-foreground">
                  Notifications
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center",
                        formData.notifications.email
                          ? "bg-success/10"
                          : "bg-destructive/10"
                      )}
                    >
                      <Icon
                        icon={
                          formData.notifications.email
                            ? "heroicons:check"
                            : "heroicons:x-mark"
                        }
                        className={cn(
                          "w-4 h-4",
                          formData.notifications.email
                            ? "text-success"
                            : "text-destructive"
                        )}
                      />
                    </div>
                    <span>Email notifications</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center",
                        formData.notifications.sms
                          ? "bg-success/10"
                          : "bg-destructive/10"
                      )}
                    >
                      <Icon
                        icon={
                          formData.notifications.sms
                            ? "heroicons:check"
                            : "heroicons:x-mark"
                        }
                        className={cn(
                          "w-4 h-4",
                          formData.notifications.sms
                            ? "text-success"
                            : "text-destructive"
                        )}
                      />
                    </div>
                    <span>SMS notifications</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center",
                        formData.notifications.marketing
                          ? "bg-success/10"
                          : "bg-destructive/10"
                      )}
                    >
                      <Icon
                        icon={
                          formData.notifications.marketing
                            ? "heroicons:check"
                            : "heroicons:x-mark"
                        }
                        className={cn(
                          "w-4 h-4",
                          formData.notifications.marketing
                            ? "text-success"
                            : "text-destructive"
                        )}
                      />
                    </div>
                    <span>Marketing communications</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <p className="font-medium text-sm text-muted-foreground">
                  Theme Settings
                </p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center",
                        formData.preferences.darkMode
                          ? "bg-success/10"
                          : "bg-destructive/10"
                      )}
                    >
                      <Icon
                        icon={
                          formData.preferences.darkMode
                            ? "heroicons:check"
                            : "heroicons:x-mark"
                        }
                        className={cn(
                          "w-4 h-4",
                          formData.preferences.darkMode
                            ? "text-success"
                            : "text-destructive"
                        )}
                      />
                    </div>
                    <span>Dark mode</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <div
                      className={cn(
                        "w-7 h-7 rounded-full flex items-center justify-center",
                        formData.preferences.highContrast
                          ? "bg-success/10"
                          : "bg-destructive/10"
                      )}
                    >
                      <Icon
                        icon={
                          formData.preferences.highContrast
                            ? "heroicons:check"
                            : "heroicons:x-mark"
                        }
                        className={cn(
                          "w-4 h-4",
                          formData.preferences.highContrast
                            ? "text-success"
                            : "text-destructive"
                        )}
                      />
                    </div>
                    <span>High contrast</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon
                  icon="heroicons:credit-card"
                  className="w-6 h-6 text-primary"
                />
              </div>
              <h3 className="font-semibold text-lg">Selected Plan</h3>
            </div>
            <div className="space-y-4 pl-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-violet-100 flex items-center justify-center">
                  <Icon
                    icon={
                      formData.subscriptionPlan === "free"
                        ? "heroicons:sparkles"
                        : formData.subscriptionPlan === "pro"
                          ? "heroicons:rocket-launch"
                          : formData.subscriptionPlan === "enterprise"
                            ? "heroicons:building-office-2"
                            : "heroicons:adjustments-horizontal"
                    }
                    className="w-4 h-4 text-violet-600"
                  />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">
                    Subscription Plan
                  </p>
                  <p className="font-medium">
                    {formData.subscriptionPlan === "free"
                      ? "Free Plan"
                      : formData.subscriptionPlan === "pro"
                        ? "Pro Plan"
                        : formData.subscriptionPlan === "enterprise"
                          ? "Enterprise Plan"
                          : formData.subscriptionPlan === "custom"
                            ? "Custom Plan"
                            : "No plan selected"}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      ),
      isValid: true,
    },
    {
      title: "Submitting",
      description: "Please wait while we process your information",
      content: (
        <div className="min-h-[400px] flex items-center justify-center">
          {formStatus === null ? (
            <div className="text-center">
              <CircularProgress
                value={100}
                size={80}
                variant="info"
                className="mx-auto mb-4"
              />
              <h3 className="text-lg font-medium mb-2">
                Processing Your Information
              </h3>
              <p className="text-muted-foreground">
                Please wait while we validate and save your details...
              </p>
            </div>
          ) : (
            <FormStatus
              status={formStatus}
              title={
                formStatus === "success"
                  ? "Registration Complete!"
                  : "Registration Failed"
              }
              message={
                formStatus === "success"
                  ? "Your account has been successfully created. You can now log in using your credentials."
                  : "We encountered an error while processing your registration. Please try again or contact support if the problem persists."
              }
              onReset={handleReset}
              className="w-full max-w-md"
            />
          )}
        </div>
      ),
      isValid: true,
    },
  ];

  return (
    <div className="container max-w-4xl py-10">
      <div className="flex items-center gap-4 mb-8">
        <div className="flex-1">
          <h1 className="text-3xl font-bold">Wizard Form Variants</h1>
          <p className="text-muted-foreground mt-2">
            Choose from three different styles of multi-step forms
          </p>
        </div>
        <CircularProgress
          value={75}
          size={60}
          showValue
          variant="success"
          className="hidden sm:flex"
        />
      </div>

      <div className="flex justify-start mb-8 p-1 bg-background border rounded-lg">
        <button
          onClick={() => setSelectedVariant("default")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
            selectedVariant === "default"
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          )}
        >
          <Icon icon="heroicons:bars-3-bottom-left" className="w-4 h-4" />
          Default Style
        </button>
        <button
          onClick={() => setSelectedVariant("cards")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
            selectedVariant === "cards"
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          )}
        >
          <Icon icon="heroicons:squares-2x2" className="w-4 h-4" />
          Cards Style
        </button>
        <button
          onClick={() => setSelectedVariant("numbered")}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-md transition-colors",
            selectedVariant === "numbered"
              ? "bg-primary text-primary-foreground"
              : "hover:bg-muted"
          )}
        >
          <Icon icon="heroicons:list-bullet" className="w-4 h-4" />
          Numbered Style
        </button>
      </div>

      <Card className="p-6 border-2">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold">
              {selectedVariant === "default" && "Default Progress Bar Style"}
              {selectedVariant === "cards" && "Cards Style"}
              {selectedVariant === "numbered" && "Numbered Style"}
            </h2>
            <p className="text-muted-foreground mt-1">
              {selectedVariant === "default" &&
                "A simple and clean style with a progress bar indicating the current step"}
              {selectedVariant === "cards" &&
                "Each step is represented by a card with its own progress indicator"}
              {selectedVariant === "numbered" &&
                "Steps are shown with numbers and connecting lines for clear progression"}
            </p>
          </div>
          <CircularProgress
            value={
              selectedVariant === "default"
                ? 25
                : selectedVariant === "cards"
                  ? 50
                  : 75
            }
            size={50}
            showValue
            variant={
              selectedVariant === "default"
                ? "default"
                : selectedVariant === "cards"
                  ? "info"
                  : "warning"
            }
            className="hidden sm:flex"
          />
        </div>
        <div className="bg-muted/50 rounded-lg p-6">
          <WizardForm
            steps={steps}
            variant={selectedVariant}
            onComplete={handleComplete}
          />
        </div>
      </Card>

      <div className="mt-8 p-4 bg-muted/30 rounded-lg">
        <div className="flex items-center gap-4">
          <Icon
            icon="heroicons:information-circle"
            className="w-5 h-5 text-muted-foreground"
          />
          <div className="flex-1">
            <h3 className="font-medium">Form Progress</h3>
            <p className="text-sm text-muted-foreground">
              Each variant shows progress differently. Try them all to find what
              works best for your needs.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <CircularProgress value={25} size={30} variant="default" />
            <CircularProgress value={50} size={30} variant="info" />
            <CircularProgress value={75} size={30} variant="success" />
          </div>
        </div>
      </div>
    </div>
  );
}
