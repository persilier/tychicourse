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

interface ToastOptions {
    title?: string
    description?: string
    action?: ToastActionElement
    duration?: number
}

export function useCustomToast() {
    const { toast } = useToast()

    const iconClasses = "h-5 w-5 animate-in zoom-in duration-200"
    const iconContainerClasses = "mr-2 flex-shrink-0 [--scale:0.8] group-hover:[--scale:1] transition-transform duration-200 transform"

    // Rich color variants (avec fond coloré)
    const primary = ({ title = "Notification", description, action, duration }: ToastOptions) => {
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

    const success = ({ title = "Succès", description, action, duration }: ToastOptions) => {
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

    const warning = ({ title = "Attention", description, action, duration }: ToastOptions) => {
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

    const info = ({ title = "Information", description, action, duration }: ToastOptions) => {
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

    const error = ({ title = "Erreur", description, action, duration }: ToastOptions) => {
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
    const softPrimary = ({ title = "Notification", description, action, duration }: ToastOptions) => {
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

    const softSuccess = ({ title = "Succès", description, action, duration }: ToastOptions) => {
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

    const softWarning = ({ title = "Attention", description, action, duration }: ToastOptions) => {
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

    const softInfo = ({ title = "Information", description, action, duration }: ToastOptions) => {
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

    const softError = ({ title = "Erreur", description, action, duration }: ToastOptions) => {
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
    const lightPrimary = ({ title = "Notification", description, action, duration }: ToastOptions) => {
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

    const lightSuccess = ({ title = "Succès", description, action, duration }: ToastOptions) => {
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

    const lightWarning = ({ title = "Attention", description, action, duration }: ToastOptions) => {
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

    const lightInfo = ({ title = "Information", description, action, duration }: ToastOptions) => {
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

    const lightError = ({ title = "Erreur", description, action, duration }: ToastOptions) => {
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