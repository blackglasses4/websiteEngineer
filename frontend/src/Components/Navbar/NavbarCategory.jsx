import React from 'react';
import { Link } from 'react-router-dom';
import './NavbarCategory.scss';

const NavbarCategory = () => {
    return (
        <nav className='nav-category'>
          <Link to="/men" className='a-name' rel='internal'>Mężczyzna</Link>
          <Link to="/women" className='a-name' rel='internal'>Kobieta</Link>
          <Link to="/equipment" className='a-name' rel='internal'>Sprzęty</Link>
        </nav>
    );
}

export default NavbarCategory;
