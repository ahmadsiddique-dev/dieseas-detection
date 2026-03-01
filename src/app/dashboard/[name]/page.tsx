"use client";

import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import React from "react";
import {
  Label,
  Pie,
  PieChart,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
  Area,
  AreaChart,
  CartesianGrid,
  XAxis,
  YAxis,
} from "recharts";
import {
  Leaf,
  ShieldCheck,
  Activity,
  Calendar,
  TrendingUp,
  Droplets,
  Sun,
  Bug,
} from "lucide-react";

/* ─────────────────── Mock Data ─────────────────── */

// Stat 1 — Detection confidence (donut)
const confidenceData = [
  { name: "Confident", value: 78, fill: "var(--color-confident)" },
  { name: "Uncertain", value: 22, fill: "var(--color-uncertain)" },
];
const confidenceConfig = {
  confident: { label: "Confident", color: "oklch(0.6942 0.1205 77.2913)" },
  uncertain: { label: "Uncertain", color: "oklch(0.8 0.02 250)" },
} satisfies ChartConfig;

// Stat 2 — Disease severity (radial)
const severityData = [
  { name: "severity", value: 65, fill: "var(--color-severity)" },
];
const severityConfig = {
  severity: { label: "Severity", color: "oklch(0.6322 0.1310 21.4751)" },
} satisfies ChartConfig;

// Chart — Weekly scan activity (area)
const weeklyData = [
  { day: "Mon", scans: 4, detections: 1 },
  { day: "Tue", scans: 7, detections: 3 },
  { day: "Wed", scans: 5, detections: 2 },
  { day: "Thu", scans: 9, detections: 4 },
  { day: "Fri", scans: 6, detections: 2 },
  { day: "Sat", scans: 3, detections: 1 },
  { day: "Sun", scans: 8, detections: 5 },
];
const weeklyConfig = {
  scans: { label: "Scans", color: "oklch(0.6942 0.1205 77.2913)" },
  detections: { label: "Detections", color: "oklch(0.6322 0.1310 21.4751)" },
} satisfies ChartConfig;

// Suggestion data
const suggestions = [
  {
    icon: Droplets,
    title: "Reduce Moisture",
    text: "Lower field humidity to slow fungal spread on affected leaves.",
  },
  {
    icon: Bug,
    title: "Apply Fungicide",
    text: "Propiconazole or Tricyclazole recommended for blast control.",
  },
  {
    icon: Sun,
    title: "Increase Spacing",
    text: "Widen crop spacing for better air circulation and sunlight.",
  },
];

// Recent activity
const recentActivity = [
  { label: "Total Scans", value: "42", icon: Activity },
  { label: "Diseases Found", value: "12", icon: ShieldCheck },
  { label: "This Week", value: "8", icon: Calendar },
  { label: "Healthy Rate", value: "71%", icon: Leaf },
];

/* ─────────────────── Component ─────────────────── */

export default function DashboardPage() {
  const totalConfidence = React.useMemo(() => {
    return confidenceData[0].value;
  }, []);

  return (
    <div className="flex flex-col h-full min-h-0">
      <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto dash-layout">
          {/* ── Stat 1 — Detection Confidence (Donut) ── */}
          <div className="stat1">
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-1.5">
                  <ShieldCheck className="h-3.5 w-3.5" />
                  Last Scan Result
                </CardDescription>
                <CardTitle className="text-lg">Detection Confidence</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 pb-4">
                <ChartContainer
                  config={confidenceConfig}
                  className="mx-auto aspect-square max-h-[200px]"
                >
                  <PieChart>
                    <ChartTooltip
                      cursor={false}
                      content={<ChartTooltipContent hideLabel />}
                    />
                    <Pie
                      data={confidenceData}
                      dataKey="value"
                      nameKey="name"
                      innerRadius={55}
                      outerRadius={80}
                      strokeWidth={3}
                      stroke="var(--color-background)"
                    >
                      <Label
                        content={({ viewBox }) => {
                          if (
                            viewBox &&
                            "cx" in viewBox &&
                            "cy" in viewBox
                          ) {
                            return (
                              <text
                                x={viewBox.cx}
                                y={viewBox.cy}
                                textAnchor="middle"
                                dominantBaseline="middle"
                              >
                                <tspan
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  className="fill-foreground text-3xl font-bold"
                                >
                                  {totalConfidence}%
                                </tspan>
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) + 22}
                                  className="fill-muted-foreground text-xs"
                                >
                                  Confidence
                                </tspan>
                              </text>
                            );
                          }
                        }}
                      />
                    </Pie>
                  </PieChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* ── Stat 2 — Disease Severity (Radial) ── */}
          <div className="stat2">
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-1.5">
                  <Activity className="h-3.5 w-3.5" />
                  Detected Disease
                </CardDescription>
                <CardTitle className="text-lg">Severity Level</CardTitle>
              </CardHeader>
              <CardContent className="flex-1 pb-4">
                <ChartContainer
                  config={severityConfig}
                  className="mx-auto aspect-square max-h-[200px]"
                >
                  <RadialBarChart
                    data={severityData}
                    startAngle={90}
                    endAngle={90 - 360 * 0.65}
                    innerRadius={65}
                    outerRadius={90}
                  >
                    <PolarGrid
                      gridType="circle"
                      radialLines={false}
                      stroke="none"
                      className="first:fill-muted last:fill-background"
                      polarRadius={[71, 59]}
                    />
                    <RadialBar
                      dataKey="value"
                      background
                      cornerRadius={10}
                    />
                    <PolarRadiusAxis
                      tick={false}
                      tickLine={false}
                      axisLine={false}
                    >
                      <Label
                        content={({ viewBox }) => {
                          if (
                            viewBox &&
                            "cx" in viewBox &&
                            "cy" in viewBox
                          ) {
                            return (
                              <text
                                x={viewBox.cx}
                                y={viewBox.cy}
                                textAnchor="middle"
                                dominantBaseline="middle"
                              >
                                <tspan
                                  x={viewBox.cx}
                                  y={viewBox.cy}
                                  className="fill-foreground text-3xl font-bold"
                                >
                                  65%
                                </tspan>
                                <tspan
                                  x={viewBox.cx}
                                  y={(viewBox.cy || 0) + 22}
                                  className="fill-muted-foreground text-xs"
                                >
                                  Severity
                                </tspan>
                              </text>
                            );
                          }
                        }}
                      />
                    </PolarRadiusAxis>
                  </RadialBarChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* ── Chart — Weekly Scan Trends (Area) ── */}
          <div className="chart">
            <Card className="h-full">
              <CardHeader className="pb-2">
                <CardDescription className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" />
                  This Week
                </CardDescription>
                <CardTitle className="text-lg flex items-center gap-2">
                  Scan Activity
                  <TrendingUp className="h-4 w-4 text-primary" />
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-4">
                <ChartContainer
                  config={weeklyConfig}
                  className="w-full h-[200px]"
                >
                  <AreaChart
                    data={weeklyData}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient
                        id="fillScans"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="var(--color-scans)"
                          stopOpacity={0.4}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--color-scans)"
                          stopOpacity={0.05}
                        />
                      </linearGradient>
                      <linearGradient
                        id="fillDetections"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="var(--color-detections)"
                          stopOpacity={0.4}
                        />
                        <stop
                          offset="95%"
                          stopColor="var(--color-detections)"
                          stopOpacity={0.05}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      className="stroke-border/40"
                    />
                    <XAxis
                      dataKey="day"
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      className="text-xs"
                    />
                    <YAxis
                      tickLine={false}
                      axisLine={false}
                      tickMargin={8}
                      className="text-xs"
                    />
                    <ChartTooltip
                      content={<ChartTooltipContent />}
                    />
                    <Area
                      type="monotone"
                      dataKey="scans"
                      stroke="var(--color-scans)"
                      fill="url(#fillScans)"
                      strokeWidth={2}
                    />
                    <Area
                      type="monotone"
                      dataKey="detections"
                      stroke="var(--color-detections)"
                      fill="url(#fillDetections)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>

          {/* ── Suggestion — AI Recommendations ── */}
          <div className="suggestion">
            <Card className="h-full">
              <CardHeader className="pb-3">
                <CardDescription className="flex items-center gap-1.5">
                  <Leaf className="h-3.5 w-3.5" />
                  AI Recommendations
                </CardDescription>
                <CardTitle className="text-lg">
                  Treatment Suggestions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {suggestions.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={item.title}
                      className="flex gap-3 rounded-lg border border-border/60 bg-muted/30 p-3 transition-colors hover:bg-muted/60"
                    >
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold leading-tight">
                          {item.title}
                        </p>
                        <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
          </div>

          {/* ── Recent — Quick Stats Row ── */}
          <div className="recent">
            <Card>
              <CardContent className="py-4">
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {recentActivity.map((stat) => {
                    const Icon = stat.icon;
                    return (
                      <div
                        key={stat.label}
                        className="flex items-center gap-3 rounded-lg border border-border/40 bg-muted/20 px-4 py-3 transition-colors hover:bg-muted/40"
                      >
                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-xl font-bold leading-tight">
                            {stat.value}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {stat.label}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* ── Bottom AskMe Input ── */}
      <div className="border-t bg-background p-4 sticky bottom-0">
        <div className="max-w-4xl mx-auto">
          <Textarea
            className="w-full resize-none min-h-15"
            placeholder="Ask something about your crop health..."
          />
        </div>
      </div>
    </div>
  );
}
