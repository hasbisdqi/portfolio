import { getAllPosts } from "@/lib/posts";
import { Calendar, User } from "lucide-react";
import Link from "next/link";
import rehypeHighlight from "rehype-highlight";
import { remark } from "remark";
import "highlight.js/styles/github-dark.css";
import remarkHtml from "remark-html";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";

interface PostPageProps {
    params: { slug: string };
}

export default async function PostPage({ params }: PostPageProps) {
    const { slug } = params;
    const posts = getAllPosts();
    const post = posts.find((p) => p.slug === slug);
    if (!post) {
        return <div>Post not found</div>;
    }
    const processedContent = await remark()
        .use(remarkHtml)
        .use(remarkRehype)
        .use(rehypeHighlight)
        .use(rehypeStringify)
        .process(post.content);
    const contentHtml = processedContent.toString();

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
                        <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-1" />
                            <time dateTime={post.date}>{post.date}</time>
                        </div>
                        {/* <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            <span>{post.readingTime} min read</span>
                        </div> */}
                        {/* <div className="flex items-center">
                            <User className="w-4 h-4 mr-1" />
                            <span>{post.author.name}</span>
                        </div> */}
                        {/* <Badge variant="secondary">{post.category}</Badge> */}
                    </div>
                </div>

                <div className="relative w-full mb-8 overflow-hidden rounded-lg aspect-video">
                    {/* <Image src={post.coverImage || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority /> */}
                </div>

                <div className="prose prose-lg max-w-none dark:prose-invert prose-code:p-0">
                    <div dangerouslySetInnerHTML={{ __html: contentHtml }} />
                </div>
            </div>
        </article>
    );
}
