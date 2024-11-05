'use client';
import { HomeIcon, NewspaperIcon, SquareKanbanIcon, UserIcon } from 'lucide-react'
import React from 'react'
import { buttonVariants } from './ui/button'
import Link, { LinkProps } from 'next/link'
import { usePathname } from 'next/navigation'

function Navbar() {
    return (
        <div>
            <div className="h-screen border-r border-border w-16 fixed">
                <div className="flex flex-col items-center justify-center gap-4 h-full">
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
        </div>
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