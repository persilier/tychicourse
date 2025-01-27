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
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { Eye, EyeOff, Loader2 } from "lucide-react"

const formSchema = z.object({
    email: z.string().email("Email invalide").min(1, "Email requis"),
    password: z.string().min(1, "Mot de passe requis"),
    rememberMe: z.boolean().optional(),
})

export default function LoginPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        setIsLoading(true)
        try {
            // Simuler une requête API
            await new Promise((resolve) => setTimeout(resolve, 1500))
            console.log(values)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <AuthLayout
            title="Connexion"
            description="Connectez-vous à votre compte pour continuer"
            color="primary"
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

                    {/* Password */}
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mot de passe</FormLabel>
                                <FormControl>
                                    <div className="relative">
                                        <Input
                                            placeholder="••••••••"
                                            type={showPassword ? "text" : "password"}
                                            {...field}
                                            disabled={isLoading}
                                        />
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            size="sm"
                                            className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                            onClick={() => setShowPassword(!showPassword)}
                                            disabled={isLoading}
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4 text-muted-foreground" />
                                            ) : (
                                                <Eye className="h-4 w-4 text-muted-foreground" />
                                            )}
                                        </Button>
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Remember me & Forgot password */}
                    <div className="flex items-center justify-between">
                        <FormField
                            control={form.control}
                            name="rememberMe"
                            render={({ field }) => (
                                <div className="flex items-center space-x-2">
                                    <Checkbox
                                        id="rememberMe"
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        disabled={isLoading}
                                    />
                                    <label
                                        htmlFor="rememberMe"
                                        className="text-sm text-muted-foreground cursor-pointer select-none"
                                    >
                                        Se souvenir de moi
                                    </label>
                                </div>
                            )}
                        />
                        <Link
                            href="/auth/forgot-password"
                            className="text-sm text-primary hover:underline"
                        >
                            Mot de passe oublié ?
                        </Link>
                    </div>

                    {/* Submit */}
                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Se connecter
                    </Button>

                    {/* Sign up link */}
                    <div className="text-center text-sm text-muted-foreground">
                        Vous n&apos;avez pas de compte ?{" "}
                        <Link
                            href="/auth/register"
                            className="text-primary hover:underline"
                        >
                            Créez-en un
                        </Link>
                    </div>

                    {/* Social logins */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                            <span className="bg-card px-2 text-muted-foreground">
                                Ou continuer avec
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <Button
                            variant="outline"
                            type="button"
                            disabled={isLoading}
                            className="w-full"
                        >
                            Google
                        </Button>
                        <Button
                            variant="outline"
                            type="button"
                            disabled={isLoading}
                            className="w-full"
                        >
                            GitHub
                        </Button>
                    </div>
                </form>
            </Form>
        </AuthLayout>
    )
}