import React, { useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import SearchProduct from '../SearchProduct/SearchProduct';
import SearchOrder from '../SearchOrder/SearchOrder';
import SearchUser from '../SearchUser/SearchUser';

import Sidebar from '../Sidebar/Sidebar';
import './Admin.scss';

const WelcomeAdmin = () => {
    return (
        <div className="welcome-admin">
            <h2>Witaj w panelu administracyjnym!</h2>
            <p>Wybierz opcję z górnego menu, aby rozpocząć zarządzanie danymi.</p>
        </div>
    );
};

const Admin = () => {
    const navigate = useNavigate();

    useEffect(() => {
        toast.success('Witaj w panelu administracyjnym!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }, []);

    return (
        <>
            <header className='header-admin'>
                <a href="/admin" className='a-name' rel='internal'>
                    <LazyLoadImage
                        src="/images/logo.png"
                        effect="blur"
                        className="logo"
                        alt="Logo sklepu"
                        width="100px"
                        height="auto"
                    />
                </a>
                <div className='nav-icons'>
                    <ThemeSwitch />
                    <a href="/login"><FaUserCircle /></a>
                </div>
            </header>

            <div className="admin-container">
                {/* Sidebar */}
                <Sidebar onSelect={(view) => navigate(`/admin/${view}`)} />

                {/* Main Content */}
                <main className="admin-main">
                    <Routes>
                        <Route path="/" element={<WelcomeAdmin />}></Route>
                        <Route path="products" element={<SearchProduct />}></Route>
                        <Route path="orders" element={<SearchOrder />}></Route>
                        <Route path="users" element={<SearchUser />}></Route>
                    </Routes>
                </main>
            </div>
        </>
    );
};

export default Admin;
