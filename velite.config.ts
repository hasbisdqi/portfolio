import { defineConfig, defineCollection, s } from "velite";
import rehypeSlug from "rehype-slug";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeAutolinkHeadings from "rehype-autolink-headings";

const computedFields = <T extends { slug: string }>(data: T) => ({
    ...data,
    slugAsParams: data.slug.split("/").slice(1).join("/"),
});

const posts = defineCollection({
    name: "Post",
    pattern: "post/**/*.mdx",
    schema: s
        .object({
            slug: s.path(),
            title: s.string().max(99),
            description: s.string().max(999).optional(),
            date: s.isodate(),
            published: s.boolean().default(true),
            tags: s.array(s.string()).optional(),
            body: s.mdx(),
            coverImage: s.string().optional()
        })
        .transform(computedFields),
});

const projects = defineCollection({
    name: "Projects",
    pattern: "project/**/*.mdx",
    schema: s.object({
        slug: s.path(),
        title: s.string().max(99),
        description: s.string().max(999).optional(),
        coverImage: s.string(),
        technologies: s.array(s.string()).optional(),
        liveUrl: s.string().optional(),
        githubUrl: s.string().optional(),
        year: s.string(),
        duration: s.string(),
        client: s.string(),
        role: s.string(),
        images: s.array(s.string()),
        body: s.mdx()
    })
        .transform(computedFields),
})

export default defineConfig({
    root: "content",
    output: {
        data: ".velite",
        assets: "public/static",
        base: "/static/",
        name: "[name]-[hash:6].[ext]",
        clean: true,
    },
    collections: { posts, projects },
    mdx: {
        rehypePlugins: [
            rehypeSlug,
            [rehypePrettyCode, { theme: "github-dark" }],
            [
                rehypeAutolinkHeadings,
                {
                    behavior: "wrap",
                    properties: {
                        className: ["subheading-anchor"],
                        ariaLabel: "Link to section",
                    },
                },
            ],
        ],
        remarkPlugins: [],
    },
});