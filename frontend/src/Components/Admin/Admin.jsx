import React, { useState, useEffect } from 'react';
import { FaUserCircle, FaSearch } from 'react-icons/fa';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import './Admin.scss';

const Admin = () => {
  return (
    <>
        <header className='header-admin'>
            <a href="/" className='a-name' rel='internal'>NAZWA</a>
            <h3>Admin Panel</h3>
            <div className='nav-icons'>
                <ThemeSwitch />
                <a href="/"><FaUserCircle/></a>
            </div>

            <nav>
                
            </nav>
        </header>



    </>
  )
}

export default Admin