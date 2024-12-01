import {ChartPie, NotebookPen} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link";

export default function AppSidebar() {
    return (
        <Sidebar>
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
