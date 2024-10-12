import React from 'react'
import "./Navbar.scss";

import { FaSearch } from "react-icons/fa";

const Navbar = () => {
  return (
    <div className='navbar'>
      <a href="/" rel='internal'>NAZWA</a>
      <div className="search-bar-container">
        <div className='input-wrapper'>
          <FaSearch id="search-icon"></FaSearch>
          <input placeholder='Szukaj...' />
        </div>
        <div>SearchResults</div>
      </div>
    </div>
  )
}

export default Navbar