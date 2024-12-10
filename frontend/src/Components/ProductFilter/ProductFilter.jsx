import React, { useState, useEffect, useRef } from 'react';
import { FaSlidersH } from 'react-icons/fa';
import useClick from '../useClick';
import './ProductFilter.scss';

const ProductFilter = ({ products, onFilterChange }) => {
    const [isFilterOpen, setIsFilterOpen] = useState(false); 
    const [selectedGender, setSelectedGender] = useState('all'); 
    const [sortOrder, setSortOrder] = useState('none');
    const filterPanelRef = useRef(null);

    useClick(filterPanelRef, () => setIsFilterOpen(false));

    const handleGenderChange = (e) => {
        const gender = e.target.value;
        setSelectedGender(gender);
        onFilterChange({ gender, sortOrder }); 
    };

    const handleSortChange = (e) => {
        const order = e.target.value;
        setSortOrder(order);
        onFilterChange({ gender: selectedGender, sortOrder: order });
    };
    
    return (
        <div className="product-filter">
            <button
                className="filter-toggle"
                onClick={() => setIsFilterOpen(!isFilterOpen)}>
                <FaSlidersH />Wszystkie filtry</button>

            {isFilterOpen && (
                <div className="filter-panel" ref={filterPanelRef}>
                    <div className="filter-group">
                        <label htmlFor="gender-filter">Filtruj według płci:</label>
                        <select
                            id="gender-filter"
                            value={selectedGender}
                            onChange={handleGenderChange}
                        >
                            <option value="all">Wszystko</option>
                            <option value="women">Kobiety</option>
                            <option value="men">Mężczyźni</option>
                        </select>
                    </div>

                    <div className="filter-group">
                        <label htmlFor="sort-filter">Sortuj według ceny:</label>
                        <select
                            id="sort-filter"
                            value={sortOrder}
                            onChange={handleSortChange}
                        >
                            <option value="none">Brak sortowania</option>
                            <option value="asc">Od najniższej do najwyższej</option>
                            <option value="desc">Od najwyższej do najniższej</option>
                        </select>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductFilter;
