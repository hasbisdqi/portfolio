import { compileMDX } from 'next-mdx-remote/rsc'
import rehypeAutolinkHeadings from 'rehype-autolink-headings';
import rehypePrettyCode from 'rehype-pretty-code';
import rehypeSlug from 'rehype-slug';
import { getReadingTime } from './utils';
import CloudinaryImage from '@/components/cloudinary-image';
import React from 'react';

export async function GetGitTree() {
    const res = await fetch('https://api.github.com/repos/hasbisdqi/portfolio-contents/git/trees/main', {
        headers: {
            'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    });
    if (!res.ok) {
        return res.status
    }
    const data = res.json();
    return data;
}

async function FetchGithub(treeUrl: string) {
    const res = await fetch(treeUrl, {
        headers: {
            'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json'
        }
    });
    if (!res.ok) {
        throw new Error('Gagal mengambil sub tree dari GitHub');
    }
    const data = await res.json();
    return data;
}

export async function getPostFiles() {
    const data = await FetchGithub('https://api.github.com/repos/hasbisdqi/portfolio-contents/contents/post')
    return data.map((d: { path: string }) => d.path)
}

export async function getPosts() {
    const files = await getPostFiles();
    const posts: PostContent[] = [];

    for (const filePath of files) {

        const rawUrl = `https://api.github.com/repos/hasbisdqi/portfolio-contents/contents/${filePath}`;
        const rawContent = await FetchGithub(rawUrl);
        const rawMDX = Buffer.from(rawContent.content, 'base64').toString();
        const { frontmatter, content } = await compileMDX<{
            title: string,
            description: string,
            date: string,
            tags: string[],
            published: boolean,
            coverImage: string,
        }>({
            source: rawMDX,
            components: {
                img: (props) => <CloudinaryImage className="max-w-full h-auto rounded-lg" src={props.src ?? ''} {...props} width={800} height={600} />
            },
            options: {
                parseFrontmatter: true,
                mdxOptions: {
                    rehypePlugins: [
                        [rehypePrettyCode, {
                            theme: { dark: "vitesse-black", light: "vitesse-light" },
                        }],
                        rehypeSlug,
                        [rehypeAutolinkHeadings, {
                            behavior: 'wrap'
                        }],
                    ],
                },
            }
        })

        posts.push({
            meta: {
                slug: frontmatter.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
                title: frontmatter.title,
                description: frontmatter.description,
                date: frontmatter.date,
                readTime: getReadingTime(rawMDX),
                cover: frontmatter.coverImage,
                published: frontmatter.published,
                tags: frontmatter.tags,
            },
            content: content,
        });
    }
    return posts.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());
}

export async function getProjectFiles() {
    const data = await FetchGithub('https://api.github.com/repos/hasbisdqi/portfolio-contents/contents/project')
    return data.map((d: { path: string }) => d.path)
}

export async function getProjects() {
    const files = await getProjectFiles();
    const projects: ProjectContent[] = [];

    for (const filePath of files) {

        const rawUrl = `https://api.github.com/repos/hasbisdqi/portfolio-contents/contents/${filePath}`;
        const rawContent = await FetchGithub(rawUrl);
        const rawMDX = Buffer.from(rawContent.content, 'base64').toString();
        const { frontmatter, content } = await compileMDX<{
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
            components: {
                img: (props) => <CloudinaryImage className="max-w-full h-auto rounded-lg" src={props.src ?? ''} {...props} width={800} height={600} />
            },
            options: {
                parseFrontmatter: true,
                mdxOptions: {
                    rehypePlugins: [
                        [rehypePrettyCode, {
                            theme: { dark: "vitesse-black", light: "vitesse-light" },
                        }],
                        rehypeSlug,
                        [rehypeAutolinkHeadings, {
                            behavior: 'wrap'
                        }],
                    ],
                },
            },
        })

        projects.push({
            meta: {
                slug: frontmatter.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, ''),
                title: frontmatter.title,
                description: frontmatter.description,
                coverImage: frontmatter.coverImage,
                technologies: frontmatter.technologies,
                liveUrl: frontmatter.liveUrl,
                githubUrl: frontmatter.githubUrl,
                year: frontmatter.year,
                duration: frontmatter.duration,
                client: frontmatter.client,
                role: frontmatter.role,
                images: frontmatter.images,
            },
            content: content,
        });
    }

    return projects.sort((a, b) => new Date(b.meta.year).getTime() - new Date(a.meta.year).getTime());
}

