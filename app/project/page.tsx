import { getProjects } from "@/lib/contents";
import React from "react";
import Link from "next/link";
import { Metadata } from "next";
import { getOgImageUrl } from "@/lib/utils";
import { ArrowLeft, ArrowUpRight, Github } from "lucide-react";

export const metadata: Metadata = {
    title: "Projects — Hasbi Assidiqi",
    description: "All production applications, open-source projects, and technical case studies.",
    openGraph: {
        title: "Projects — Hasbi Assidiqi",
        description: "All production applications, open-source projects, and technical case studies.",
        images: [getOgImageUrl("Projects")],
    },
};

export default async function ProjectPage() {
    const projects = await getProjects();

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
                            Projects
                        </h1>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            Selected production systems, mobile architectures, and open-source experiments.
                        </p>
                    </div>
                </div>

                {/* Clean Project Feed */}
                <div className="space-y-4">
                    {projects.map((project) => (
                        <div
                            key={project.meta.slug}
                            className="group relative rounded-xl border border-border/60 bg-card/40 hover:bg-card/80 hover:border-border transition-all duration-200 p-4 sm:p-5 space-y-3"
                        >
                            <div className="flex items-start justify-between gap-3">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <Link
                                            href={`/project/${project.meta.slug}`}
                                            className="font-semibold text-sm sm:text-base text-foreground group-hover:text-primary transition-colors"
                                        >
                                            {project.meta.title}
                                        </Link>
                                        <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-500 font-medium">
                                            <span className="size-1.5 rounded-full bg-emerald-500" />
                                            Live
                                        </span>
                                    </div>
                                    <p className="text-xs text-muted-foreground leading-relaxed line-clamp-2">
                                        {project.meta.description}
                                    </p>
                                </div>

                                {project.meta.year && (
                                    <span className="text-xs font-mono text-muted-foreground shrink-0 pt-0.5">
                                        {project.meta.year}
                                    </span>
                                )}
                            </div>

                            <div className="flex flex-wrap items-center justify-between gap-2 pt-1 border-t border-border/30">
                                <div className="flex flex-wrap gap-1.5">
                                    {project.meta.technologies?.slice(0, 5).map((tech) => (
                                        <span
                                            key={tech}
                                            className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-muted/40 border border-border/30 text-muted-foreground"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>

                                <div className="flex items-center gap-2 shrink-0">
                                    {project.meta.githubUrl && (
                                        <a
                                            href={project.meta.githubUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-muted-foreground hover:text-foreground text-xs p-1"
                                            title="GitHub Repository"
                                        >
                                            <Github className="size-3.5" />
                                        </a>
                                    )}
                                    <Link
                                        href={`/project/${project.meta.slug}`}
                                        className="text-xs font-mono text-primary flex items-center gap-0.5 hover:underline"
                                    >
                                        <span>Case study</span>
                                        <ArrowUpRight className="size-3" />
                                    </Link>
                                </div>
                            </div>
                        </div>
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
