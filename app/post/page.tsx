import { getPosts } from '@/lib/contents';
import PostExplorer from './post-explorer';
import React from 'react';
import { Metadata } from 'next';
import { getOgImageUrl } from '@/lib/utils';

export const metadata: Metadata = {
    title: 'Posts & Knowledge Base',
    description: 'A chronological archive of technical deep dives, system architectures, and engineering notes.',
    openGraph: {
        title: 'Posts & Knowledge Base',
        description: 'A chronological archive of technical deep dives, system architectures, and engineering notes.',
        images: [getOgImageUrl('Posts & Archive')],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Posts & Knowledge Base',
        description: 'A chronological archive of technical deep dives, system architectures, and engineering notes.',
        images: [getOgImageUrl('Posts & Archive')],
    },
};

export default async function PostPage() {
    const posts = await getPosts();
    const sortedPosts = posts.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());

    return (
        <main className="mx-auto max-w-6xl px-4 py-12 min-h-screen">
            <div className="text-center space-y-3 mb-10">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-mono">
                    ~/knowledge-base
                </h1>
                <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                    Chronological filesystem of architectural insights, framework deep dives, and production notes.
                </p>
            </div>

            <PostExplorer initialPosts={sortedPosts} />
        </main>
    );
}
