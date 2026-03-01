"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import DashboardSidebar from "./DashboardSidebar";
import { Leaf } from "lucide-react";

interface MobileNavProps {
    userName: string;
}

export default function MobileNav({ userName }: MobileNavProps) {
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* ── Mobile top bar ── */}
            <motion.div
                className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-sidebar/95 px-4 py-3 backdrop-blur-md md:hidden"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
            >
                {/* Brand */}
                <div className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                        <Leaf className="h-4 w-4" />
                    </span>
                    <span className="text-base font-bold tracking-tight">CropGuard</span>
                </div>

                {/* Hamburger button */}
                <button
                    onClick={() => setOpen(!open)}
                    className="relative flex h-10 w-10 flex-col items-center justify-center gap-[5px] rounded-lg transition-colors hover:bg-sidebar-accent/50"
                    aria-label={open ? "Close menu" : "Open menu"}
                >
                    <motion.span
                        className="block h-[2px] w-5 rounded-full bg-current"
                        animate={
                            open
                                ? { rotate: 45, y: 7, transition: { duration: 0.3 } }
                                : { rotate: 0, y: 0, transition: { duration: 0.3 } }
                        }
                    />
                    <motion.span
                        className="block h-[2px] w-5 rounded-full bg-current"
                        animate={
                            open
                                ? { opacity: 0, transition: { duration: 0.15 } }
                                : { opacity: 1, transition: { duration: 0.15, delay: 0.1 } }
                        }
                    />
                    <motion.span
                        className="block h-[2px] w-5 rounded-full bg-current"
                        animate={
                            open
                                ? { rotate: -45, y: -7, transition: { duration: 0.3 } }
                                : { rotate: 0, y: 0, transition: { duration: 0.3 } }
                        }
                    />
                </button>
            </motion.div>

            {/* ── Sheet drawer ── */}
            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent
                    side="left"
                    className="w-[280px] p-0 border-sidebar-border bg-sidebar"
                    showCloseButton={false}
                >
                    <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
                    <SheetDescription className="sr-only">
                        Dashboard navigation links and user profile
                    </SheetDescription>
                    <DashboardSidebar
                        userName={userName}
                        id="mobile"
                        onNavClick={() => setOpen(false)}
                    />
                </SheetContent>
            </Sheet>
        </>
    );
}

