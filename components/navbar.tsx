'use client';
import { HomeIcon, NewspaperIcon, SquareKanbanIcon, UserIcon, Terminal } from 'lucide-react'
import React from 'react'
import { buttonVariants, Button } from './ui/button'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge';
import { openCommandPalette } from './command-palette';

function Navbar({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="print:hidden lg:h-screen h-16 w-screen bottom-0 bg-background/30 backdrop-blur-sm border-r border-t border-border lg:w-16 fixed z-50">
                <div className="flex lg:flex-col items-center lg:justify-center justify-evenly gap-4 h-full">
                    <NavLink href={'/'} title="Home (G H)">
                        <HomeIcon />
                    </NavLink>
                    <NavLink href={'/post'} title="Posts (G P)">
                        <NewspaperIcon />
                    </NavLink>
                    <NavLink href={'/project'} title="Projects (G R)">
                        <SquareKanbanIcon />
                    </NavLink>
                    <NavLink href='/about' title="About (G A)">
                        <UserIcon />
                    </NavLink>
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

export default Navbar