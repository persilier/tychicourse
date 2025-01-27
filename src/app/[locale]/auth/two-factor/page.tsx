"use client"

import * as React from "react"
import { AuthLayout } from "@/components/auth-layout"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, ShieldCheck, SmartphoneNfc, Timer } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"
import { InputOTPLight } from "@/components/ui/input-otp-light"

const formSchema = z.object({
    code: z.string().length(6, "Le code doit contenir 6 chiffres"),
})

export default function TwoFactorPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [timeLeft, setTimeLeft] = useState(300) // 5 minutes en secondes
    const router = useRouter()
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            code: "",
        },
    })

    // Compte à rebours pour l'expiration du code
    React.useEffect(() => {
        if (timeLeft <= 0) return

        const timer = setInterval(() => {
            setTimeLeft((prev) => prev - 1)
        }, 1000)

        return () => clearInterval(timer)
    }, [timeLeft])

    // Formatage du temps restant
    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${mins}:${secs.toString().padStart(2, "0")}`
    }

    const handleResendCode = async () => {
        setIsLoading(true)
        try {
            // Simuler une requête API
            await new Promise((resolve) => setTimeout(resolve, 1500))
            setTimeLeft(300) // Réinitialiser le compte à rebours
            toast({
                title: "Code envoyé",
                description: "Un nouveau code a été envoyé à votre appareil.",
                variant: "success",
            })
        } catch (error) {
            toast({
                title: "Erreur",
                description: "Une erreur est survenue. Veuillez réessayer.",
                variant: "destructive",
            })
        } finally {
            setIsLoading(false)
        }
    }

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        try {
            // Simuler une requête API
            await new Promise((resolve) => setTimeout(resolve, 1500))
            toast({
                title: "Vérification réussie",
                description: "Vous allez être redirigé...",
                variant: "success",
            })
            // Rediriger vers le dashboard après 1 seconde
            setTimeout(() => {
                router.push("/dashboard")
            }, 1000)
        } catch (error) {
            toast({
                title: "Code invalide",
                description: "Le code entré n'est pas valide. Veuillez réessayer.",
                variant: "destructive",
            })
            form.reset()
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AuthLayout
            title="Vérification en deux étapes"
            description="Entrez le code à 6 chiffres envoyé à votre appareil"
            color="warning"
        >
            <div className="space-y-6">
                {/* Icon */}
                <div className="flex justify-center">
                    <div className="rounded-full bg-warning/20 p-4">
                        <SmartphoneNfc className="h-12 w-12 text-warning" />
                    </div>
                </div>

                {/* Timer */}
                <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Timer className="h-4 w-4" />
                    <span>
                        Code valide pendant: {formatTime(timeLeft)}
                    </span>
                </div>

                {/* Form */}
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <InputOTPLight
                                            maxLength={6}
                                            value={field.value}
                                            onChange={field.onChange}
                                            disabled={isLoading || timeLeft <= 0}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Actions */}
                        <div className="space-y-2">
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isLoading || timeLeft <= 0}
                            >
                                {isLoading ? (
                                    <>
                                        <ShieldCheck className="mr-2 h-4 w-4 animate-spin" />
                                        Vérification...
                                    </>
                                ) : (
                                    "Vérifier"
                                )}
                            </Button>

                            <div className="flex flex-col gap-2 sm:flex-row">
                                <Button
                                    type="button"
                                    variant="outline"
                                    className="w-full"
                                    onClick={handleResendCode}
                                    disabled={isLoading || timeLeft > 0}
                                >
                                    Renvoyer le code
                                </Button>

                                <Button
                                    variant="ghost"
                                    className="w-full gap-2"
                                    asChild
                                >
                                    <Link href="/auth/login">
                                        <ArrowLeft className="h-4 w-4" />
                                        Retour à la connexion
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </form>
                </Form>

                {/* Aide */}
                <Alert>
                    <AlertTitle>Vous n&apos;avez pas reçu le code ?</AlertTitle>
                    <AlertDescription className="mt-2 text-sm text-muted-foreground">
                        <ul className="list-inside list-disc space-y-1">
                            <li>Vérifiez que votre appareil est bien connecté</li>
                            <li>Le code peut prendre jusqu&apos;à une minute pour arriver</li>
                            <li>Vérifiez que vous utilisez le bon appareil</li>
                        </ul>
                        <p className="mt-2">
                            Si vous continuez à avoir des problèmes, contactez le{" "}
                            <Link href="/support" className="text-primary hover:underline">
                                support
                            </Link>
                            .
                        </p>
                    </AlertDescription>
                </Alert>
            </div>
        </AuthLayout>
    )
}