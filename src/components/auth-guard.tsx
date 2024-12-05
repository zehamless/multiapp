'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useAuth } from "@/hooks/auth";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { user, error } = useAuth({ middleware: 'auth' });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    // Now we can safely show loading state on client only
    if (!error && !user) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
                <p className="text-gray-600">Verifying your authentication...</p>
            </div>
        );
    }

    if (error || !user) {
        router.push('/login');
        return null;
    }

    return <>{children}</>;
}
