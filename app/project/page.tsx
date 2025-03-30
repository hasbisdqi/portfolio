// import Image from 'next/image'
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'
import {projects} from '#site/content'
import Link from 'next/link';

export default function page() {
    // const projects = [
    //     {
    //         title: "Project One",
    //         technologies: ["NextJS", "React", "Tailwindcss"],
    //         imageUrl: "https://res.cloudinary.com/doj9hfdji/image/upload/v1721261193/cld-sample-3.jpg"
    //     },
    //     {
    //         title: "Project Two",
    //         technologies: ["NodeJS", "Express", "MongoDB"],
    //         imageUrl: "https://res.cloudinary.com/doj9hfdji/image/upload/v1721261193/cld-sample.jpg"
    //     },
    //     {
    //         title: "Project Three",
    //         technologies: ["VueJS", "NuxtJS", "Vuetify"],
    //         imageUrl: "https://res.cloudinary.com/doj9hfdji/image/upload/v1721261193/cld-sample-2.jpg"
    //     }
    // ];
    return (
        <main className='mt-24 px-4 mx-auto max-w-(--breakpoint-xl) relative'>
            <div
                className={cn(
                    "absolute inset-0 -z-1 size-[700px] -left-1/6",
                    "[background-size:20px_20px]",
                    "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
                    "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
                )}
            >
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] "></div>
            </div>
            <h1 className='text-4xl font-bold text-center'>
                Projects
            </h1>
            <p className='text-center text-sm text-muted-foreground mt-4'>This is a detailed post about various topics of interest. Stay tuned for more updates and insights!</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                {projects.map((project, index) => (
                    <div key={index} className="bg-primary/5 backdrop-blur-[2px] border border-primary/20 p-4 relative rounded-lg overflow-hidden">
                        <Link href={project.slug} className='inset-0 absolute'></Link>
                        <h2 className="text-lg font-bold text-center">{project.title}</h2>
                        <div className="flex gap-4 lowercase text-sm text-muted-foreground justify-center mt-2 mb-4">
                            {project.technologies?.slice(0, 3).map((tech) => (
                                <div key={tech} className='flex items-center gap-1'>
                                    <div className="bg-primary rounded-full size-2"></div>
                                    <span>
                                        {tech}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <Image width={1920} height={1080} src={project.coverImage} className='rounded shadow-lg -mb-16' alt="" />
                        {/* <Image width={600} height={400} src="https://placehold.co/600x400" alt="" /> */}
                    </div>
                ))}
            </div>
        </main>
    )
}
