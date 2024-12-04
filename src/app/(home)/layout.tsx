import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/app-sidebar"
import {Separator} from "@/components/ui/separator";
import AuthGuard from "@/components/auth-guard";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <AuthGuard>
            <SidebarProvider>
                <AppSidebar />
                <main className="w-screen">
                    <SidebarTrigger />
                    <Separator/>
                    {children}
                </main>
            </SidebarProvider>
        </AuthGuard>

    )
}
