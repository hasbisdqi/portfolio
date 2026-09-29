"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
    Terminal, 
    FolderGit2, 
    Search, 
    Calendar, 
    ExternalLink, 
    Github, 
    Tag, 
    ArrowUpRight, 
    CornerDownLeft,
    Eye,
    Layers,
    User,
    Clock,
    Briefcase
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProjectItem {
    meta: {
        slug: string;
        title: string;
        description: string;
        coverImage: string;
        technologies: string[];
        liveUrl?: string | null;
        githubUrl?: string | null;
        year?: string | null;
        duration?: string | null;
        client?: string | null;
        role?: string | null;
        images?: string[];
    };
}

export default function ProjectExplorer({ initialProjects }: { initialProjects: ProjectItem[] }) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTech, setSelectedTech] = useState<string>("all");
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const searchInputRef = useRef<HTMLInputElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Ambil semua teknologi unik
    const allTechnologies = useMemo(() => {
        const techMap = new Map<string, string>();
        initialProjects.forEach((proj) => {
            proj.meta.technologies?.forEach((tech) => {
                const cleaned = tech.trim();
                if (cleaned) {
                    const lower = cleaned.toLowerCase();
                    if (!techMap.has(lower)) {
                        techMap.set(lower, cleaned);
                    }
                }
            });
        });
        return ["all", ...Array.from(techMap.values())];
    }, [initialProjects]);

    // Filter projects berdasarkan query dan tech stack
    const filteredProjects = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        const techFilter = selectedTech.toLowerCase();

        return initialProjects.filter((proj) => {
            const matchesQuery = 
                !query ||
                proj.meta.title.toLowerCase().includes(query) ||
                proj.meta.description.toLowerCase().includes(query) ||
                proj.meta.slug.toLowerCase().includes(query) ||
                (proj.meta.role && proj.meta.role.toLowerCase().includes(query)) ||
                (proj.meta.client && proj.meta.client.toLowerCase().includes(query)) ||
                (proj.meta.technologies && proj.meta.technologies.some(t => t.toLowerCase().includes(query)));
            
            const matchesTech = 
                techFilter === "all" || 
                (proj.meta.technologies && proj.meta.technologies.some(t => t.toLowerCase() === techFilter));

            return matchesQuery && matchesTech;
        });
    }, [initialProjects, searchQuery, selectedTech]);

    // Reset selectedIndex saat filter berubah
    useEffect(() => {
        setSelectedIndex(0);
    }, [searchQuery, selectedTech]);

    const activeProject = filteredProjects[selectedIndex] || filteredProjects[0];

    // Scroll & Snap active item ke viewport container
    useEffect(() => {
        const currentItem = itemRefs.current[selectedIndex];
        if (currentItem && scrollContainerRef.current) {
            currentItem.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
        }
    }, [selectedIndex]);

    // Keyboard navigation shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            const isTyping = document.activeElement === searchInputRef.current;

            if (e.key === "/" && !isTyping) {
                e.preventDefault();
                searchInputRef.current?.focus();
                return;
            }

            if (e.key === "Escape") {
                if (isTyping) {
                    searchInputRef.current?.blur();
                } else if (searchQuery || selectedTech !== "all") {
                    setSearchQuery("");
                    setSelectedTech("all");
                }
                return;
            }

            // Keyboard navigation: ArrowUp, ArrowDown, j, k, Enter
            if (filteredProjects.length > 0) {
                if (e.key === "ArrowDown" || (!isTyping && e.key === "j")) {
                    e.preventDefault();
                    setSelectedIndex((prev) => (prev + 1) % filteredProjects.length);
                } else if (e.key === "ArrowUp" || (!isTyping && e.key === "k")) {
                    e.preventDefault();
                    setSelectedIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
                } else if (e.key === "Enter" && !isTyping && activeProject) {
                    e.preventDefault();
                    router.push(`/project/${activeProject.meta.slug}`);
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [filteredProjects, selectedIndex, activeProject, router, searchQuery, selectedTech]);

    return (
        <div className="space-y-6">
            {/* Terminal Top Command Bar */}
            <div className="rounded-xl border border-border/70 bg-card/60 backdrop-blur-md p-4 shadow-lg font-mono">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Terminal className="size-4 text-primary shrink-0" />
                        <span className="text-foreground font-semibold">hasbi@portfolio:</span>
                        <span className="text-primary">~/projects</span>
                        <span className="text-muted-foreground hidden sm:inline">$ git status --branch={selectedTech}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-[11px]">
                        <span>REPOSITORIES: {initialProjects.length}</span>
                        <span>•</span>
                        <span className="text-emerald-400 font-bold">{filteredProjects.length} MATCHES</span>
                    </div>
                </div>

                {/* Search Bar with Keyboard Hint */}
                <div className="mt-3 flex items-center gap-2 pt-3 border-t border-border/40">
                    <Search className="size-4 text-primary shrink-0" />
                    <span className="text-primary font-bold text-xs">find</span>
                    <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search projects by name, tech stack, client, or role..."
                        className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/60 outline-none text-xs font-mono"
                    />
                    <div className="flex items-center gap-1.5 shrink-0">
                        {searchQuery && (
                            <button
                                onClick={() => setSearchQuery("")}
                                className="text-xs text-muted-foreground hover:text-foreground px-1.5 py-0.5 rounded bg-muted/40 cursor-pointer"
                            >
                                clear
                            </button>
                        )}
                        <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded border border-border bg-muted/30 text-[10px] text-muted-foreground">
                            /
                        </kbd>
                    </div>
                </div>

                {/* Tech Filter Chips */}
                <div className="mt-3 flex flex-wrap items-center gap-1.5 pt-2 border-t border-border/30">
                    <span className="text-muted-foreground text-[11px] mr-1 flex items-center gap-1">
                        <Tag className="size-3" /> stack:
                    </span>
                    {allTechnologies.map((tech) => {
                        const isAll = tech === "all";
                        const isSelected = isAll 
                            ? selectedTech === "all" 
                            : selectedTech.toLowerCase() === tech.toLowerCase();

                        return (
                            <button
                                key={tech}
                                onClick={() => setSelectedTech(isAll ? "all" : tech)}
                                className={cn(
                                    "text-[11px] px-2.5 py-1 rounded-md transition-all font-mono cursor-pointer",
                                    isSelected
                                        ? "bg-primary text-primary-foreground font-bold shadow-xs scale-105"
                                        : "bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted/70"
                                )}
                            >
                                {isAll ? "--all-stacks" : `--${tech}`}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Split View: Git Repository List vs Live Inspector */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left: Terminal Repository Table */}
                <div className="lg:col-span-7 rounded-xl border border-border/70 bg-card/40 backdrop-blur-md shadow-xl overflow-hidden font-mono text-xs flex flex-col">
                    {/* Header */}
                    <div className="px-4 py-2.5 bg-muted/40 border-b border-border/50 text-muted-foreground grid grid-cols-12 gap-2 text-[11px] uppercase font-semibold shrink-0">
                        <span className="col-span-1 hidden sm:inline">Perms</span>
                        <span className="col-span-7 sm:col-span-6">Repository</span>
                        <span className="col-span-2 hidden sm:inline">Year</span>
                        <span className="col-span-5 sm:col-span-3 text-right">Primary Stack</span>
                    </div>

                    {/* Repository entries - Snapping Scroll Container */}
                    <div 
                        ref={scrollContainerRef}
                        className="divide-y divide-border/30 max-h-[460px] overflow-y-auto scroll-smooth snap-y snap-mandatory focus:outline-none"
                        tabIndex={0}
                    >
                        {filteredProjects.length === 0 ? (
                            <div className="p-12 text-center text-muted-foreground space-y-2">
                                <div className="text-primary font-bold text-sm">No matching repositories found.</div>
                                <div className="text-xs">
                                    No records match <code className="text-foreground">"{searchQuery}"</code> with stack <code className="text-foreground">"{selectedTech}"</code>.
                                </div>
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={() => { setSearchQuery(""); setSelectedTech("all"); }}
                                    className="mt-2 text-xs font-mono"
                                >
                                    Reset Filters
                                </Button>
                            </div>
                        ) : (
                            filteredProjects.map((proj, index) => {
                                const isSelected = selectedIndex === index;
                                return (
                                    <div
                                        key={proj.meta.slug}
                                        ref={(el) => { itemRefs.current[index] = el; }}
                                        onClick={() => setSelectedIndex(index)}
                                        onDoubleClick={() => router.push(`/project/${proj.meta.slug}`)}
                                        className={cn(
                                            "grid grid-cols-12 gap-2 items-center px-4 py-3.5 cursor-pointer transition-all duration-150 group snap-start",
                                            isSelected 
                                                ? "bg-primary/15 border-l-4 border-l-primary shadow-inner" 
                                                : "hover:bg-muted/30 border-l-4 border-l-transparent"
                                        )}
                                    >
                                        <span className="col-span-1 text-muted-foreground/60 hidden sm:inline text-[10px]">
                                            drwxr-xr
                                        </span>
                                        <div className="col-span-7 sm:col-span-6 flex items-center gap-2 truncate">
                                            <FolderGit2 className={cn(
                                                "size-3.5 shrink-0 transition-colors",
                                                isSelected ? "text-primary scale-110" : "text-muted-foreground group-hover:text-foreground"
                                            )} />
                                            <span 
                                                className={cn(
                                                    "truncate font-medium transition-colors",
                                                    isSelected ? "text-primary font-bold" : "text-foreground"
                                                )}
                                            >
                                                {proj.meta.slug}.git
                                            </span>
                                        </div>
                                        <span className="col-span-2 text-muted-foreground text-[11px] hidden sm:inline">
                                            {proj.meta.year || "2024"}
                                        </span>
                                        <div className="col-span-5 sm:col-span-3 text-right flex items-center justify-end gap-1.5">
                                            <span className="text-muted-foreground text-[11px] truncate max-w-[100px]">
                                                {proj.meta.technologies?.[0] || "Web"}
                                            </span>
                                            <Link 
                                                href={`/project/${proj.meta.slug}`}
                                                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-primary"
                                                aria-label="Inspect Project"
                                            >
                                                <ArrowUpRight className="size-3.5" />
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Footer Status & Guide */}
                    <div className="px-4 py-2.5 bg-muted/20 border-t border-border/40 text-[10px] text-muted-foreground flex flex-wrap items-center justify-between gap-2 shrink-0">
                        <div className="flex items-center gap-2">
                            <span className="flex items-center gap-1">
                                <kbd className="px-1 py-0.5 rounded border border-border bg-muted/40 font-bold">↑</kbd>
                                <kbd className="px-1 py-0.5 rounded border border-border bg-muted/40 font-bold">↓</kbd> or 
                                <kbd className="px-1 py-0.5 rounded border border-border bg-muted/40 font-bold">j</kbd>
                                <kbd className="px-1 py-0.5 rounded border border-border bg-muted/40 font-bold">k</kbd>
                            </span>
                            <span>navigate</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                                <kbd className="px-1.5 py-0.5 rounded border border-border bg-muted/40 font-bold">↵</kbd> open
                            </span>
                        </div>
                        <span className="text-primary font-bold hidden sm:inline">SNAP_SCROLL: ON</span>
                    </div>
                </div>

                {/* Right: Live Project Inspector */}
                <div className="lg:col-span-5 rounded-xl border border-primary/30 bg-gradient-to-br from-card/90 via-background to-primary/5 p-5 backdrop-blur-xl shadow-xl space-y-4 lg:sticky lg:top-24">
                    <div className="flex items-center justify-between pb-3 border-b border-border/50">
                        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-primary">
                            <Eye className="size-4" />
                            <span>PROJECT_INSPECTOR.EXE</span>
                        </div>
                        <Badge variant="outline" className="text-[10px] font-mono">
                            {activeProject?.meta.year || "2024"}
                        </Badge>
                    </div>

                    {activeProject ? (
                        <div className="space-y-4">
                            {/* Preview Cover */}
                            {activeProject.meta.coverImage && (
                                <div className="relative aspect-video rounded-lg overflow-hidden border border-border/60 shadow-sm">
                                    <Image
                                        src={activeProject.meta.coverImage}
                                        alt={activeProject.meta.title}
                                        width={600}
                                        height={340}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            )}

                            {/* Title & Metadata */}
                            <div className="space-y-1.5">
                                <h3 className="text-lg font-bold text-foreground leading-snug">
                                    {activeProject.meta.title}
                                </h3>
                                <p className="text-xs text-muted-foreground leading-relaxed">
                                    {activeProject.meta.description || "No description preview available for this repository."}
                                </p>
                            </div>

                            {/* Project Specs Grid */}
                            <div className="grid grid-cols-2 gap-2 text-[11px] font-mono p-3 rounded-lg bg-muted/20 border border-border/40">
                                {activeProject.meta.role && (
                                    <div className="space-y-0.5">
                                        <div className="text-muted-foreground flex items-center gap-1">
                                            <Briefcase className="size-3" /> Role:
                                        </div>
                                        <div className="text-foreground font-semibold truncate">{activeProject.meta.role}</div>
                                    </div>
                                )}
                                {activeProject.meta.client && (
                                    <div className="space-y-0.5">
                                        <div className="text-muted-foreground flex items-center gap-1">
                                            <User className="size-3" /> Client:
                                        </div>
                                        <div className="text-foreground font-semibold truncate">{activeProject.meta.client}</div>
                                    </div>
                                )}
                                {activeProject.meta.duration && (
                                    <div className="space-y-0.5">
                                        <div className="text-muted-foreground flex items-center gap-1">
                                            <Clock className="size-3" /> Duration:
                                        </div>
                                        <div className="text-foreground font-semibold truncate">{activeProject.meta.duration}</div>
                                    </div>
                                )}
                                {activeProject.meta.year && (
                                    <div className="space-y-0.5">
                                        <div className="text-muted-foreground flex items-center gap-1">
                                            <Calendar className="size-3" /> Year:
                                        </div>
                                        <div className="text-foreground font-semibold truncate">{activeProject.meta.year}</div>
                                    </div>
                                )}
                            </div>

                            {/* Tech Stack Pills */}
                            {activeProject.meta.technologies && activeProject.meta.technologies.length > 0 && (
                                <div className="space-y-1">
                                    <div className="text-[10px] font-mono text-muted-foreground flex items-center gap-1">
                                        <Layers className="size-3" /> Dependencies:
                                    </div>
                                    <div className="flex flex-wrap gap-1.5">
                                        {activeProject.meta.technologies.map((t) => (
                                            <Badge key={t} variant="secondary" className="text-[10px] font-mono px-2 py-0.5">
                                                {t}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Direct External Links & Inspect Button */}
                            <div className="space-y-2 pt-2">
                                <div className="flex gap-2">
                                    {activeProject.meta.liveUrl && (
                                        <Button size="sm" variant="outline" asChild className="flex-1 font-mono text-xs gap-1.5 cursor-pointer">
                                            <a href={activeProject.meta.liveUrl} target="_blank" rel="noopener noreferrer">
                                                <ExternalLink className="size-3.5 text-primary" /> Live Demo
                                            </a>
                                        </Button>
                                    )}
                                    {activeProject.meta.githubUrl && (
                                        <Button size="sm" variant="outline" asChild className="flex-1 font-mono text-xs gap-1.5 cursor-pointer">
                                            <a href={activeProject.meta.githubUrl} target="_blank" rel="noopener noreferrer">
                                                <Github className="size-3.5" /> Source
                                            </a>
                                        </Button>
                                    )}
                                </div>

                                <Button asChild className="w-full font-mono text-xs gap-2 shadow-md shadow-primary/20 cursor-pointer">
                                    <Link href={`/project/${activeProject.meta.slug}`}>
                                        git checkout {activeProject.meta.slug} <CornerDownLeft className="size-3.5" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="p-8 text-center text-muted-foreground text-xs font-mono">
                            Select a repository to inspect its architecture.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
