import { buttonVariants } from "@/components/ui/button";
import { InteractiveConstellation } from "@/components/ui/interactive-constellation";
import { IDETooltip } from "@/components/ui/ide-tooltip";
import { getPosts, getProjects } from "@/lib/contents";
import { cn } from "@/lib/utils";
import Link from "next/link";
import ProjectExplorer from "./project/project-explorer";
import PostExplorer from "./post/post-explorer";
import TerminalAbout from "@/components/terminal-about";
import ContactForm from "./about/contact-form";
import { ArrowDown, FolderGit2, Newspaper, Terminal, Mail, User, Github, Linkedin, Twitter } from "lucide-react";

export default async function Home() {
    const [posts, projects] = await Promise.all([
        getPosts(),
        getProjects(),
    ]);

    const sortedPosts = [...posts].sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());

    return (
        <main className="min-h-screen relative overflow-hidden">
            {/* 1. HERO SECTION */}
            <section id="hero" className="flex justify-center items-center min-h-[90vh] py-20 px-4 relative">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 max-w-6xl w-full relative z-10 items-center">
                    {/* Left Column: Hero Intro */}
                    <div className="lg:col-span-6 relative">
                        {/* Ambient Glow */}
                        <div className="absolute -inset-16 bg-primary/10 blur-[100px] rounded-full -z-10 pointer-events-none" />

                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-xs font-mono mb-4">
                            <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
                            <span>AVAILABLE FOR WORK • FULL-STACK & MOBILE</span>
                        </div>
                        
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-foreground mb-6 leading-tight tracking-tight">
                            Hi, I'm <br />
                            <span className="text-primary tracking-tight">Hasbi Assidiqi</span>
                        </h1>
                        <p className="text-muted-foreground text-pretty text-sm sm:text-base leading-relaxed max-w-lg mb-8">
                            I am a <IDETooltip keyword="Developer" typeDef="Entity & { passion: number }" description="A carbon-based lifeform converting caffeine into dynamic web applications at 60fps.">passionate web & mobile developer</IDETooltip> crafting high-performance applications with clean architecture and modern DX. Building full-stack systems with <IDETooltip keyword="Next.js" typeDef="Framework<React>" description="The React framework for the web.">Next.js</IDETooltip>, <IDETooltip keyword="Flutter" typeDef="SDK<Dart>" description="Multi-platform mobile app development.">Flutter</IDETooltip>, and scalable backend services.
                        </p>

                        <div className="flex flex-wrap gap-4 items-center">
                            <a 
                                href="#projects" 
                                className={cn(buttonVariants(), "shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow gap-2")}
                            >
                                <FolderGit2 className="size-4" />
                                <span>Explore Projects</span>
                            </a>
                            <a 
                                href="#about" 
                                className={cn(buttonVariants({ variant: "secondary" }), "bg-background/50 backdrop-blur-sm hover:bg-background/80 gap-2")}
                            >
                                <User className="size-4" />
                                <span>About Me</span>
                            </a>
                            <a 
                                href="#contact" 
                                className={cn(buttonVariants({ variant: "outline" }), "gap-2 font-mono text-xs")}
                            >
                                <Mail className="size-4" />
                                <span>Contact</span>
                            </a>
                        </div>
                    </div>

                    {/* Right Column: Featured Teasers (Latest Deep Dive & Project Spotlight) */}
                    <div className="lg:col-span-6 space-y-4">
                        <div className="text-xs font-mono text-muted-foreground flex items-center justify-between pb-1 border-b border-border/40">
                            <span>// FEATURED_TELEMETRY</span>
                            <span className="text-primary">LATEST_ACTIVITY</span>
                        </div>

                        {posts.slice(0, 2).map((post, index) => (
                            <Link 
                                key={post.meta.slug} 
                                href={"/post/" + post.meta.slug}
                                className={cn(
                                    "block border backdrop-blur-[4px] rounded-xl p-5 relative transition-all duration-300 group overflow-hidden",
                                    index === 0 
                                        ? "border-primary/40 bg-primary/5 hover:bg-primary/10 hover:border-primary/60 shadow-sm hover:shadow-md hover:-translate-y-0.5" 
                                        : "border-primary/15 bg-background/40 hover:bg-background/80 hover:border-primary/40 shadow-sm hover:shadow-md hover:-translate-y-0.5"
                                )}
                            >
                                <div className="flex items-center justify-between gap-2 mb-2">
                                    <span className="text-[11px] font-mono text-primary uppercase font-bold tracking-wider">
                                        {index === 0 ? "★ Latest Technical Post" : "Featured Article"}
                                    </span>
                                    <span className="text-[11px] font-mono text-muted-foreground">
                                        {post.meta.date}
                                    </span>
                                </div>
                                <h3 className="font-bold text-foreground text-base sm:text-lg group-hover:text-primary transition-colors mb-1.5">
                                    {post.meta.title}
                                </h3>
                                <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2">
                                    {post.meta.description}
                                </p>
                            </Link>
                        ))}

                        {projects.length > 0 && (
                            <Link 
                                href={"/project/" + projects[0].meta.slug}
                                className="block border border-border/70 bg-card/40 hover:bg-card/70 hover:border-primary/50 backdrop-blur-[4px] rounded-xl p-5 transition-all duration-300 group shadow-sm hover:shadow-md hover:-translate-y-0.5"
                            >
                                <div className="flex items-center justify-between gap-2 mb-2">
                                    <span className="text-[11px] font-mono text-emerald-400 uppercase font-bold tracking-wider flex items-center gap-1.5">
                                        <span className="size-1.5 rounded-full bg-emerald-400" />
                                        Spotlight Repository
                                    </span>
                                    <span className="text-[11px] font-mono text-muted-foreground">
                                        {projects[0].meta.year || "2026"}
                                    </span>
                                </div>
                                <h3 className="font-bold text-foreground text-base sm:text-lg group-hover:text-primary transition-colors mb-1.5">
                                    {projects[0].meta.title}
                                </h3>
                                <p className="text-muted-foreground text-xs sm:text-sm line-clamp-2">
                                    {projects[0].meta.description}
                                </p>
                            </Link>
                        )}
                    </div>
                </div>

                {/* Subtle Scroll Down Prompt */}
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground text-xs font-mono animate-bounce opacity-70 hover:opacity-100 transition-opacity">
                    <span>Scroll to explore</span>
                    <ArrowDown className="size-4" />
                </div>

                <InteractiveConstellation />
            </section>

            {/* SECTION DIVIDER */}
            <div className="max-w-6xl mx-auto px-4">
                <div className="border-t border-border/40" />
            </div>

            {/* 2. PROJECTS SECTION */}
            <section id="projects" className="py-20 px-4 max-w-6xl mx-auto scroll-mt-12">
                <div className="space-y-3 mb-10 text-center">
                    <div className="inline-flex items-center gap-2 text-xs font-mono text-primary font-semibold uppercase tracking-wider">
                        <FolderGit2 className="size-3.5" />
                        <span>Production & Open Source Work</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-mono">
                        ~/repositories
                    </h2>
                    <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                        Directory of production applications, mobile architectures, and engineering prototypes. Click any project to open detailed case studies and technical blueprints.
                    </p>
                </div>

                <ProjectExplorer initialProjects={projects} />
            </section>

            {/* SECTION DIVIDER */}
            <div className="max-w-6xl mx-auto px-4">
                <div className="border-t border-border/40" />
            </div>

            {/* 3. POSTS / KNOWLEDGE BASE SECTION */}
            <section id="posts" className="py-20 px-4 max-w-6xl mx-auto scroll-mt-12">
                <div className="space-y-3 mb-10 text-center">
                    <div className="inline-flex items-center gap-2 text-xs font-mono text-primary font-semibold uppercase tracking-wider">
                        <Newspaper className="size-3.5" />
                        <span>Engineering Insights & Notes</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-mono">
                        ~/knowledge-base
                    </h2>
                    <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                        Chronological technical deep dives, system architectures, and production lessons.
                    </p>
                </div>

                <PostExplorer initialPosts={sortedPosts} />
            </section>

            {/* SECTION DIVIDER */}
            <div className="max-w-6xl mx-auto px-4">
                <div className="border-t border-border/40" />
            </div>

            {/* 4. ABOUT / TERMINAL IDE SECTION */}
            <section id="about" className="py-20 px-4 max-w-5xl mx-auto scroll-mt-12">
                <div className="space-y-3 mb-10 text-center">
                    <div className="inline-flex items-center gap-2 text-xs font-mono text-primary font-semibold uppercase tracking-wider">
                        <Terminal className="size-3.5" />
                        <span>Developer Dossier & Interactive Shell</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-mono">
                        ~/profile-ide
                    </h2>
                    <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                        Inspect tech stack taxonomy, career history, awards, and interactive terminal session.
                    </p>
                </div>

                <TerminalAbout />
            </section>

            {/* SECTION DIVIDER */}
            <div className="max-w-5xl mx-auto px-4">
                <div className="border-t border-border/40" />
            </div>

            {/* 5. CONTACT SECTION */}
            <section id="contact" className="py-20 px-4 max-w-4xl mx-auto scroll-mt-12">
                <div className="space-y-3 mb-10 text-center">
                    <div className="inline-flex items-center gap-2 text-xs font-mono text-primary font-semibold uppercase tracking-wider">
                        <Mail className="size-3.5" />
                        <span>Get In Touch</span>
                    </div>
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-mono">
                        ~/contact-me
                    </h2>
                    <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                        Interested in collaboration, freelance project, or full-time opportunities? Send a message directly.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                    <div className="space-y-6 p-6 rounded-xl bg-card/60 border border-border/70 backdrop-blur-md font-mono text-xs">
                        <div className="text-primary font-bold text-sm">Direct Coordinates</div>
                        <div className="space-y-3">
                            <div className="flex items-center gap-3">
                                <Mail className="size-4 text-primary shrink-0" />
                                <a href="mailto:muhhasbiassidiqi18@gmail.com" className="hover:underline text-foreground truncate">
                                    muhhasbiassidiqi18@gmail.com
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Linkedin className="size-4 text-blue-400 shrink-0" />
                                <a href="https://linkedin.com/in/rnghbt" target="_blank" rel="noopener noreferrer" className="hover:underline text-foreground">
                                    linkedin.com/in/rnghbt
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Github className="size-4 text-foreground shrink-0" />
                                <a href="https://github.com/hasbisdqi" target="_blank" rel="noopener noreferrer" className="hover:underline text-foreground">
                                    github.com/hasbisdqi
                                </a>
                            </div>
                            <div className="flex items-center gap-3">
                                <Twitter className="size-4 text-sky-400 shrink-0" />
                                <a href="https://twitter.com/rnghbt" target="_blank" rel="noopener noreferrer" className="hover:underline text-foreground">
                                    @rnghbt
                                </a>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-border/40 text-emerald-400 flex items-center gap-2">
                            <span className="size-2 rounded-full bg-emerald-500 animate-ping" />
                            <span>Status: Open to full-time, freelance, & contract roles</span>
                        </div>
                    </div>

                    <div className="p-6 rounded-xl bg-card/60 border border-border/70 backdrop-blur-md">
                        <ContactForm />
                    </div>
                </div>
            </section>
        </main>
    );
}
