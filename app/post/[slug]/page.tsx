import CloudinaryImage from "@/components/cloudinary-image";
import { Badge } from "@/components/ui/badge";
import { getPosts } from "@/lib/contents";
import { formatDate, getOgImageUrl } from "@/lib/utils";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";

export async function generateStaticParams() {
    const posts = await getPosts()
    return posts.map((post) => ({ slug: post.meta.slug }));
}

export async function generateMetadata({ params }: PostPageProps) {
    const { slug } = await params;
    const posts = await getPosts();
    const post = posts.find((p) => p.meta.slug === slug);

    if (!post) {
        return {
            title: 'Post Not Found',
            description: 'The requested post could not be found.',
        };
    }

    return {
        title: post.meta.title,
        description: post.meta.description || 'Read more about this topic.',
        openGraph: {
            title: post.meta.title,
            description: post.meta.description || 'Read more about this topic.',
            images: [getOgImageUrl(post.meta.title)],
            type: 'article',
        },
        twitter: {
            card: 'summary_large_image',
            title: post.meta.title,
            description: post.meta.description || 'Read more about this topic.',
            images: [getOgImageUrl(post.meta.title)],
        },
    };
}

interface PostPageProps {
    params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
    const { slug } = await params;
    const posts = await getPosts()
    const post = posts.find((p) => p.meta.slug === slug);
    if (!post) {
        return <div>Post not found</div>;
    }

    return (
        <article className="container px-4 py-12 mx-auto md:py-16">
            <div className="max-w-3xl mx-auto">
                <div className="mb-8">
                    <Link
                        href="/post"
                        className="inline-flex items-center mb-4 text-sm font-medium text-accent-foreground hover:text-primary"
                    >
                        ← Back to all posts
                    </Link>
                    <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">{post.meta.title}</h1>

                    <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <time dateTime={post.meta.date}>{formatDate(post.meta.date)}</time>
                        </div>
                        <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{post.meta.readTime}</span>
                        </div>
                        <div className="flex gap-1 flex-wrap">
                            {post.meta.tags?.map((i) => (
                                <Badge key={i} variant="secondary">{i}</Badge>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="relative w-full mb-8 overflow-hidden rounded-lg aspect-video">
                    <CloudinaryImage src={post.meta.cover}  alt={post.meta.title} fill className="object-cover"/>
                </div>

                <div className="prose prose-lg max-w-none dark:prose-invert">
                    {post.content}
                </div>
            </div>
        </article>
    );
}
