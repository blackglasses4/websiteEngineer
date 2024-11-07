import React, { useEffect, useState } from 'react';

const ThemeSwitcher = ({ iconSize = 22 }) => {
    const [theme, setTheme] = useState(() => {
        if (typeof window !== 'undefined') {
            return localStorage.getItem('theme') ?? 'system';
        }
        return 'system';
    });

    const nextTheme = theme === 'system' ? 'light' : theme === 'light' ? 'dark' : 'system';

    useEffect(() => {
        if (theme && theme !== 'system') {
            localStorage.setItem('theme', theme);
            document.documentElement.dataset.theme = theme;
        } else {
            localStorage.removeItem('theme');
            delete document.documentElement.dataset.theme;
        }
    }, [theme]);

    const toggleTheme = (e) => {
        e.preventDefault();
        setTheme(nextTheme);
    };

    return (
        <a
            className="header__theme-switch secondary"
            aria-label="Theme switch"
            href="."
            onClick={toggleTheme}
        >
            {theme === 'light' && (
                <svg
                    width={iconSize}
                    height={iconSize}
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <circle cx="12" cy="12" r="5" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="12" y1="21" x2="12" y2="23" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="21" y1="12" x2="23" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
            )}
            {theme === 'dark' && (
                <svg
                    width={iconSize}
                    height={iconSize}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
                </svg>
            )}
            {theme === 'system' && (
                <svg
                    width={iconSize}
                    height={iconSize}
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M8.4645 15.536a5 5 0 0 1-1.4645-3.5355 5 5 0 0 1 5-5 5 5 0 0 1 3.5355 1.4645" />
                    <line x1="12" y1="1" x2="12" y2="3" />
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                    <line x1="1" y1="12" x2="3" y2="12" />
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                    <path d="M2.3109 21.662L21.6099 2.442" strokeWidth="2" />
                    <path d="M23.102 18.191a5.3289 5.3289 0 1 1-5.7967-5.7967 4.1447 4.1447 0 0 0 5.7967 5.7967z" strokeWidth="2" />
                </svg>
            )}
        </a>
    );
};

export default ThemeSwitcher;
