"use client";

import { useState } from "react";
import { ListTree, Trash2, Calendar, Search, ShieldCheck, AlertTriangle } from "lucide-react";
import { deletePrediction } from "@/app/admin/data-actions";
import { toast } from "sonner";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Image from "next/image";

type PredictionDoc = {
    _id: string;
    userId?: { email: string };
    imageUrl: string;
    result: {
        diseaseName: string;
        isHealthy: boolean;
        confidence: number;
        severityLabel: string;
    };
    createdAt?: string;
};

export default function PredictionsTable({ initialPredictions }: { initialPredictions: PredictionDoc[] }) {
    const [predictions, setPredictions] = useState<PredictionDoc[]>(initialPredictions);
    const [search, setSearch] = useState("");
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const filtered = predictions.filter((p) => {
        const query = search.toLowerCase();
        return (
            (p.userId?.email || "anonymous").toLowerCase().includes(query) ||
            p.result.diseaseName.toLowerCase().includes(query)
        );
    });

    async function handleDelete(id: string) {
        if (!confirm("Delete this scan prediction? This action is permanent.")) return;

        setDeletingId(id);
        const res = await deletePrediction(id);
        if (res.success) {
            toast.success("Prediction deleted");
            setPredictions((prev) => prev.filter((p) => p._id !== id));
        } else {
            toast.error(res.error || "Failed to delete prediction");
        }
        setDeletingId(null);
    }

    return (
        <div className="flex-1 bg-card border border-border rounded-xl flex flex-col overflow-hidden">
            <div className="p-4 border-b border-border flex items-center justify-between gap-4 bg-muted/20">
                <div className="relative max-w-sm w-full">
                    <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Search by user email or disease..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-9 bg-background"
                    />
                </div>
                <div className="text-sm text-muted-foreground font-medium">
                    Total: {predictions.length} Scans
                </div>
            </div>

            <div className="flex-1 overflow-auto">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs text-muted-foreground uppercase bg-muted/50 sticky top-0 z-10 border-b border-border">
                        <tr>
                            <th className="px-6 py-4 font-semibold">Scan Image</th>
                            <th className="px-6 py-4 font-semibold">User Account</th>
                            <th className="px-6 py-4 font-semibold">AI Diagnosis</th>
                            <th className="px-6 py-4 font-semibold">Confidence</th>
                            <th className="px-6 py-4 font-semibold">Date</th>
                            <th className="px-6 py-4 font-semibold text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                        {filtered.length === 0 ? (
                            <tr>
                                <td colSpan={6} className="px-6 py-12 text-center text-muted-foreground">
                                    <div className="flex flex-col items-center justify-center gap-2">
                                        <ListTree className="w-8 h-8 opacity-20" />
                                        <p>No prediction records match your query.</p>
                                    </div>
                                </td>
                            </tr>
                        ) : (
                            filtered.map((p) => (
                                <tr key={p._id} className="hover:bg-muted/30 transition-colors">
                                    <td className="px-6 py-3">
                                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-border relative bg-muted flex items-center justify-center">
                                            {p.imageUrl ? (
                                                <img src={p.imageUrl} alt="Scan" className="object-cover w-full h-full" />
                                            ) : (
                                                <ListTree className="w-4 h-4 text-muted-foreground" />
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 font-medium text-muted-foreground truncate max-w-[150px]">
                                        {p.userId?.email || "Unknown User"}
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-semibold text-foreground">{p.result.diseaseName}</span>
                                            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full w-fit ${p.result.isHealthy ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                                {p.result.severityLabel}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {p.result.isHealthy ? <ShieldCheck className="w-4 h-4 text-green-500" /> : <AlertTriangle className="w-4 h-4 text-orange-500" />}
                                            <span className="font-medium">{p.result.confidence}%</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-muted-foreground whitespace-nowrap">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-3 h-3" />
                                            {p.createdAt ? new Date(p.createdAt).toLocaleDateString() : "Unknown"}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-red-500 hover:text-red-600 hover:bg-red-500/10"
                                            onClick={() => handleDelete(p._id)}
                                            disabled={deletingId === p._id}
                                        >
                                            <Trash2 className="w-4 h-4 mr-2" />
                                            {deletingId === p._id ? "Deleting..." : "Delete"}
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
