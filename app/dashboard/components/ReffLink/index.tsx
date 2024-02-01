"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

interface ReffLinkProps {
    href: string,
    className?: string,
    children: React.ReactNode
}

export const ReffLink = ({
    href,
    className,
    children
}: ReffLinkProps) => {

    const pathname = usePathname();
    const pathSegments = pathname.split('/');

    return (
        <Link href={`${href}`} className={className}>
            {children}
        </Link>
    )
}