import React from 'react';
import { Link } from 'react-router-dom';
import './NavbarCategory.scss';

const NavbarCategory = () => {
    return (
        <nav className='nav-category'>
          <Link to="/koszulka" className='link-name' rel='internal'>Koszulki</Link>
          <Link to="/kurtka" className='link-name' rel='internal'>Kurtki</Link>
          <Link to="/spodnie" className='link-name' rel='internal'>Spodnie</Link>
          <Link to="/czapka" className='link-name' rel='internal'>Czapki</Link>
          <Link to="/stroje" className='link-name' rel='internal'>Stroje</Link>
        </nav>
    );
}

export default NavbarCategory;
