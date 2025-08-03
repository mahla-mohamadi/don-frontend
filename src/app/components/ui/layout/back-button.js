'use client';

import Link from "next/link";

export default function Back({ className = '', link='#', ...props }) {
    const rightArrowSVG = (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6.667 16h18.666M16 6.667 25.333 16 16 25.333" stroke="#000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
    );
    return (
        <Link
        className={`backButton ${className} relative`}
        href={link}
        {...props}
        >
        {rightArrowSVG}
        </Link>
    )
}

// Usage:
<Back link="../" />

