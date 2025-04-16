import Link from "next/link"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { notFound } from "next/navigation"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { getProjects } from "@/lib/contents"
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
            title: 'project Not Found',
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
    const projects = await getProjects();
    const { slug } = await params;
    const project = projects.find((p) => p.meta.slug === slug);

    if (!project) {
        notFound()
    }

    return (
        <main className="container max-w-5xl py-12 mx-auto">
            {/* Back button */}
            <div className="mb-8">
                <Button variant="ghost" size="sm" asChild>
                    <Link
                        href={'/project'}
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Back to Projects
                    </Link>
                </Button>
            </div>

            {/* Project header */}
            <div className="space-y-4 mb-8">
                <h1 className="text-4xl font-bold tracking-tight">{project.meta.title}</h1>
                <p className="text-xl text-muted-foreground">{project.meta.description}</p>

                <div className="flex flex-wrap gap-2 pt-2">
                    {project.meta.technologies?.map((tech) => (
                        <Badge key={tech} variant="secondary">
                            {tech}
                        </Badge>
                    ))}
                </div>

                <div className="flex items-center gap-4 pt-2">
                    {project.meta.liveUrl ?
                        <Button asChild>
                            <a href={project.meta.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                <ExternalLink className="h-4 w-4" />
                                Live Demo
                            </a>
                        </Button>
                        : ''}
                    {project.meta.githubUrl ?
                        <Button variant="outline" asChild>
                            <a href={project.meta.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                <Github className="h-4 w-4" />
                                View Code
                            </a>
                        </Button>
                        : ''}
                </div>
            </div>

            {/* Hero image */}
            <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-12 bg-muted">
                <CloudinaryImage
                    src={project.meta.coverImage || "/placeholder.svg"}
                    alt={`${project.meta.title} preview`}
                    fill
                    className="object-cover"
                />
            </div>

            {/* Project details */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div className="md:col-span-3 prose dark:prose-invert max-w-none">
                    {/* Markdown Content */}
                    {project.content}
                </div>

                <div className="md:col-span-1">
                    <div className="rounded-lg border p-4 sticky top-8">
                        <h3 className="font-medium mb-4">Project Details</h3>
                        <Separator className="mb-4" />

                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-muted-foreground">Year</p>
                                <p className="font-medium">{project.meta.year}</p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">Duration</p>
                                <p className="font-medium">{project.meta.duration}</p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">Role</p>
                                <p className="font-medium">{project.meta.role}</p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">Client</p>
                                <p className="font-medium">{project.meta.client}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Image gallery */}
            <h2 className="text-2xl font-semibold mb-6">Project Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                {project.meta.images.map((image, index) => (
                    <div key={index} className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                        <CloudinaryImage
                            src={image || "/placeholder.svg"}
                            alt={`${project.meta.title} screenshot ${index + 2}`}
                            fill
                            className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                    </div>
                ))}
            </div>

            {/* Next/Previous project navigation would go here */}
        </main>
    )
}

