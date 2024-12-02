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

export function RegisterForm() {
    const { register } = useAuth({
        middleware: 'guest',
        redirectIfAuthenticated: '/note',
    })
    const [isLoading, setIsLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
            passwordC: '',
        },
        validationSchema: Yup.object({
            name: Yup.string().required('Name is required'),
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
            passwordC: Yup.string()
                .oneOf([Yup.ref('password'), undefined], 'Passwords must match')
                .required('Password confirmation is required'),
        }),
        onSubmit: async (values, { setErrors, setStatus }) => {
            setIsLoading(true);
            await register({
                email: values.email,
                password: values.password,
                name: values.name,
                password_confirmation: values.passwordC,
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
                    <CardTitle className="text-2xl">Register</CardTitle>
                    <CardDescription>
                        Fill in the form below to create an account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Name</Label>
                            <Input
                                id="name"
                                type="text"
                                // name="name"
                                placeholder="Name"
                                required
                                {...formik.getFieldProps('name')}
                            />
                            {formik.touched.name && formik.errors.name ? (
                                <ErrorLabel message={formik.errors.name} />
                            ) : null}
                        </div>
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
                            <Label htmlFor="password">Password</Label>
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
                        <div className="grid gap-2">
                            <Label htmlFor="passwordC">Confirm Password</Label>
                            <Input
                                id="passwordC"
                                type="password"
                                // name="passwordC"
                                required
                                {...formik.getFieldProps('passwordC')}
                            />
                            {formik.touched.passwordC && formik.errors.passwordC ? (
                                <ErrorLabel message={formik.errors.passwordC} />
                            ) : null}
                        </div>
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="animate-spin" />
                                    Please wait
                                </>
                            ) : (
                                'Register'
                            )}
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Already have an account?{" "}
                        <Link href="/login" className="underline">
                            Login
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </form>
    )
}