import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getPosts, getProjects } from "@/lib/contents";
import ContactForm from "./about/contact-form";
import { 
    Github, 
    Linkedin, 
    Mail, 
    ExternalLink, 
    ArrowUpRight, 
    FileText
} from "lucide-react";

export default async function Home() {
    const [posts, projects] = await Promise.all([
        getPosts(),
        getProjects(),
    ]);

    const sortedPosts = [...posts].sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());

    const techStack = [
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "Flutter",
        "Dart",
        "Node.js",
        "Python",
        "PostgreSQL",
        "Prisma",
        "Docker",
        "Solana Web3",
        "Git",
    ];

    const experiences = [
        {
            period: "2024 — Present",
            role: "Information Systems",
            organization: "UPN \"Veteran\" Yogyakarta",
            desc: "Undergraduate student focusing on enterprise software engineering, distributed database systems, and human-computer interaction.",
        },
        {
            period: "2021 — Present",
            role: "Freelance Full Stack Engineer",
            organization: "Independent",
            desc: "Architecting responsive, high-performance web applications, REST API gateways, and custom workflow automations.",
        },
        {
            period: "2022",
            role: "Web Developer Intern",
            organization: "PT Global Intermedia Nusantara",
            desc: "Collaborated on production government & enterprise web modules, query optimization, and UI standards.",
        },
    ];

    return (
        <main className="min-h-screen pb-24">
            <div className="max-w-2xl mx-auto px-5 pt-16 md:pt-24 space-y-16">
                
                {/* 1. HERO & PROFILE HEADER */}
                <section id="hero" className="space-y-6">
                    <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground">
                                Hasbi Assidiqi
                            </h1>
                            <p className="font-mono text-xs sm:text-sm text-muted-foreground tracking-widest uppercase">
                                F u l l &nbsp; S t a c k &nbsp; E n g i n e e r .
                            </p>
                            <p className="text-xs text-muted-foreground flex items-center gap-1.5 pt-1 font-mono">
                                <span>Yogyakarta, ID</span>
                                <span>·</span>
                                <span className="inline-flex items-center gap-1.5 text-emerald-500 font-medium">
                                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                    Available for hire
                                </span>
                            </p>
                        </div>

                        <div className="relative size-16 sm:size-20 rounded-2xl overflow-hidden border border-border/80 shadow-sm shrink-0 bg-muted">
                            <Image
                                src="/avatar.jpeg"
                                alt="Hasbi Assidiqi"
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Clean Bullet Bio (samworks style) */}
                    <div className="space-y-2.5 text-sm sm:text-base text-muted-foreground leading-relaxed pt-1">
                        <p className="flex items-start gap-2.5">
                            <span className="text-foreground font-bold shrink-0">•</span>
                            <span>
                                I&apos;m a software engineer passionate about crafting digital products where thoughtful design meets clean, scalable code.
                            </span>
                        </p>
                        <p className="flex items-start gap-2.5">
                            <span className="text-foreground font-bold shrink-0">•</span>
                            <span>
                                I design and develop modern interfaces with <strong className="text-foreground font-semibold">React, Next.js, TypeScript, and Flutter</strong> focusing on usability, performance, and delightful interactions.
                            </span>
                        </p>
                        <p className="flex items-start gap-2.5">
                            <span className="text-foreground font-bold shrink-0">•</span>
                            <span>
                                Currently studying Information Systems at UPN &ldquo;Veteran&rdquo; Yogyakarta, enjoying transforming ideas into polished products and exploring on-chain web3 mechanics.
                            </span>
                        </p>
                    </div>

                    {/* Minimalist Contact & Social Pills */}
                    <div className="flex flex-wrap items-center gap-2 pt-1 font-mono text-xs">
                        <a
                            href="https://github.com/hasbisdqi"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/60 bg-muted/20 hover:bg-muted/60 hover:text-foreground text-muted-foreground transition-colors"
                        >
                            <Github className="size-3.5" />
                            <span>GitHub</span>
                            <ArrowUpRight className="size-3 opacity-50" />
                        </a>
                        <a
                            href="https://linkedin.com/in/rnghbt"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/60 bg-muted/20 hover:bg-muted/60 hover:text-foreground text-muted-foreground transition-colors"
                        >
                            <Linkedin className="size-3.5 text-blue-500" />
                            <span>LinkedIn</span>
                            <ArrowUpRight className="size-3 opacity-50" />
                        </a>
                        <a
                            href="mailto:muhhasbiassidiqi18@gmail.com"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/60 bg-muted/20 hover:bg-muted/60 hover:text-foreground text-muted-foreground transition-colors"
                        >
                            <Mail className="size-3.5" />
                            <span>Email</span>
                        </a>
                        <a
                            href="https://docs.google.com/document/d/1UwrlveA4pVUxMA6qjox0oxS13XjNRRVGGS5H_K5DDZ8/edit?usp=sharing"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border/60 bg-muted/20 hover:bg-muted/60 hover:text-foreground text-muted-foreground transition-colors"
                        >
                            <FileText className="size-3.5" />
                            <span>Resume</span>
                            <ExternalLink className="size-3 opacity-50" />
                        </a>
                    </div>
                </section>

                <div className="border-t border-border/40" />

                {/* 2. FEATURED PROJECTS SECTION */}
                <section id="projects" className="space-y-5 scroll-mt-20">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <h2 className="text-base sm:text-lg font-bold tracking-tight text-foreground">
                                Projects
                            </h2>
                            <p className="text-xs text-muted-foreground">
                                Selected production systems and open-source works.
                            </p>
                        </div>
                        <Link 
                            href="/project"
                            className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
                        >
                            <span>View all</span>
                            <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                    </div>

                    <div className="space-y-3.5">
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
                                        {project.meta.technologies?.slice(0, 4).map((tech) => (
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
                                            href={"/project/" + project.meta.slug}
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
                </section>

                <div className="border-t border-border/40" />

                {/* 3. TECH STACK (MINIMALIST PILLS) */}
                <section id="tech-stack" className="space-y-4">
                    <div className="space-y-0.5">
                        <h2 className="text-base sm:text-lg font-bold tracking-tight text-foreground">
                            Tech Stack
                        </h2>
                        <p className="text-xs text-muted-foreground">
                            Technologies I use to build scalable digital experiences.
                        </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-1">
                        {techStack.map((tech) => (
                            <span 
                                key={tech}
                                className="text-xs font-mono px-3 py-1.5 rounded-lg border border-border/50 bg-card/40 text-foreground transition-colors cursor-default hover:border-primary/50"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </section>

                <div className="border-t border-border/40" />

                {/* 4. WORK & EDUCATION TIMELINE */}
                <section id="about" className="space-y-5 scroll-mt-20">
                    <div className="space-y-0.5">
                        <h2 className="text-base sm:text-lg font-bold tracking-tight text-foreground">
                            Experience & Education
                        </h2>
                        <p className="text-xs text-muted-foreground">
                            My journey in software engineering so far.
                        </p>
                    </div>

                    <div className="space-y-4">
                        {experiences.map((exp, idx) => (
                            <div key={idx} className="flex flex-col sm:flex-row sm:gap-4 items-start">
                                <span className="text-xs font-mono text-muted-foreground shrink-0 w-32 pt-0.5">
                                    {exp.period}
                                </span>
                                <div className="space-y-1 pt-1 sm:pt-0">
                                    <div className="text-sm font-semibold text-foreground">
                                        {exp.role} &nbsp;·&nbsp; <span className="text-muted-foreground font-normal">{exp.organization}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground leading-relaxed">
                                        {exp.desc}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                <div className="border-t border-border/40" />

                {/* 5. RECENT POSTS SECTION */}
                <section id="posts" className="space-y-5 scroll-mt-20">
                    <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                            <h2 className="text-base sm:text-lg font-bold tracking-tight text-foreground">
                                Writing & Notes
                            </h2>
                            <p className="text-xs text-muted-foreground">
                                Reflections, architectural breakdowns, and engineering logs.
                            </p>
                        </div>
                        <Link 
                            href="/post"
                            className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors flex items-center gap-1 group"
                        >
                            <span>View all</span>
                            <ArrowUpRight className="size-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                        </Link>
                    </div>

                    <div className="divide-y divide-border/40">
                        {sortedPosts.slice(0, 5).map((post) => (
                            <Link 
                                key={post.meta.slug} 
                                href={"/post/" + post.meta.slug}
                                className="group py-3 flex items-baseline justify-between gap-4 block hover:text-primary transition-colors"
                            >
                                <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors line-clamp-1">
                                    {post.meta.title}
                                </span>
                                <span className="text-xs font-mono text-muted-foreground shrink-0">
                                    {post.meta.date}
                                </span>
                            </Link>
                        ))}
                    </div>
                </section>

                <div className="border-t border-border/40" />

                {/* 6. CONTACT SECTION */}
                <section id="contact" className="space-y-5 scroll-mt-20">
                    <div className="space-y-1">
                        <h2 className="text-base sm:text-lg font-bold tracking-tight text-foreground">
                            Let&apos;s Talk
                        </h2>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                            If you&apos;ve read this far, feel free to reach out for collaborations, freelance work, or full-time opportunities.
                        </p>
                    </div>

                    <div className="rounded-xl border border-border/60 bg-card/40 p-4 sm:p-5">
                        <ContactForm />
                    </div>
                </section>

                {/* Clean Samworks-style Minimal Footer */}
                <footer className="pt-8 border-t border-border/30 text-center font-mono text-xs text-muted-foreground space-y-1">
                    <p className="italic text-foreground/80">&ldquo;Continuous learning, thoughtful engineering.&rdquo;</p>
                    <p className="text-[11px] text-muted-foreground/70">Designed &amp; Developed by Hasbi Assidiqi · © {new Date().getFullYear()}</p>
                </footer>
            </div>
        </main>
    );
}
