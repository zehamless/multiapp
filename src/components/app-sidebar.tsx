'use client';
import {ChartPie, NotebookPen} from "lucide-react"
import {
    Sidebar,
    SidebarContent, SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel, SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link";
import {Button} from "@/components/ui/button";
import {useAuth} from "@/hooks/auth";

export default function AppSidebar() {
    const {logout,user} = useAuth({middleware:'guest'})
    // console.log('user',user)
    return (
        <Sidebar>
            <SidebarHeader>
                <SidebarGroup>
                    <Button onClick={logout}>Logout</Button>
                </SidebarGroup>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>UML APP</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                                <SidebarMenuItem key="note">
                                    <SidebarMenuButton asChild>
                                        <Link href="/note">
                                            <NotebookPen />
                                            <span>Note</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            <SidebarMenuItem key="UML">
                                <SidebarMenuButton asChild>
                                    <Link href="/uml">
                                        <ChartPie />
                                        <span>UML</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
