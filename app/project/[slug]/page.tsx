import Link from "next/link";
import { 
    ArrowLeft, 
    ExternalLink, 
    Github, 
    FolderGit2, 
    Calendar, 
    Clock, 
    User, 
    Briefcase, 
    Layers, 
    ArrowUp
} from "lucide-react";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getProjects, getProjectBySlug } from "@/lib/contents";
import Image from "next/image";
import { getOgImageUrl } from "@/lib/utils";
import { ReadingProgress } from "@/components/reading-progress";
import { ProjectGallery } from "@/components/project/project-gallery";
import { ProjectBlueprint } from "@/components/project/project-blueprint";
import { ProjectGantt } from "@/components/project/project-gantt";

interface ProjectPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    const projects = await getProjects();
    return projects.map((project) => ({ slug: project.meta.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps) {
    const { slug } = await params;
    const projects = await getProjects();
    const project = projects.find((p) => p.meta.slug === slug);

    if (!project) {
        return {
            title: 'Project Not Found',
            description: 'The requested project could not be found.',
        };
    }

    return {
        title: project.meta.title,
        description: project.meta.description || 'Read more about this topic.',
        openGraph: {
            title: project.meta.title,
            description: project.meta.description || 'Read more about this topic.',
            images: [getOgImageUrl(project.meta.title)],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: project.meta.title,
            description: project.meta.description || 'Read more about this topic.',
            images: [getOgImageUrl(project.meta.title)],
        },
    };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    const allProjects = await getProjects();
    const currentIndex = allProjects.findIndex((p) => p.meta.slug === slug);
    const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
    const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

    const hasAnySpecs = !!(
        project.meta.client || 
        project.meta.role || 
        project.meta.duration || 
        project.meta.year || 
        (project.meta.technologies && project.meta.technologies.length > 0) ||
        project.meta.liveUrl || 
        project.meta.githubUrl
    );

    return (
        <main className="min-h-screen pb-20 relative">
            <ReadingProgress />

            {/* Ambient Backdrop Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-96 bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-5xl mx-auto px-4 pt-8 md:pt-14 space-y-10">
                {/* Repository Window Header */}
                <div className="rounded-xl border border-border/70 bg-card/60 backdrop-blur-md shadow-2xl overflow-hidden font-mono text-xs">
                    {/* Window Titlebar */}
                    <div className="flex items-center justify-between px-4 py-3 bg-muted/40 border-b border-border/50">
                        <div className="flex items-center gap-2">
                            <div className="size-3 rounded-full bg-red-500/80" />
                            <div className="size-3 rounded-full bg-yellow-500/80" />
                            <div className="size-3 rounded-full bg-emerald-500/80" />
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground truncate max-w-[240px] sm:max-w-none">
                            <FolderGit2 className="size-3.5 text-primary shrink-0" />
                            <span>hasbi / {project.meta.slug}.git</span>
                            <Badge variant="outline" className="text-[10px] py-0 px-1.5 font-mono">main</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                            <span className="hidden sm:inline">GIT_REPO • PRODUCTION</span>
                        </div>
                    </div>

                    {/* Navigation Bar inside Header */}
                    <div className="px-4 py-2.5 bg-background/40 flex items-center justify-between gap-2 border-b border-border/40">
                        <Button variant="ghost" size="sm" asChild className="h-7 text-xs font-mono gap-1.5 px-2 text-muted-foreground hover:text-foreground">
                            <Link href="/project">
                                <ArrowLeft className="size-3.5" />
                                <span>git checkout .. (Back to Repositories)</span>
                            </Link>
                        </Button>
                        <div className="flex items-center gap-2 text-muted-foreground text-[11px]">
                            <span>TREE: /src/README.md</span>
                        </div>
                    </div>
                </div>

                {/* Project Hero Header */}
                <div className="space-y-6 pb-6 border-b border-border/50">
                    <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-muted-foreground">
                            {project.meta.year && (
                                <span className="bg-primary/10 text-primary px-2.5 py-1 rounded-md border border-primary/20 font-bold">
                                    {project.meta.year}
                                </span>
                            )}
                            {project.meta.role && (
                                <span className="flex items-center gap-1.5 bg-muted/40 px-2.5 py-1 rounded-md border border-border/50">
                                    <Briefcase className="size-3 text-primary" /> {project.meta.role}
                                </span>
                            )}
                            {project.meta.client && (
                                <span className="flex items-center gap-1.5 bg-muted/40 px-2.5 py-1 rounded-md border border-border/50">
                                    <User className="size-3 text-primary" /> {project.meta.client}
                                </span>
                            )}
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                            {project.meta.title}
                        </h1>

                        {project.meta.description && (
                            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed pt-1">
                                {project.meta.description}
                            </p>
                        )}
                    </div>

                    {/* Main Project Hero Image */}
                    {project.meta.coverImage && (
                        <div className="relative aspect-video overflow-hidden rounded-xl border border-border/80 shadow-2xl bg-card">
                            <Image
                                src={project.meta.coverImage}
                                alt={project.meta.title}
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>
                    )}
                </div>

                {/* Project Details Split View */}
                <div className={hasAnySpecs ? "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start" : "space-y-6"}>
                    {/* Left: Project Documentation & Architecture */}
                    <div className={hasAnySpecs ? "lg:col-span-8 space-y-6" : "space-y-6"}>
                        <div className="flex items-center gap-2 text-sm font-mono font-bold text-primary pb-2 border-b border-border/40">
                            <span># ARCHITECTURE & SPECIFICATIONS</span>
                        </div>

                        <div className="typeset typeset-docs max-w-none">
                            {project.content}
                        </div>
                    </div>

                    {/* Right: Sticky Inspector Sidecar Card (Hanya muncul jika ada data) */}
                    {hasAnySpecs && (
                        <div className="lg:col-span-4 space-y-5 lg:sticky lg:top-24">
                            <div className="rounded-xl border border-primary/30 bg-gradient-to-br from-card/90 via-background to-primary/5 p-5 backdrop-blur-xl shadow-xl space-y-5 font-mono text-xs">
                                <div className="flex items-center justify-between pb-3 border-b border-border/50">
                                    <span className="font-bold text-foreground">PROJECT_SPECS.CONFIG</span>
                                    {project.meta.year && (
                                        <Badge variant="secondary" className="text-[10px]">
                                            {project.meta.year}
                                        </Badge>
                                    )}
                                </div>

                                {/* Specs Details */}
                                {(project.meta.client || project.meta.role || project.meta.duration || project.meta.year) && (
                                    <div className="space-y-3">
                                        {project.meta.client && (
                                            <div className="flex justify-between items-center py-1 border-b border-border/30">
                                                <span className="text-muted-foreground">Client:</span>
                                                <span className="font-semibold text-foreground text-right">{project.meta.client}</span>
                                            </div>
                                        )}
                                        {project.meta.role && (
                                            <div className="flex justify-between items-center py-1 border-b border-border/30">
                                                <span className="text-muted-foreground">Role:</span>
                                                <span className="font-semibold text-foreground text-right">{project.meta.role}</span>
                                            </div>
                                        )}
                                        {project.meta.duration && (
                                            <div className="flex justify-between items-center py-1 border-b border-border/30">
                                                <span className="text-muted-foreground">Duration:</span>
                                                <span className="font-semibold text-foreground text-right">{project.meta.duration}</span>
                                            </div>
                                        )}
                                        {project.meta.year && (
                                            <div className="flex justify-between items-center py-1 border-b border-border/30">
                                                <span className="text-muted-foreground">Timeline:</span>
                                                <span className="font-semibold text-foreground text-right">{project.meta.year}</span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Tech Stack Dependencies */}
                                {project.meta.technologies && project.meta.technologies.length > 0 && (
                                    <div className="space-y-2 pt-1">
                                        <div className="text-muted-foreground flex items-center gap-1.5">
                                            <Layers className="size-3.5 text-primary" />
                                            <span>Dependencies:</span>
                                        </div>
                                        <div className="flex flex-wrap gap-1.5">
                                            {project.meta.technologies.map((tech) => (
                                                <Badge key={tech} variant="secondary" className="text-[11px] font-mono px-2 py-0.5 border border-border/50">
                                                    {tech}
                                                </Badge>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Actions */}
                                {(project.meta.liveUrl || project.meta.githubUrl) && (
                                    <div className="space-y-2 pt-3 border-t border-border/50">
                                        {project.meta.liveUrl && (
                                            <Button className="w-full font-mono text-xs gap-2 shadow-md shadow-primary/20 cursor-pointer" asChild>
                                                <a href={project.meta.liveUrl} target="_blank" rel="noopener noreferrer">
                                                    <ExternalLink className="size-3.5" /> Launch Live Demo
                                                </a>
                                            </Button>
                                        )}
                                        {project.meta.githubUrl && (
                                            <Button variant="outline" className="w-full font-mono text-xs gap-2 cursor-pointer" asChild>
                                                <a href={project.meta.githubUrl} target="_blank" rel="noopener noreferrer">
                                                    <Github className="size-3.5" /> View Source Code
                                                </a>
                                            </Button>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Tech Architecture Blueprint (Hanya render jika ada technologies) */}
                {project.meta.technologies && project.meta.technologies.length > 0 && (
                    <ProjectBlueprint 
                        technologies={project.meta.technologies} 
                        role={project.meta.role} 
                        title={project.meta.title} 
                    />
                )}

                {/* Screenshots Gallery Modal / Carousel (Hanya render jika ada images) */}
                {project.meta.images && project.meta.images.length > 0 && (
                    <ProjectGallery images={project.meta.images} title={project.meta.title} />
                )}

                {/* Timeline Lifecycle / Gantt Chart (Hanya render jika ada duration/year) */}
                {(project.meta.duration || project.meta.year) && (
                    <ProjectGantt year={project.meta.year} duration={project.meta.duration} />
                )}

                {/* Footer Navigation */}
                <div className="pt-10 border-t border-border/60 space-y-6">
                    {(prevProject || nextProject) && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                            {prevProject ? (
                                <Link
                                    href={`/project/${prevProject.meta.slug}`}
                                    className="p-4 rounded-xl border border-border/60 bg-card/40 hover:border-primary/50 hover:bg-primary/5 transition-all space-y-1 group"
                                >
                                    <div className="text-muted-foreground flex items-center gap-1">
                                        <span>←</span> Previous Repository
                                    </div>
                                    <div className="font-bold text-foreground group-hover:text-primary transition-colors truncate">
                                        {prevProject.meta.title}
                                    </div>
                                </Link>
                            ) : <div />}

                            {nextProject ? (
                                <Link
                                    href={`/project/${nextProject.meta.slug}`}
                                    className="p-4 rounded-xl border border-border/60 bg-card/40 hover:border-primary/50 hover:bg-primary/5 transition-all space-y-1 text-right group ml-auto w-full"
                                >
                                    <div className="text-muted-foreground flex items-center justify-end gap-1">
                                        Next Repository <span>→</span>
                                    </div>
                                    <div className="font-bold text-foreground group-hover:text-primary transition-colors truncate">
                                        {nextProject.meta.title}
                                    </div>
                                </Link>
                            ) : <div />}
                        </div>
                    )}

                    <div className="flex items-center justify-between text-xs font-mono text-muted-foreground pt-4 border-t border-border/40">
                        <Link href="/project" className="hover:text-primary transition-colors flex items-center gap-1">
                            ← Return to ~/repositories
                        </Link>
                        <a href="#" className="hover:text-primary transition-colors flex items-center gap-1">
                            Scroll to Top <ArrowUp className="size-3.5" />
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
