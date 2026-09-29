import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { getPosts, getPostBySlug } from "@/lib/contents";
import { formatDate, getOgImageUrl } from "@/lib/utils";
import { 
    Calendar, 
    Clock, 
    ArrowLeft, 
    FileCode, 
    Terminal, 
    Share2, 
    ArrowUp, 
    Sparkles,
    Tag,
    Layers
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReadingProgress } from "@/components/reading-progress";
import { Button } from "@/components/ui/button";

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

    const allPosts = await getPosts();
    const currentIndex = allPosts.findIndex((p) => p.meta.slug === slug);
    const prevPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;
    const nextPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;

    return (
        <article className="min-h-screen pb-20 relative">
            <ReadingProgress />

            {/* Ambient Backdrop Glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-80 bg-primary/5 blur-[120px] rounded-full pointer-events-none -z-10" />

            <div className="max-w-4xl mx-auto px-4 pt-8 md:pt-14 space-y-8">
                {/* IDE Window Frame & Breadcrumbs */}
                <div className="rounded-xl border border-border/70 bg-card/60 backdrop-blur-md shadow-2xl overflow-hidden font-mono text-xs">
                    {/* Window Titlebar */}
                    <div className="flex items-center justify-between px-4 py-3 bg-muted/40 border-b border-border/50">
                        <div className="flex items-center gap-2">
                            <div className="size-3 rounded-full bg-red-500/80" />
                            <div className="size-3 rounded-full bg-yellow-500/80" />
                            <div className="size-3 rounded-full bg-emerald-500/80" />
                        </div>
                        <div className="flex items-center gap-2 text-muted-foreground truncate max-w-[240px] sm:max-w-none">
                            <FileCode className="size-3.5 text-primary shrink-0" />
                            <span>~/posts/{post.meta.slug}.mdx</span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-muted-foreground">
                            <span className="hidden sm:inline">MDX • UTF-8</span>
                        </div>
                    </div>

                    {/* Navigation Bar inside Header */}
                    <div className="px-4 py-2.5 bg-background/40 flex items-center justify-between gap-2 border-b border-border/40">
                        <Button variant="ghost" size="sm" asChild className="h-7 text-xs font-mono gap-1.5 px-2 text-muted-foreground hover:text-foreground">
                            <Link href="/post">
                                <ArrowLeft className="size-3.5" />
                                <span>cd .. (Back to Explorer)</span>
                            </Link>
                        </Button>
                        <div className="flex items-center gap-2 text-muted-foreground text-[11px]">
                            <span className="hidden sm:inline">READ_MODE: ACTIVE</span>
                        </div>
                    </div>
                </div>

                {/* Article Header Card */}
                <div className="space-y-6 pb-6 border-b border-border/50">
                    <div className="space-y-3">
                        <div className="flex flex-wrap items-center gap-2 text-xs font-mono text-muted-foreground">
                            <span className="flex items-center gap-1.5 bg-muted/40 px-2.5 py-1 rounded-md border border-border/50">
                                <Calendar className="size-3.5 text-primary" />
                                <time dateTime={post.meta.date}>{formatDate(post.meta.date)}</time>
                            </span>
                            <span className="flex items-center gap-1.5 bg-muted/40 px-2.5 py-1 rounded-md border border-border/50">
                                <Clock className="size-3.5 text-primary" />
                                <span>{post.meta.readTime}</span>
                            </span>
                        </div>

                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
                            {post.meta.title}
                        </h1>

                        {post.meta.description && (
                            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed pt-1">
                                {post.meta.description}
                            </p>
                        )}
                    </div>

                    {/* Tags */}
                    {post.meta.tags && post.meta.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 pt-1">
                            {post.meta.tags.map((t) => (
                                <Badge key={t} variant="secondary" className="text-xs font-mono px-2.5 py-1 border border-border/60">
                                    #{t}
                                </Badge>
                            ))}
                        </div>
                    )}

                    {/* Cover Hero Image */}
                    {post.meta.cover && (
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-border/80 shadow-xl bg-card">
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

                {/* Article Body via shadcn/typeset */}
                <div className="typeset typeset-docs max-w-none pt-2">
                    {post.content}
                </div>

                {/* Footer Article Navigation */}
                <div className="pt-10 border-t border-border/60 space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                        {prevPost ? (
                            <Link
                                href={`/post/${prevPost.meta.slug}`}
                                className="p-4 rounded-xl border border-border/60 bg-card/40 hover:border-primary/50 hover:bg-primary/5 transition-all space-y-1 group"
                            >
                                <div className="text-muted-foreground flex items-center gap-1">
                                    <span>←</span> Previous Entry
                                </div>
                                <div className="font-bold text-foreground group-hover:text-primary transition-colors truncate">
                                    {prevPost.meta.title}
                                </div>
                            </Link>
                        ) : <div />}

                        {nextPost ? (
                            <Link
                                href={`/post/${nextPost.meta.slug}`}
                                className="p-4 rounded-xl border border-border/60 bg-card/40 hover:border-primary/50 hover:bg-primary/5 transition-all space-y-1 text-right group ml-auto w-full"
                            >
                                <div className="text-muted-foreground flex items-center justify-end gap-1">
                                    Next Entry <span>→</span>
                                </div>
                                <div className="font-bold text-foreground group-hover:text-primary transition-colors truncate">
                                    {nextPost.meta.title}
                                </div>
                            </Link>
                        ) : <div />}
                    </div>

                    <div className="flex items-center justify-between text-xs font-mono text-muted-foreground pt-4 border-t border-border/40">
                        <Link href="/post" className="hover:text-primary transition-colors flex items-center gap-1">
                            ← Return to ~/posts
                        </Link>
                        <a href="#" className="hover:text-primary transition-colors flex items-center gap-1">
                            Scroll to Top <ArrowUp className="size-3.5" />
                        </a>
                    </div>
                </div>
            </div>
        </article>
    );
}
