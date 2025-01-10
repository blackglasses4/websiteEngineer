import React, { useState, useEffect, useRef } from 'react';
import { FaSearch } from 'react-icons/fa';
import useClick from '../useClick';
import './Search.scss';

const SearchBar = ({ data, setConfirmedResults, type }) => {
    const [input, setInput] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const inputWrapperRef = useRef(null);

    useClick(inputWrapperRef, () => setInput("")); 

    const handleInputChange = (e) => {
        setInput(e.target.value);
    };

    const handleKey = (e) => {
        if (e.key === "Enter") {
            setConfirmedResults(searchResults);
            setInput("");
        }
    };

    useEffect(() => {
        if (input === "") {
            setSearchResults([]);
        } else {
            const filterResults = data.filter(item => {
                const searchField =
                    type === 'products'
                        ? item.name
                        : `${item.firstName} ${item.lastName} ${item.username}`;
                return searchField.toLowerCase().includes(input.toLowerCase());
            });
            setSearchResults(filterResults);
        }
    }, [input, data, type]);

    return (
        <div className="admin-search" ref={inputWrapperRef}>
            <div className="input-wrapper">
                <FaSearch id="search-icon" />
                <input
                    placeholder={`Szukaj ${type === 'products' ? 'produktów' : 'użytkowników'}...`}
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleKey}
                />
            </div>

            <div className="input-response">
                {input && searchResults.length === 0 && <p>Nie znaleziono żadnych wyników</p>}
                {input && searchResults.length > 0 && (
                    <ul>
                        {searchResults.map((item) => (
                            <li key={item.id}>
                                <button
                                    onClick={() =>
                                        setConfirmedResults((prevResults) => {
                                            if (prevResults.some((result) => result.id === item.id)) {
                                                return prevResults;
                                            }
                                            return [...prevResults, item];
                                        })
                                    }
                                >
                                    {type === 'products'
                                        ? item.name.length > 50
                                            ? `${item.name.slice(0, 50)}...`
                                            : item.name
                                        : `${item.firstName} ${item.lastName} (${item.username})`}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default SearchBar;