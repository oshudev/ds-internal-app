import { Link, usePage } from '@inertiajs/react';
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
    const page = usePage();
    const isMobile = useIsMobile();
    const { state, toggleSidebar } = useSidebar();
    const [isHovered, setIsHovered] = React.useState(false);

    React.useEffect(() => {
        if (state !== 'collapsed') {
            setIsHovered(false);
        }
    }, [state]);

    return (
        <Sidebar {...props} collapsible="icon">
            <SidebarHeader className="flex h-16 justify-center border-b group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                <SidebarMenu>
                    <SidebarMenuItem className="flex items-center" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                        <SidebarMenuButton size="lg" className="bg-transparent hover:bg-transparent" asChild>
                            {state === 'collapsed' ? (
                                <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
                                    <div
                                        className={cn(
                                            'flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground',
                                            isHovered && 'bg-transparent',
                                        )}
                                    >
                                        {isHovered ? <SidebarTrigger /> : <GalleryVerticalEnd className="size-4" />}
                                    </div>
                                </div>
                            ) : (
                                <Link href="/dashboard">
                                    <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                                        <GalleryVerticalEnd className="size-4" />
                                    </div>
                                    <div className="overflow-hidden transition-all duration-300">
                                        <span className="font-medium whitespace-nowrap">DS Law Office</span>
                                    </div>
                                </Link>
                            )}
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
                                    isActive={page.url.startsWith(item.url)}
                                    tooltip={{ children: item.title }}
                                    className={cn('flex items-center gap-2')}
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
