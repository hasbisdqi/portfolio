'use client';
import { HomeIcon, NewspaperIcon, SquareKanbanIcon, UserIcon } from 'lucide-react'
import React from 'react'
import { buttonVariants } from './ui/button'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'

function Navbar({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="sm:h-screen h-16 w-screen bottom-0 border-r border-t border-border sm:w-16 fixed">
                <div className="flex sm:flex-col items-center sm:justify-center justify-evenly gap-4 h-full">
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
            <div className="sm:ml-16">
                {children}
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