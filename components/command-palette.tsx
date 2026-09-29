"use client";

import React, { useState, useEffect, useCallback, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
    Terminal,
    Home,
    User,
    FileText,
    FolderGit2,
    Sun,
    Moon,
    Laptop,
    Copy,
    Check,
    ExternalLink,
    Github,
    Linkedin,
    Twitter,
    Mail,
    Search,
    X,
    CornerDownLeft,
    Sparkles
} from "lucide-react";
import { cn } from "@/lib/utils";

interface CommandItem {
    id: string;
    label: string;
    group: "Navigation" | "Theme" | "Actions" | "Socials";
    icon: React.ElementType;
    shortcut?: string;
    action: () => void;
}

export function CommandPalette() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [copied, setCopied] = useState(false);
    const router = useRouter();
    const { setTheme } = useTheme();

    const handleCopyEmail = useCallback(() => {
        navigator.clipboard.writeText("muhhasbiassidiqi18@gmail.com");
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        setOpen(false);
    }, []);

    const commands: CommandItem[] = useMemo(() => [
        // Navigation
        {
            id: "nav-home",
            label: "Go to Home (~/)",
            group: "Navigation",
            icon: Home,
            shortcut: "G H",
            action: () => { router.push("/"); setOpen(false); }
        },
        {
            id: "nav-about",
            label: "Go to About (~/about)",
            group: "Navigation",
            icon: User,
            shortcut: "G A",
            action: () => { router.push("/about"); setOpen(false); }
        },
        {
            id: "nav-posts",
            label: "Go to Posts & Notes (~/post)",
            group: "Navigation",
            icon: FileText,
            shortcut: "G P",
            action: () => { router.push("/post"); setOpen(false); }
        },
        {
            id: "nav-projects",
            label: "Go to Projects (~/project)",
            group: "Navigation",
            icon: FolderGit2,
            shortcut: "G R",
            action: () => { router.push("/project"); setOpen(false); }
        },

        // Theme Switcher
        {
            id: "theme-light",
            label: "Switch to Light Theme",
            group: "Theme",
            icon: Sun,
            action: () => { setTheme("light"); setOpen(false); }
        },
        {
            id: "theme-dark",
            label: "Switch to Dark Theme",
            group: "Theme",
            icon: Moon,
            action: () => { setTheme("dark"); setOpen(false); }
        },
        {
            id: "theme-system",
            label: "Switch to System Theme",
            group: "Theme",
            icon: Laptop,
            action: () => { setTheme("system"); setOpen(false); }
        },

        // Actions
        {
            id: "act-email",
            label: "Copy Email Address (muhhasbiassidiqi18@gmail.com)",
            group: "Actions",
            icon: Copy,
            action: handleCopyEmail
        },
        {
            id: "act-resume",
            label: "View Resume (Google Docs)",
            group: "Actions",
            icon: ExternalLink,
            action: () => { 
                window.open("https://docs.google.com/document/d/1UwrlveA4pVUxMA6qjox0oxS13XjNRRVGGS5H_K5DDZ8/edit?usp=sharing", "_blank"); 
                setOpen(false); 
            }
        },

        // Socials
        {
            id: "soc-github",
            label: "Open GitHub Profile (@hasbisdqi)",
            group: "Socials",
            icon: Github,
            action: () => { window.open("https://github.com/hasbisdqi", "_blank"); setOpen(false); }
        },
        {
            id: "soc-linkedin",
            label: "Open LinkedIn Profile (/in/rnghbt)",
            group: "Socials",
            icon: Linkedin,
            action: () => { window.open("https://linkedin.com/in/rnghbt", "_blank"); setOpen(false); }
        },
        {
            id: "soc-twitter",
            label: "Open Twitter / X Profile (@rnghbt)",
            group: "Socials",
            icon: Twitter,
            action: () => { window.open("https://twitter.com/rnghbt", "_blank"); setOpen(false); }
        }
    ], [router, setTheme, handleCopyEmail]);

    // Filter commands by query
    const filteredCommands = useMemo(() => {
        if (!query.trim()) return commands;
        const q = query.toLowerCase();
        return commands.filter(c => 
            c.label.toLowerCase().includes(q) || 
            c.group.toLowerCase().includes(q)
        );
    }, [commands, query]);

    // Reset selected index when filtered list changes
    useEffect(() => {
        setSelectedIndex(0);
    }, [query]);

    // Global Keydown Listeners & Custom Event for Opening and Navigating Palette
    useEffect(() => {
        let lastKeyTime = 0;
        let pendingG = false;

        const handleOpenPalette = () => {
            setOpen(true);
            setQuery("");
        };

        const handleKeyDown = (e: KeyboardEvent) => {
            const isModifier = e.metaKey || e.ctrlKey;

            // Cmd+Shift+P / Ctrl+Shift+P OR Cmd+K / Ctrl+K
            if (isModifier && ((e.shiftKey && (e.key === "p" || e.key === "P")) || e.key === "k" || e.key === "K")) {
                e.preventDefault();
                setOpen(prev => !prev);
                setQuery("");
                return;
            }

            // If Modal is open
            if (open) {
                if (e.key === "Escape") {
                    e.preventDefault();
                    setOpen(false);
                    return;
                }

                if (filteredCommands.length > 0) {
                    if (e.key === "ArrowDown") {
                        e.preventDefault();
                        setSelectedIndex(prev => (prev + 1) % filteredCommands.length);
                    } else if (e.key === "ArrowUp") {
                        e.preventDefault();
                        setSelectedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
                    } else if (e.key === "Enter") {
                        e.preventDefault();
                        filteredCommands[selectedIndex]?.action();
                    }
                }
                return;
            }

            // Quick Double-key Navigation when modal is closed (e.g., 'g' then 'h')
            const isTyping = ["INPUT", "TEXTAREA"].includes((document.activeElement as HTMLElement)?.tagName);
            if (!isTyping && !isModifier) {
                const now = Date.now();
                if (e.key.toLowerCase() === "g") {
                    pendingG = true;
                    lastKeyTime = now;
                    return;
                }

                if (pendingG && now - lastKeyTime < 800) {
                    const key = e.key.toLowerCase();
                    pendingG = false;
                    if (key === "h") router.push("/");
                    else if (key === "a") router.push("/about");
                    else if (key === "p") router.push("/post");
                    else if (key === "r") router.push("/project");
                } else {
                    pendingG = false;
                }
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("open-command-palette", handleOpenPalette);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("open-command-palette", handleOpenPalette);
        };
    }, [open, filteredCommands, selectedIndex, router]);

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-background/80 backdrop-blur-md animate-in fade-in-0 duration-150">
            {/* Backdrop click to close */}
            <div className="fixed inset-0" onClick={() => setOpen(false)} />

            {/* Modal Dialog */}
            <div className="relative w-full max-w-xl rounded-xl border border-border/80 bg-card shadow-2xl overflow-hidden font-mono text-xs animate-in zoom-in-95 duration-150">
                {/* Search Header */}
                <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border/60 bg-muted/30">
                    <Terminal className="size-4 text-primary shrink-0" />
                    <input
                        autoFocus
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Type a command or search (e.g. 'posts', 'theme', 'copy')..."
                        className="w-full bg-transparent text-foreground placeholder:text-muted-foreground/60 outline-none text-xs font-mono"
                    />
                    <kbd className="hidden sm:inline-block px-1.5 py-0.5 rounded border border-border bg-muted/40 text-[10px] text-muted-foreground">
                        ESC
                    </kbd>
                </div>

                {/* Command List */}
                <div className="max-h-80 overflow-y-auto divide-y divide-border/20 p-1.5">
                    {filteredCommands.length === 0 ? (
                        <div className="p-8 text-center text-muted-foreground">
                            <div className="text-primary font-bold mb-1">No command found.</div>
                            <div className="text-[11px]">Try searching for 'about', 'post', 'project', or 'theme'.</div>
                        </div>
                    ) : (
                        filteredCommands.map((cmd, idx) => {
                            const isSelected = selectedIndex === idx;
                            const Icon = cmd.icon;
                            return (
                                <div
                                    key={cmd.id}
                                    onClick={() => cmd.action()}
                                    onMouseEnter={() => setSelectedIndex(idx)}
                                    className={cn(
                                        "flex items-center justify-between px-3.5 py-2.5 rounded-lg cursor-pointer transition-all",
                                        isSelected 
                                            ? "bg-primary text-primary-foreground font-semibold shadow-xs" 
                                            : "text-foreground hover:bg-muted/40"
                                    )}
                                >
                                    <div className="flex items-center gap-2.5 truncate">
                                        <Icon className={cn("size-4 shrink-0", isSelected ? "text-primary-foreground" : "text-primary")} />
                                        <span className="truncate">{cmd.label}</span>
                                    </div>
                                    <div className="flex items-center gap-2 shrink-0">
                                        <span className={cn(
                                            "text-[10px] uppercase",
                                            isSelected ? "text-primary-foreground/80" : "text-muted-foreground"
                                        )}>
                                            {cmd.group}
                                        </span>
                                        {cmd.shortcut && (
                                            <kbd className={cn(
                                                "px-1.5 py-0.5 rounded text-[10px] font-mono",
                                                isSelected ? "bg-primary-foreground/20 text-primary-foreground" : "bg-muted border border-border text-muted-foreground"
                                            )}>
                                                {cmd.shortcut}
                                            </kbd>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                {/* Footer Navigation Hints */}
                <div className="px-4 py-2 bg-muted/40 border-t border-border/50 text-[10px] text-muted-foreground flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                            <kbd className="px-1 py-0.5 rounded border border-border bg-background">↑</kbd>
                            <kbd className="px-1 py-0.5 rounded border border-border bg-background">↓</kbd> navigate
                        </span>
                        <span className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 rounded border border-border bg-background">↵</kbd> select
                        </span>
                        <span className="flex items-center gap-1">
                            <kbd className="px-1.5 py-0.5 rounded border border-border bg-background">esc</kbd> close
                        </span>
                    </div>
                    <span className="text-primary font-bold hidden sm:inline">GLOBAL_COMMAND_PALETTE</span>
                </div>
            </div>
        </div>
    );
}

// Global trigger function to open command palette from anywhere
export function openCommandPalette() {
    if (typeof window !== "undefined") {
        window.dispatchEvent(new CustomEvent("open-command-palette"));
    }
}
