"use client"

import { AuthLayout } from "@/components/auth-layout"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, Loader2, Mail } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useToast } from "@/components/ui/use-toast"

const formSchema = z.object({
    email: z.string().email("Email invalide").min(1, "Email requis"),
})

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [emailSent, setEmailSent] = useState(false)
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        try {
            // Simuler une requête API
            await new Promise((resolve) => setTimeout(resolve, 1500))
            setEmailSent(true)
            toast({
                title: "Email envoyé",
                description: "Vérifiez votre boîte de réception pour les instructions.",
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

    if (emailSent) {
        return (
            <AuthLayout
                title="Vérifiez votre email"
                description="Nous avons envoyé un lien de réinitialisation à votre adresse email"
                color="info"
            >
                <div className="space-y-6">
                    <Alert>
                        <Mail className="h-4 w-4" />
                        <AlertTitle>Email envoyé !</AlertTitle>
                        <AlertDescription>
                            Cliquez sur le lien dans l&apos;email pour réinitialiser votre mot de passe.
                            Si vous ne trouvez pas l&apos;email, vérifiez votre dossier spam.
                        </AlertDescription>
                    </Alert>

                    <div className="flex flex-col gap-2">
                        <Button variant="outline" onClick={() => setEmailSent(false)}>
                            Renvoyer l&apos;email
                        </Button>
                        <Button variant="ghost" asChild>
                            <Link href="/auth/login" className="w-full">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Retour à la connexion
                            </Link>
                        </Button>
                    </div>
                </div>
            </AuthLayout>
        )
    }

    return (
        <AuthLayout
            title="Mot de passe oublié"
            description="Entrez votre email pour réinitialiser votre mot de passe"
            color="info"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Email */}
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="nom@exemple.com"
                                        type="email"
                                        {...field}
                                        disabled={isLoading}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Submit */}
                    <div className="flex flex-col gap-2">
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                            Envoyer le lien de réinitialisation
                        </Button>
                        <Button variant="ghost" asChild>
                            <Link href="/auth/login" className="w-full">
                                <ArrowLeft className="mr-2 h-4 w-4" />
                                Retour à la connexion
                            </Link>
                        </Button>
                    </div>
                </form>
            </Form>
        </AuthLayout>
    )
}