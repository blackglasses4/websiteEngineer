import React, { useState, useRef } from 'react';
import { FaSlidersH } from 'react-icons/fa';
import useClick from '../useClick';
import './Filter.scss';

// Komponent do paginacji
const Pagination = ({ currentPage, totalPages, onPageChange, firstPage, prevPage, nextPage, lastPage }) => {
    return (
        <div className="pagination">
            <button onClick={() => onPageChange(firstPage)} disabled={!firstPage}>
                Pierwsza
            </button>
            <button onClick={() => onPageChange(prevPage)} disabled={!prevPage}>
                Wstecz
            </button>
            <span>
                Strona {currentPage} z {totalPages}
            </span>
            <button onClick={() => onPageChange(nextPage)} disabled={!nextPage}>
                Następna
            </button>
            <button onClick={() => onPageChange(lastPage)} disabled={!lastPage}>
                Ostatnia
            </button>
        </div>
    );
};

// Komponent do filtrów
const ProductFilter = ({ gender, setPage }) => { //sortOrder
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const filterPanelRef = useRef(null);

    useClick(filterPanelRef, () => setIsFilterOpen(false));

    return (
        <div className="product-filter">
            <button
                className="filter-toggle"
                onClick={() => setIsFilterOpen(!isFilterOpen)}
            >
                <FaSlidersH />
                Wszystkie filtry
            </button>

            {isFilterOpen && (
                <div className="filter-panel" ref={filterPanelRef}>
                    <div className="filter-group">
                        <label>Filtruj według płci:</label>
                        <div className="gender-buttons">
                            <input type="button" value="Women" onClick={() => {gender('women'); setPage(1); }}></input>
                            <input type="button" value="Men" onClick={() => {gender('men'); setPage(1); }}></input>
                            <input type="button" value="All" onClick={() => {gender(null); setPage(1); }}></input>

                            {/* <button
                                className={`gender-btn ${selectedGender === 'men' ? 'active' : ''}`}
                                onClick={() => handleGenderChange('men')}
                            >
                                Mężczyźni
                            </button>
                            <button
                                className={`gender-btn ${!selectedGender ? 'active' : ''}`}
                                onClick={() => handleGenderChange(null)}
                            >
                                Wszystko
                            </button> */}
                        </div>
                    </div>

                    {/* <div className="filter-group">
                        <label htmlFor="sort-filter">Sortuj według ceny:</label>
                        <select
                            id="sort-filter"
                            value={sortOrder}
                            onChange={(e) => handleSortChange(e.target.value)}
                        >
                            <option value="none">Brak sortowania</option>
                            <option value="asc">Od najniższej do najwyższej</option>
                            <option value="desc">Od najwyższej do najniższej</option>
                        </select>
                    </div> */}
                </div>
            )}
        </div>
    );
};

// Nadrzędny komponent
const Filter = ({
    page,
    numberOfPages,
    numberOfItems,
    firstPage,
    prevPage,
    nextPage,
    lastPage,
    gender,
    onPageChange,
    onFilterChange,
}) => {
    return (
        <div className="filter-and-pagination">
            <div className="pagination-section">
                <Pagination
                    currentPage={page}
                    totalPages={numberOfPages}
                    onPageChange={onPageChange}
                    firstPage={firstPage}
                    prevPage={prevPage}
                    nextPage={nextPage}
                    lastPage={lastPage}
                />
                <span>Liczba sztuk: {numberOfItems}</span>
            </div>
            <ProductFilter
                gender={gender || 'all'}
                // sortOrder={sortOrder || 'none'}
            />
        </div>
    );
};

export default Filter;