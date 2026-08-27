import Link from "next/link"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getProjects, getProjectBySlug } from "@/lib/contents"
import CloudinaryImage from "@/components/cloudinary-image"
import { getOgImageUrl } from "@/lib/utils"

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
        notFound()
    }

    return (
        <main className="container max-w-5xl py-12 mx-auto px-4">
            {/* Back button */}
            <div className="mb-8">
                <Button variant="ghost" size="sm" asChild>
                    <Link href="/project" className="flex items-center gap-2">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Projects
                    </Link>
                </Button>
            </div>

            {/* Project Header */}
            <div className="space-y-4 mb-8">
                <h1 className="text-4xl font-bold tracking-tight md:text-5xl">{project.meta.title}</h1>
                <p className="text-xl text-muted-foreground">{project.meta.description}</p>
                <div className="flex flex-wrap gap-2 pt-2">
                    {project.meta.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">
                            {tech}
                        </Badge>
                    ))}
                </div>
            </div>

            {/* Main Project Image */}
            {project.meta.coverImage && (
                <div className="relative aspect-video overflow-hidden rounded-lg mb-8 border border-border">
                    <CloudinaryImage
                        src={project.meta.coverImage}
                        alt={project.meta.title}
                        width={1200}
                        height={675}
                        className="object-cover w-full h-full"
                    />
                </div>
            )}

            {/* Project Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="md:col-span-2 space-y-6">
                    <h2 className="text-2xl font-bold">About the Project</h2>
                    <div className="typeset typeset-docs max-w-[37em]">
                        {project.content}
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="p-6 rounded-lg border border-border bg-card">
                        <h3 className="text-lg font-semibold mb-4">Project Details</h3>
                        <div className="space-y-4 text-sm">
                            {project.meta.client && (
                                <div>
                                    <span className="text-muted-foreground block">Client</span>
                                    <span className="font-medium">{project.meta.client}</span>
                                </div>
                            )}
                            {project.meta.year && (
                                <div>
                                    <span className="text-muted-foreground block">Year</span>
                                    <span className="font-medium">{project.meta.year}</span>
                                </div>
                            )}
                            {project.meta.duration && (
                                <div>
                                    <span className="text-muted-foreground block">Duration</span>
                                    <span className="font-medium">{project.meta.duration}</span>
                                </div>
                            )}
                            {project.meta.role && (
                                <div>
                                    <span className="text-muted-foreground block">Role</span>
                                    <span className="font-medium">{project.meta.role}</span>
                                </div>
                            )}
                        </div>

                        {(project.meta.liveUrl || project.meta.githubUrl) && (
                            <>
                                <Separator className="my-4" />
                                <div className="space-y-2">
                                    {project.meta.liveUrl && (
                                        <Button className="w-full" asChild>
                                            <a href={project.meta.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                                <ExternalLink className="w-4 h-4" />
                                                View Live Project
                                            </a>
                                        </Button>
                                    )}
                                    {project.meta.githubUrl && (
                                        <Button variant="outline" className="w-full" asChild>
                                            <a href={project.meta.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                                <Github className="w-4 h-4" />
                                                View Source Code
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </main>
    )
}
