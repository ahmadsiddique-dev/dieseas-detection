"use client";

import React, { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Loader2, ChevronLeft } from "lucide-react";
import PremiumReportTemplate from "@/components/dashboard/PremiumReportTemplate";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import ReportDownloadButton from "@/components/dashboard/ReportDownloadButton";

interface ScanData {
    _id: string;
    imageUrl: string;
    prompt: string;
    result: {
        diseaseName: string;
        confidence: number;
        isHealthy: boolean;
        severityLevel: number;
        severityLabel: string;
        affectedArea: number;
        diseaseStage: string;
        urgency: string;
        recoveryChance: number;
        diseaseProbability: { disease: string; confidence: number }[];
        suggestions: { title: string; text: string }[];
    };
    createdAt: string;
}

export default function ReportPage() {
    const { id } = useParams() as { id: string };
    const router = useRouter();
    const [scanData, setScanData] = useState<ScanData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!id) return;

        const loadScan = async () => {
            try {
                const res = await axios.get(`/api/scan/${id}`);
                if (res.data.success) {
                    setScanData(res.data.scan);
                } else {
                    toast.error("Failed to load scan data.");
                }
            } catch (err) {
                toast.error("An error occurred while fetching the report.");
            } finally {
                setIsLoading(false);
            }
        };

        loadScan();
    }, [id]);

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] w-full">
                <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
                <p className="text-lg font-medium">Generating Premium Report...</p>
            </div>
        );
    }

    if (!scanData) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[80vh] w-full">
                <p className="text-destructive font-medium text-lg">Report not found</p>
                <Button onClick={() => router.back()} className="mt-4" variant="outline">
                    Go Back
                </Button>
            </div>
        );
    }

    const { result, imageUrl, createdAt } = scanData;
    const isHealthy = result.isHealthy;
    const statusColor = isHealthy ? "text-emerald-500" : "text-orange-500";
    const statusBg = isHealthy ? "bg-emerald-500/10" : "bg-orange-500/10";

    return (
        <div className="flex flex-col h-full w-full overflow-y-auto bg-muted/20 pb-10">
            {/* Header Actions */}
            <div className="sticky top-0 z-10 flex items-center justify-between p-4 bg-background/80 backdrop-blur-md border-b">
                <Button variant="ghost" onClick={() => router.back()} className="gap-2">
                    <ChevronLeft className="h-4 w-4" />
                    Back
                </Button>
                <div className="flex items-center gap-3">
                    <ReportDownloadButton
                        elementId="premium-scan-report"
                        reportName={`CropGuard_Report_${new Date(createdAt).toLocaleDateString().replace(/\//g, "-")}.pdf`}
                    />
                </div>
            </div>

            {/* A4 Printable Container */}
            <div className="flex justify-center p-4 sm:p-8 w-full">
                <PremiumReportTemplate scanData={scanData} elementId="premium-scan-report" />
            </div>
        </div>
    );
}
