'use client';
import Link from "next/link"
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';

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
import { useAuth } from "@/hooks/auth";
import { ErrorLabel } from "@/components/error-label";
import { Loader2 } from 'lucide-react';

export function LoginForm() {
    const { login } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/note',
    })
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().required('Password is required'),
        }),
        onSubmit: async (values, { setErrors, setStatus }) => {
            setIsLoading(true);
            await login({
                email: values.email,
                password: values.password,
                remember: true,
                setErrors: (errors) => console.log(errors),
                setStatus: (status) => console.log(status),
            });
            setIsLoading(false);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
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
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                // name="email"
                                placeholder="m@example.com"
                                required
                                {...formik.getFieldProps('email')}
                            />
                            {formik.touched.email && formik.errors.email ? (
                                <ErrorLabel message={formik.errors.email} />
                            ) : null}
                        </div>
                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input
                                id="password"
                                type="password"
                                // name="password"
                                required
                                {...formik.getFieldProps('password')}
                            />
                            {formik.touched.password && formik.errors.password ? (
                                <ErrorLabel message={formik.errors.password} />
                            ) : null}
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                'Login'
                            )}
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link href="/registration" className="underline">
                            Sign up
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </form>
    )
}