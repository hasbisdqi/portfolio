import { cn } from '@/lib/utils';
import React from 'react'
import Link from 'next/link';
import { getProjects } from '@/lib/contents';
import CloudinaryImage from '@/components/cloudinary-image';

export default async function page() {
    const projects = await getProjects();
    return (
        <main className='px-4 mx-auto max-w-7xl min-h-screen sm:-mb-16 overflow-hidden'>
            <div
                className={cn(
                    "absolute inset-0 -z-1 size-[400px] sm:size-[700px] -left-1/6",
                    "[background-size:15px_15px]",
                    "sm:[background-size:20px_20px]",
                    "[background-image:radial-gradient(#d4d4d4_1px,transparent_1px)]",
                    "dark:[background-image:radial-gradient(#404040_1px,transparent_1px)]",
                )}
            >
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-background [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] "></div>
            </div>
            <h1 className='text-4xl font-bold text-center mt-12 sm:mt-24'>
                Projects
            </h1>
            <p className='text-center text-sm text-muted-foreground mt-4'>This is a detailed post about various topics of interest. Stay tuned for more updates and insights!</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                {projects.map((project, index) => (
                    <div key={index} className="bg-primary/5 backdrop-blur-[2px] border border-primary/20 p-4 relative group rounded-lg overflow-hidden w-full">
                        <Link href={"project/"+project.meta.slug} className='inset-0 absolute z-10'></Link>
                        <h2 className="text-lg font-bold text-center">{project.meta.title}</h2>
                        <div className="flex gap-4 lowercase text-sm text-muted-foreground justify-center mt-2 mb-4">
                            {project.meta.technologies?.slice(0, 3).map((tech) => (
                                <div key={tech} className='flex items-center gap-1'>
                                    <div className="bg-primary rounded-full size-2"></div>
                                    <span>
                                        {tech}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <div className="w-full aspect-video rounded-md -mb-16 overflow-hidden group-hover:-translate-y-16 transition-transform group-hover:scale-105 scale-3d">
                        <CloudinaryImage fill src={project.meta.coverImage} alt="" />
                        </div>
                    </div>
                ))}
            </div>
        </main>
    )
}
