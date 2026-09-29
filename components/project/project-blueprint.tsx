"use client";

import React from "react";
import { 
    Layers, 
    Cpu, 
    ShieldCheck, 
    Gauge, 
    Terminal, 
    CheckCircle2
} from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface BlueprintProps {
    technologies: string[];
    role?: string | null;
    title: string;
}

export function ProjectBlueprint({ technologies, role, title }: BlueprintProps) {
    if (!technologies || technologies.length === 0) return null;

    const frontendTech = technologies.filter(t => 
        ["react", "next", "tailwind", "typescript", "javascript", "html", "css", "framer", "motion", "vue", "svelte", "ui"].some(k => t.toLowerCase().includes(k))
    );
    const backendTech = technologies.filter(t => 
        ["node", "express", "postgres", "mongo", "graphql", "firebase", "sql", "prisma", "api", "redis", "supabase"].some(k => t.toLowerCase().includes(k))
    );
    const devopsTech = technologies.filter(t => 
        ["docker", "aws", "git", "vercel", "jest", "cypress", "webpack", "turbopack", "ci", "linux", "nginx"].some(k => t.toLowerCase().includes(k))
    );
    const otherTech = technologies.filter(t => 
        !frontendTech.includes(t) && !backendTech.includes(t) && !devopsTech.includes(t)
    );

    const hasAnyLayer = frontendTech.length > 0 || backendTech.length > 0 || devopsTech.length > 0 || otherTech.length > 0;
    if (!hasAnyLayer) return null;

    return (
        <section className="rounded-2xl border border-border/70 bg-card/60 backdrop-blur-md shadow-xl overflow-hidden font-mono text-xs">
            {/* Header Tabs */}
            <div className="flex items-center justify-between px-4 py-2.5 bg-muted/40 border-b border-border/50">
                <div className="flex items-center gap-2 text-primary font-bold">
                    <Layers className="size-4" />
                    <span># ARCHITECTURE_BLUEPRINT</span>
                </div>
                <Badge variant="outline" className="text-[10px] hidden sm:inline-flex">
                    {technologies.length} DEPENDENCIES
                </Badge>
            </div>

            {/* Architecture Grid */}
            <div className="p-6 space-y-6 bg-background/30">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Frontend Layer */}
                    {frontendTech.length > 0 && (
                        <div className="p-4 rounded-xl border border-blue-500/20 bg-blue-500/5 space-y-2">
                            <div className="flex items-center gap-2 text-blue-400 font-bold">
                                <Cpu className="size-4" />
                                <span>Frontend & Client</span>
                            </div>
                            <p className="text-muted-foreground text-[11px] font-sans">
                                UI components, state machine, and reactive client rendering layer.
                            </p>
                            <div className="flex flex-wrap gap-1 pt-1">
                                {frontendTech.map(t => (
                                    <span key={t} className="px-2 py-0.5 rounded bg-background/80 border border-border text-[10px] text-foreground font-semibold">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Backend Layer */}
                    {backendTech.length > 0 && (
                        <div className="p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 space-y-2">
                            <div className="flex items-center gap-2 text-emerald-400 font-bold">
                                <Layers className="size-4" />
                                <span>Data & Services</span>
                            </div>
                            <p className="text-muted-foreground text-[11px] font-sans">
                                Server endpoints, relational data layer, and database architecture.
                            </p>
                            <div className="flex flex-wrap gap-1 pt-1">
                                {backendTech.map(t => (
                                    <span key={t} className="px-2 py-0.5 rounded bg-background/80 border border-border text-[10px] text-foreground font-semibold">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* DevOps & Tools Layer */}
                    {(devopsTech.length > 0 || otherTech.length > 0) && (
                        <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 space-y-2">
                            <div className="flex items-center gap-2 text-primary font-bold">
                                <ShieldCheck className="size-4" />
                                <span>DevOps & Tooling</span>
                            </div>
                            <p className="text-muted-foreground text-[11px] font-sans">
                                Deployment pipelines, environment configuration, and support libraries.
                            </p>
                            <div className="flex flex-wrap gap-1 pt-1">
                                {[...devopsTech, ...otherTech].map(t => (
                                    <span key={t} className="px-2 py-0.5 rounded bg-background/80 border border-border text-[10px] text-foreground font-semibold">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {role && (
                    <div className="p-3.5 rounded-xl border border-border/60 bg-muted/20 flex items-center gap-2 text-xs">
                        <CheckCircle2 className="size-4 text-emerald-400 shrink-0" />
                        <span className="text-muted-foreground font-sans">
                            Engineered by <span className="font-semibold text-foreground font-mono">{role}</span> with modern DX and optimal performance standards.
                        </span>
                    </div>
                )}
            </div>
        </section>
    );
}
