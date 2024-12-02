'use client';
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {useAuth} from "@/hooks/auth";
import {FormEvent} from "react";

export function RegisterForm() {

    const { register } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/note',
    })

    const submitForm = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        // console.log(formData)
        //
        await register({
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            name: formData.get('name') as string,
            password_confirmation: formData.get('passwordC') as string,
            setErrors: (errors) => console.log(errors),
            setStatus: (status) => console.log(status),
        })
    }

    return (
        <form onSubmit={submitForm}>
            <Card className="mx-auto max-w-sm">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">name</Label>
                            <Input
                                id="name"
                                type="text"
                                name="name"
                                placeholder="name"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                name="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="passwordConf">Password</Label>
                            </div>
                            <Input id="passwordC" type="password" required name="passwordC"/>
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input id="password" type="password" required name="password"/>
                        </div>
                        <Button type="submit" className="w-full">
                            Login
                        </Button>
                        <Button variant="outline" className="w-full">
                            Login with Google
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="#" className="underline">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </form>

    )
}
