import { requireAdmin } from "../actions";
import { AdminSidebar } from "@/components/admin/AdminSidebar";

export default async function AdminProtectedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    // 1. Enforce authentication on all routes within this group
    await requireAdmin();

    // 2. Render the authenticated dashboard shell
    return (
        <div className="flex flex-col md:flex-row h-screen bg-background text-foreground overflow-hidden">
            {/* Sidebar Navigation */}
            <AdminSidebar />

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto w-full relative">
                <div className="mx-auto max-w-7xl p-4 md:p-8 h-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
