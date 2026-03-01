"use client";

import { useState, useEffect, useRef } from "react";
import { BrainCircuit, UploadCloud, Terminal, ShieldAlert, Zap, Server, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function ModelPage() {
    const [isUpdating, setIsUpdating] = useState(false);
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);
    const [modelInfo, setModelInfo] = useState({
        version: "CropGuard Nexus v3.8",
        updatedAt: "2026-02-15 14:30 UTC",
        accuracy: "97.8%"
    });

    const logsEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (logsEndRef.current) {
            logsEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [logs]);

    const handleUpdate = () => {
        if (isUpdating) return;
        setIsUpdating(true);
        setProgress(0);
        setLogs(["[SYSTEM] Initiating CropGuard core model hot-swap sequence..."]);

        const simulationSteps = [
            { msg: "[INFO] Allocating secure neural cloud enclaves...", delay: 800 },
            { msg: "[INFO] Fetching CropGuard proprietary weight fragments...", delay: 1800 },
            { msg: "[WARN] Re-aligning neural pathways for custom pathology heuristics...", delay: 3000 },
            { msg: "[INFO] Compiling proprietary tensor architecture...", delay: 4200 },
            { msg: "[INFO] Running internal zero-shot validation...", delay: 5600 },
            { msg: "[INFO] Validation passed. Top-1 precision threshold exceeded.", delay: 6800 },
            { msg: "[WARN] Suspending active inference nodes for 50ms...", delay: 7800 },
            { msg: "[INFO] Injecting new model cluster config...", delay: 8500 },
            { msg: "[SYSTEM] Update sequence complete. Returning to active duty.", delay: 9500 }
        ];

        simulationSteps.forEach(({ msg, delay }, index) => {
            setTimeout(() => {
                setLogs(prev => [...prev, msg]);
                setProgress(Math.min(100, Math.round(((index + 1) / simulationSteps.length) * 100)));

                if (index === simulationSteps.length - 1) {
                    setTimeout(() => {
                        setIsUpdating(false);
                        setModelInfo({
                            version: "CropGuard Nexus v4.0",
                            updatedAt: new Date().toISOString().replace('T', ' ').substring(0, 16) + " UTC",
                            accuracy: "98.5%"
                        });
                        toast.success("CropGuard proprietary AI model updated successfully!");
                    }, 1500);
                }
            }, delay);
        });

        // Fake progress smoothing
        const interval = setInterval(() => {
            setProgress(p => {
                if (p >= 99 || !isUpdating) {
                    clearInterval(interval);
                    return p;
                }
                const increment = Math.random() * 2;
                return Math.min(99, p + increment);
            });
        }, 200);

        setTimeout(() => clearInterval(interval), 11000);
    };

    return (
        <div className="flex flex-col gap-6">
            <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0 border-b border-border pb-6">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight mb-1 flex items-center gap-3">
                        <BrainCircuit className="w-6 h-6 text-orange-500" />
                        2.3 Manage AI Core
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Deploy proprietary model upgrades securely to the production environment.
                    </p>
                </div>
                <Button
                    className="bg-orange-600 hover:bg-orange-700 disabled:opacity-50"
                    onClick={handleUpdate}
                    disabled={isUpdating}
                >
                    {isUpdating ? (
                        <span className="flex items-center gap-2">
                            <Zap className="w-4 h-4 animate-pulse" /> Deploying Update...
                        </span>
                    ) : (
                        <span className="flex items-center gap-2">
                            <UploadCloud className="w-4 h-4" /> Trigger Network Update
                        </span>
                    )}
                </Button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-6">
                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm relative overflow-hidden">
                        {/* Decorative glow */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-orange-500/10 blur-3xl pointer-events-none rounded-full" />

                        <h3 className="font-bold border-b border-border pb-3 mb-4 flex items-center gap-2 relative z-10">
                            <Server className="w-4 h-4 text-orange-500" /> Active System Details
                        </h3>
                        <div className="space-y-4 text-sm font-medium relative z-10">
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Proprietary Core</span>
                                <span className="text-foreground tracking-wide">{modelInfo.version}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Last Deployed</span>
                                <span className="text-foreground font-mono">{modelInfo.updatedAt}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Precision Level</span>
                                <span className="text-green-500 font-bold">{modelInfo.accuracy} Top-1</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-muted-foreground">Network Status</span>
                                <span className="flex items-center gap-2 text-xs font-bold px-2 py-1 bg-green-500/10 text-green-500 rounded-md">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" /> ONLINE
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-card border border-border rounded-xl p-6 shadow-sm border-dashed">
                        <div className="flex flex-col items-center justify-center text-center text-muted-foreground h-full py-8">
                            <ShieldAlert className="w-10 h-10 mb-3 text-orange-500/50" />
                            <h3 className="font-semibold text-foreground mb-1">Restricted Override</h3>
                            <p className="text-xs w-3/4 mb-4">
                                Manual `.cgmodel` signature uploads are restricted to authorized infrastructure technicians.
                            </p>
                            <Button variant="outline" size="sm" disabled className="opacity-50 pointer-events-none">
                                Select Encrypted Payload
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="bg-[#0a0a0c] border border-border rounded-xl overflow-hidden shadow-inner flex flex-col h-[400px]">
                    <div className="bg-muted/50 px-4 py-3 border-b border-border flex justify-between items-center text-muted-foreground">
                        <span className="text-xs font-bold uppercase flex items-center gap-2">
                            <Terminal className="w-4 h-4" /> Deployment Simulation Log
                        </span>
                        {isUpdating && (
                            <span className="text-xs font-bold text-orange-500 animate-pulse">
                                ROUTING TRAFFIC...
                            </span>
                        )}
                    </div>

                    <div className="p-4 flex flex-col gap-2 flex-1 overflow-y-auto font-mono text-xs text-green-400">
                        {logs.length === 0 ? (
                            <p className="text-muted-foreground/50 italic mt-auto mb-auto text-center">
                                System standing by for remote commands...
                            </p>
                        ) : (
                            logs.map((log, i) => (
                                <p key={i} className={log.includes("WARN") ? "text-orange-400" : log.includes("SYSTEM") ? "text-blue-400 font-semibold" : "text-green-400"}>
                                    {log}
                                </p>
                            ))
                        )}
                        <div ref={logsEndRef} />
                    </div>

                    {isUpdating && (
                        <div className="p-4 border-t border-border bg-card">
                            <div className="flex justify-between text-xs font-bold mb-2">
                                <span className="text-orange-500">Injecting Payload...</span>
                                <span>{Math.round(progress)}%</span>
                            </div>
                            <div className="h-2 w-full bg-muted overflow-hidden rounded-full">
                                <div
                                    className="h-full bg-orange-500 transition-all duration-300 ease-out"
                                    style={{ width: `${progress}%` }}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
