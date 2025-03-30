import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ExternalLink, Github } from "lucide-react"
import { notFound } from "next/navigation"
import { projects } from '#site/content'
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { MDXContent } from "@/app/components/mdx-components"

export function generateMetadata({ params }: { params: { slug: string } }) {
    const project = projects.find((p) => p.slugAsParams == params.slug);

    if (!project) {
        return {
            title: "Project Not Found",
        }
    }

    return {
        title: `${project.title} | My Portfolio`,
        description: project.description,
    }
}

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
    const project = projects.find((p) => p.slugAsParams == params.slug);

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
                <h1 className="text-4xl font-bold tracking-tight">{project.title}</h1>
                <p className="text-xl text-muted-foreground">{project.description}</p>

                <div className="flex flex-wrap gap-2 pt-2">
                    {project.technologies?.map((tech) => (
                        <Badge key={tech} variant="secondary">
                            {tech}
                        </Badge>
                    ))}
                </div>

                <div className="flex items-center gap-4 pt-2">
                    <Button asChild>
                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                            <ExternalLink className="h-4 w-4" />
                            Live Demo
                        </a>
                    </Button>
                    <Button variant="outline" asChild>
                        <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                            <Github className="h-4 w-4" />
                            View Code
                        </a>
                    </Button>
                </div>
            </div>

            {/* Hero image */}
            <div className="relative aspect-video w-full overflow-hidden rounded-lg mb-12 bg-muted">
                <Image
                    src={project.coverImage || "/placeholder.svg"}
                    alt={`${project.title} preview`}
                    fill
                    className="object-cover"
                    priority
                />
            </div>

            {/* Project details */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div className="md:col-span-3 prose dark:prose-invert max-w-none">
                    {/* Markdown Content */}
                    <MDXContent code={project.body} />
                </div>

                <div className="md:col-span-1">
                    <div className="rounded-lg border p-4 sticky top-8">
                        <h3 className="font-medium mb-4">Project Details</h3>
                        <Separator className="mb-4" />

                        <div className="space-y-3">
                            <div>
                                <p className="text-sm text-muted-foreground">Year</p>
                                <p className="font-medium">{project.year}</p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">Duration</p>
                                <p className="font-medium">{project.duration}</p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">Role</p>
                                <p className="font-medium">{project.role}</p>
                            </div>

                            <div>
                                <p className="text-sm text-muted-foreground">Client</p>
                                <p className="font-medium">{project.client}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Image gallery */}
            <h2 className="text-2xl font-semibold mb-6">Project Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
                {project.images.map((image, index) => (
                    <div key={index} className="relative aspect-video overflow-hidden rounded-lg bg-muted">
                        <Image
                            src={image || "/placeholder.svg"}
                            alt={`${project.title} screenshot ${index + 2}`}
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

