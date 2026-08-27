import CloudinaryImage from "@/components/cloudinary-image";
import { Badge } from "@/components/ui/badge";
import { getPosts, getPostBySlug } from "@/lib/contents";
import { formatDate, getOgImageUrl } from "@/lib/utils";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
    const posts = await getPosts();
    return posts.map((post) => ({ slug: post.meta.slug }));
}

interface PostPageProps {
    params: Promise<{ slug: string }>;
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

export default async function PostPage({ params }: PostPageProps) {
    const { slug } = await params;
    const post = await getPostBySlug(slug);
    if (!post) {
        notFound();
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

                {post.meta.cover && (
                    <div className="mb-8 overflow-hidden rounded-lg">
                        <CloudinaryImage
                            src={post.meta.cover}
                            alt={post.meta.title}
                            width={1200}
                            height={630}
                            className="w-full h-auto object-cover max-h-[400px]"
                        />
                    </div>
                )}

                <div className="prose prose-neutral dark:prose-invert max-w-none text-base leading-relaxed prose-headings:tracking-tight prose-headings:font-bold prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-p:leading-7 prose-p:my-4 prose-code:font-mono prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:before:content-none prose-code:after:content-none prose-pre:rounded-xl prose-pre:border prose-pre:border-border/60 prose-li:my-1 prose-img:rounded-xl prose-img:shadow-md">
                    {post.content}
                </div>
            </div>
        </article>
    );
}
