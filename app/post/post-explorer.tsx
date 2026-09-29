"use client";

import React, { useState, useMemo, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { 
    Terminal, 
    FileText, 
    Search, 
    Calendar, 
    Clock, 
    Tag, 
    ArrowUpRight, 
    CornerDownLeft,
    Eye
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn, formatDate } from "@/lib/utils";

interface PostItem {
    meta: {
        slug: string;
        title: string;
        description: string;
        date: string;
        readTime: string;
        cover?: string;
        tags?: string[];
        published?: boolean;
    };
}

export default function PostExplorer({ initialPosts }: { initialPosts: PostItem[] }) {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTag, setSelectedTag] = useState<string>("all");
    const [selectedIndex, setSelectedIndex] = useState<number>(0);

    const searchInputRef = useRef<HTMLInputElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

    // Normalisasi dan ambil semua tags unik
    const allTags = useMemo(() => {
        const tagMap = new Map<string, string>();
        initialPosts.forEach((post) => {
            post.meta.tags?.forEach((t) => {
                const cleaned = t.trim();
                if (cleaned) {
                    const lower = cleaned.toLowerCase();
                    if (!tagMap.has(lower)) {
                        tagMap.set(lower, cleaned);
                    }
                }
            });
        });
        return ["all", ...Array.from(tagMap.values())];
    }, [initialPosts]);

    // Filter posts dengan case-insensitive query & tag matching
    const filteredPosts = useMemo(() => {
        const query = searchQuery.trim().toLowerCase();
        const tagFilter = selectedTag.toLowerCase();

        return initialPosts.filter((post) => {
            const matchesQuery = 
                !query ||
                post.meta.title.toLowerCase().includes(query) ||
                post.meta.description.toLowerCase().includes(query) ||
                post.meta.slug.toLowerCase().includes(query) ||
                (post.meta.tags && post.meta.tags.some(t => t.toLowerCase().includes(query)));
            
            const matchesTag = 
                tagFilter === "all" || 
                (post.meta.tags && post.meta.tags.some(t => t.toLowerCase() === tagFilter));

            return matchesQuery && matchesTag;
        });
    }, [initialPosts, searchQuery, selectedTag]);

    // Reset index saat filter berubah
    useEffect(() => {
        setSelectedIndex(0);
    }, [searchQuery, selectedTag]);

    const activePost = filteredPosts[selectedIndex] || filteredPosts[0];

    // Auto scroll & snap active item ke viewport container
    useEffect(() => {
        const currentItem = itemRefs.current[selectedIndex];
        if (currentItem && scrollContainerRef.current) {
            currentItem.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
            });
        }
    }, [selectedIndex]);

    // Global keyboard shortcut navigation
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
                } else if (searchQuery || selectedTag !== "all") {
                    setSearchQuery("");
                    setSelectedTag("all");
                }
                return;
            }

            // Keyboard navigation: ArrowUp, ArrowDown, j, k, Enter
            if (filteredPosts.length > 0) {
                if (e.key === "ArrowDown" || (!isTyping && e.key === "j")) {
                    e.preventDefault();
                    setSelectedIndex((prev) => (prev + 1) % filteredPosts.length);
                } else if (e.key === "ArrowUp" || (!isTyping && e.key === "k")) {
                    e.preventDefault();
                    setSelectedIndex((prev) => (prev - 1 + filteredPosts.length) % filteredPosts.length);
                } else if (e.key === "Enter" && !isTyping && activePost) {
                    e.preventDefault();
                    router.push(`/post/${activePost.meta.slug}`);
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [filteredPosts, selectedIndex, activePost, router, searchQuery, selectedTag]);

    return (
        <div className="space-y-6">
            {/* Terminal Top Command Bar */}
            <div className="rounded-xl border border-border/70 bg-card/60 backdrop-blur-md p-4 shadow-lg font-mono">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                    <div className="flex items-center gap-2 text-muted-foreground">
                        <Terminal className="size-4 text-primary shrink-0" />
                        <span className="text-foreground font-semibold">hasbi@portfolio:</span>
                        <span className="text-primary">~/posts</span>
                        <span className="text-muted-foreground hidden sm:inline">$ ls -la --filter={selectedTag}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground text-[11px]">
                        <span>TOTAL: {initialPosts.length}</span>
                        <span>•</span>
                        <span className="text-emerald-400 font-bold">{filteredPosts.length} MATCHES</span>
                    </div>
                </div>

                {/* Grep / Search Input with keyboard shortcut hint */}
                <div className="mt-3 flex items-center gap-2 pt-3 border-t border-border/40">
                    <Search className="size-4 text-primary shrink-0" />
                    <span className="text-primary font-bold text-xs">grep</span>
                    <input
                        ref={searchInputRef}
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search posts (Press '/' to focus, 'ESC' to clear)..."
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

                {/* Tag Filter Chips */}
                <div className="mt-3 flex flex-wrap items-center gap-1.5 pt-2 border-t border-border/30">
                    <span className="text-muted-foreground text-[11px] mr-1 flex items-center gap-1">
                        <Tag className="size-3" /> tags:
                    </span>
                    {allTags.map((tag) => {
                        const isAll = tag === "all";
                        const isSelected = isAll 
                            ? selectedTag === "all" 
                            : selectedTag.toLowerCase() === tag.toLowerCase();

                        return (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(isAll ? "all" : tag)}
                                className={cn(
                                    "text-[11px] px-2.5 py-1 rounded-md transition-all font-mono cursor-pointer",
                                    isSelected
                                        ? "bg-primary text-primary-foreground font-bold shadow-xs scale-105"
                                        : "bg-muted/40 text-muted-foreground hover:text-foreground hover:bg-muted/70"
                                )}
                            >
                                {isAll ? "--all" : `--${tag}`}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Split View: File Tree vs Live Inspector */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                {/* Left: Terminal File Table */}
                <div className="lg:col-span-7 rounded-xl border border-border/70 bg-card/40 backdrop-blur-md shadow-xl overflow-hidden font-mono text-xs flex flex-col">
                    {/* File table header */}
                    <div className="px-4 py-2.5 bg-muted/40 border-b border-border/50 text-muted-foreground grid grid-cols-12 gap-2 text-[11px] uppercase font-semibold shrink-0">
                        <span className="col-span-1 hidden sm:inline">Perms</span>
                        <span className="col-span-7 sm:col-span-6">File Name</span>
                        <span className="col-span-2 hidden sm:inline">Read Time</span>
                        <span className="col-span-5 sm:col-span-3 text-right">Date</span>
                    </div>

                    {/* File entries - Snapping Scroll Container */}
                    <div 
                        ref={scrollContainerRef}
                        className="divide-y divide-border/30 max-h-[460px] overflow-y-auto scroll-smooth snap-y snap-mandatory focus:outline-none"
                        tabIndex={0}
                    >
                        {filteredPosts.length === 0 ? (
                            <div className="p-12 text-center text-muted-foreground space-y-2">
                                <div className="text-primary font-bold text-sm">No matching logs found.</div>
                                <div className="text-xs">
                                    No records match <code className="text-foreground">"{searchQuery}"</code> with tag <code className="text-foreground">"{selectedTag}"</code>.
                                </div>
                                <Button 
                                    variant="outline" 
                                    size="sm" 
                                    onClick={() => { setSearchQuery(""); setSelectedTag("all"); }}
                                    className="mt-2 text-xs font-mono"
                                >
                                    Reset Filters
                                </Button>
                            </div>
                        ) : (
                            filteredPosts.map((post, index) => {
                                const isSelected = selectedIndex === index;
                                return (
                                    <div
                                        key={post.meta.slug}
                                        ref={(el) => { itemRefs.current[index] = el; }}
                                        onClick={() => setSelectedIndex(index)}
                                        onDoubleClick={() => router.push(`/post/${post.meta.slug}`)}
                                        className={cn(
                                            "grid grid-cols-12 gap-2 items-center px-4 py-3.5 cursor-pointer transition-all duration-150 group snap-start",
                                            isSelected 
                                                ? "bg-primary/15 border-l-4 border-l-primary shadow-inner" 
                                                : "hover:bg-muted/30 border-l-4 border-l-transparent"
                                        )}
                                    >
                                        <span className="col-span-1 text-muted-foreground/60 hidden sm:inline text-[10px]">
                                            -rw-r--
                                        </span>
                                        <div className="col-span-7 sm:col-span-6 flex items-center gap-2 truncate">
                                            <FileText className={cn(
                                                "size-3.5 shrink-0 transition-colors",
                                                isSelected ? "text-primary scale-110" : "text-muted-foreground group-hover:text-foreground"
                                            )} />
                                            <span 
                                                className={cn(
                                                    "truncate font-medium transition-colors",
                                                    isSelected ? "text-primary font-bold" : "text-foreground"
                                                )}
                                            >
                                                {post.meta.slug}.mdx
                                            </span>
                                        </div>
                                        <span className="col-span-2 text-muted-foreground text-[11px] hidden sm:inline">
                                            {post.meta.readTime}
                                        </span>
                                        <div className="col-span-5 sm:col-span-3 text-right flex items-center justify-end gap-1.5">
                                            <time className="text-muted-foreground text-[11px]" dateTime={post.meta.date}>
                                                {formatDate(post.meta.date)}
                                            </time>
                                            <Link 
                                                href={`/post/${post.meta.slug}`}
                                                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-primary"
                                                aria-label="Read Post"
                                            >
                                                <ArrowUpRight className="size-3.5" />
                                            </Link>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>

                    {/* Footer Status & Keyboard Navigation Guide */}
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

                {/* Right: Live Inspector / Quick Preview */}
                <div className="lg:col-span-5 rounded-xl border border-primary/30 bg-gradient-to-br from-card/90 via-background to-primary/5 p-5 backdrop-blur-xl shadow-xl space-y-4 lg:sticky lg:top-24">
                    <div className="flex items-center justify-between pb-3 border-b border-border/50">
                        <div className="flex items-center gap-2 text-xs font-mono font-semibold text-primary">
                            <Eye className="size-4" />
                            <span>QUICK_INSPECTOR.EXE</span>
                        </div>
                        <Badge variant="outline" className="text-[10px] font-mono">
                            {activePost?.meta.readTime || "3 min"}
                        </Badge>
                    </div>

                    {activePost ? (
                        <div className="space-y-4">
                            {/* Preview Cover */}
                            {activePost.meta.cover && (
                                <div className="relative aspect-video rounded-lg overflow-hidden border border-border/60 shadow-sm">
                                    <Image
                                        src={activePost.meta.cover}
                                        alt={activePost.meta.title}
                                        width={600}
                                        height={340}
                                        className="object-cover w-full h-full"
                                    />
                                </div>
                            )}

                            {/* Title & Metadata */}
                            <div className="space-y-1.5">
                                <h3 className="text-lg font-bold text-foreground leading-snug">
                                    {activePost.meta.title}
                                </h3>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground font-mono">
                                    <span className="flex items-center gap-1">
                                        <Calendar className="size-3" /> {formatDate(activePost.meta.date)}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <Clock className="size-3" /> {activePost.meta.readTime}
                                    </span>
                                </div>
                            </div>

                            {/* Description Snippet */}
                            <p className="text-xs text-muted-foreground leading-relaxed">
                                {activePost.meta.description || "No description preview available for this log."}
                            </p>

                            {/* Tags */}
                            {activePost.meta.tags && activePost.meta.tags.length > 0 && (
                                <div className="flex flex-wrap gap-1.5 pt-1">
                                    {activePost.meta.tags.map((t) => (
                                        <Badge key={t} variant="secondary" className="text-[10px] font-mono px-2 py-0.5">
                                            #{t}
                                        </Badge>
                                    ))}
                                </div>
                            )}

                            {/* Action Button */}
                            <div className="pt-2">
                                <Button asChild className="w-full font-mono text-xs gap-2 shadow-md shadow-primary/20 cursor-pointer">
                                    <Link href={`/post/${activePost.meta.slug}`}>
                                        cat {activePost.meta.slug}.mdx <CornerDownLeft className="size-3.5" />
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    ) : (
                        <div className="p-8 text-center text-muted-foreground text-xs font-mono">
                            Select a log from the explorer to preview details.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
