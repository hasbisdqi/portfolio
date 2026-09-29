import { getPosts } from '@/lib/contents';
import { cn, formatDate } from '@/lib/utils';
import Link from 'next/link';
import React from 'react'

export default async function Post() {
    const posts = await getPosts();
    const allposts = posts.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());
    return (
        <main className='px-4 relative overflow-hidden min-h-screen sm:-mb-16'>
            <h1 className='text-4xl font-bold text-center mt-12 sm:mt-24 text-foreground'>
                Exploring the Depths of Knowledge
            </h1>
            <p className='text-center text-sm text-muted-foreground mt-4 max-w-2xl mx-auto text-balance'>
                A chronological archive of deep dives, architecture notes, and occasional ramblings.
            </p>

            <div className="mt-12 mx-auto w-fit grid gap-4 pb-12">
                {allposts.map((item, index) => (
                    <Link href={'post/' + item.meta.slug} key={index} className="flex gap-4 items-center justify-end group cursor-pointer">
                        <time className='text-muted-foreground text-sm font-mono hidden md:block' dateTime={item.meta.date}>{formatDate(item.meta.date)}</time>
                        <div className="size-3 rounded-full border border-primary/20 bg-primary/5 transition-colors group-hover:bg-primary group-hover:border-primary hidden md:block shadow-sm"></div>
                        <div className="border border-primary/20 backdrop-blur-sm rounded-lg bg-background p-4 w-full max-w-lg shadow-sm transition-all group-hover:shadow-md group-hover:-translate-y-0.5 group-hover:border-primary/40 relative">
                            <h2 className="text-base font-bold text-foreground">{item.meta.title}</h2>
                            <p className="text-sm text-muted-foreground line-clamp-2 mt-1">{item.meta.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    )
}
