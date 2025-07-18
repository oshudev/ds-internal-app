import { Link } from '@inertiajs/react';
import { BookOpen, Bot, GalleryVerticalEnd, Settings2, SquareTerminal, X } from 'lucide-react';
import * as React from 'react';

import { NavUser } from '@/components/nav-user';
import { Button } from '@/components/ui/button';
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
    SidebarTrigger,
    useSidebar,
} from '@/components/ui/sidebar';

import { useIsMobile } from '@/hooks/use-mobile';

import { cn } from '@/lib/utils';

// This is sample data.
const data = {
    navMain: [
        {
            title: 'Playground',
            url: '#',
            icon: SquareTerminal,
            isActive: true,
        },
        {
            title: 'Models',
            url: '#',
            icon: Bot,
        },
        {
            title: 'Documentation',
            url: '#',
            icon: BookOpen,
        },
        {
            title: 'Settings',
            url: '#',
            icon: Settings2,
        },
    ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { state, toggleSidebar } = useSidebar();
    const isMobile = useIsMobile();
    const [isHovered, setIsHovered] = React.useState(false);

    return (
        <Sidebar {...props} collapsible="icon">
            <SidebarHeader className="flex h-16 justify-center border-b group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                <SidebarMenu>
                    <SidebarMenuItem className="flex items-center" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                        <SidebarMenuButton size="lg" className="bg-transparent hover:bg-transparent" asChild>
                            <Link href="/dashboard">
                                <div
                                    className={cn(
                                        'flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground',
                                        state === 'collapsed' && isHovered && 'bg-transparent',
                                    )}
                                >
                                    {state === 'collapsed' && isHovered ? <SidebarTrigger /> : <GalleryVerticalEnd className="size-4" />}
                                </div>
                                <div
                                    className={`overflow-hidden transition-all duration-300 ${
                                        state === 'collapsed' ? 'w-0 opacity-0' : 'w-auto opacity-100'
                                    }`}
                                >
                                    <span className="font-medium whitespace-nowrap">DS Law Office</span>
                                </div>
                            </Link>
                        </SidebarMenuButton>
                        {state === 'expanded' && !isMobile && <SidebarTrigger />}
                        {isMobile && (
                            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="hover:bg-transparent">
                                <span className="sr-only">Close Sidebar Menu</span>
                                <X className="size-5" />
                            </Button>
                        )}
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Platform</SidebarGroupLabel>
                    <SidebarMenu>
                        {data.navMain.map((item, index) => (
                            <SidebarMenuItem key={index} className="group">
                                <SidebarMenuButton
                                    asChild
                                    className={cn(
                                        'flex items-center gap-2',
                                        item.isActive && 'bg-sidebar-secondary text-sidebar-secondary-foreground',
                                    )}
                                >
                                    <Link href={item.url}>
                                        <item.icon className="size-4" />
                                        <span className="hidden md:inline">{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        ))}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
