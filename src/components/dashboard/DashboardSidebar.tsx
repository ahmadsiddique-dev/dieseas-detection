"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
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
    id?: string;
    onNavClick?: () => void;
}

const defaultNavItems = [
    {
        label: "New Scan",
        href: "/dashboard/desktop",
        icon: ScanSearch,
    }
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
    id = "desktop",
    onNavClick,
}: SidebarProps) {
    const pathname = usePathname();
    const searchParams = useSearchParams();
    const currentScanId = searchParams?.get("scan");

    const [scans, setScans] = useState<any[]>([]);
    const [isLoadingHistory, setIsLoadingHistory] = useState(true);

    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const res = await axios.get("/api/scan");
                if (res.data.success) {
                    setScans(res.data.scans);
                }
            } catch (error) {
                console.error("Failed to load history", error);
            } finally {
                setIsLoadingHistory(false);
            }
        };
        fetchHistory();
    }, []);

    const handleLogout = async () => {
        try {
            await axios.delete("/api/auth/signout");
            toast.success("Logged out successfully");
            window.location.href = "/signin";
        } catch (error) {
            toast.error("Failed to log out. Please try again.");
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
                        {defaultNavItems.map((item) => {
                            // Link to dashboard base URL if New Scan
                            const dynamicHref = item.label === "New Scan" && userName
                                ? `/dashboard/${userName.toLowerCase()}`
                                : item.href;

                            // It's active if we are on the dashboard and NOT viewing a historic scan
                            const isActive = pathname.startsWith("/dashboard") && !currentScanId && item.label === "New Scan";
                            const Icon = item.icon;

                            return (
                                <motion.div key={`${id}-${item.href}`} variants={itemVariants}>
                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Link
                                                href={dynamicHref}
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
                                                    className={`h-4.5 w-4.5 shrink-0 transition-colors ${isActive
                                                        ? "text-sidebar-primary"
                                                        : "text-sidebar-foreground/50 group-hover:text-sidebar-primary"
                                                        }`}
                                                />
                                                {item.label}

                                                {isActive && (
                                                    <motion.div
                                                        className="absolute left-0 h-6 w-0.75 rounded-r-full bg-sidebar-primary"
                                                        layoutId={`activeNav-${id}`}
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

                        {/* ── Recent Scans Section ── */}
                        <div className="mt-6 mb-2 px-3 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50 flex flex-col gap-2">
                            Recent Scans
                        </div>

                        {isLoadingHistory ? (
                            <div className="px-3 py-2 text-sm text-sidebar-foreground/50 animate-pulse">Loading history...</div>
                        ) : scans.length === 0 ? (
                            <div className="px-3 py-2 text-sm text-sidebar-foreground/50 italic">No recent scans</div>
                        ) : (
                            <div className="flex flex-col gap-1">
                                {scans.map((scan) => {
                                    const isActive = currentScanId === scan._id;
                                    const isHealthy = scan.result.isHealthy;

                                    // Use the base dashboard path for user
                                    const scanHref = userName
                                        ? `/dashboard/${userName.toLowerCase()}?scan=${scan._id}`
                                        : `/dashboard/desktop?scan=${scan._id}`;

                                    return (
                                        <motion.div key={scan._id} variants={itemVariants}>
                                            <Tooltip>
                                                <TooltipTrigger asChild>
                                                    <Link
                                                        href={scanHref}
                                                        onClick={onNavClick}
                                                        scroll={false}
                                                        className={`
                                                            group flex mx-1 items-center gap-3 rounded-lg px-2 py-2 text-sm
                                                            transition-all duration-200 border border-transparent
                                                            ${isActive
                                                                ? "bg-sidebar-accent text-sidebar-accent-foreground shadow-sm font-medium border-sidebar-border/50"
                                                                : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground"
                                                            }
                                                        `}
                                                    >
                                                        <div className="h-8 w-8 shrink-0 overflow-hidden rounded bg-sidebar-border/50">
                                                            <img src={scan.imageUrl} alt="scan" className="h-full w-full object-cover" />
                                                        </div>
                                                        <div className="flex-1 min-w-0 flex flex-col justify-center">
                                                            <p className={`truncate text-xs font-semibold ${isHealthy ? 'text-emerald-500' : 'text-orange-400'}`}>
                                                                {isHealthy ? "Healthy" : scan.result.diseaseName}
                                                            </p>
                                                            <p className="truncate text-[10px] opacity-60">
                                                                {new Date(scan.createdAt).toLocaleDateString()}
                                                            </p>
                                                        </div>
                                                    </Link>
                                                </TooltipTrigger>
                                                <TooltipContent side="right" className="md:hidden">
                                                    {isHealthy ? "Healthy" : scan.result.diseaseName}
                                                </TooltipContent>
                                            </Tooltip>
                                        </motion.div>
                                    );
                                })}
                            </div>
                        )}
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
