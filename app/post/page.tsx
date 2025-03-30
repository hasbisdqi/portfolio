import { posts } from '#site/content'
import { formatDate } from '@/lib/utils';
import Link from 'next/link';
import React from 'react'

export default function Post() {
    const allposts = posts;
    return (
        <main className='mt-24 px-4'>
            <h1 className='text-4xl font-bold text-center'>
                Exploring the Depths of Knowledge
            </h1>
            <p className='text-center text-sm text-muted-foreground mt-4'>This is a detailed post about various topics of interest. Stay tuned for more updates and insights!</p>

            <div className="mt-8 mx-auto w-fit grid gap-3">
                {allposts.map((item, index) => (
                    <Link href={item.slug} key={index} className="flex gap-4 items-center group cursor-pointer">
                        <time className='text-muted-foreground text-sm font-mono hidden md:block' dateTime={item.date}>{formatDate(item.date)}</time>
                        <div className="size-3 rounded-full border border-primary/20 bg-primary/10 hidden md:block"></div>
                        <div className="border border-primary/20 backdrop-blur-sm rounded-lg bg-primary/5 group-hover:bg-primary/10 p-4 w-full max-w-lg">
                            <h2 className="text-md font-bold">{item.title}</h2>
                            <p className="text-sm text-muted-foreground line-clamp-2">{item.description}</p>
                        </div>
                    </Link>
                ))}
            </div>
        </main>
    )
}
