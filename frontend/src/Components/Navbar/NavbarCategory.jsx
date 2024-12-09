import React from 'react';
import { Link } from 'react-router-dom';
import './NavbarCategory.scss';

const NavbarCategory = () => {
    return (
        <nav className='nav-category'>
          <Link to="/koszulka" className='a-name' rel='internal'>Koszulki</Link>
          <Link to="/kurtka" className='a-name' rel='internal'>Kurtki</Link>
          <Link to="/spodnie" className='a-name' rel='internal'>Spodnie</Link>
          <Link to="/czapka" className='a-name' rel='internal'>Czapki</Link>
          <Link to="/bielizna" className='a-name' rel='internal'>Bielizna</Link>
          <Link to="/equipment" className='a-name' rel='internal'>Sprzęty</Link>
        </nav>
    );
}

export default NavbarCategory;
