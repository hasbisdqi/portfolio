import { getPosts } from '@/lib/contents';
import { cn, formatDate } from '@/lib/utils';
import Link from 'next/link';
import React from 'react'

export default async function Post() {
    const posts = await getPosts();
    const allposts = posts.sort((a, b) => new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime());
    return (
        <main className='mt-24 px-4 relative'>
            <div
                className={cn(
                    "absolute inset-0 -z-1 size-[700px] opacity-60 left-1/2",
                    "[background-size:20px_20px]",
                    "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
                    "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
                )}
            >
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] "></div>
            </div>
            <h1 className='text-4xl font-bold text-center'>
                Exploring the Depths of Knowledge
            </h1>
            <p className='text-center text-sm text-muted-foreground mt-4'>This is a detailed post about various topics of interest. Stay tuned for more updates and insights!</p>

            <div className="mt-8 mx-auto w-fit grid gap-3">
                {allposts.map((item, index) => (
                    <Link href={'post/' + item.meta.slug} key={index} className="flex gap-4 items-center justify-end group cursor-pointer">
                        <time className='text-muted-foreground text-sm font-mono hidden md:block' dateTime={item.meta.date}>{formatDate(item.meta.date)}</time>
                        <div className="size-3 rounded-full border border-primary/20 bg-primary/5 hidden md:block"></div>
                        <div className="border border-primary/20 backdrop-blur-sm rounded-lg bg-primary/5 group-hover:bg-primary/10 p-4 w-full max-w-lg">
                            <h2 className="text-md font-bold">{item.meta.title}</h2>
                            <p className="text-sm text-muted-foreground line-clamp-2">{item.meta.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    )
}
