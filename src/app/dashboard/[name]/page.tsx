"use client";

import { useParams } from "next/navigation";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { ScanSearch, History, Settings, TrendingUp } from "lucide-react";
import Link from "next/link";

const quickActions = [
  {
    title: "Detect Disease",
    description: "Upload a rice leaf image for instant AI analysis",
    icon: ScanSearch,
    href: "/dashboard/detect",
    color: "text-emerald-500",
    bgColor: "bg-emerald-500/10",
  },
  {
    title: "View History",
    description: "Check your past detection results and reports",
    icon: History,
    href: "/dashboard/history",
    color: "text-blue-500",
    bgColor: "bg-blue-500/10",
  },
  {
    title: "Statistics",
    description: "View trends and analytics for your detections",
    icon: TrendingUp,
    href: "/dashboard/stats",
    color: "text-amber-500",
    bgColor: "bg-amber-500/10",
  },
  {
    title: "Settings",
    description: "Manage your account preferences and profile",
    icon: Settings,
    href: "/dashboard/settings",
    color: "text-purple-500",
    bgColor: "bg-purple-500/10",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.15,
    },
  },
} as const;

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 260,
      damping: 22,
    },
  },
};

export default function DashboardPage() {
  const { name } = useParams();

  const displayName =
    typeof name === "string"
      ? decodeURIComponent(name).replace(/^\w/, (c) => c.toUpperCase())
      : "User";

  return (
    <div className="px-4 py-6 sm:px-6 lg:px-8">
      {/* ── Welcome header ── */}
      <motion.div
        className="mb-8"
        initial={{ opacity: 0, y: -15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Welcome back,{" "}
          <span className="bg-gradient-to-r from-primary to-amber-500 bg-clip-text text-transparent">
            {displayName}
          </span>
          !
        </h1>
        <p className="mt-1 text-sm text-muted-foreground sm:text-base">
          Here&apos;s an overview of your crop health dashboard. Start a new
          detection or review past results.
        </p>
      </motion.div>

      {/* ── Quick actions grid ── */}
      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {quickActions.map((action) => {
          const Icon = action.icon;
          return (
            <motion.div key={action.title} variants={cardVariants}>
              <Link href={action.href} className="block h-full">
                <Card className="group h-full border-border/50 bg-card/60 backdrop-blur-sm transition-all duration-300 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/5">
                  <CardContent className="flex flex-col gap-3 p-5">
                    <div
                      className={`flex h-11 w-11 items-center justify-center rounded-xl ${action.bgColor} transition-transform duration-300 group-hover:scale-110`}
                    >
                      <Icon className={`h-5 w-5 ${action.color}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold">{action.title}</h3>
                      <p className="mt-0.5 text-sm text-muted-foreground">
                        {action.description}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* ── Recent activity placeholder ── */}
      <motion.div
        className="mt-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
      >
        <h2 className="mb-4 text-lg font-semibold">Recent Activity</h2>
        <Card className="border-border/50 bg-card/60 backdrop-blur-sm">
          <CardContent className="flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-2xl bg-muted">
              <History className="h-6 w-6 text-muted-foreground" />
            </div>
            <p className="font-medium">No activity yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Start by detecting a disease on a rice leaf image.
            </p>
            <Link
              href="/dashboard/detect"
              className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <ScanSearch className="h-4 w-4" />
              Start Detection
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
