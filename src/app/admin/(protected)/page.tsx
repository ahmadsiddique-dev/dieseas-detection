import {
    Users,
    BrainCircuit,
    Activity,
    ListTree,
    ArrowRight
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const modules = [
    {
        title: "Manage Users",
        description: "Creates, updates, or deletes user accounts. Ensures only authenticated and authorized users can access the system.",
        icon: Users,
        href: "/admin/users",
        color: "text-blue-500",
        bg: "bg-blue-500/10",
    },
    {
        title: "View All Predictions",
        description: "Views all prediction records submitted by users. Helps in monitoring system use and maintaining data oversight.",
        icon: ListTree,
        href: "/admin/predictions",
        color: "text-purple-500",
        bg: "bg-purple-500/10",
    },
    {
        title: "Update AI Model",
        description: "Updates or replaces the AI model to improve disease detection performance. Ensures system accuracy over time.",
        icon: BrainCircuit,
        href: "/admin/model",
        color: "text-orange-500",
        bg: "bg-orange-500/10",
    },
    {
        title: "Monitor System Performance",
        description: "Checks system logs, processing speed, storage usage, and error reports to ensure consistent and stable operation.",
        icon: Activity,
        href: "/admin/system",
        color: "text-green-500",
        bg: "bg-green-500/10",
    }
];

export default function AdminDashboard() {
    return (
        <div className="flex flex-col gap-8">
            <header className="border-b border-border pb-6">
                <h1 className="text-3xl font-bold tracking-tight">Administrator</h1>
                <p className="text-muted-foreground mt-2 max-w-2xl">
                    The Administrator manages the system, users, and AI model to maintain smooth operation.
                </p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {modules.map((m) => {
                    const Icon = m.icon;
                    return (
                        <div key={m.href} className="flex flex-col border border-border bg-card rounded-xl p-6">
                            <div className="flex items-center gap-4 mb-4">
                                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${m.bg} ${m.color}`}>
                                    <Icon className="w-6 h-6" />
                                </div>
                                <h2 className="text-lg font-bold">{m.title}</h2>
                            </div>

                            <p className="text-sm text-muted-foreground flex-1 mb-6 leading-relaxed">
                                {m.description}
                            </p>

                            <Button asChild variant="outline" className="w-fit group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                                <Link href={m.href}>
                                    Access Module <ArrowRight className="w-4 h-4 ml-2" />
                                </Link>
                            </Button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
