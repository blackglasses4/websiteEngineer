import React, { useState } from 'react';

const FilterPagination = ({ fetch }) => {
    const [genderFilter, setGenderFilter] = useState('');
    const [sortBy, setSortBy] = useState('asc');
    const [currentPage, setCurrentPage] = useState(1);
    const [perPage] = useState(5);

    const handleFilterChange = () => {
        const filters = `gender=${genderFilter}&_sort=${sortBy}&_page=${currentPage}&_per_page=${perPage}`;
        fetch(filters);
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
                        <option value="none">Brak sortowania</option>
                        <option value="asc">Od najniższej do najwyższej</option>
                        <option value="desc">Od najwyższej do najniższej</option>
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