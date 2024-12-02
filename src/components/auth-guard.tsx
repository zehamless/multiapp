'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {useAuth} from "@/hooks/auth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const { user } = useAuth();
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!user && !isLoading) {
            router.push('/login');
        } else {
            setIsLoading(false);
        }
    }, [user, router, isLoading]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
            </div>
        );
    }

    if (!user) {
        return null;
    }

    return <>{children}</>;
}
