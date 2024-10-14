import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { FaSearch } from 'react-icons/fa';
import './Navbar.scss';

const GET_REVIEWS = gql`
  query GetReviews {
    reviews {
      id
      title
      body
      rating
    }
  }
`;

const Navbar = () => {
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const { loading, error, data } = useQuery(GET_REVIEWS);

  useEffect(() => {
    if (data && data.reviews) {
      const filteredResults = data.reviews.filter(review =>
        review.title.toLowerCase().startsWith(input.toLowerCase())
      );
      setSearchResults(filteredResults);
    }
    else
    {
      setSearchResults([]);
    }
  }, [data, input]);

  const handleInputChange = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  return (
    <nav>
      <a href="/" rel='internal'>NAZWA</a>

      <div className="search-bar-container">
        <div className='input-wrapper'>
          <FaSearch id="search-icon" />
          <input
            placeholder='Szukaj...'
            value={input}
            onChange={handleInputChange}
          />
        </div>
        
        <div>
          {loading && <p>Loading...</p>}
          {error && <p>Error: {error.message}</p>}
          {input && searchResults.length > 0 && (
            <ul>
              {searchResults.map(review => (
                <li key={review.id}>
                  <a href={`/details/${review.id}`}>{review.title}</a>
                </li>
              ))}
            </ul>
          )}
          {/* Jeśli input nie jest pusty i brak wyników */}
          {input && searchResults.length === 0 && !loading && <p>No results found</p>}
        </div>
      </div>

      <a href="">coś</a>
    </nav>
  );
}

export default Navbar;
