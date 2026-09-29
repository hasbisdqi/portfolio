import { buttonVariants } from "@/components/ui/button";
import { InteractiveConstellation } from "@/components/ui/interactive-constellation";
import { IDETooltip } from "@/components/ui/ide-tooltip";
import { getPosts } from "@/lib/contents";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default async function Home() {
    const posts = await getPosts();
    return (
        <main className="flex justify-center items-start min-h-screen sm:-mb-16 py-24 relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:max-w-7xl px-4 w-full relative z-10">
                
                {/* Left Column: Hero (Sticky on large screens) */}
                <div className="lg:col-span-5 relative">
                    <div className="sticky top-32">
                        {/* Ambient Glow */}
                        <div className="absolute -inset-16 bg-primary/10 blur-[100px] rounded-full -z-10 pointer-events-none" />
                        
                        <h1 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                            Hi, I'm <br />
                            <span className="text-primary tracking-tight">Hasbi Assidiqi</span>
                        </h1>
                        <p className="text-muted-foreground text-pretty text-sm lg:text-base leading-loose max-w-sm">
                            I am a <IDETooltip keyword="Developer" typeDef="Entity & { passion: number }" description="A carbon-based lifeform converting caffeine into dynamic web applications at 60fps.">passionate web developer</IDETooltip> with a knack for creating dynamic and responsive web applications. With a strong foundation in <IDETooltip keyword="JavaScript" typeDef="Record<string, any>" description="The duct tape of the internet. Highly flexible, occasionally explosive.">JavaScript</IDETooltip> and <IDETooltip keyword="React" typeDef="(state) => UI" description="A UI library that makes building complex interfaces feel like playing with highly opinionated Lego blocks.">React</IDETooltip>, I enjoy bringing ideas to life in the browser.
                        </p>
                        <div className="flex gap-4 mt-8 lg:justify-start justify-center">
                            <Link href={'/about'} className={buttonVariants({ className: "shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-shadow" })}>Get in touch</Link>
                            <Link href={'/about#contact'} className={buttonVariants({ variant: "secondary", className: "bg-background/50 backdrop-blur-sm hover:bg-background/80" })}>About me</Link>
                        </div>
                    </div>
                </div>

                {/* Right Column: Posts Grid */}
                <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {posts.slice(0, 5).map((post, index) => {
                        const isFeatured = index === 0;
                        return (
                            <div 
                                key={post.meta.slug} 
                                className={cn(
                                    "border backdrop-blur-[4px] rounded-xl p-6 relative transition-all duration-300 group overflow-hidden",
                                    isFeatured 
                                        ? "sm:col-span-2 border-primary/40 bg-primary/5 hover:bg-primary/10 hover:border-primary/60 shadow-sm hover:shadow-md hover:-translate-y-1" 
                                        : "col-span-1 border-primary/15 bg-background/40 hover:bg-background/80 hover:border-primary/40 shadow-sm hover:shadow-md hover:-translate-y-1"
                                )}
                            >
                                <Link className="absolute inset-0 z-10" href={"post/" + post.meta.slug} />
                                
                                {isFeatured && (
                                    <div className="text-xs font-mono text-primary mb-3 uppercase tracking-wider font-semibold">
                                        Latest Deep Dive
                                    </div>
                                )}
                                
                                <h2 className={cn(
                                    "font-bold text-foreground transition-colors group-hover:text-primary mb-2",
                                    isFeatured ? "text-2xl" : "text-base"
                                )}>
                                    {post.meta.title}
                                </h2>
                                <p className={cn(
                                    "text-muted-foreground",
                                    isFeatured ? "text-base line-clamp-3" : "text-sm line-clamp-2"
                                )}>
                                    {post.meta.description}
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
            <InteractiveConstellation />
        </main>
    );
}
