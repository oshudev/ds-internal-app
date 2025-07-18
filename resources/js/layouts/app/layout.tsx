import { usePage } from '@inertiajs/react';
import { CSSProperties, type ReactNode } from 'react';

import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { BreadcrumbItem, SharedData } from '@/types';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children, breadcrumbs }: AppLayoutProps) {
    const isOpen = usePage<SharedData>().props.sidebarOpen;

    return (
        <SidebarProvider
            style={
                {
                    '--sidebar-width': '20rem',
                    '--sidebar-width-mobile': '20rem',
                } as CSSProperties
            }
            defaultOpen={isOpen}
        >
            <AppSidebar />
            <SidebarInset>
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}
