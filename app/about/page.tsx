"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { 
    Sparkles, 
    ShieldCheck, 
    Zap, 
    Code2, 
    Layers, 
    Trophy, 
    Briefcase, 
    GraduationCap, 
    Mail, 
    Github, 
    Linkedin, 
    Twitter, 
    Copy, 
    Check, 
    ExternalLink,
    ChevronRight,
    TerminalSquare
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import ContactForm from "./contact-form";

export default function VisualStoryAboutPage() {
    const [copiedEmail, setCopiedEmail] = useState(false);
    const [selectedPerk, setSelectedPerk] = useState<number>(0);
    const [skillFilter, setSkillFilter] = useState<string>("All");

    const handleCopy = () => {
        navigator.clipboard.writeText("muhhasbiassidiqi18@gmail.com");
        setCopiedEmail(true);
        setTimeout(() => setCopiedEmail(false), 2000);
    };

    const perks = [
        {
            title: "Cybersecurity DNA",
            badge: "LKS Silver Medalist",
            desc: "Bukan sekadar styling frontend — punya pondasi kuat di security vulnerability, secure API auth, dan network hardening.",
            icon: ShieldCheck,
            color: "text-blue-400 bg-blue-500/10 border-blue-500/20"
        },
        {
            title: "Fullstack Versatility",
            badge: "Next.js + Node + SQL",
            desc: "Menghubungkan arsitektur server Next.js App Router, caching layer, database relational, hingga deployment Turbopack.",
            icon: Layers,
            color: "text-purple-400 bg-purple-500/10 border-purple-500/20"
        },
        {
            title: "60fps Fluid Interactions",
            badge: "Motion & Canvas Craft",
            desc: "Obsesi pada micro-interactions, responsive physics, dan animasi canvas interaktif yang tidak membebani render thread.",
            icon: Zap,
            color: "text-amber-400 bg-amber-500/10 border-amber-500/20"
        }
    ];

    const allSkills = [
        { name: "React", tier: "Core", level: 95 },
        { name: "Next.js", tier: "Core", level: 92 },
        { name: "TypeScript", tier: "Core", level: 88 },
        { name: "Tailwind CSS", tier: "Core", level: 95 },
        { name: "Node.js", tier: "Backend", level: 85 },
        { name: "PostgreSQL", tier: "Backend", level: 80 },
        { name: "Express", tier: "Backend", level: 82 },
        { name: "MongoDB", tier: "Backend", level: 78 },
        { name: "Docker", tier: "DevOps", level: 75 },
        { name: "Git", tier: "DevOps", level: 90 },
        { name: "Figma", tier: "Design", level: 85 },
        { name: "Responsive UI", tier: "Design", level: 95 },
    ];

    const filteredSkills = skillFilter === "All" ? allSkills : allSkills.filter(s => s.tier === skillFilter);

    return (
        <main className="mx-auto max-w-6xl px-4 py-12 min-h-screen space-y-16">
            {/* HERO STORY CARD */}
            <div className="relative rounded-2xl border border-border/60 bg-gradient-to-br from-card/80 via-background to-primary/5 p-8 backdrop-blur-xl shadow-xl overflow-hidden">
                <div className="absolute top-0 right-0 -mr-16 -mt-16 size-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
                
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                    {/* Character Avatar & RPG Card */}
                    <div className="lg:col-span-4 flex flex-col items-center text-center p-6 rounded-xl border border-primary/20 bg-background/60 backdrop-blur-sm shadow-md">
                        <div className="relative size-32 rounded-2xl overflow-hidden border-2 border-primary shadow-lg shadow-primary/20 mb-4">
                            <Image src="/avatar.jpeg" alt="Hasbi Assidiqi" fill className="object-cover" priority />
                        </div>
                        <h1 className="text-2xl font-bold text-foreground">Hasbi Assidiqi</h1>
                        <p className="text-xs font-mono text-primary mt-0.5">LVL 4 • FULLSTACK BUILDER</p>
                        
                        {/* Status bar */}
                        <div className="w-full mt-4 pt-4 border-t border-border/50 space-y-2 text-xs">
                            <div className="flex justify-between text-muted-foreground">
                                <span>Availability</span>
                                <span className="text-emerald-400 font-semibold flex items-center gap-1">
                                    <span className="size-2 rounded-full bg-emerald-500 animate-pulse" /> Ready for hire
                                </span>
                            </div>
                            <div className="flex justify-between text-muted-foreground">
                                <span>Location</span>
                                <span className="text-foreground font-medium">Yogyakarta, ID</span>
                            </div>
                        </div>

                        <div className="flex gap-2 mt-4">
                            <Button size="sm" variant="outline" onClick={handleCopy} className="text-xs gap-1.5 font-mono">
                                {copiedEmail ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
                                {copiedEmail ? "Copied" : "Copy Email"}
                            </Button>
                            <Button size="sm" asChild className="text-xs gap-1.5 font-mono">
                                <Link href="https://docs.google.com/document/d/1UwrlveA4pVUxMA6qjox0oxS13XjNRRVGGS5H_K5DDZ8/edit?usp=sharing" target="_blank">
                                    Resume <ExternalLink className="size-3" />
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Story Statement */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs text-primary font-mono font-medium">
                            <Sparkles className="size-3.5" /> THE ORIGIN & MISSION
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-tight text-foreground">
                            Mengubah baris kode menjadi <span className="text-primary underline decoration-primary/40 underline-offset-4">pengalaman web hidup</span> yang cepat dan presisi.
                        </h2>
                        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                            Memulai rekayasa perangkat lunak sejak bangku SMK RPL hingga menempuh studi Sistem Informasi di UPN Veteran Yogyakarta. 
                            Fokus pada arsitektur web modern yang estetis, scalable, dan secure.
                        </p>

                        {/* Interactive Perks */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                            {perks.map((perk, i) => {
                                const Icon = perk.icon;
                                const isActive = selectedPerk === i;
                                return (
                                    <button
                                        key={i}
                                        onClick={() => setSelectedPerk(i)}
                                        className={cn(
                                            "text-left p-3.5 rounded-xl border transition-all duration-200 cursor-pointer",
                                            isActive 
                                                ? "border-primary bg-primary/10 shadow-sm" 
                                                : "border-border/60 bg-muted/20 hover:border-border hover:bg-muted/40"
                                        )}
                                    >
                                        <div className="flex items-center justify-between mb-1.5">
                                            <Icon className={cn("size-4", isActive ? "text-primary" : "text-muted-foreground")} />
                                            <span className="text-[10px] font-mono text-muted-foreground">{perk.badge}</span>
                                        </div>
                                        <div className="font-bold text-xs text-foreground">{perk.title}</div>
                                    </button>
                                );
                            })}
                        </div>
                        <div className="p-4 rounded-xl border border-primary/20 bg-primary/5 text-xs text-foreground/90 leading-relaxed font-sans">
                            💡 <span className="font-semibold">{perks[selectedPerk].title}:</span> {perks[selectedPerk].desc}
                        </div>
                    </div>
                </div>
            </div>

            {/* TECH MASTERY PLAYGROUND */}
            <section className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <div className="text-xs font-mono text-primary uppercase font-bold flex items-center gap-1.5">
                            <Code2 className="size-4" /> Arsenal & Tech Stack
                        </div>
                        <h3 className="text-2xl font-bold tracking-tight text-foreground">Keahlian & Penguasaan Tools</h3>
                    </div>
                    {/* Filter Pills */}
                    <div className="flex flex-wrap gap-1.5">
                        {["All", "Core", "Backend", "DevOps", "Design"].map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setSkillFilter(cat)}
                                className={cn(
                                    "px-3 py-1 rounded-full text-xs font-mono font-medium transition-all",
                                    skillFilter === cat 
                                        ? "bg-primary text-primary-foreground font-semibold shadow-sm" 
                                        : "bg-muted/40 hover:bg-muted text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                    {filteredSkills.map((sk) => (
                        <div key={sk.name} className="p-4 rounded-xl border border-border/60 bg-card/60 backdrop-blur-sm space-y-2 hover:border-primary/40 transition-colors">
                            <div className="flex items-center justify-between text-xs font-semibold">
                                <span className="text-foreground">{sk.name}</span>
                                <span className="text-primary font-mono">{sk.level}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-muted rounded-full overflow-hidden">
                                <div 
                                    className="h-full bg-gradient-to-r from-amber-500 to-primary rounded-full transition-all duration-500" 
                                    style={{ width: `${sk.level}%` }}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* TROPHY HALL */}
            <section className="space-y-6">
                <div>
                    <div className="text-xs font-mono text-primary uppercase font-bold flex items-center gap-1.5">
                        <Trophy className="size-4" /> Hall of Achievements
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight text-foreground">Kompetisi & Penghargaan</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        {
                            title: "Gold Medalist National Olympiad",
                            event: "Olympicad Informatika Nasional",
                            year: "2021",
                            rank: "🥇 EMAS",
                            gradient: "from-amber-500/20 via-primary/5 to-transparent border-amber-500/40"
                        },
                        {
                            title: "2nd Place Cyber Security",
                            event: "LKS SMK Tingkat Provinsi DIY",
                            year: "2021",
                            rank: "🥈 PERAK",
                            gradient: "from-slate-400/20 via-muted/5 to-transparent border-slate-400/40"
                        },
                        {
                            title: "1st Place Provincial Olympiad",
                            event: "Olympicad Informatika DIY",
                            year: "2021",
                            rank: "🥇 JUARA 1",
                            gradient: "from-amber-500/20 via-primary/5 to-transparent border-amber-500/40"
                        },
                        {
                            title: "Web Technology Mentor",
                            event: "LKS Web Tech (Bimbing 3rd Place)",
                            year: "2022",
                            rank: "🥉 MENTOR",
                            gradient: "from-orange-500/20 via-muted/5 to-transparent border-orange-500/40"
                        },
                        {
                            title: "President of Technopark Musaba",
                            event: "Komunitas Teknologi Sekolah",
                            year: "2020 - 2022",
                            rank: "👑 LEADERSHIP",
                            gradient: "from-primary/20 via-background to-transparent border-primary/40"
                        },
                        {
                            title: "Jogja Cyber Security Member",
                            event: "Komunitas Pegiat Keamanan Siber",
                            year: "2023 - Present",
                            rank: "🛡️ CYBERSEC",
                            gradient: "from-blue-500/20 via-background to-transparent border-blue-500/40"
                        }
                    ].map((t, idx) => (
                        <div key={idx} className={cn("p-5 rounded-2xl border bg-gradient-to-b relative overflow-hidden shadow-sm", t.gradient)}>
                            <div className="flex items-center justify-between mb-3">
                                <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-background/80 border border-border">
                                    {t.rank}
                                </span>
                                <span className="text-xs font-mono text-muted-foreground">{t.year}</span>
                            </div>
                            <h4 className="font-bold text-foreground text-sm sm:text-base mb-1">{t.title}</h4>
                            <p className="text-xs text-muted-foreground">{t.event}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CAREER MILESTONES */}
            <section className="space-y-6">
                <div>
                    <div className="text-xs font-mono text-primary uppercase font-bold flex items-center gap-1.5">
                        <Briefcase className="size-4" /> Trajectory
                    </div>
                    <h3 className="text-2xl font-bold tracking-tight text-foreground">Pengalaman & Riwayat Pendidikan</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                        {
                            role: "Freelance Full Stack Developer",
                            org: "Self-employed",
                            period: "2021 — Present",
                            desc: "Membangun custom web apps, API RESTful, dan integrasi frontend interaktif untuk berbagai klien independen.",
                            icon: Briefcase
                        },
                        {
                            role: "Bachelor of Information Systems",
                            org: "UPN Veteran Yogyakarta",
                            period: "2024 — Present",
                            desc: "Mendalami arsitektur sistem informasi enterprise, manajemen basis data relasional, dan rekayasa perangkat lunak lanjutan.",
                            icon: GraduationCap
                        },
                        {
                            role: "Web Developer Intern",
                            org: "PT Global Intermedia",
                            period: "2022",
                            desc: "Berpartisipasi dalam maintenance dan deployment aplikasi web produksi berskala industri.",
                            icon: Briefcase
                        },
                        {
                            role: "Cybersecurity Intern",
                            org: "PT Gmedia",
                            period: "2022",
                            desc: "Monitoring sistem keamanan jaringan, vulnerability assessment, dan implementasi network hardening.",
                            icon: ShieldCheck
                        }
                    ].map((exp, i) => {
                        const Icon = exp.icon;
                        return (
                            <div key={i} className="p-5 rounded-xl border border-border/70 bg-card/40 backdrop-blur-sm space-y-2 hover:border-primary/40 transition-colors">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="p-2 rounded-lg bg-primary/10 text-primary">
                                            <Icon className="size-4" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-sm text-foreground">{exp.role}</h4>
                                            <div className="text-xs text-muted-foreground">{exp.org}</div>
                                        </div>
                                    </div>
                                    <Badge variant="outline" className="font-mono text-[10px]">{exp.period}</Badge>
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed pt-1">{exp.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </section>

            {/* CONTACT DISPATCH */}
            <section id="contact" className="rounded-2xl border border-primary/30 bg-gradient-to-br from-card/90 via-background to-primary/10 p-8 shadow-xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div className="space-y-4">
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary/10 text-xs text-primary font-mono font-bold">
                            <Mail className="size-3.5" /> LET'S TALK
                        </div>
                        <h3 className="text-3xl font-bold tracking-tight text-foreground">Siap Membangun Sesuatu yang Keren?</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            Terbuka untuk project freelance, kolaborasi open source, atau sekadar diskusi teknis seputar frontend & web performance.
                        </p>
                        
                        <div className="space-y-2 pt-2">
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <Mail className="size-4 text-primary" />
                                <a href="mailto:muhhasbiassidiqi18@gmail.com" className="hover:underline text-foreground font-medium">
                                    muhhasbiassidiqi18@gmail.com
                                </a>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                <Linkedin className="size-4 text-blue-400" />
                                <a href="https://linkedin.com/in/rnghbt" target="_blank" className="hover:underline text-foreground font-medium">
                                    linkedin.com/in/rnghbt
                                </a>
                            </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                            <Button variant="outline" size="icon" asChild>
                                <a href="https://github.com/hasbisdqi" target="_blank" aria-label="GitHub"><Github className="size-4" /></a>
                            </Button>
                            <Button variant="outline" size="icon" asChild>
                                <a href="https://linkedin.com/in/rnghbt" target="_blank" aria-label="LinkedIn"><Linkedin className="size-4 text-blue-400" /></a>
                            </Button>
                            <Button variant="outline" size="icon" asChild>
                                <a href="https://twitter.com/rnghbt" target="_blank" aria-label="Twitter"><Twitter className="size-4 text-sky-400" /></a>
                            </Button>
                        </div>
                    </div>

                    <div className="p-6 rounded-xl bg-background/80 border border-border/70 shadow-sm">
                        <h4 className="font-bold text-sm mb-4 text-foreground">Kirim Pesan Langsung</h4>
                        <ContactForm />
                    </div>
                </div>
            </section>
        </main>
    );
}
