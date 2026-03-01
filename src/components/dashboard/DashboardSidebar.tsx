"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
    LayoutDashboard,
    ScanSearch,
    History,
    Settings,
    LogOut,
    Leaf,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import axios from "axios";
import { toast } from "sonner";

interface SidebarProps {
    userName: string;
    onNavClick?: () => void;
}

const navItems = [
    {
        label: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        label: "Detect Disease",
        href: "/dashboard/detect",
        icon: ScanSearch,
    },
    {
        label: "History",
        href: "/dashboard/history",
        icon: History,
    },
    {
        label: "Settings",
        href: "/dashboard/settings",
        icon: Settings,
    },
];

const sidebarVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.08,
            delayChildren: 0.1,
        },
    },
} as const;

const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { type: "spring" as const, stiffness: 300, damping: 24 },
    },
} as const;

export default function DashboardSidebar({
    userName,
    onNavClick,
}: SidebarProps) {
    const pathname = usePathname();

    const handleLogout = async () => {
        try {
            await axios.post("/api/auth/signout");
            toast.success("Logged out successfully");
            window.location.href = "/signin";
        } catch {
            // On error, still redirect — cookie might already be cleared
            window.location.href = "/signin";
        }
    };

    const initial = userName?.charAt(0)?.toUpperCase() || "U";

    return (
        <TooltipProvider delayDuration={200}>
            <div className="flex h-full flex-col bg-sidebar text-sidebar-foreground">
                {/* ── Brand ── */}
                <motion.div
                    className="flex items-center gap-2.5 px-5 py-5"
                    initial={{ opacity: 0, y: -12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                >
                    <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Leaf className="h-5 w-5" />
                    </span>
                    <span className="text-lg font-bold tracking-tight">CropGuard</span>
                </motion.div>

                <Separator className="bg-sidebar-border" />

                {/* ── Navigation ── */}
                <ScrollArea className="flex-1 px-3 py-4">
                    <motion.nav
                        className="flex flex-col gap-1"
                        variants={sidebarVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {navItems.map((item) => {
                            const isActive =
                                pathname === item.href ||
                                (item.href !== "/dashboard" &&
                                    pathname.startsWith(item.href));
                            const Icon = item.icon;

                            return (
                                <motion.div key={item.href} variants={itemVariants}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Link
                                                href={item.href}
                                                onClick={onNavClick}
                                                className={`
                          group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium
                          transition-all duration-200
                          ${isActive
                                                        ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm"
                                                        : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                                                    }
                        `}
                                            >
                                                <Icon
                                                    className={`h-[18px] w-[18px] shrink-0 transition-colors ${isActive
                                                        ? "text-sidebar-primary"
                                                        : "text-sidebar-foreground/50 group-hover:text-sidebar-primary"
                                                        }`}
                                                />
                                                {item.label}

                                                {isActive && (
                                                    <motion.div
                                                        className="absolute left-0 h-6 w-[3px] rounded-r-full bg-sidebar-primary"
                                                        layoutId="activeNav"
                                                        transition={{
                                                            type: "spring",
                                                            stiffness: 350,
                                                            damping: 30,
                                                        }}
                                                    />
                                                )}
                                            </Link>
                                        </TooltipTrigger>
                                        <TooltipContent side="right" className="md:hidden">
                                            {item.label}
                                        </TooltipContent>
                                    </Tooltip>
                                </motion.div>
                            );
                        })}
                    </motion.nav>
                </ScrollArea>

                <Separator className="bg-sidebar-border" />

                {/* ── User profile ── */}
                <motion.div
                    className="flex items-center gap-3 px-4 py-4"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3, ease: "easeOut" }}
                >
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                        {initial}
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <p className="truncate text-sm font-semibold">{userName}</p>
                        <p className="truncate text-xs text-sidebar-foreground/60">
                            Active
                        </p>
                    </div>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 shrink-0 text-sidebar-foreground/50 hover:text-destructive"
                                onClick={handleLogout}
                            >
                                <LogOut className="h-4 w-4" />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent side="right">Sign out</TooltipContent>
                    </Tooltip>
                </motion.div>
            </div>
        </TooltipProvider>
    );
}
