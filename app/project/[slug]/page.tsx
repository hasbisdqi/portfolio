import Link from "next/link";
import { 
    ArrowLeft, 
    ExternalLink, 
    Github, 
    ArrowUp
} from "lucide-react";
import { notFound } from "next/navigation";
import { getProjects, getProjectBySlug } from "@/lib/contents";
import Image from "next/image";
import { getOgImageUrl } from "@/lib/utils";
import { ReadingProgress } from "@/components/reading-progress";
import { ProjectGallery } from "@/components/project/project-gallery";

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
            title: "Project Not Found",
            description: "The requested project could not be found.",
        };
    }

    return {
        title: `${project.meta.title} — Hasbi Assidiqi`,
        description: project.meta.description || "Read more about this topic.",
        openGraph: {
            title: project.meta.title,
            description: project.meta.description || "Read more about this topic.",
            images: [getOgImageUrl(project.meta.title)],
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title: project.meta.title,
            description: project.meta.description || "Read more about this topic.",
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

    return (
        <main className="min-h-screen pb-24 relative">
            <ReadingProgress />

            <div className="max-w-2xl mx-auto px-5 pt-16 md:pt-24 space-y-10">
                {/* Back Link */}
                <div>
                    <Link
                        href="/#projects"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors group"
                    >
                        <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
                        <span>Back to projects</span>
                    </Link>
                </div>

                {/* Project Header */}
                <div className="space-y-4 pb-6 border-b border-border/40">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-muted-foreground">
                        {project.meta.year && (
                            <span className="font-semibold text-foreground">
                                {project.meta.year}
                            </span>
                        )}
                        {project.meta.role && (
                            <>
                                <span>·</span>
                                <span>{project.meta.role}</span>
                            </>
                        )}
                        {project.meta.client && (
                            <>
                                <span>·</span>
                                <span>{project.meta.client}</span>
                            </>
                        )}
                    </div>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
                        {project.meta.title}
                    </h1>

                    {project.meta.description && (
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                            {project.meta.description}
                        </p>
                    )}

                    {/* Tech Badges & External Links */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                        <div className="flex flex-wrap gap-1.5">
                            {project.meta.technologies?.map((tech) => (
                                <span
                                    key={tech}
                                    className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-muted/40 border border-border/30 text-muted-foreground"
                                >
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center gap-2 font-mono text-xs">
                            {project.meta.liveUrl && (
                                <a
                                    href={project.meta.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg border border-border/60 bg-muted/30 hover:bg-muted/70 text-foreground transition-colors"
                                >
                                    <span>Live Preview</span>
                                    <ExternalLink className="size-3" />
                                </a>
                            )}
                            {project.meta.githubUrl && (
                                <a
                                    href={project.meta.githubUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-1 px-3 py-1 rounded-lg border border-border/60 bg-muted/30 hover:bg-muted/70 text-foreground transition-colors"
                                >
                                    <Github className="size-3" />
                                    <span>Code</span>
                                </a>
                            )}
                        </div>
                    </div>

                    {/* Project Hero Image */}
                    {project.meta.coverImage && (
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-border/60 shadow-sm bg-card mt-4">
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

                {/* Case Study Body */}
                <div className="typeset typeset-docs max-w-none text-foreground leading-relaxed">
                    {project.content}
                </div>

                {/* Screenshots Gallery Modal (if available) */}
                {project.meta.images && project.meta.images.length > 0 && (
                    <div className="pt-6 border-t border-border/40">
                        <ProjectGallery images={project.meta.images} title={project.meta.title} />
                    </div>
                )}

                {/* Footer Navigation */}
                <div className="pt-10 border-t border-border/40 space-y-6">
                    {(prevProject || nextProject) && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                            {prevProject ? (
                                <Link
                                    href={`/project/${prevProject.meta.slug}`}
                                    className="p-3.5 rounded-xl border border-border/60 bg-card/40 hover:border-primary/50 hover:bg-card/80 transition-all space-y-1 group"
                                >
                                    <div className="text-muted-foreground flex items-center gap-1">
                                        <span>←</span> Previous
                                    </div>
                                    <div className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                                        {prevProject.meta.title}
                                    </div>
                                </Link>
                            ) : <div />}

                            {nextProject ? (
                                <Link
                                    href={`/project/${nextProject.meta.slug}`}
                                    className="p-3.5 rounded-xl border border-border/60 bg-card/40 hover:border-primary/50 hover:bg-card/80 transition-all space-y-1 text-right group ml-auto w-full"
                                >
                                    <div className="text-muted-foreground flex items-center justify-end gap-1">
                                        Next <span>→</span>
                                    </div>
                                    <div className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                                        {nextProject.meta.title}
                                    </div>
                                </Link>
                            ) : <div />}
                        </div>
                    )}

                    <div className="flex items-center justify-between text-xs font-mono text-muted-foreground pt-4 border-t border-border/30">
                        <Link href="/project" className="hover:text-primary transition-colors flex items-center gap-1">
                            ← All projects
                        </Link>
                        <a href="#" className="hover:text-primary transition-colors flex items-center gap-1">
                            Back to top <ArrowUp className="size-3.5" />
                        </a>
                    </div>
                </div>
            </div>
        </main>
    );
}
