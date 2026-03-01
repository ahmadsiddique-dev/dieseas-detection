import { Activity, ServerCrash, Cpu, Database } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function SystemPage() {
    return (
        <div className="flex flex-col gap-6">
            <header className="flex items-center justify-between border-b border-border pb-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight mb-1 flex items-center gap-3">
                        <Activity className="w-6 h-6 text-green-500" />
                        2.4 Monitor System Performance
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Real-time hardware telemetry and application logs.
                    </p>
                </div>
                <Button variant="outline" className="border-green-500 text-green-500 hover:bg-green-500/10">
                    <ServerCrash className="w-4 h-4 mr-2" /> Restart Services
                </Button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-lg flex items-center justify-center">
                        <Cpu className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">CPU Usage</p>
                        <p className="text-2xl font-bold tracking-tight">14.2%</p>
                    </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center">
                        <Database className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Memory</p>
                        <p className="text-2xl font-bold tracking-tight">2.4 GB</p>
                    </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-500/10 text-orange-500 rounded-lg flex items-center justify-center">
                        <Activity className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Network In/Out</p>
                        <p className="text-2xl font-bold tracking-tight">45 MB/s</p>
                    </div>
                </div>
            </div>

            <div className="mt-4 bg-[#0a0a0a] border border-border rounded-xl overflow-hidden shadow-inner font-mono text-xs">
                <div className="bg-muted px-4 py-2 border-b border-border flex justify-between items-center text-muted-foreground font-semibold">
                    <span>LIVE TERMINAL LOGS</span>
                    <span className="flex items-center gap-2"><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> CONNECTED</span>
                </div>
                <div className="p-4 flex flex-col gap-2 h-64 overflow-y-auto text-green-400">
                    <p><span className="text-muted-foreground">[10:45:12]</span> INFO: Next.js dev server started</p>
                    <p><span className="text-muted-foreground">[10:45:15]</span> INFO: Connected to MongoDB database</p>
                    <p><span className="text-muted-foreground">[10:47:22]</span> WARN: High memory usage detected in Image Processing worker #4</p>
                    <p><span className="text-muted-foreground">[10:48:01]</span> INFO: Garbage collection sweep completed</p>
                    <p><span className="text-muted-foreground">[10:50:33]</span> INFO: New model weights loaded successfully</p>
                    <p className="opacity-50 mt-4 leading-loose">Waiting for new events...</p>
                </div>
            </div>
        </div>
    );
}
