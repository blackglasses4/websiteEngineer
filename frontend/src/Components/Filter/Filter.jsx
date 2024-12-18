import React, { useState } from 'react';

const FilterPagination = ({ fetchProducts }) => {
    const [genderFilter, setGenderFilter] = useState('');
    const [sortBy, setSortBy] = useState('new_price');
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(5);

    const handleFilterChange = () => {
        const filters = `gender=${genderFilter}&_sort=${sortBy}&_page=${currentPage}&_per_page=${perPage}`;
        fetchProducts(filters);
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
        handleFilterChange();
    };

    return (
        <div className="filter-pagination">
            <div className="filters">
                <label>
                    Płeć:
                    <select value={genderFilter} onChange={(e) => setGenderFilter(e.target.value)}>
                        <option value="">Wszystko</option>
                        <option value="women">Kobieta</option>
                        <option value="men">Mężczyzna</option>
                    </select>
                </label>
                <label>
                    Sortowanie:
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="new_price">Nowa cena</option>
                        <option value="old_price">Stara cena</option>
                    </select>
                </label>
            </div>

            <div className="pagination">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage <= 1}>Poprzednia</button>
                <span>Strona {currentPage}</span>
                <button onClick={() => handlePageChange(currentPage + 1)}>Następna</button>
            </div>
        </div>
    );
};

export default FilterPagination;