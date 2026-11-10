import { getPosts } from "@/lib/contents";
import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { getOgImageUrl } from "@/lib/utils";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
    title: "Writing & Notes — Hasbi Assidiqi",
    description: "Reflections, architectural breakdowns, and engineering logs.",
    openGraph: {
        title: "Writing & Notes — Hasbi Assidiqi",
        description: "Reflections, architectural breakdowns, and engineering logs.",
        images: [getOgImageUrl("Writing & Notes")],
    },
};

export default async function PostPage() {
    const posts = await getPosts();
    const sortedPosts = [...posts].sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());

    return (
        <main className="min-h-screen pb-24">
            <div className="max-w-2xl mx-auto px-5 pt-16 md:pt-24 space-y-12">
                {/* Back to Home & Header */}
                <div className="space-y-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors group"
                    >
                        <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
                        <span>Back to home</span>
                    </Link>

                    <div className="space-y-1">
                        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                            Writing & Notes
                        </h1>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            Reflections, architectural breakdowns, and engineering logs.
                        </p>
                    </div>
                </div>

                {/* Clean Articles Feed */}
                <div className="divide-y divide-border/40">
                    {sortedPosts.map((post) => (
                        <Link
                            key={post.meta.slug}
                            href={`/post/${post.meta.slug}`}
                            className="group py-4 flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 sm:gap-4 hover:text-primary transition-colors block"
                        >
                            <span className="text-sm sm:text-base font-medium text-foreground group-hover:text-primary transition-colors">
                                {post.meta.title}
                            </span>
                            <span className="text-xs font-mono text-muted-foreground shrink-0 pt-0.5">
                                {post.meta.date}
                            </span>
                        </Link>
                    ))}
                </div>

                {/* Minimal Footer */}
                <footer className="pt-8 border-t border-border/30 text-center font-mono text-xs text-muted-foreground">
                    <p className="text-[11px] text-muted-foreground/70">
                        Designed &amp; Developed by Hasbi Assidiqi · © {new Date().getFullYear()}
                    </p>
                </footer>
            </div>
        </main>
    );
}
