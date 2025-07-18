import { CSSProperties, type ReactNode } from 'react';

import { AppSidebar } from '@/components/app-sidebar';
import { AppSidebarHeader } from '@/components/app-sidebar-header';
import { SidebarInset, SidebarProvider } from '@/components/ui/sidebar';

import { BreadcrumbItem } from '@/types';

interface AppLayoutProps {
    children: ReactNode;
    breadcrumbs?: BreadcrumbItem[];
}

export default function AppLayout({ children, breadcrumbs }: AppLayoutProps) {
    return (
        <SidebarProvider
            style={
                {
                    '--sidebar-width': '20rem',
                    '--sidebar-width-mobile': '20rem',
                } as CSSProperties
            }
        >
            <AppSidebar />
            <SidebarInset>
                <AppSidebarHeader breadcrumbs={breadcrumbs} />
                {children}
            </SidebarInset>
        </SidebarProvider>
    );
}
