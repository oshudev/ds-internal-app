import { Equal } from 'lucide-react';

import { Breadcrumbs } from '@/components/breadcrumbs';
import { Button } from '@/components/ui/button';
import { useSidebar } from '@/components/ui/sidebar';

import { useIsMobile } from '@/hooks/use-mobile';

import { type BreadcrumbItem as BreadcrumbItemType } from '@/types';

export function AppSidebarHeader({ breadcrumbs = [] }: { breadcrumbs?: BreadcrumbItemType[] }) {
    const { toggleSidebar } = useSidebar();
    const isMobile = useIsMobile();

    return (
        <header className="flex h-16 shrink-0 items-center gap-2 border-b border-sidebar-border/50 px-6 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 md:px-4">
            <div className="flex items-center gap-2">
                {isMobile && (
                    <Button variant="ghost" size="icon" onClick={toggleSidebar} className="hover:bg-transparent">
                        <span className="sr-only">Sidebar Menu</span>
                        <Equal className="size-5" />
                    </Button>
                )}
                <Breadcrumbs breadcrumbs={breadcrumbs} />
            </div>
        </header>
    );
}
