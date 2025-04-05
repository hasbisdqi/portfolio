import { buttonVariants } from "@/components/ui/button";
import { Meteors } from "@/components/ui/meteors";
import { getPosts } from "@/lib/contents";
import Link from "next/link";

export default async function Home() {
    const posts = await getPosts();
    return (
        <main className="flex justify-center items-center min-h-screen sm:-mb-16 py-12 relative overflow-hidden">
            <div className="grid grid-cols-12 gap-8 lg:max-w-7xl px-4 sm:py-0 py-12">
                <div className="max-w-md lg:text-left text-center col-span-full lg:col-span-5 mx-auto my-auto">
                    <h1 className="text-4xl font-bold text-foreground mb-4">Hi, Im <span className="text-primary">Hasbi Assidiqi</span></h1>
                    <p className="text-muted-foreground text-pretty text-sm">I am a passionate web developer with a knack for creating dynamic and responsive web applications. With a strong foundation in JavaScript and React, I enjoy bringing ideas to life in the browser.</p>
                    <div className="flex gap-4 mt-6 lg:justify-start justify-center">
                        <Link href={'/about'} className={buttonVariants()}>Get in touch</Link>
                        <Link href={'/about#contact'} className={buttonVariants({variant: "secondary"})}>About me</Link>
                    </div>
                </div>
                <div className="grid lg:grid-cols-2 gap-2 col-span-full lg:col-span-7 lg:max-w-full max-w-md">
                    {posts.slice(0, 4).map((post) => {
                        return (
                            <div key={post.meta.slug} className="border border-primary/20 backdrop-blur-[3px] rounded-lg bg-primary/5 hover:bg-primary/10 transition-all hover:scale-105 hover:-translate-y-1.5 hover:z-10 p-4 lg:max-w-full">
                                <Link className="absolute inset-0" href={"post/" + post.meta.slug} />
                                <h2 className="text-md font-bold">{post.meta.title}</h2>
                                <p className="text-sm text-muted-foreground line-clamp-2">{post.meta.description}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <Meteors number={60} className="-z-1" />
        </main>
    );
}
