import React from 'react'
import Link from 'next/link';
const SidebarItem = ({ link, text, selected, onSelect }) => {
    return (
        <li>
            <Link href={link}>
                <p
                    className={`navLink ${selected ? 'selected' : ''}`}
                    onClick={onSelect}
                >
                    {text}
                </p>
            </Link>
        </li>
    );
}

export default SidebarItem