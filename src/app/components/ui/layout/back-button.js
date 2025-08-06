'use client';

import Link from "next/link";
import { SVGRightArrow } from "@/app/svg";

export default function Back({ className = '', link='#', ...props }) {
    return (
        <Link
        className={`backButton ${className}`}
        href={link}
        {...props}
        >
        <SVGRightArrow className='rotate-180'/>
        </Link>
    )
}

// Usage:
<Back link="../" />

