import React, { useEffect } from 'react';
import { FaUserCircle } from 'react-icons/fa';
import { Routes, Route, useNavigate } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import CreateProduct from '../CreateProduct/CreateProduct';
import SearchProduct from '../SearchProduct/SearchProduct';
import Sidebar from '../Sidebar/Sidebar';
import './Admin.scss';

const WelcomeAdmin = () => {
    return (
        <div className="welcome-admin">
            <h2>Witaj w panelu administracyjnym!</h2>
            <p>Wybierz opcję z menu po lewej stronie, aby rozpocząć zarządzanie produktami.</p>
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
                <a href="/admin" className='a-name' rel='internal'>NAZWA</a>
                <h3>Admin Panel</h3>
                <div className='nav-icons'>
                    <ThemeSwitch />
                    <a href="/"><FaUserCircle /></a>
                </div>
            </header>

            <div className="admin-container">
                {/* Sidebar */}
                <Sidebar onSelect={(view) => navigate(`/admin/${view}`)} />

                {/* Main Content */}
                <main className="admin-main">
                    <Routes>
                        <Route path="/" element={<WelcomeAdmin />}></Route>
                        <Route path="createProduct" element={<CreateProduct />}></Route>
                        <Route path="searchProducts" element={<SearchProduct />}></Route>
                    </Routes>
                </main>
            </div>

            <ToastContainer />
        </>
    );
};

export default Admin;
