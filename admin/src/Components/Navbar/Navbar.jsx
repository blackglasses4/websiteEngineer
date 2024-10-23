import React, { useState, useEffect } from 'react';
import { useQuery, gql } from '@apollo/client';
import { FaSearch } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';
import { FaUserCircle } from "react-icons/fa";
import './Navbar.scss';

const Navbar = () => {

  return (
    <nav>
      <a href="/" className='a-name' rel='internal'>NAZWA</a>

      <h3>Admin Panel</h3>

      <div className='nav-icons'>
        <a href="/"><FaShoppingCart/></a>
        <a href="/"><FaUserCircle/></a>
      </div>
    </nav>
  );
}

export default Navbar;
