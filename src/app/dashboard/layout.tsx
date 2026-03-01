"use client";

import DashboardSidebar from "@/components/dashboard/DashboardSidebar";
import MobileNav from "@/components/dashboard/MobileNav";
import { useParams } from "next/navigation";
import { Suspense } from "react";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const params = useParams();
  const userName = (params?.name as string) || "User";

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* ── Desktop sidebar ── */}
      <aside className="hidden md:flex md:w-65 md:shrink-0 md:border-r md:border-sidebar-border">
        <div className="flex w-full flex-col">
          <Suspense fallback={<div className="p-4 text-sm text-muted-foreground w-65">Loading navigation...</div>}>
            <DashboardSidebar userName={userName} />
          </Suspense>
        </div>
      </aside>

      {/* ── Main area ── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile top bar + hamburger */}
        <Suspense fallback={<div className="h-14 border-b bg-background w-full" />}>
          <MobileNav userName={userName} />
        </Suspense>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}