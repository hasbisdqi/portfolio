"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Maximize2, X, ChevronLeft, ChevronRight, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProjectGallery({ images, title }: { images: string[]; title: string }) {
    const [activeIdx, setActiveIdx] = useState<number | null>(null);

    if (!images || images.length === 0) return null;

    return (
        <section className="space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-border/40">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-primary">
                    <ImageIcon className="size-4" />
                    <span># REPOSITORY_SCREENSHOTS ({images.length})</span>
                </div>
                <span className="text-[11px] font-mono text-muted-foreground">Click to inspect view</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {images.map((src, index) => (
                    <div
                        key={index}
                        onClick={() => setActiveIdx(index)}
                        className="group relative aspect-video rounded-xl overflow-hidden border border-border/60 bg-card/60 cursor-pointer transition-all hover:border-primary/50 hover:shadow-lg hover:-translate-y-0.5"
                    >
                        <Image
                            src={src}
                            alt={`${title} screenshot ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-background/0 group-hover:bg-background/40 transition-colors flex items-center justify-center">
                            <div className="opacity-0 group-hover:opacity-100 transition-opacity p-2 rounded-lg bg-background/90 border border-border shadow-md text-foreground">
                                <Maximize2 className="size-4" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Lightbox / Modal */}
            {activeIdx !== null && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-md animate-in fade-in-0 duration-150">
                    <div className="fixed inset-0" onClick={() => setActiveIdx(null)} />
                    
                    <div className="relative max-w-5xl w-full max-h-[85vh] rounded-2xl border border-border bg-card p-2 shadow-2xl overflow-hidden z-10 space-y-2">
                        <div className="flex items-center justify-between px-3 py-2 border-b border-border/40 font-mono text-xs text-muted-foreground">
                            <span>Image {activeIdx + 1} of {images.length}</span>
                            <button
                                onClick={() => setActiveIdx(null)}
                                className="p-1 rounded-md hover:bg-muted text-foreground transition-colors cursor-pointer"
                            >
                                <X className="size-4" />
                            </button>
                        </div>

                        <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-muted/20">
                            <Image
                                src={images[activeIdx]}
                                alt={`${title} screenshot preview`}
                                fill
                                className="object-contain"
                            />
                        </div>

                        {images.length > 1 && (
                            <div className="flex items-center justify-between px-2 pt-1 font-mono text-xs">
                                <button
                                    onClick={() => setActiveIdx((prev) => (prev! - 1 + images.length) % images.length)}
                                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border hover:bg-muted text-foreground transition-colors cursor-pointer"
                                >
                                    <ChevronLeft className="size-4" /> Prev
                                </button>
                                <button
                                    onClick={() => setActiveIdx((prev) => (prev! + 1) % images.length)}
                                    className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-border hover:bg-muted text-foreground transition-colors cursor-pointer"
                                >
                                    Next <ChevronRight className="size-4" />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </section>
    );
}
