'use client';
import { HomeIcon, NewspaperIcon, SquareKanbanIcon, UserIcon } from 'lucide-react'
import React from 'react'
import { buttonVariants } from './ui/button'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'

function Navbar({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="md:h-screen h-16 w-screen bottom-0 bg-background border-r border-t border-border md:w-16 fixed">
                <div className="flex md:flex-col items-center md:justify-center justify-evenly gap-4 h-full">
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
            <div className="md:ml-16 mb-16 md:mb-0 flex min-h-screen justify-between flex-col">
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
    const isActive = href === pathname;
    return (
        <Link href={href} {...props} className={buttonVariants({ size: 'icon', variant: (isActive ? 'default' : 'ghost') })} >
            {children}
        </Link>
    )
}

export default Navbar