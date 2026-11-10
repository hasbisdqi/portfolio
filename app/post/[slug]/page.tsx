import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { getPosts, getPostBySlug } from "@/lib/contents";
import { formatDate, getOgImageUrl } from "@/lib/utils";
import { 
    Calendar, 
    Clock, 
    ArrowLeft, 
    ArrowUp
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReadingProgress } from "@/components/reading-progress";

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
            title: "Post Not Found",
            description: "The requested post could not be found.",
        };
    }

    return {
        title: `${post.meta.title} — Hasbi Assidiqi`,
        description: post.meta.description || "Read more about this topic.",
        openGraph: {
            title: post.meta.title,
            description: post.meta.description || "Read more about this topic.",
            images: [getOgImageUrl(post.meta.title)],
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            title: post.meta.title,
            description: post.meta.description || "Read more about this topic.",
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

    const allPosts = await getPosts();
    const currentIndex = allPosts.findIndex((p) => p.meta.slug === slug);
    const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
    const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

    return (
        <article className="min-h-screen pb-24 relative">
            <ReadingProgress />

            <div className="max-w-2xl mx-auto px-5 pt-16 md:pt-24 space-y-10">
                {/* Back to Writing Navigation */}
                <div>
                    <Link
                        href="/#posts"
                        className="inline-flex items-center gap-1.5 text-xs font-mono text-muted-foreground hover:text-foreground transition-colors group"
                    >
                        <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
                        <span>Back to notes</span>
                    </Link>
                </div>

                {/* Article Header */}
                <div className="space-y-4 pb-6 border-b border-border/40">
                    <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground">
                        <span className="flex items-center gap-1.5">
                            <Calendar className="size-3.5" />
                            <time dateTime={post.meta.date}>{formatDate(post.meta.date)}</time>
                        </span>
                        <span>·</span>
                        <span className="flex items-center gap-1.5">
                            <Clock className="size-3.5" />
                            <span>{post.meta.readTime}</span>
                        </span>
                    </div>

                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-foreground leading-tight">
                        {post.meta.title}
                    </h1>

                    {post.meta.description && (
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                            {post.meta.description}
                        </p>
                    )}

                    {/* Tags */}
                    {post.meta.tags && post.meta.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                            {post.meta.tags.map((t) => (
                                <Badge 
                                    key={t} 
                                    variant="secondary" 
                                    className="text-[11px] font-mono px-2 py-0.5 border border-border/40 font-normal bg-muted/40 text-muted-foreground"
                                >
                                    #{t}
                                </Badge>
                            ))}
                        </div>
                    )}

                    {/* Cover Hero Image */}
                    {post.meta.cover && (
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-border/60 shadow-sm bg-card mt-4">
                            <Image
                                src={post.meta.cover}
                                alt={post.meta.title}
                                fill
                                priority
                                className="object-cover"
                            />
                        </div>
                    )}
                </div>

                {/* Article Body via typeset */}
                <div className="typeset typeset-docs max-w-none text-foreground leading-relaxed">
                    {post.content}
                </div>

                {/* Footer Navigation */}
                <div className="pt-10 border-t border-border/40 space-y-6">
                    {(prevPost || nextPost) && (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs">
                            {prevPost ? (
                                <Link
                                    href={`/post/${prevPost.meta.slug}`}
                                    className="p-3.5 rounded-xl border border-border/60 bg-card/40 hover:border-primary/50 hover:bg-card/80 transition-all space-y-1 group"
                                >
                                    <div className="text-muted-foreground flex items-center gap-1">
                                        <span>←</span> Previous
                                    </div>
                                    <div className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                                        {prevPost.meta.title}
                                    </div>
                                </Link>
                            ) : <div />}

                            {nextPost ? (
                                <Link
                                    href={`/post/${nextPost.meta.slug}`}
                                    className="p-3.5 rounded-xl border border-border/60 bg-card/40 hover:border-primary/50 hover:bg-card/80 transition-all space-y-1 text-right group ml-auto w-full"
                                >
                                    <div className="text-muted-foreground flex items-center justify-end gap-1">
                                        Next <span>→</span>
                                    </div>
                                    <div className="font-semibold text-foreground group-hover:text-primary transition-colors truncate">
                                        {nextPost.meta.title}
                                    </div>
                                </Link>
                            ) : <div />}
                        </div>
                    )}

                    <div className="flex items-center justify-between text-xs font-mono text-muted-foreground pt-4 border-t border-border/30">
                        <Link href="/post" className="hover:text-primary transition-colors flex items-center gap-1">
                            ← All notes
                        </Link>
                        <a href="#" className="hover:text-primary transition-colors flex items-center gap-1">
                            Back to top <ArrowUp className="size-3.5" />
                        </a>
                    </div>
                </div>
            </div>
        </article>
    );
}
