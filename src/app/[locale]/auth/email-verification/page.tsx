"use client"

import { AuthLayout } from "@/components/auth-layout"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import { Mail, Loader2, ArrowLeft, RefreshCw } from "lucide-react"
import { useState } from "react"
import Link from "next/link"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function EmailVerificationPage() {
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()

    const handleResendEmail = async () => {
        setIsLoading(true)
        try {
            // Simuler une requête API
            await new Promise((resolve) => setTimeout(resolve, 1500))
            toast({
                title: "Email envoyé",
                description: "Un nouvel email de vérification a été envoyé.",
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

    return (
        <AuthLayout
            title="Vérifiez votre email"
            description="Un lien de vérification a été envoyé à votre adresse email"
            color="info"
        >
            <div className="space-y-6">
                {/* Icon */}
                <div className="flex justify-center">
                    <div className="rounded-full bg-primary/10 p-4">
                        <Mail className="h-12 w-12 text-primary" />
                    </div>
                </div>

                {/* Instructions */}
                <Alert variant="info" className="text-left">
                    <AlertTitle className="mb-2 flex items-center gap-2">
                        <Mail className="h-4 w-4" />
                        Vérifiez votre boîte de réception
                    </AlertTitle>
                    <AlertDescription className="space-y-3">
                        <p>
                            Nous avons envoyé un lien de vérification à votre adresse email.
                            Cliquez sur le lien dans l&apos;email pour vérifier votre compte.
                        </p>
                        <ul className="list-inside list-disc text-sm text-muted-foreground">
                            <li>Vérifiez votre dossier spam si vous ne trouvez pas l&apos;email</li>
                            <li>L&apos;email peut prendre quelques minutes pour arriver</li>
                            <li>Le lien de vérification expire après 24 heures</li>
                        </ul>
                    </AlertDescription>
                </Alert>

                {/* Actions */}
                <div className="space-y-2">
                    <Button
                        variant="outline"
                        className="w-full gap-2"
                        onClick={handleResendEmail}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                            <RefreshCw className="h-4 w-4" />
                        )}
                        Renvoyer l&apos;email de vérification
                    </Button>

                    <div className="flex flex-col gap-2 sm:flex-row">
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

                        <Button
                            variant="ghost"
                            className="w-full gap-2"
                            asChild
                        >
                            <Link href="/support">
                                Contacter le support
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Infos complémentaires */}
                <div className="text-center text-sm text-muted-foreground">
                    <p>
                        Assurez-vous d&apos;avoir vérifié votre adresse email pour accéder à toutes
                        les fonctionnalités de votre compte.
                    </p>
                </div>

                {/* Session expiration warning */}
                <Alert variant="warning" className="text-left">
                    <AlertTitle>Important</AlertTitle>
                    <AlertDescription>
                        Votre session expirera dans 15 minutes. Vérifiez votre email avant la fin de
                        ce délai ou vous devrez vous reconnecter.
                    </AlertDescription>
                </Alert>
            </div>
        </AuthLayout>
    )
}