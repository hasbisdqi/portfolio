import { posts } from "#site/content";
import { MDXContent } from "@/app/components/mdx-components";
import { Badge } from "@/components/ui/badge";
import { formatDate, getReadingTime } from "@/lib/utils";
import { Calendar, Clock } from "lucide-react";
import Link from "next/link";

interface PostPageProps {
    params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: PostPageProps) {
    const { slug } = await params;
    const post = posts.find((p) => p.slugAsParams === slug);
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
                    <h1 className="text-3xl font-bold tracking-tight md:text-4xl lg:text-5xl">{post.title}</h1>

                    <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <time dateTime={post.date}>{formatDate(post.date)}</time>
                        </div>
                        <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{getReadingTime(post.body)}</span>
                        </div>
                        {/* <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            <span>{post.author.name}</span>
                        </div> */}
                        <div className="flex gap-1">
                        {post.tags?.map((i) => (
                            <Badge key={i} variant="secondary">{i}</Badge>
                        ))}
                        </div>
                    </div>
                </div>

                <div className="relative w-full mb-8 overflow-hidden rounded-lg aspect-video">
                    {/* <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority /> */}
                </div>

                <div className="prose prose-lg max-w-none dark:prose-invert">
                    <MDXContent code={post.body} />
                </div>
            </div>
        </article>
    );
}
