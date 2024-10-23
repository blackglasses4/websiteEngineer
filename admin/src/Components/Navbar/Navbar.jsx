import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { FaSearch } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';
import { FaUserCircle } from "react-icons/fa";
import './Navbar.scss';

const Navbar = () => {
//   const [input, setInput] = useState("");
//   const [searchResults, setSearchResults] = useState([]);

//   const { loading, error, data } = useQuery(GET_REVIEWS);

//   useEffect(() => {
//     if (data && data.reviews) {
//       const filteredResults = data.reviews.filter(review =>
//         review.title.toLowerCase().startsWith(input.toLowerCase())
//       );
//       setSearchResults(filteredResults);
//     }
//     else
//     {
//       setSearchResults([]);
//     }
//   }, [data, input]);

//   const handleInputChange = (e) => {
//     const value = e.target.value;
//     setInput(value);
//   };

  return (
    <nav>
      <a href="/" className='a-name' rel='internal'>NAZWA Admin Panel</a>

      {/* <div className="nav-search">
        <div className='input-wrapper'>
          <FaSearch id="search-icon" />
          <input
            placeholder='Szukaj...'
            value={input}
            onChange={handleInputChange}
          />
        </div>
        <div className='input-response'>
          {error && <p>Błąd: {error.message}</p>}
          {input && searchResults.length > 0 && (
            <ul>
              {searchResults.map(review => (
                <li key={review.id}>
                  <a href={`/details/${review.id}`}>{review.title}</a>
                </li>
              ))}
            </ul>
          )}
          {input && searchResults.length === 0 && !loading && <p>Nie znaleziono żadnych wyników</p>}
        </div>
      </div> */}

      <div className='nav-icons'>
        <a href="/"><FaShoppingCart/></a>
        <a href="/"><FaUserCircle/></a>
      </div>
    </nav>
  );
}

export default Navbar;
