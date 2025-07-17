import { Head } from '@inertiajs/react';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/components/ui/button';

export default function Login() {
    return (
        <>
            <Head title="Login" />
            <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
                <div className="w-full max-w-sm">
                    <div className="flex flex-col gap-8">
                        <div className="flex flex-col items-center gap-4">
                            <div className="flex flex-col items-center gap-2 font-medium">
                                <div className="mb-1 flex h-9 w-9 items-center justify-center rounded-md"></div>
                                <span className="sr-only">Log in to you account</span>
                            </div>
                            <div className="space-y-2 text-center">
                                <h1 className="text-xl font-medium">Log in to you account</h1>
                            </div>
                        </div>
                        <Button variant="outline" size="lg" asChild>
                            <a href="/auth/google/redirect" className="flex items-center gap-2 tracking-wide">
                                <FcGoogle />
                                Google
                            </a>
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
