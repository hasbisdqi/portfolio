'use client';
import { HomeIcon, NewspaperIcon, SquareKanbanIcon, UserIcon } from 'lucide-react'
import React from 'react'
import { buttonVariants } from './ui/button'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'
import { twMerge } from 'tailwind-merge';

function Navbar({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="lg:h-screen h-16 w-screen bottom-0 bg-background/30 backdrop-blur-sm border-r border-t border-border lg:w-16 fixed z-50">
                <div className="flex lg:flex-col items-center lg:justify-center justify-evenly gap-4 h-full">
                    <NavLink href={'/'}>
                        <HomeIcon />
                    </NavLink>
                    <NavLink href={'/post'}>
                        <NewspaperIcon />
                    </NavLink>
                    <NavLink href={'/project'}>
                        <SquareKanbanIcon />
                    </NavLink>
                    <NavLink href='/about'>
                        <UserIcon />
                    </NavLink>
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
}

function NavLink({ href, children, ...props }: NavLinkProps) {
    const pathname = usePathname();
    const isActive = href === '/' ? pathname === href : pathname.startsWith(href);
    return (
        <Link href={href} {...props} className={twMerge(buttonVariants({ size: 'icon', variant: (isActive ? 'default' : 'ghost') }))} >
            {children}
        </Link>
    )
}

export default Navbar