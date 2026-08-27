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
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl md:text-4xl text-foreground leading-snug">{post.meta.title}</h1>

                    <div className="flex flex-wrap items-center gap-3 mt-3 text-xs sm:text-sm text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            <time dateTime={post.meta.date}>{formatDate(post.meta.date)}</time>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{post.meta.readTime}</span>
                        </div>
                        <div className="flex gap-1.5 flex-wrap">
                            {post.meta.tags?.map((i) => (
                                <Badge key={i} variant="secondary" className="text-xs px-2 py-0.5 font-normal">{i}</Badge>
                            ))}
                        </div>
                    </div>
                </div>

                {post.meta.cover && (
                    <div className="mb-8 overflow-hidden rounded-xl border border-border/40 shadow-sm">
                        <CloudinaryImage
                            src={post.meta.cover}
                            alt={post.meta.title}
                            width={1200}
                            height={630}
                            className="w-full h-auto object-cover max-h-[380px]"
                        />
                    </div>
                )}

                <div className="typeset typeset-docs max-w-[37em]">
                    {post.content}
                </div>
            </div>
        </article>
    );
}
