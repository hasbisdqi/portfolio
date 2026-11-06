'use client';
import { HomeIcon, NewspaperIcon, SquareKanbanIcon, UserIcon, Terminal, MailIcon } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { buttonVariants } from './ui/button'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge';
import { openCommandPalette } from './command-palette';

function Navbar({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isHomePage = pathname === '/';
    const [activeSection, setActiveSection] = useState<string>('hero');

    useEffect(() => {
        if (!isHomePage) return;

        const sections = ['hero', 'projects', 'posts', 'about', 'contact'];
        const handleScroll = () => {
            const scrollPos = window.scrollY + 200;
            for (let i = sections.length - 1; i >= 0; i--) {
                const el = document.getElementById(sections[i]);
                if (el && el.offsetTop <= scrollPos) {
                    setActiveSection(sections[i]);
                    break;
                }
            }
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isHomePage]);

    const scrollTo = (id: string) => {
        const el = document.getElementById(id);
        if (el) {
            el.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <div className="print:hidden lg:h-screen h-16 w-screen bottom-0 bg-background/30 backdrop-blur-sm border-r border-t border-border lg:w-16 fixed z-50">
                <div className="flex lg:flex-col items-center lg:justify-center justify-evenly gap-3 h-full">
                    {isHomePage ? (
                        <>
                            <button
                                onClick={() => scrollTo('hero')}
                                title="Home (Top)"
                                aria-label="Home"
                                className={twMerge(buttonVariants({ size: 'icon', variant: activeSection === 'hero' ? 'default' : 'ghost' }))}
                            >
                                <HomeIcon className="size-5" />
                            </button>
                            <button
                                onClick={() => scrollTo('projects')}
                                title="Projects (~/repositories)"
                                aria-label="Projects"
                                className={twMerge(buttonVariants({ size: 'icon', variant: activeSection === 'projects' ? 'default' : 'ghost' }))}
                            >
                                <SquareKanbanIcon className="size-5" />
                            </button>
                            <button
                                onClick={() => scrollTo('posts')}
                                title="Posts (~/knowledge-base)"
                                aria-label="Posts"
                                className={twMerge(buttonVariants({ size: 'icon', variant: activeSection === 'posts' ? 'default' : 'ghost' }))}
                            >
                                <NewspaperIcon className="size-5" />
                            </button>
                            <button
                                onClick={() => scrollTo('about')}
                                title="About (~/profile)"
                                aria-label="About"
                                className={twMerge(buttonVariants({ size: 'icon', variant: activeSection === 'about' ? 'default' : 'ghost' }))}
                            >
                                <UserIcon className="size-5" />
                            </button>
                            <button
                                onClick={() => scrollTo('contact')}
                                title="Contact (~/contact)"
                                aria-label="Contact"
                                className={twMerge(buttonVariants({ size: 'icon', variant: activeSection === 'contact' ? 'default' : 'ghost' }))}
                            >
                                <MailIcon className="size-5" />
                            </button>
                        </>
                    ) : (
                        <>
                            <NavLink href="/" title="Home">
                                <HomeIcon className="size-5" />
                            </NavLink>
                            <NavLink href="/#projects" title="Projects">
                                <SquareKanbanIcon className="size-5" />
                            </NavLink>
                            <NavLink href="/#posts" title="Posts">
                                <NewspaperIcon className="size-5" />
                            </NavLink>
                            <NavLink href="/#about" title="About">
                                <UserIcon className="size-5" />
                            </NavLink>
                            <NavLink href="/#contact" title="Contact">
                                <MailIcon className="size-5" />
                            </NavLink>
                        </>
                    )}
                    <button
                        onClick={openCommandPalette}
                        title="Command Menu (⌘K / ⌘⇧P)"
                        className={twMerge(
                            buttonVariants({ size: 'icon', variant: 'ghost' }),
                            "text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors cursor-pointer relative group"
                        )}
                        aria-label="Open Command Menu"
                    >
                        <Terminal className="size-5 transition-transform group-hover:scale-110 text-primary" />
                        <span className="sr-only">Command Menu</span>
                    </button>
                </div>
            </div>
            <div className="lg:ml-16 mb-16 lg:mb-0 min-h-screen">
                {children}
                <footer className="p-4 bg-background border-t border-border">
                    <div className="text-center text-sm text-muted-foreground">
                        &#169; {new Date().getFullYear()} Hasbi Assidiqi. All rights reserved.
                    </div>
                </footer>
            </div>
        </>
    )
}

interface NavLinkProps extends LinkProps {
    href: string;
    children: React.ReactNode;
    title?: string;
}

function NavLink({ href, children, title, ...props }: NavLinkProps) {
    const pathname = usePathname();
    const isActive = href === '/' ? pathname === href : pathname.startsWith(href);
    return (
        <Link 
            href={href} 
            title={title}
            {...props} 
            className={twMerge(buttonVariants({ size: 'icon', variant: (isActive ? 'default' : 'ghost') }))} 
        >
            {children}
        </Link>
    )
}

export default Navbar;
