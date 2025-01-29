"use client"

import { useToast } from "@/components/ui/use-toast"
import { ToastActionElement } from "@/components/ui/toast"
import {
    AlertCircle,
    CheckCircle2,
    Info,
    XCircle,
    Bell
} from "lucide-react"
import { useTranslations } from "next-intl"

interface ToastOptions {
    title?: string
    description?: string
    action?: ToastActionElement
    duration?: number
}

export function useCustomToast() {
    const { toast } = useToast()
    const t = useTranslations("Common.Toast")

    const iconClasses = "h-5 w-5 animate-in zoom-in duration-200"
    const iconContainerClasses = "mr-2 flex-shrink-0 [--scale:0.8] group-hover:[--scale:1] transition-transform duration-200 transform"

    // Rich color variants (avec fond coloré)
    const primary = ({ title = t("notification"), description, action, duration }: ToastOptions) => {
        toast({
            title: (
                <div className="flex items-center">
                    <div className={iconContainerClasses}>
                        <Bell className={`${iconClasses} text-primary-foreground`} />
                    </div>
                    {title}
                </div>
            ),
            description,
            action: action as ToastActionElement,
            variant: "primary",
            duration: duration ?? 5000,
        })
    }

    const success = ({ title = t("success"), description, action, duration }: ToastOptions) => {
        toast({
            title: (
                <div className="flex items-center">
                    <div className={iconContainerClasses}>
                        <CheckCircle2 className={`${iconClasses} text-white`} />
                    </div>
                    {title}
                </div>
            ),
            description,
            action: action as ToastActionElement,
            variant: "success",
            duration: duration ?? 5000,
        })
    }

    const warning = ({ title = t("warning"), description, action, duration }: ToastOptions) => {
        toast({
            title: (
                <div className="flex items-center">
                    <div className={iconContainerClasses}>
                        <AlertCircle className={`${iconClasses} text-white`} />
                    </div>
                    {title}
                </div>
            ),
            description,
            action: action as ToastActionElement,
            variant: "warning",
            duration: duration ?? 5000,
        })
    }

    const info = ({ title = t("info"), description, action, duration }: ToastOptions) => {
        toast({
            title: (
                <div className="flex items-center">
                    <div className={iconContainerClasses}>
                        <Info className={`${iconClasses} text-white`} />
                    </div>
                    {title}
                </div>
            ),
            description,
            action: action as ToastActionElement,
            variant: "info",
            duration: duration ?? 5000,
        })
    }

    const error = ({ title = t("error"), description, action, duration }: ToastOptions) => {
        toast({
            title: (
                <div className="flex items-center">
                    <div className={iconContainerClasses}>
                        <XCircle className={`${iconClasses} text-destructive-foreground`} />
                    </div>
                    {title}
                </div>
            ),
            description,
            action: action as ToastActionElement,
            variant: "destructive",
            duration: duration ?? 5000,
        })
    }

    // Soft variants (fond légèrement coloré)
    const softPrimary = ({ title = t("notification"), description, action, duration }: ToastOptions) => {
        toast({
            title: (
                <div className="flex items-center">
                    <div className={iconContainerClasses}>
                        <Bell className={`${iconClasses} text-primary`} />
                    </div>
                    {title}
                </div>
            ),
            description,
            action: action as ToastActionElement,
            variant: "softPrimary",
            duration: duration ?? 5000,
        })
    }

    const softSuccess = ({ title = t("success"), description, action, duration }: ToastOptions) => {
        toast({
            title: (
                <div className="flex items-center">
                    <div className={iconContainerClasses}>
                        <CheckCircle2 className={`${iconClasses} text-green-700 dark:text-green-400`} />
                    </div>
                    {title}
                </div>
            ),
            description,
            action: action as ToastActionElement,
            variant: "softSuccess",
            duration: duration ?? 5000,
        })
    }

    const softWarning = ({ title = t("warning"), description, action, duration }: ToastOptions) => {
        toast({
            title: (
                <div className="flex items-center">
                    <div className={iconContainerClasses}>
                        <AlertCircle className={`${iconClasses} text-yellow-700 dark:text-yellow-400`} />
                    </div>
                    {title}
                </div>
            ),
            description,
            action: action as ToastActionElement,
            variant: "softWarning",
            duration: duration ?? 5000,
        })
    }

    const softInfo = ({ title = t("info"), description, action, duration }: ToastOptions) => {
        toast({
            title: (
                <div className="flex items-center">
                    <div className={iconContainerClasses}>
                        <Info className={`${iconClasses} text-blue-700 dark:text-blue-400`} />
                    </div>
                    {title}
                </div>
            ),
            description,
            action: action as ToastActionElement,
            variant: "softInfo",
            duration: duration ?? 5000,
        })
    }

    const softError = ({ title = t("error"), description, action, duration }: ToastOptions) => {
        toast({
            title: (
                <div className="flex items-center">
                    <div className={iconContainerClasses}>
                        <XCircle className={`${iconClasses} text-destructive`} />
                    </div>
                    {title}
                </div>
            ),
            description,
            action: action as ToastActionElement,
            variant: "softDestructive",
            duration: duration ?? 5000,
        })
    }

    // Light variants (fond blanc)
    const lightPrimary = ({ title = t("notification"), description, action, duration }: ToastOptions) => {
        toast({
            title: (
                <div className="flex items-center">
                    <div className={iconContainerClasses}>
                        <Bell className={`${iconClasses} text-primary`} />
                    </div>
                    {title}
                </div>
            ),
            description,
            action: action as ToastActionElement,
            variant: "lightPrimary",
            duration: duration ?? 5000,
        })
    }

    const lightSuccess = ({ title = t("success"), description, action, duration }: ToastOptions) => {
        toast({
            title: (
                <div className="flex items-center">
                    <div className={iconContainerClasses}>
                        <CheckCircle2 className={`${iconClasses} text-green-500`} />
                    </div>
                    {title}
                </div>
            ),
            description,
            action: action as ToastActionElement,
            variant: "lightSuccess",
            duration: duration ?? 5000,
        })
    }

    const lightWarning = ({ title = t("warning"), description, action, duration }: ToastOptions) => {
        toast({
            title: (
                <div className="flex items-center">
                    <div className={iconContainerClasses}>
                        <AlertCircle className={`${iconClasses} text-yellow-500`} />
                    </div>
                    {title}
                </div>
            ),
            description,
            action: action as ToastActionElement,
            variant: "lightWarning",
            duration: duration ?? 5000,
        })
    }

    const lightInfo = ({ title = t("info"), description, action, duration }: ToastOptions) => {
        toast({
            title: (
                <div className="flex items-center">
                    <div className={iconContainerClasses}>
                        <Info className={`${iconClasses} text-blue-500`} />
                    </div>
                    {title}
                </div>
            ),
            description,
            action: action as ToastActionElement,
            variant: "lightInfo",
            duration: duration ?? 5000,
        })
    }

    const lightError = ({ title = t("error"), description, action, duration }: ToastOptions) => {
        toast({
            title: (
                <div className="flex items-center">
                    <div className={iconContainerClasses}>
                        <XCircle className={`${iconClasses} text-destructive`} />
                    </div>
                    {title}
                </div>
            ),
            description,
            action: action as ToastActionElement,
            variant: "lightDestructive",
            duration: duration ?? 5000,
        })
    }

    return {
        // Rich color variants
        primary,
        success,
        warning,
        info,
        error,
        // Soft variants
        softPrimary,
        softSuccess,
        softWarning,
        softInfo,
        softError,
        // Light variants
        lightPrimary,
        lightSuccess,
        lightWarning,
        lightInfo,
        lightError,
    }
}