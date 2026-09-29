"use client";

import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
    Terminal, 
    FileCode, 
    FolderGit2, 
    Award, 
    Send, 
    Sparkles, 
    Copy, 
    Check, 
    ExternalLink, 
    Github, 
    Linkedin, 
    Twitter, 
    Mail, 
    ArrowRight,
    CornerDownLeft
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ContactForm from "./contact-form";

type TabKey = "overview.ts" | "skills.json" | "experience.log" | "trophies.md" | "contact.sh";

interface CommandLog {
    command: string;
    output: React.ReactNode;
}

export default function TerminalAboutPage() {
    const [activeTab, setActiveTab] = useState<TabKey>("overview.ts");
    const [copiedEmail, setCopiedEmail] = useState(false);
    const [inputVal, setInputVal] = useState("");
    const [commandLogs, setCommandLogs] = useState<CommandLog[]>([
        {
            command: "init --profile hasbi",
            output: (
                <div className="text-muted-foreground">
                    Environment loaded. Type <span className="text-primary font-bold">help</span> to view available interactive commands.
                </div>
            ),
        }
    ]);
    const consoleEndRef = useRef<HTMLDivElement>(null);

    const handleCopyEmail = () => {
        navigator.clipboard.writeText("muhhasbiassidiqi18@gmail.com");
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
    };

    const handleCommandSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const raw = inputVal.trim().toLowerCase();
        if (!raw) return;

        let output: React.ReactNode = null;

        switch (raw) {
            case "help":
                output = (
                    <div className="space-y-1 text-xs sm:text-sm">
                        <div className="text-primary font-semibold">Available Commands:</div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-muted-foreground">
                            <div><span className="text-foreground font-mono">overview</span> - Open profile overview</div>
                            <div><span className="text-foreground font-mono">skills</span> - Inspect tech stack</div>
                            <div><span className="text-foreground font-mono">experience</span> - View career log</div>
                            <div><span className="text-foreground font-mono">trophies</span> - Display medals & awards</div>
                            <div><span className="text-foreground font-mono">contact</span> - Open contact terminal tab</div>
                            <div><span className="text-foreground font-mono">sudo hire</span> - Direct reachout shortcut</div>
                            <div><span className="text-foreground font-mono">clear</span> - Clear terminal screen</div>
                        </div>
                    </div>
                );
                break;
            case "overview":
                setActiveTab("overview.ts");
                output = <span className="text-emerald-400">Switched to overview.ts</span>;
                break;
            case "skills":
                setActiveTab("skills.json");
                output = <span className="text-emerald-400">Opened skills.json</span>;
                break;
            case "experience":
                setActiveTab("experience.log");
                output = <span className="text-emerald-400">Switched to experience.log</span>;
                break;
            case "trophies":
                setActiveTab("trophies.md");
                output = <span className="text-emerald-400">Rendered trophies.md</span>;
                break;
            case "contact":
                setActiveTab("contact.sh");
                output = <span className="text-emerald-400">Opened contact.sh</span>;
                break;
            case "sudo hire":
                output = (
                    <div className="text-primary font-medium">
                        Access Granted. Shoot an email directly to{" "}
                        <a href="mailto:muhhasbiassidiqi18@gmail.com" className="underline font-bold">
                            muhhasbiassidiqi18@gmail.com
                        </a>
                    </div>
                );
                break;
            case "clear":
                setCommandLogs([]);
                setInputVal("");
                return;
            default:
                output = (
                    <span className="text-destructive">
                        zsh: command not found: {raw}. Type <span className="text-primary underline">help</span> for list.
                    </span>
                );
        }

        setCommandLogs(prev => [...prev, { command: raw, output }]);
        setInputVal("");
    };

    useEffect(() => {
        consoleEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [commandLogs]);

    return (
        <main className="mx-auto max-w-5xl px-4 py-12 min-h-screen">
            {/* Header / Breadcrumb */}
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-mono text-muted-foreground">
                    <Terminal className="size-4 text-primary" />
                    <span>hasbi@portfolio: ~/about</span>
                    <span className="text-emerald-500 animate-pulse font-bold">• LIVE_DEV_SESSION</span>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={handleCopyEmail} className="font-mono text-xs gap-1.5">
                        {copiedEmail ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
                        {copiedEmail ? "Copied!" : "copy email"}
                    </Button>
                    <Button size="sm" asChild className="font-mono text-xs gap-1.5 shadow-sm shadow-primary/20">
                        <Link href="https://docs.google.com/document/d/1UwrlveA4pVUxMA6qjox0oxS13XjNRRVGGS5H_K5DDZ8/edit?usp=sharing" target="_blank">
                            resume.pdf <ExternalLink className="size-3" />
                        </Link>
                    </Button>
                </div>
            </div>

            {/* IDE Window Frame */}
            <div className="rounded-xl border border-border/70 bg-card/60 backdrop-blur-md shadow-2xl overflow-hidden font-mono">
                {/* Window Titlebar */}
                <div className="flex items-center justify-between px-4 py-3 bg-muted/40 border-b border-border/50">
                    <div className="flex items-center gap-2">
                        <div className="size-3 rounded-full bg-red-500/80" />
                        <div className="size-3 rounded-full bg-yellow-500/80" />
                        <div className="size-3 rounded-full bg-emerald-500/80" />
                    </div>
                    <div className="text-xs text-muted-foreground font-mono truncate max-w-[200px] sm:max-w-none">
                        Hasbi Assidiqi — Visual Studio Code
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                        <span className="hidden sm:inline">UTF-8</span>
                    </div>
                </div>

                {/* Tabs Bar */}
                <div className="flex items-center overflow-x-auto bg-muted/20 border-b border-border/40 text-xs select-none">
                    <button
                        onClick={() => setActiveTab("overview.ts")}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2.5 border-r border-border/40 transition-colors whitespace-nowrap",
                            activeTab === "overview.ts" ? "bg-background text-primary border-b-2 border-b-primary font-semibold" : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                        )}
                    >
                        <FileCode className="size-3.5 text-blue-400" />
                        overview.ts
                    </button>
                    <button
                        onClick={() => setActiveTab("skills.json")}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2.5 border-r border-border/40 transition-colors whitespace-nowrap",
                            activeTab === "skills.json" ? "bg-background text-primary border-b-2 border-b-primary font-semibold" : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                        )}
                    >
                        <Sparkles className="size-3.5 text-yellow-400" />
                        skills.json
                    </button>
                    <button
                        onClick={() => setActiveTab("experience.log")}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2.5 border-r border-border/40 transition-colors whitespace-nowrap",
                            activeTab === "experience.log" ? "bg-background text-primary border-b-2 border-b-primary font-semibold" : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                        )}
                    >
                        <FolderGit2 className="size-3.5 text-purple-400" />
                        experience.log
                    </button>
                    <button
                        onClick={() => setActiveTab("trophies.md")}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2.5 border-r border-border/40 transition-colors whitespace-nowrap",
                            activeTab === "trophies.md" ? "bg-background text-primary border-b-2 border-b-primary font-semibold" : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                        )}
                    >
                        <Award className="size-3.5 text-amber-500" />
                        trophies.md
                    </button>
                    <button
                        onClick={() => setActiveTab("contact.sh")}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2.5 border-r border-border/40 transition-colors whitespace-nowrap",
                            activeTab === "contact.sh" ? "bg-background text-primary border-b-2 border-b-primary font-semibold" : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                        )}
                    >
                        <Send className="size-3.5 text-emerald-400" />
                        contact.sh
                    </button>
                </div>

                {/* Editor Content Body */}
                <div className="p-6 text-xs sm:text-sm font-mono overflow-x-auto min-h-[380px] bg-background/40">
                    {/* TAB: overview.ts */}
                    {activeTab === "overview.ts" && (
                        <div className="space-y-6">
                            <div className="flex flex-col sm:flex-row gap-6 items-start">
                                <div className="relative size-24 sm:size-28 rounded-xl overflow-hidden border-2 border-primary/40 shadow-lg shrink-0">
                                    <Image src="/avatar.jpeg" alt="Hasbi Assidiqi" fill className="object-cover" priority />
                                </div>
                                <div className="space-y-2">
                                    <div className="text-muted-foreground">// Personal Specs</div>
                                    <h2 className="text-xl sm:text-2xl font-bold text-foreground">Hasbi Assidiqi</h2>
                                    <div className="text-primary font-medium">Full Stack Web Developer & Cybersec Enthusiast</div>
                                    <p className="text-muted-foreground leading-relaxed text-xs sm:text-sm max-w-xl font-sans">
                                        Crafting high-performance web applications with clean architecture and modern DX. 4+ years of hands-on coding from vocational Software Engineering (RPL) to Information Systems university track.
                                    </p>
                                </div>
                            </div>

                            <div className="rounded-lg p-4 bg-muted/30 border border-border/50 text-xs sm:text-sm leading-relaxed space-y-1">
                                <div><span className="text-purple-400">export const</span> <span className="text-yellow-400">developerProfile</span>: <span className="text-blue-400">Developer</span> = &#123;</div>
                                <div className="pl-4"><span className="text-muted-foreground">name:</span> <span className="text-emerald-400">"Hasbi Assidiqi"</span>,</div>
                                <div className="pl-4"><span className="text-muted-foreground">experience:</span> <span className="text-amber-400">"4+ years"</span>,</div>
                                <div className="pl-4"><span className="text-muted-foreground">education:</span> <span className="text-emerald-400">"Information Systems @ UPN Veteran Yk"</span>,</div>
                                <div className="pl-4"><span className="text-muted-foreground">primaryStack:</span> [<span className="text-emerald-400">"Next.js"</span>, <span className="text-emerald-400">"React"</span>, <span className="text-emerald-400">"TypeScript"</span>, <span className="text-emerald-400">"Node.js"</span>, <span className="text-emerald-400">"PostgreSQL"</span>],</div>
                                <div className="pl-4"><span className="text-muted-foreground">status:</span> <span className="text-emerald-400">"Available for freelance & collaborations"</span>,</div>
                                <div className="pl-4"><span className="text-muted-foreground">socials:</span> &#123;</div>
                                <div className="pl-8"><span className="text-muted-foreground">github:</span> <a href="https://github.com/hasbisdqi" target="_blank" className="text-primary hover:underline">"github.com/hasbisdqi"</a>,</div>
                                <div className="pl-8"><span className="text-muted-foreground">linkedin:</span> <a href="https://linkedin.com/in/rnghbt" target="_blank" className="text-primary hover:underline">"linkedin.com/in/rnghbt"</a></div>
                                <div className="pl-4">&#125;</div>
                                <div>&#125;;</div>
                            </div>
                        </div>
                    )}

                    {/* TAB: skills.json */}
                    {activeTab === "skills.json" && (
                        <div className="space-y-4">
                            <div className="text-muted-foreground">// Tech stack taxonomy & proficiency</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="p-4 rounded-lg bg-muted/30 border border-primary/20">
                                    <div className="text-primary font-bold text-sm mb-3 flex items-center justify-between">
                                        <span>"expert"</span>
                                        <Badge variant="default" className="text-[10px]">Tier 1</Badge>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {["React", "Next.js", "JavaScript", "Tailwind CSS", "HTML/CSS", "Git"].map(s => (
                                            <span key={s} className="px-2.5 py-1 rounded bg-background/80 border border-border text-xs text-foreground font-medium">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-4 rounded-lg bg-muted/30 border border-blue-500/20">
                                    <div className="text-blue-400 font-bold text-sm mb-3 flex items-center justify-between">
                                        <span>"proficient"</span>
                                        <Badge variant="secondary" className="text-[10px]">Tier 2</Badge>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {["TypeScript", "Node.js", "Express", "PostgreSQL", "MongoDB"].map(s => (
                                            <span key={s} className="px-2.5 py-1 rounded bg-background/80 border border-border text-xs text-foreground font-medium">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-4 rounded-lg bg-muted/30 border border-purple-500/20">
                                    <div className="text-purple-400 font-bold text-sm mb-3 flex items-center justify-between">
                                        <span>"familiar"</span>
                                        <Badge variant="outline" className="text-[10px]">Tier 3</Badge>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {["GraphQL", "Docker", "AWS", "Firebase", "Jest", "Cypress"].map(s => (
                                            <span key={s} className="px-2.5 py-1 rounded bg-background/80 border border-border text-xs text-foreground font-medium">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                <div className="p-4 rounded-lg bg-muted/30 border border-amber-500/20">
                                    <div className="text-amber-400 font-bold text-sm mb-3 flex items-center justify-between">
                                        <span>"tools_and_design"</span>
                                        <Badge variant="outline" className="text-[10px]">Workflow</Badge>
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {["VS Code", "Figma", "Responsive Design", "Bun / Turbopack"].map(s => (
                                            <span key={s} className="px-2.5 py-1 rounded bg-background/80 border border-border text-xs text-foreground font-medium">
                                                {s}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* TAB: experience.log */}
                    {activeTab === "experience.log" && (
                        <div className="space-y-4">
                            <div className="text-muted-foreground">// Chronological career & education history</div>
                            <div className="space-y-4">
                                {[
                                    {
                                        timestamp: "[2021 - PRESENT]",
                                        role: "Freelance Full Stack Developer",
                                        place: "Self-employed",
                                        desc: "Architecting responsive, scalable web applications with Next.js, React, and Node.js for private clients.",
                                        tag: "ACTIVE"
                                    },
                                    {
                                        timestamp: "[2024 - PRESENT]",
                                        role: "Bachelor of Information Systems",
                                        place: "UPN Veteran Yogyakarta",
                                        desc: "Pursuing academic degree deepening system analysis, enterprise software, and database engineering.",
                                        tag: "STUDY"
                                    },
                                    {
                                        timestamp: "[2022]",
                                        role: "Web Developer Intern",
                                        place: "PT Global Intermedia",
                                        desc: "Developed and maintained production web applications in collaborative enterprise environment.",
                                        tag: "INTERN"
                                    },
                                    {
                                        timestamp: "[2022]",
                                        role: "Cybersecurity Intern",
                                        place: "PT Gmedia",
                                        desc: "Vulnerability analysis, network monitoring, and security hardening protocols.",
                                        tag: "SECURITY"
                                    },
                                    {
                                        timestamp: "[2021 - 2024]",
                                        role: "Software Engineering Vocational (RPL)",
                                        place: "SMK Muhammadiyah 1 Bantul",
                                        desc: "Core foundations in programming, algorithmic problem solving, and web development competitions.",
                                        tag: "GRADUATED"
                                    }
                                ].map((item, idx) => (
                                    <div key={idx} className="p-3.5 rounded-lg bg-muted/20 border border-border/50 space-y-1">
                                        <div className="flex flex-wrap items-center justify-between gap-2">
                                            <div className="flex items-center gap-2">
                                                <span className="text-primary font-bold">{item.timestamp}</span>
                                                <span className="text-foreground font-semibold">{item.role}</span>
                                            </div>
                                            <Badge variant="outline" className="text-[10px] uppercase font-mono">{item.tag}</Badge>
                                        </div>
                                        <div className="text-muted-foreground text-xs">{item.place}</div>
                                        <div className="text-foreground/90 font-sans text-xs pt-1">{item.desc}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* TAB: trophies.md */}
                    {activeTab === "trophies.md" && (
                        <div className="space-y-4">
                            <div className="text-muted-foreground"># Competitive Achievements & Milestones</div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                {[
                                    { title: "2nd Place Cyber Security - LKS DIY", year: "2021", medal: "🥈 Silver", color: "text-slate-300 border-slate-700/50" },
                                    { title: "Gold Medal National Informatics Olympiad Olympicad", year: "2021", medal: "🥇 Gold", color: "text-amber-300 border-amber-500/40" },
                                    { title: "1st Place Provincial Informatics Olympiad Olympicad", year: "2021", medal: "🥇 1st Place", color: "text-amber-300 border-amber-500/40" },
                                    { title: "Web Technology LKS Mentor (3rd Place)", year: "2022", medal: "🥉 Mentor", color: "text-orange-300 border-orange-500/40" },
                                    { title: "President of Technopark Musaba Community", year: "2020 - 2022", medal: "👑 Leadership", color: "text-primary border-primary/40" },
                                    { title: "Member of Jogja Cyber Security", year: "2023 - Present", medal: "🛡️ Member", color: "text-blue-300 border-blue-500/40" },
                                ].map((t, idx) => (
                                    <div key={idx} className={cn("p-3.5 rounded-lg bg-muted/20 border flex items-start gap-3", t.color)}>
                                        <div className="text-xl shrink-0">{t.medal.split(" ")[0]}</div>
                                        <div>
                                            <div className="font-semibold text-foreground text-xs sm:text-sm">{t.title}</div>
                                            <div className="text-muted-foreground text-[11px] mt-0.5">{t.year} • {t.medal.split(" ")[1] || "Award"}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* TAB: contact.sh */}
                    {activeTab === "contact.sh" && (
                        <div className="space-y-6">
                            <div className="text-muted-foreground">#!/bin/bash — Send a message or dispatch an email directly</div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-4 p-4 rounded-lg bg-muted/30 border border-border/50">
                                    <div className="text-primary font-bold text-sm">Direct Endpoints</div>
                                    <div className="space-y-2 text-xs">
                                        <div className="flex items-center gap-2">
                                            <Mail className="size-4 text-primary shrink-0" />
                                            <a href="mailto:muhhasbiassidiqi18@gmail.com" className="hover:underline truncate">
                                                muhhasbiassidiqi18@gmail.com
                                            </a>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Linkedin className="size-4 text-blue-400 shrink-0" />
                                            <a href="https://linkedin.com/in/rnghbt" target="_blank" className="hover:underline">
                                                linkedin.com/in/rnghbt
                                            </a>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Github className="size-4 text-foreground shrink-0" />
                                            <a href="https://github.com/hasbisdqi" target="_blank" className="hover:underline">
                                                github.com/hasbisdqi
                                            </a>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Twitter className="size-4 text-sky-400 shrink-0" />
                                            <a href="https://twitter.com/rnghbt" target="_blank" className="hover:underline">
                                                @rnghbt
                                            </a>
                                        </div>
                                    </div>
                                    <div className="pt-2 border-t border-border/40 text-emerald-400 text-xs flex items-center gap-1.5">
                                        <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
                                        <span>Status: Available for hire</span>
                                    </div>
                                </div>

                                <div className="p-4 rounded-lg bg-background/80 border border-border/60">
                                    <div className="text-foreground font-semibold text-xs mb-3 flex items-center gap-1.5">
                                        <Send className="size-3.5 text-primary" /> POST /api/contact
                                    </div>
                                    <ContactForm />
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Bottom Interactive Command Console */}
                <div className="border-t border-border/60 bg-muted/50 p-4 font-mono text-xs">
                    <div className="space-y-2 max-h-36 overflow-y-auto pr-1">
                        {commandLogs.map((log, idx) => (
                            <div key={idx} className="space-y-1">
                                <div className="flex items-center gap-2 text-primary font-semibold">
                                    <span>❯</span>
                                    <span>{log.command}</span>
                                </div>
                                <div className="pl-4">{log.output}</div>
                            </div>
                        ))}
                        <div ref={consoleEndRef} />
                    </div>

                    <form onSubmit={handleCommandSubmit} className="mt-3 flex items-center gap-2 pt-2 border-t border-border/30">
                        <span className="text-primary font-bold text-sm">❯</span>
                        <input
                            type="text"
                            value={inputVal}
                            onChange={(e) => setInputVal(e.target.value)}
                            placeholder="Type command ('help', 'skills', 'contact', 'clear')..."
                            className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/60 outline-none text-xs font-mono"
                        />
                        <button type="submit" className="text-muted-foreground hover:text-primary transition-colors">
                            <CornerDownLeft className="size-3.5" />
                        </button>
                    </form>
                </div>
            </div>
        </main>
    );
}
