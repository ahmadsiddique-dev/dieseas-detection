"use client";

import { useState, useEffect, useRef } from "react";
import { Activity, ServerCrash, Cpu, Database, Network } from "lucide-react";
import { Button } from "@/components/ui/button";

// A predefined pool of realistic looking serverless events
const logTemplates = [
    "[INFO] Edge function booted in region iad1 (us-east)",
    "[INFO] Cache HIT for /api/predictions?userId=anon",
    "[WARN] Execution time exceeded 800ms for routine: cropguard-infer",
    "[INFO] Successful connection to MongoDB Cluster Atlas-xyz",
    "[INFO] Request ID {reqId} processed smoothly",
    "[ERROR] Non-fatal: Image payload too large. Falling back to compression.",
    "[INFO] Garbage collection triggered on worker node",
    "[INFO] Serving cached inference block to region lhr1 (eu-west)",
    "[INFO] Vercel Analytics ping successful",
];

export default function SystemPage() {
    const [cpu, setCpu] = useState(14.2);
    const [memory, setMemory] = useState(1.2);
    const [network, setNetwork] = useState(45);
    const [logs, setLogs] = useState([
        "[" + new Date().toLocaleTimeString() + "] INFO: Initializing CropGuard distributed edge network...",
        "[" + new Date().toLocaleTimeString() + "] INFO: Establishing secure connection to primary datastore...",
    ]);
    const [isRestarting, setIsRestarting] = useState(false);

    const logsEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll terminal
    useEffect(() => {
        if (logsEndRef.current) {
            logsEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
    }, [logs]);

    // Simulate real-time metrics jumping around naturally
    useEffect(() => {
        const interval = setInterval(() => {
            // CPU fluctuates between 5% and 45% normally
            setCpu(prev => {
                const change = (Math.random() * 4) - 2;
                return Math.max(5.1, Math.min(65.5, prev + change));
            });

            // Memory fluctuates very slightly
            setMemory(prev => {
                const change = (Math.random() * 0.1) - 0.05;
                return Math.max(0.8, Math.min(2.5, prev + change));
            });

            // Network traffic spikes and dips
            setNetwork(prev => {
                const change = (Math.random() * 20) - 10;
                return Math.max(12, Math.min(150, prev + change));
            });
        }, 1500);

        return () => clearInterval(interval);
    }, []);

    // Randomly insert terminal logs
    useEffect(() => {
        const logInterval = setInterval(() => {
            if (isRestarting) return; // Pause logs if restarting

            const template = logTemplates[Math.floor(Math.random() * logTemplates.length)];
            const newLog = `[${new Date().toLocaleTimeString()}] ${template.replace('{reqId}', Math.random().toString(36).substring(7))}`;

            setLogs(prev => {
                const newLogs = [...prev, newLog];
                return newLogs.slice(-50); // Keep last 50 logs only
            });
        }, Math.random() * 3000 + 2000); // Between 2-5 seconds

        return () => clearInterval(logInterval);
    }, [isRestarting]);

    const handleRestart = () => {
        if (isRestarting) return;
        setIsRestarting(true);
        setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] [SYSTEM] Force restarting all edge workers...`]);
        setCpu(99.9);
        setMemory(0.1);
        setNetwork(0);

        setTimeout(() => {
            setLogs(prev => [...prev, `[${new Date().toLocaleTimeString()}] [INFO] Edge nodes successfully rebooted.`]);
            setIsRestarting(false);
            setCpu(12.5);
        }, 4000);
    };

    return (
        <div className="flex flex-col gap-6 h-full w-full max-w-[100vw] overflow-hidden">
            <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 md:gap-0 border-b border-border pb-6 shrink-0">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight mb-1 flex items-center gap-3">
                        <Activity className="w-6 h-6 text-green-500" />
                        2.4 Monitor System Performance
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Real-time hardware telemetry and application logs.
                    </p>
                </div>
                <Button
                    variant="outline"
                    className="border-green-500 text-green-500 hover:bg-green-500/10 transition-colors"
                    onClick={handleRestart}
                    disabled={isRestarting}
                >
                    <ServerCrash className="w-4 h-4 mr-2" />
                    {isRestarting ? "Rebooting nodes..." : "Restart Services"}
                </Button>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 shrink-0">
                <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex items-center gap-4 transition-all">
                    <div className="w-12 h-12 bg-green-500/10 text-green-500 rounded-lg flex items-center justify-center shrink-0">
                        <Cpu className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Active CPU Load</p>
                        <p className={`text-2xl font-bold tracking-tight transition-colors ${cpu > 80 ? 'text-red-500' : 'text-foreground'}`}>
                            {cpu.toFixed(1)}%
                        </p>
                    </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex items-center gap-4 transition-all">
                    <div className="w-12 h-12 bg-blue-500/10 text-blue-500 rounded-lg flex items-center justify-center shrink-0">
                        <Database className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Allocated Memory</p>
                        <p className="text-2xl font-bold tracking-tight text-foreground">
                            {memory.toFixed(2)} GB
                        </p>
                    </div>
                </div>

                <div className="bg-card border border-border rounded-xl p-6 shadow-sm flex items-center gap-4 transition-all">
                    <div className="w-12 h-12 bg-orange-500/10 text-orange-500 rounded-lg flex items-center justify-center shrink-0">
                        <Network className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider font-semibold">Network I/O</p>
                        <p className="text-2xl font-bold tracking-tight text-foreground">
                            {network.toFixed(0)} MB/s
                        </p>
                    </div>
                </div>
            </div>

            <div className="flex-1 bg-[#0a0a0c] border border-border rounded-xl overflow-hidden shadow-inner font-mono text-xs flex flex-col min-h-[300px]">
                <div className="bg-muted px-4 py-2 border-b border-border flex justify-between items-center text-muted-foreground font-semibold shrink-0">
                    <span className="tracking-widest">LIVE TERMINAL LOGS</span>
                    <span className="flex items-center gap-2">
                        {isRestarting ? (
                            <><div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" /> RESTARTING</>
                        ) : (
                            <><div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" /> CONNECTED</>
                        )}
                    </span>
                </div>
                <div className="p-4 flex flex-col gap-2 flex-1 overflow-y-auto text-green-400">
                    {logs.map((log, index) => (
                        <p key={index} className={log.includes("ERROR") || log.includes("WARN") ? "text-orange-400" : log.includes("SYSTEM") ? "text-blue-400 font-bold" : ""}>
                            {log}
                        </p>
                    ))}
                    {!isRestarting && (
                        <p className="opacity-50 mt-4 leading-loose animate-pulse">Waiting for new trace events...</p>
                    )}
                    <div ref={logsEndRef} />
                </div>
            </div>
        </div>
    );
}
