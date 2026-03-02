"use client";

import { useState, useEffect, useRef } from "react";
import { Activity, ServerCrash, Cpu, Database, Network } from "lucide-react";
import { Button } from "@/components/ui/button";

// A predefined pool of realistic looking serverless events
const logTemplates = [
  "[2026-03-01T16:02:11.234Z] [INFO] Edge Function booted in region iad1 (us-east)",
  "[2026-03-01T16:02:11.241Z] [INFO] Runtime: Edge (V8 isolate)",
  "[2026-03-01T16:02:11.255Z] [INFO] Environment: Production",
  "[2026-03-01T16:02:11.272Z] [INFO] Cold start detected — initializing dependencies...",
  "[2026-03-01T16:02:11.410Z] [INFO] Connecting to MongoDB Cluster Atlas-cropguard...",
  "[2026-03-01T16:02:11.789Z] [INFO] MongoDB connection established (latency: 378ms)",
  "[2026-03-01T16:02:11.792Z] [INFO] Index check completed for collection: predictions",

  "[2026-03-01T16:02:12.015Z] [INFO] Incoming request: POST /api/predict",
  "[2026-03-01T16:02:12.017Z] [INFO] Request ID: req_9fa2c81d3",
  "[2026-03-01T16:02:12.020Z] [INFO] User: anon | IP: 39.xxx.xxx.xxx | Region: lhr1",

  "[2026-03-01T16:02:12.044Z] [INFO] Validating image payload...",
  "[2026-03-01T16:02:12.062Z] [WARN] Image payload size: 6.3MB exceeds threshold (5MB)",
  "[2026-03-01T16:02:12.065Z] [INFO] Applying automatic compression (quality=75%)",
  "[2026-03-01T16:02:12.188Z] [INFO] Compressed image size: 2.8MB",

  "[2026-03-01T16:02:12.191Z] [INFO] Routing inference job to routine: cropguard-infer",
  "[2026-03-01T16:02:12.194Z] [INFO] Model version: v2.3.4",
  "[2026-03-01T16:02:12.812Z] [WARN] Execution time exceeded 800ms for routine: cropguard-infer",
  "[2026-03-01T16:02:12.987Z] [INFO] Inference completed (latency: 793ms)",

  "[2026-03-01T16:02:12.989Z] [INFO] Prediction result:",
  "{",
  '  "disease": "Leaf Blight",',
  '  "confidence": 0.93,',
  '  "recommendation": "Apply copper-based fungicide within 48 hours"',
  "}",

  "[2026-03-01T16:02:13.021Z] [INFO] Storing prediction record in database...",
  "[2026-03-01T16:02:13.090Z] [INFO] Database write successful (writeTime: 68ms)",

  "[2026-03-01T16:02:13.115Z] [INFO] Caching response for user anon (TTL: 3600s)",
  "[2026-03-01T16:02:13.118Z] [INFO] Response served successfully (status: 200)",

  "----------------------------------------------------------------",

  "[2026-03-01T16:05:44.412Z] [INFO] Cache HIT for /api/predictions?userId=anon",
  "[2026-03-01T16:05:44.415Z] [INFO] Serving cached inference block to region lhr1 (eu-west)",
  "[2026-03-01T16:05:44.420Z] [INFO] Response time: 34ms",

  "----------------------------------------------------------------",

  "[2026-03-01T16:08:22.011Z] [ERROR] Non-fatal: Invalid image format detected",
  "[2026-03-01T16:08:22.013Z] [INFO] Supported formats: jpg, png, webp",
  "[2026-03-01T16:08:22.015Z] [INFO] Request rejected (status: 415 Unsupported Media Type)",

  "----------------------------------------------------------------",

  "[2026-03-01T16:10:55.642Z] [INFO] Garbage collection triggered on worker node",
  "[2026-03-01T16:10:55.651Z] [INFO] Memory reclaimed: 18.4MB",
  "[2026-03-01T16:10:55.654Z] [INFO] Active isolates: 4",

  "----------------------------------------------------------------",

  "[2026-03-01T16:14:10.102Z] [INFO] Rate limit check passed for IP: 39.xxx.xxx.xxx",
  "[2026-03-01T16:14:10.104Z] [INFO] Request quota remaining: 92/100",

  "----------------------------------------------------------------",

  "[2026-03-01T16:18:32.998Z] [WARN] Spike detected in inference latency (avg: 1.2s)",
  "[2026-03-01T16:18:33.002Z] [INFO] Scaling edge workers dynamically...",

  "----------------------------------------------------------------",

  "[2026-03-01T16:21:07.451Z] [INFO] Background cron triggered: cleanup-expired-cache",
  "[2026-03-01T16:21:07.509Z] [INFO] 43 stale cache entries removed",

  "----------------------------------------------------------------",

  "[2026-03-01T16:25:14.332Z] [INFO] Vercel Analytics ping successful",
  "[2026-03-01T16:25:14.335Z] [INFO] Core Web Vitals: LCP=1.3s | FID=18ms | CLS=0.02",

  "----------------------------------------------------------------",

  "[2026-03-01T16:29:55.220Z] [SECURITY] Suspicious pattern detected in query params",
  "[2026-03-01T16:29:55.222Z] [INFO] Sanitizing input...",
  "[2026-03-01T16:29:55.224Z] [INFO] Threat neutralized (SQL injection attempt blocked)",

  "----------------------------------------------------------------",

  "[2026-03-01T16:33:41.905Z] [INFO] Health Check: OK",
  "[2026-03-01T16:33:41.907Z] [INFO] Uptime: 4h 12m",
  "[2026-03-01T16:33:41.909Z] [INFO] Error rate: 0.4%"
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
