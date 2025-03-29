// import Image from 'next/image'
import { DotPattern } from '@/components/magicui/dot-pattern';
import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react'

export default function page() {
    const projects = [
        {
            title: "Project One",
            technologies: ["NextJS", "React", "Tailwindcss"],
            imageUrl: "https://placehold.co/1920x1080"
        },
        {
            title: "Project Two",
            technologies: ["NodeJS", "Express", "MongoDB"],
            imageUrl: "https://placehold.co/1920x1080"
        },
        {
            title: "Project Three",
            technologies: ["VueJS", "NuxtJS", "Vuetify"],
            imageUrl: "https://placehold.co/1920x1080"
        }
    ];
    return (
        <main className='mt-24 px-4 mx-auto max-w-(--breakpoint-xl) relative'>
            <DotPattern
                width={20}
                height={20}
                cr={1.2}
                className={cn([
                    "size-[700px] -bottom-1/3 -z-1 opacity-50 -left-1/3",
                    "[mask-image:radial-gradient(500px_circle_at_center,white,transparent)]"
                ])}
        />
            <h1 className='text-4xl font-bold text-center'>
                Projects
            </h1>
            <p className='text-center text-sm text-muted-foreground mt-4'>This is a detailed post about various topics of interest. Stay tuned for more updates and insights!</p>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                {projects.map((project, index) => (
                    <div key={index} className="bg-primary/5 backdrop-blur-[2px] border border-primary/20 p-4 rounded-lg overflow-hidden">
                        <h2 className="text-lg font-bold text-center">{project.title}</h2>
                        <div className="flex gap-4 lowercase text-sm text-muted-foreground justify-center mt-2 mb-4">
                            {project.technologies.map((tech, index) => (
                                <div key={index} className='flex items-center gap-1'>
                                    <div className="bg-primary rounded-full size-2"></div>
                                    <span>
                                        {tech}
                                    </span>
                                </div>
                            ))}
                        </div>
                        <Image width={1920} height={1080} src={project.imageUrl} className='rounded shadow-lg -mb-16' alt="" />
                        {/* <Image width={600} height={400} src="https://placehold.co/600x400" alt="" /> */}
                    </div>
                ))}
            </div>
        </main>
    )
}
