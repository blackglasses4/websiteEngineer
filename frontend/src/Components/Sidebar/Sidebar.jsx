import React, { useState, useEffect, forwardRef } from 'react';
import './Sidebar.scss';
import { TbShoppingBagSearch } from "react-icons/tb";

const Sidebar = forwardRef(({ onSelect, isSidebarVisible, toggleSidebar }, ref) => {
    const [topOffset, setTopOffset] = useState(4.3);
    const [isDynamic, setIsDynamic] = useState(window.innerWidth > 795);

    useEffect(() => {
        const handleResize = () => {
            setIsDynamic(window.innerWidth > 795);
        };

        const handleScroll = () => {
            if (!isDynamic) return;
            const scrollTop = window.scrollY;
            setTopOffset(scrollTop > 0 ? 0 : 4.3);
        };

        window.addEventListener('resize', handleResize);
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('scroll', handleScroll);
        };
    }, [isDynamic]);

    return (
        <div>
            {/* Sidebar */}
            {isSidebarVisible && (
                <aside
                    ref={ref}
                    className="admin-sidebar"
                    style={{
                        top: isDynamic ? `${topOffset}rem` : '4.3rem',
                    }}
                >
                    <button onClick={() => onSelect('products')}>
                        <TbShoppingBagSearch className="icon" />
                        <span>Produkty</span>
                    </button>
                    <button onClick={() => onSelect('orders')}>
                        <TbShoppingBagSearch className="icon" />
                        <span>Zamówienia</span>
                    </button>
                    <button onClick={() => onSelect('users')}>
                        <TbShoppingBagSearch className="icon" />
                        <span>Użytkownicy</span>
                    </button>
                </aside>
            )}
        </div>
    );
});

export default Sidebar;
