"use client";

import React from "react";
import {
    Activity,
    AlertTriangle,
    Calendar,
    Crosshair,
    HeartPulse,
    Leaf,
    ShieldCheck
} from "lucide-react";

interface DiseaseProbability {
    disease: string;
    confidence: number | string;
}

interface Suggestion {
    title: string;
    text: string;
}

interface ScanResult {
    isHealthy: boolean;
    diseaseName?: string;
    confidence?: number | string;
    severityLabel?: string;
    affectedArea?: number | string;
    diseaseStage?: string;
    urgency?: string;
    recoveryChance?: number | string;
    diseaseProbability?: DiseaseProbability[];
    suggestions?: Suggestion[];
}

interface ScanData {
    result: ScanResult;
    imageUrl: string;
    createdAt: string;
}

interface PremiumReportTemplateProps {
    scanData: ScanData | null;
    elementId?: string;
}

export default function PremiumReportTemplate({
    scanData,
    elementId = "premium-scan-report",
}: PremiumReportTemplateProps) {
    if (!scanData) return null;

    const { result, imageUrl, createdAt } = scanData;
    const isHealthy = result?.isHealthy;

    // Deep Dark Theme Colors (derived from globals.css dark mode but safe for html2canvas)
    const T = {
        bg: "#0f0f11", // Deep dark background
        cardBg: "#161618", // Slightly lighter card
        border: "#27272a", // Subtle borders
        textMain: "#f4f4f5", // Bright text
        textMuted: "#a1a1aa", // Muted text
        primary: "#ea580c", // Brand Orange 
        primaryBg: "rgba(234, 88, 12, 0.15)", // Brand Orange tint
        success: "#22c55e",
        successBg: "rgba(34, 197, 94, 0.15)",
        danger: "#ef4444",
        dangerBg: "rgba(239, 68, 68, 0.15)",
    };

    const statusColorHex = isHealthy ? T.success : T.danger;
    const statusBgHex = isHealthy ? T.successBg : T.dangerBg;

    // ✅ FIX 8: Parse confidence safely as a number
    const parseNumber = (val: number | string | undefined, fallback = 0): number => {
        const parsed = Number(val);
        return isNaN(parsed) ? fallback : parsed;
    };

    const confidenceNum = Math.min(Math.max(parseNumber(result.confidence), 0), 100);

    const metrics = [
        { label: "Affected Area", value: isHealthy ? "0%" : `${result.affectedArea ?? "N/A"}%`, icon: Crosshair },
        { label: "Disease Stage", value: isHealthy ? "None" : (result.diseaseStage ?? "Unknown"), icon: Activity },
        { label: "Urgency", value: isHealthy ? "None" : (result.urgency ?? "Unknown"), icon: AlertTriangle },
        { label: "Recovery Chance", value: `${result.recoveryChance ?? 100}%`, icon: HeartPulse },
    ];

    return (
        <div
            id={elementId}
            style={{
                // Explicitly define CSS variables for internal use
                "--border": "transparent",
                "--ring": "transparent",

                // Fixed A4 dimensions for perfect single-page printing
                width: "210mm",
                height: "297mm", // Fixed height ensures it NEVER overflows to page 2
                padding: "32px", // Slightly reduced padding to maximize space
                boxSizing: "border-box",
                printColorAdjust: "exact",
                WebkitPrintColorAdjust: "exact",
                backgroundColor: T.bg, // Dark background
                color: T.textMain,
                borderRadius: "0px", // Sharp corners for print logic
                overflow: "hidden", // STRICT overflow hiding
                position: "relative",
                fontFamily: "sans-serif",
                display: "flex",
                flexDirection: "column",
                gap: "24px", // Controlled global gap
            } as React.CSSProperties}
        >
            {/* 🛑 ULTIMATE CSS ISOLATION */}
            <style dangerouslySetInnerHTML={{
                __html: `
                #${elementId} * {
                    border-color: transparent;
                    outline-color: transparent;
                    background-color: transparent;
                    box-shadow: none;
                    box-sizing: border-box;
                    margin: 0;
                    padding: 0;
                }
                /* Custom scrollbar hiding just in case */
                #${elementId}::-webkit-scrollbar { display: none; }
            `}} />

            {/* ─── Header: Logo & Meta ─── */}
            <div
                style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingBottom: "16px",
                    borderBottom: `1px solid ${T.border}`,
                    flexShrink: 0,
                }}
            >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                    {/* Brand Logo - using a stylized text + leaf combination to mimic the site's dark theme aesthetic since we can't reliably load external SVGs in canvas */}
                    <div
                        style={{
                            height: "40px",
                            width: "40px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: "10px",
                            backgroundColor: T.primary, // Brand Orange
                            color: "#ffffff",
                        }}
                    >
                        <Leaf style={{ height: "24px", width: "24px" }} />
                    </div>
                    <div>
                        <h1 style={{ fontSize: "24px", fontWeight: 800, color: T.textMain, letterSpacing: "-0.5px" }}>
                            CropGuard
                        </h1>
                        <p style={{ fontSize: "12px", color: T.primary, fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px" }}>
                            AI Diagnostic Report
                        </p>
                    </div>
                </div>

                <div style={{ textAlign: "right", marginTop: "4px" }}>
                    <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600, color: T.textMuted, marginBottom: "4px" }}>
                        Scan Date
                    </p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: "6px" }}>
                        <Calendar style={{ height: "14px", width: "14px", color: T.primary }} />
                        <p style={{ fontSize: "14px", margin: 0, fontWeight: 600, color: T.textMain, lineHeight: "1" }}>
                            {new Date(createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                        </p>
                    </div>
                </div>
            </div>

            {/* ─── Hero Section: Image & Primary Diagnosis ─── */}
            <div style={{ display: "flex", gap: "24px", flexShrink: 0 }}>
                {/* Image Card */}
                <div style={{ width: "220px", flexShrink: 0 }}>
                    <div
                        style={{
                            aspectRatio: "1/1",
                            borderRadius: "16px",
                            overflow: "hidden",
                            border: `2px solid ${statusBgHex}`,
                            backgroundColor: T.cardBg,
                            position: "relative",
                        }}
                    >
                        <img
                            src={imageUrl}
                            alt="Scanned Leaf"
                            style={{ objectFit: "cover", width: "100%", height: "100%", display: "block" }}
                        />
                        <div
                            style={{
                                position: "absolute",
                                bottom: 0,
                                left: 0,
                                right: 0,
                                padding: "8px",
                                textAlign: "center",
                                fontWeight: 700,
                                fontSize: "11px",
                                textTransform: "uppercase",
                                letterSpacing: "1px",
                                backgroundColor: isHealthy ? "rgba(34, 197, 94, 0.9)" : "rgba(239, 68, 68, 0.9)",
                                color: "#ffffff",
                                backdropFilter: "blur(4px)",
                            }}
                        >
                            {isHealthy ? "Healthy Specimen" : "Infection Present"}
                        </div>
                    </div>
                </div>

                {/* Core Diagnosis Info */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                    <div
                        style={{
                            display: "inline-block", // Explicit block sizing prevents text squish
                            padding: "6px 14px",
                            borderRadius: "8px",
                            fontSize: "11px",
                            fontWeight: 700,
                            textTransform: "uppercase",
                            letterSpacing: "1px",
                            marginBottom: "16px",
                            width: "fit-content",
                            backgroundColor: statusBgHex,
                            color: statusColorHex,
                            border: `1px solid ${statusColorHex}40`,
                            lineHeight: "1.2",
                        }}
                    >
                        Primary Diagnosis
                    </div>

                    <h2 style={{ fontSize: "42px", fontWeight: 900, letterSpacing: "-1px", color: T.textMain, marginBottom: "12px", lineHeight: 1.1 }}>
                        {isHealthy ? "Healthy" : (result.diseaseName ?? "Unknown Disease")}
                    </h2>

                    <p style={{ color: T.textMuted, lineHeight: 1.5, fontSize: "13px", marginBottom: "24px", maxWidth: "90%" }}>
                        {isHealthy
                            ? "Analysis complete. No significant pathological signs detected. The subject appears to be in optimal physiological health based on current visual assessment."
                            : `Deep learning analysis identifies visual markers consistent with ${result.diseaseName ?? "a pathological infection"}. Immediate intervention is recommended to mitigate further spread.`}
                    </p>

                    {/* Quick Stats Grid */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                        <div style={{ backgroundColor: T.cardBg, padding: "16px", borderRadius: "12px", border: `1px solid ${T.border}` }}>
                            <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", color: T.textMuted, marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                                <ShieldCheck style={{ height: "14px", width: "14px", color: T.primary }} /> Confidence Score
                            </p>
                            <p style={{ fontSize: "28px", fontWeight: 800, color: T.textMain }}>{confidenceNum}%</p>
                        </div>
                        <div style={{ backgroundColor: T.cardBg, padding: "16px", borderRadius: "12px", border: `1px solid ${T.border}` }}>
                            <p style={{ fontSize: "11px", fontWeight: 600, textTransform: "uppercase", color: T.textMuted, marginBottom: "8px", display: "flex", alignItems: "center", gap: "6px" }}>
                                <Activity style={{ height: "14px", width: "14px", color: statusColorHex }} /> Severity Level
                            </p>
                            <p style={{ fontSize: "28px", fontWeight: 800, color: statusColorHex, textTransform: "capitalize" }}>
                                {result.severityLabel ?? (isHealthy ? "None" : "Unknown")}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* ─── Detailed Metrics ─── */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "12px", flexShrink: 0 }}>
                {metrics.map((stat, i) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={i}
                            style={{
                                backgroundColor: T.cardBg,
                                padding: "16px 12px",
                                borderRadius: "12px",
                                border: `1px solid ${T.border}`,
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                textAlign: "center",
                            }}
                        >
                            <div style={{ height: "32px", width: "32px", borderRadius: "8px", backgroundColor: "rgba(255,255,255,0.05)", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "10px", color: T.textMuted }}>
                                <Icon style={{ height: "16px", width: "16px" }} />
                            </div>
                            <p style={{ fontSize: "18px", fontWeight: 800, color: T.textMain, marginBottom: "4px" }}>{stat.value}</p>
                            <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "1px", fontWeight: 600, color: T.textMuted }}>{stat.label}</p>
                        </div>
                    );
                })}
            </div>

            {/* ─── Split Content: Probabilities & Recommendations ─── */}
            <div style={{ display: "flex", gap: "24px", flex: 1, minHeight: 0 }}>

                {/* Left Column: Analytics */}
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "16px", minHeight: 0 }}>
                    <div style={{ backgroundColor: T.cardBg, padding: "20px", borderRadius: "16px", border: `1px solid ${T.border}`, flex: 1, overflow: "hidden" }}>
                        <h3 style={{ fontSize: "14px", fontWeight: 700, color: T.textMain, marginBottom: "20px", display: "flex", alignItems: "center", gap: "8px", textTransform: "uppercase", letterSpacing: "1px" }}>
                            <ShieldCheck style={{ height: "16px", width: "16px", color: T.primary }} /> Vector Probabilities
                        </h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                            {result.diseaseProbability?.slice(0, 5).map((prob, idx) => {
                                const probConf = Math.min(Math.max(parseNumber(prob.confidence), 0), 100);
                                return (
                                    <div key={idx}>
                                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", marginBottom: "8px" }}>
                                            <span style={{ fontWeight: 600, color: T.textMuted }}>{prob.disease}</span>
                                            <span style={{ fontWeight: 700, color: T.textMain }}>{probConf}%</span>
                                        </div>
                                        <div style={{ height: "6px", width: "100%", borderRadius: "4px", backgroundColor: "rgba(255,255,255,0.05)", overflow: "hidden" }}>
                                            <div style={{ height: "100%", width: `${probConf}%`, backgroundColor: idx === 0 ? statusColorHex : T.textMuted }} />
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right Column: Treatment Plan */}
                <div style={{ flex: 1.5, display: "flex", flexDirection: "column", gap: "16px", minHeight: 0 }}>
                    <div style={{ backgroundColor: T.cardBg, padding: "20px", borderRadius: "16px", border: `1px solid ${T.border}`, flex: 1, overflow: "hidden", display: "flex", flexDirection: "column" }}>
                        <h3 style={{ fontSize: "14px", fontWeight: 700, color: T.textMain, marginBottom: "16px", display: "flex", alignItems: "center", gap: "8px", textTransform: "uppercase", letterSpacing: "1px", flexShrink: 0 }}>
                            <Leaf style={{ height: "16px", width: "16px", color: T.primary }} /> AI Treatment Protocol
                        </h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: "12px", overflow: "hidden" }}>
                            {result.suggestions?.slice(0, 3).map((item, idx) => (
                                <div
                                    key={idx}
                                    style={{
                                        display: "flex",
                                        alignItems: "flex-start", // Ensures number icon stays at top
                                        gap: "12px",
                                        padding: "14px",
                                        borderRadius: "10px",
                                        backgroundColor: "rgba(255,255,255,0.03)",
                                        border: `1px solid ${T.border}`
                                    }}
                                >
                                    <div style={{ height: "24px", width: "24px", flexShrink: 0, borderRadius: "6px", backgroundColor: T.primaryBg, color: T.primary, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "12px", fontWeight: 800 }}>
                                        {idx + 1}
                                    </div>
                                    <div style={{ overflow: "hidden", width: "100%" }}>
                                        <h4 style={{ fontSize: "13px", fontWeight: 700, color: T.textMain, marginBottom: "4px", lineHeight: "1.2", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                                            {item.title}
                                        </h4>
                                        <p style={{ fontSize: "12px", color: T.textMuted, lineHeight: "1.4", paddingBottom: "2px", overflow: "hidden" }}>
                                            {item.text}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>

            {/* ─── Footer ─── */}
            <div
                style={{
                    marginTop: "auto", // Forces to bottom
                    borderTop: `1px solid ${T.border}`,
                    paddingTop: "16px",
                    textAlign: "center",
                    flexShrink: 0,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center"
                }}
            >
                <p style={{ fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "1px", color: T.textMuted, opacity: 0.7 }}>
                    CONFIDENTIAL & PROPRIETARY
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                    <Leaf style={{ height: "12px", width: "12px", color: T.primary }} />
                    <p style={{ fontSize: "10px", fontWeight: 700, textTransform: "uppercase", letterSpacing: "1px", color: T.textMain }}>
                        CropGuard AI Analysis Engine
                    </p>
                </div>
            </div>
        </div>
    );
}