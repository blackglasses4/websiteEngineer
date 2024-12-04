import React from 'react';
import { Link } from 'react-router-dom';
import './NavbarCategory.scss';

const NavbarCategory = () => {
    return (
        <nav className='nav-category'>
          <Link to="/koszulka" className='a-name' rel='internal'>Koszulki</Link>
          <Link to="/kurtka" className='a-name' rel='internal'>Kurtki</Link>
          <Link to="/koszulka" className='a-name' rel='internal'>Koszulki</Link>
          <Link to="/kurtka" className='a-name' rel='internal'>Kurtki</Link>
          <Link to="/koszulka" className='a-name' rel='internal'>Koszulki</Link>
          <Link to="/equipment" className='a-name' rel='internal'>Sprzęty</Link>
        </nav>
    );
}

export default NavbarCategory;
