import React, { useState, useEffect } from 'react';
import './Sidebar.scss';
import { FaPlusCircle } from 'react-icons/fa';
import { TbShoppingBagSearch } from "react-icons/tb";

const Sidebar = ({ onSelect }) => {
    const [topOffset, setTopOffset] = useState(4.3); // Inicjalny offset w rem
    const [isDynamic, setIsDynamic] = useState(window.innerWidth > 795); // Aktywne tylko dla szerokości > 795px

    useEffect(() => {
        const handleResize = () => {
            setIsDynamic(window.innerWidth > 795); // Aktualizuj, czy dynamiczność jest aktywna
        };

        const handleScroll = () => {
            if (!isDynamic) return; // Nie rób nic, jeśli dynamiczność jest wyłączona
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
        <aside
            className="admin-sidebar"
            style={{
                top: isDynamic ? `${topOffset}rem` : '4.3rem', // Dynamiczne dla szerokości > 795px
            }}
        >
            <button onClick={() => onSelect('createProduct')}>
                <FaPlusCircle className="icon" />
                <span>Dodaj Produkt</span>
            </button>
            <button onClick={() => onSelect('searchProducts')}>
                <TbShoppingBagSearch className="icon" />
                <span>Wyszukaj Produkt</span>
            </button>
        </aside>
    );
};

export default Sidebar;
