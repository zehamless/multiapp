'use client'
import useSWR from 'swr'
import axios from '@/lib/axios'
import { useEffect, useCallback } from 'react'
import { useParams, useRouter } from 'next/navigation'

interface AuthProps {
    middleware?: 'auth' | 'guest'
    redirectIfAuthenticated?: string
}

interface RequestProps {
    setErrors?: (errors: any[]) => void
    setStatus?: (status: string | null) => void
    email?: string
    [key: string]: any
}

interface User {
    email_verified_at?: string
    [key: string]: any
}

export const useAuth = ({ middleware, redirectIfAuthenticated }: AuthProps = {}) => {
    const router = useRouter()
    const params = useParams()

    // Memoize the fetcher function
    const fetcher = useCallback(async (url: string) => {
        try {
            const { data } = await axios.get(url)
            return data
        } catch (err: any) {
            if (err.response?.status === 409) {
                router.push('/verify-email')
                return null
            }
            throw err
        }
    }, [router])

    const { data: user, error, mutate } = useSWR<User>('/api/user', fetcher)

    // Memoize csrf function
    const csrf = useCallback(() => axios.get('/sanctum/csrf-cookie'), [])

    // Optimized handleRequest with better error handling and type safety
    const handleRequest = useCallback(async (
        url: string,
        data: Record<string, any>,
        setErrors?: (errors: any[]) => void,
        setStatus?: (status: string | null) => void
    ) => {
        try {
            await csrf()
            setErrors?.([])
            setStatus?.(null)
            // console.log(csrf())
            await axios.post(url, data)
            await mutate()
        } catch (err: any) {
            if (err.response?.status === 422) {
                setErrors?.(err.response.data.errors)
            } else {
                throw err
            }
        }
    }, [csrf, mutate])

    // Memoized auth functions
    const register = useCallback((props: RequestProps) =>
        handleRequest('/register', props, props.setErrors),
    [handleRequest])

    const login = useCallback((props: RequestProps) =>
        handleRequest('/login', props, props.setErrors, props.setStatus),
    [handleRequest])

    const forgotPassword = useCallback((props: RequestProps) =>
        handleRequest('/forgot-password', { email: props.email }, props.setErrors, props.setStatus),
    [handleRequest])

    const resetPassword = useCallback((props: RequestProps) =>
        handleRequest('/reset-password', { token: params.token, ...props }, props.setErrors, props.setStatus),
    [handleRequest, params.token])

    const resendEmailVerification = useCallback((props: RequestProps) =>
        handleRequest('/email/verification-notification', {}, null, props.setStatus),
    [handleRequest])

    const logout = useCallback(async () => {
        try {
            if (!error) {
                await axios.post('/logout')
                await mutate()
            }
        } finally {
            window.location.pathname = '/login'
        }
    }, [error, mutate])

    // Optimized useEffect with better organization
    useEffect(() => {
        const handleAuthRedirects = () => {
            if (middleware === 'guest' && redirectIfAuthenticated && user) {
                router.push(redirectIfAuthenticated)
                return
            }

            if (middleware === 'auth') {
                if (!user?.email_verified_at) {
                    router.push('/verify-email')
                    return
                }
                if (error) {
                    logout()
                    return
                }
            }

            if (window.location.pathname === '/verify-email' && user?.email_verified_at) {
                router.push(redirectIfAuthenticated!)
            }
        }

        handleAuthRedirects()
    }, [user, error, middleware, redirectIfAuthenticated, router, logout])

    return {
        user,
        register,
        login,
        forgotPassword,
        resetPassword,
        resendEmailVerification,
        logout,
    }
}
