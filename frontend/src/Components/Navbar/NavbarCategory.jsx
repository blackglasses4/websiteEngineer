import React from 'react';
import { Link } from 'react-router-dom';
import './NavbarCategory.scss';

const NavbarCategory = () => {
    return (
        <nav className='nav-category'>
          <Link to="/Koszulka" className='a-name' rel='internal'>Koszulki</Link>
          <Link to="/kurtka" className='a-name' rel='internal'>Kurtki</Link>
          <Link to="/spodnie" className='a-name' rel='internal'>Spodnie</Link>
          <Link to="/czapka" className='a-name' rel='internal'>Czapki</Link>
          <Link to="/stroje" className='a-name' rel='internal'>Stroje</Link>
        </nav>
    );
}

export default NavbarCategory;
