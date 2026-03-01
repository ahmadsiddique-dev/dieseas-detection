"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { logoutAdmin } from "@/app/admin/actions";
import {
    LayoutDashboard,
    Users,
    BrainCircuit,
    Activity,
    LogOut,
    ShieldCheck,
    ListTree,
    Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { useState } from "react";

const navItems = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Manage Users", href: "/admin/users", icon: Users },
    { name: "All Predictions", href: "/admin/predictions", icon: ListTree },
    { name: "AI Model", href: "/admin/model", icon: BrainCircuit },
    { name: "System", href: "/admin/system", icon: Activity },
];

export function AdminSidebar() {
    const pathname = usePathname();
    const [open, setOpen] = useState(false);

    const SidebarContent = () => (
        <>
            {/* Header */}
            <div className="h-16 flex items-center px-6 border-b border-border gap-3 shrink-0">
                <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                    <h2 className="text-sm font-bold tracking-tight">Admin Console</h2>
                    <p className="text-[10px] text-muted-foreground tracking-widest uppercase">Root Access</p>
                </div>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 overflow-y-auto py-6 px-3 flex flex-col gap-1">
                <p className="px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Modules</p>
                {navItems.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link
                            key={item.href}
                            href={item.href}
                            onClick={() => setOpen(false)}
                            className={cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors",
                                isActive
                                    ? "bg-primary text-primary-foreground font-semibold"
                                    : "text-muted-foreground hover:bg-muted hover:text-foreground font-medium"
                            )}
                        >
                            <Icon className="w-4 h-4" />
                            {item.name}
                        </Link>
                    );
                })}
            </div>

            {/* Footer / Logout */}
            <div className="p-4 border-t border-border shrink-0">
                <Button
                    variant="ghost"
                    className="w-full justify-start text-muted-foreground hover:text-red-500 hover:bg-red-500/10 transition-colors"
                    onClick={() => logoutAdmin()}
                >
                    <LogOut className="w-4 h-4 mr-2" />
                    Terminate Session
                </Button>
            </div>
        </>
    );

    return (
        <>
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex w-64 border-r border-border bg-card flex-col h-full shrink-0 relative">
                <SidebarContent />
            </aside>

            {/* Mobile Header & Hamburger Trigger */}
            <div className="md:hidden flex items-center justify-between px-4 h-16 border-b border-border bg-card w-full shrink-0">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary/20 text-primary flex items-center justify-center">
                        <ShieldCheck className="w-5 h-5" />
                    </div>
                    <h2 className="text-sm font-bold tracking-tight">Admin Console</h2>
                </div>
                <Sheet open={open} onOpenChange={setOpen}>
                    <SheetTrigger asChild>
                        <Button variant="ghost" size="icon" className="shrink-0">
                            <Menu className="w-6 h-6" />
                            <span className="sr-only">Toggle navigation menu</span>
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[80vw] sm:w-[300px] p-0 flex flex-col bg-card border-r-border">
                        <SheetTitle className="sr-only">Admin Navigation</SheetTitle>
                        <SidebarContent />
                    </SheetContent>
                </Sheet>
            </div>
        </>
    );
}
