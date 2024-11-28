import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import AppSidebar from "@/components/app-sidebar"
import {Separator} from "@/components/ui/separator";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className="container">
                <SidebarTrigger />
                <Separator/>
                {children}
            </main>
        </SidebarProvider>
    )
}
