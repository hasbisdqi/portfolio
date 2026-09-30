import { compileMDX } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import { getReadingTime } from './utils';
import Image from 'next/image';
import React from 'react';
import { Client } from '@notionhq/client';
import { NotionToMarkdown } from 'notion-to-md';

const sharedMdxComponents = {
    img: (props: any) => <img className="max-w-full h-auto rounded-lg my-4" src={props.src ?? ''} alt={props.alt ?? ''} {...props} />,
    table: (props: any) => (
        <div className="my-6 w-full overflow-x-auto rounded-xl border border-border/60 shadow-sm">
            <table className="w-full text-xs sm:text-sm font-mono mt-0" {...props} />
        </div>
    ),
    thead: (props: any) => <thead className="bg-muted/50 border-b border-border/60 text-foreground" {...props} />,
    th: (props: any) => <th className="px-4 py-2.5 text-left font-bold text-foreground" {...props} />,
    td: (props: any) => <td className="px-4 py-2.5 border-b border-border/30 text-muted-foreground" {...props} />,
    tr: (props: any) => <tr className="hover:bg-muted/20 transition-colors" {...props} />,
};

const sharedMdxOptions = {
    parseFrontmatter: false,
    mdxOptions: {
        remarkPlugins: [remarkGfm as any],
        rehypePlugins: [
            [rehypePrettyCode, {
                theme: { dark: "vitesse-black", light: "vitesse-light" },
            }] as any,
            rehypeSlug as any,
            [rehypeAutolinkHeadings, {
                behavior: 'wrap' as const
            }] as any,
        ],
    },
};

const notion = new Client({ auth: process.env.NOTION_API });
const n2m = new NotionToMarkdown({ notionClient: notion });
const dbUrl = process.env.DB_ID || '';
const dbIdMatch = dbUrl.match(/\/p\/([a-zA-Z0-9]+)/);
const dbId = dbIdMatch ? dbIdMatch[1] : dbUrl;

const projectDbUrl = process.env.PROJECT_DB_ID || '';
const projectDbIdMatch = projectDbUrl.match(/\/p\/([a-zA-Z0-9]+)/);
const projectDbId = projectDbIdMatch ? projectDbIdMatch[1] : projectDbUrl;

// Helper to query Notion DB with Next.js caching
async function queryNotionDatabase(databaseId: string, tags: string[]) {
    const res = await fetch(`https://api.notion.com/v1/databases/${databaseId}/query`, {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${process.env.NOTION_API}`,
            'Notion-Version': '2022-06-28',
            'Content-Type': 'application/json'
        },
        next: { tags, revalidate: 3600 }
    });
    if (!res.ok) throw new Error("Gagal mengambil data dari Notion: " + await res.text());
    return res.json();
}

export async function getPosts(): Promise<PostContent[]> {
    if (!process.env.NOTION_API || !dbId) {
        console.warn("NOTION_API or DB_ID not configured, returning empty posts");
        return [];
    }
    
    const data = await queryNotionDatabase(dbId, ['posts']);
    const posts: PostContent[] = [];

    for (const page of data.results) {
        const props = page.properties;
        const title = props.title?.title?.[0]?.plain_text || props.Name?.title?.[0]?.plain_text || '';
        const slug = props.slug?.rich_text?.[0]?.plain_text || page.id;
        const description = props.description?.rich_text?.[0]?.plain_text || '';
        const date = props.date?.date?.start || '';
        const tags = props.tags?.multi_select?.map((t: { name: string }) => t.name.replace(/^["']|["']$/g, '').trim()) || [];
        const published = props.published?.checkbox ?? false;
        const coverImage = props.coverImage?.url || '';

        posts.push({
            meta: {
                slug,
                title,
                description,
                date,
                readTime: '3 min read',
                cover: coverImage,
                published,
                tags,
            },
            content: null as any,
            pageId: page.id,
        } as any);
    }
    return posts.filter((item) => item.meta.published).sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());
}

export async function getPostBySlug(slug: string): Promise<PostContent | null> {
    const posts = await getPosts();
    const targetPost = posts.find((p) => p.meta.slug === slug);
    if (!targetPost) return null;

    const pageId = (targetPost as any).pageId;
    if (!pageId) return targetPost;

    const mdblocks = await n2m.pageToMarkdown(pageId);
    const rawMDX = n2m.toMarkdownString(mdblocks).parent || '';

    const { content } = await compileMDX<{
        title: string,
        description: string,
        date: string,
        tags: string[],
        published: boolean,
        coverImage: string,
    }>({
        source: rawMDX,
        components: sharedMdxComponents,
        options: sharedMdxOptions
    });

    return {
        ...targetPost,
        meta: {
            ...targetPost.meta,
            readTime: getReadingTime(rawMDX),
        },
        content,
    };
}

export async function getProjects(): Promise<ProjectContent[]> {
    if (!process.env.NOTION_API || !projectDbId) {
        console.warn("NOTION_API or PROJECT_DB_ID not configured, returning empty projects");
        return [];
    }
    
    const data = await queryNotionDatabase(projectDbId, ['projects']);
    const projects: ProjectContent[] = [];

    for (const page of data.results) {
        const props = page.properties;
        const title = props.title?.title?.[0]?.plain_text || props.Name?.title?.[0]?.plain_text || '';
        const slug = props.slug?.rich_text?.[0]?.plain_text || page.id;
        const description = props.description?.rich_text?.[0]?.plain_text || '';
        const coverImage = props.coverImage?.url || '';
        const technologies = props.technologies?.multi_select?.map((t: { name: string }) => t.name) || [];
        const liveUrl = props.liveUrl?.url || '';
        const githubUrl = props.githubUrl?.url || '';
        const year = props.year?.rich_text?.[0]?.plain_text || '';
        const duration = props.duration?.rich_text?.[0]?.plain_text || '';
        const client = props.client?.rich_text?.[0]?.plain_text || '';
        const role = props.role?.rich_text?.[0]?.plain_text || '';
        const imagesStr = props.images?.rich_text?.[0]?.plain_text || '';
        const images = imagesStr ? imagesStr.split(',').map((s: string) => s.trim()) : [];

        projects.push({
            meta: {
                slug,
                title,
                description,
                coverImage,
                technologies,
                liveUrl,
                githubUrl,
                year,
                duration,
                client,
                role,
                images,
            },
            content: null as any,
            pageId: page.id,
        } as any);
    }

    return projects.sort((a, b) => new Date(b.meta.year).getTime() - new Date(a.meta.year).getTime());
}

export async function getProjectBySlug(slug: string): Promise<ProjectContent | null> {
    const projects = await getProjects();
    const targetProj = projects.find((p) => p.meta.slug === slug);
    if (!targetProj) return null;

    const pageId = (targetProj as any).pageId;
    if (!pageId) return targetProj;

    const mdblocks = await n2m.pageToMarkdown(pageId);
    const rawMDX = n2m.toMarkdownString(mdblocks).parent || '';

    const { content } = await compileMDX<{
        slug: string,
        title: string,
        description: string,
        coverImage: string,
        technologies: string[],
        liveUrl: string,
        githubUrl: string,
        year: string,
        duration: string,
        client: string,
        role: string,
        images: string[],
    }>({
        source: rawMDX,
        components: sharedMdxComponents,
        options: sharedMdxOptions
    });

    return {
        ...targetProj,
        content,
    };
}
