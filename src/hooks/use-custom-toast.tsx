"use client"

import { useToast } from "@/components/ui/use-toast"
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
    action?: React.ReactNode
    duration?: number
}

export function useCustomToast() {
    const { toast } = useToast()

    const iconClasses = "h-5 w-5 animate-in zoom-in duration-200"
    const iconContainerClasses = "mr-2 flex-shrink-0 [--scale:0.8] group-hover:[--scale:1] transition-transform duration-200 transform"

    const primary = ({ title = "Notification", description, action, duration }: ToastOptions) => {
        toast({
            title: (
                <div className="flex items-center font-medium">
                    <div className={iconContainerClasses}>
                        <Bell className={`${iconClasses} text-primary-foreground`} />
                    </div>
                    {title}
                </div>
            ),
            description,
            action,
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
            action,
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
            action,
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
            action,
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
            action,
            variant: "destructive",
            duration: duration ?? 5000,
        })
    }

    return {
        primary,
        success,
        warning,
        info,
        error,
    }
}