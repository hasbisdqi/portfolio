"use client";

import React from "react";
import { GanttChartSquare, CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface GanttProps {
    year?: string | null;
    duration?: string | null;
}

export function ProjectGantt({ year, duration }: GanttProps) {
    if (!duration && !year) return null;

    const phases = [
        { name: "Phase 1: Architecture & Specs", span: "Discovery", width: "30%", offset: "0%" },
        { name: "Phase 2: Core Engineering", span: "Development", width: "45%", offset: "28%" },
        { name: "Phase 3: Testing & Ship", span: "Production", width: "30%", offset: "70%" },
    ];

    return (
        <section className="rounded-2xl border border-border/70 bg-card/60 backdrop-blur-md shadow-xl p-6 space-y-4 font-mono text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-border/50 gap-2">
                <div className="flex items-center gap-2 text-primary font-bold">
                    <GanttChartSquare className="size-4" />
                    <span># DEVELOPMENT_TIMELINE</span>
                </div>
                <div className="flex items-center gap-3 text-muted-foreground text-[11px]">
                    {duration && <span>Duration: {duration}</span>}
                    {year && <span>• {year}</span>}
                    <Badge variant="outline" className="text-[10px] text-emerald-400 border-emerald-500/40">
                        SHIPPED
                    </Badge>
                </div>
            </div>

            {/* Gantt Bar Chart */}
            <div className="space-y-3 pt-2">
                {phases.map((phase, idx) => (
                    <div key={idx} className="space-y-1">
                        <div className="flex justify-between items-center text-[11px]">
                            <span className="text-foreground font-semibold flex items-center gap-1.5">
                                <CheckCircle className="size-3 text-emerald-400" />
                                {phase.name}
                            </span>
                            <span className="text-muted-foreground text-[10px]">{phase.span}</span>
                        </div>
                        <div className="w-full h-2.5 bg-muted/30 rounded-md overflow-hidden relative border border-border/40">
                            <div
                                className="h-full bg-gradient-to-r from-amber-500 via-primary to-yellow-400 rounded-md transition-all"
                                style={{
                                    width: phase.width,
                                    marginLeft: phase.offset,
                                }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
