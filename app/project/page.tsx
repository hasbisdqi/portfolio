import { getProjects } from '@/lib/contents';
import ProjectExplorer from './project-explorer';
import React from 'react';
import { Metadata } from 'next';
import { getOgImageUrl } from '@/lib/utils';

export const metadata: Metadata = {
    title: 'Projects & Repositories',
    description: 'Explore full-stack web applications, open source repositories, and client projects.',
    openGraph: {
        title: 'Projects & Repositories',
        description: 'Explore full-stack web applications, open source repositories, and client projects.',
        images: [getOgImageUrl('Projects & Repositories')],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Projects & Repositories',
        description: 'Explore full-stack web applications, open source repositories, and client projects.',
        images: [getOgImageUrl('Projects & Repositories')],
    },
};

export default async function ProjectPage() {
    const projects = await getProjects();

    return (
        <main className="mx-auto max-w-6xl px-4 py-12 min-h-screen">
            <div className="text-center space-y-3 mb-10">
                <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground font-mono">
                    ~/repositories
                </h1>
                <p className="text-sm text-muted-foreground max-w-xl mx-auto">
                    Interactive directory of production applications, frontend experiments, and architecture blueprints.
                </p>
            </div>

            <ProjectExplorer initialProjects={projects} />
        </main>
    );
}
