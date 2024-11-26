import React from 'react';
import './Sidebar.scss';
import { FaPlusCircle } from 'react-icons/fa';
import { TbShoppingBagSearch } from "react-icons/tb";

const Sidebar = ({ onSelect }) => {
    return (
        <aside className="admin-sidebar">
            <button onClick={() => onSelect('createProduct')}>
                <FaPlusCircle className="icon"/>
                <span>Dodaj Product</span>
            </button>
            <button onClick={() => onSelect('searchProducts')}>
                <TbShoppingBagSearch className="icon"/>
                <span>Wyszukaj Product</span>
            </button>
        </aside>
    );
};

export default Sidebar;
