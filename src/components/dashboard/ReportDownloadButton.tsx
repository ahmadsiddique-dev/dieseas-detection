"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface ReportDownloadButtonProps {
    elementId?: string;
    reportName?: string;
}

export default function ReportDownloadButton({
    elementId = "dashboard-report-content",
    reportName = "CropGuard_Scan_Report.pdf",
}: ReportDownloadButtonProps) {
    const [isGenerating, setIsGenerating] = useState(false);

    const generateReport = async () => {
        try {
            setIsGenerating(true);
            const reportElement = document.getElementById(elementId);

            if (!reportElement) {
                toast.error("Could not locate the report content.");
                setIsGenerating(false);
                return;
            }

            toast.info("Generating your report. Please hold on...");

            // Temporarily modify the DOM to ensure complete rendering without scroll cut-offs
            const originalStyle = reportElement.style.cssText;

            // html2canvas needs the element fully expanded (not scrollable) to capture everything
            const canvas = await html2canvas(reportElement, {
                scale: 2, // High resolution
                useCORS: true, // Allow external images (like from Cloudinary)
                logging: false,
                backgroundColor: "#ffffff",
            });

            // Restore original style immediately
            reportElement.style.cssText = originalStyle;

            const imgData = canvas.toDataURL("image/jpeg", 1.0);

            // A4 Size in mm: 210 x 297
            const pdf = new jsPDF("p", "mm", "a4");
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

            // If the report is longer than 1 standard A4 page, scale it up
            let heightLeft = pdfHeight;
            let position = 0;

            pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, pdfHeight);
            heightLeft -= pdf.internal.pageSize.getHeight();

            while (heightLeft >= 0) {
                position = heightLeft - pdfHeight;
                pdf.addPage();
                pdf.addImage(imgData, "JPEG", 0, position, pdfWidth, pdfHeight);
                heightLeft -= pdf.internal.pageSize.getHeight();
            }

            pdf.save(reportName);
            toast.success("Report downloaded successfully!");
        } catch (error) {
            console.error("PDF generation failed:", error);
            toast.error("Failed to generate the report. Please try again.");
        } finally {
            setIsGenerating(false);
        }
    };

    return (
        <Button
            variant="outline"
            size="sm"
            className="gap-2 shrink-0 border-primary text-primary hover:bg-primary/10 transition-colors"
            onClick={generateReport}
            disabled={isGenerating}
        >
            {isGenerating ? (
                <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
                <Download className="h-4 w-4" />
            )}
            {isGenerating ? "Exporting..." : "Download Report"}
        </Button>
    );
}
